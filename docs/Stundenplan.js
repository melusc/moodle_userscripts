'use strict';
/* jshint esversion: 10 */
const id = e => document.getElementById(e),

    amount = id('amount'),
    lunch = id('lunch'),
    checkbox = id('checkbox'),
    table = id('table'),
    tbody = table.firstElementChild,
    coursesAll = {},
    originalLunch = {
        original: 6,
        modify: true
    },
    cTd = (e, parent) => {
        for (let i = 1; i <= 5; i++) {
            const td = document.createElement('td');
            td.contentEditable = true;
            td.id = i + '-' + e;
            td.tabIndex = i + 1;
            if (coursesAll.hasOwnProperty(td.id)) td.textContent = coursesAll[td.id];
            parent.append(td);
        }
    },
    add = () => {
        if (+amount.value < 1) {
            amount.value = 1;
        }
        lunch.max = amount.value;
        if (+amount.value < +lunch.value) {
            if (originalLunch.modify) {
                originalLunch.original = +lunch.value;
                originalLunch.modify = false;
            }
            lunch.value = +amount.value;
            table.dataset.lunchRow = -1;
        } else if (+amount.value > +lunch.value && !originalLunch.modify) {
            lunch.value = originalLunch.original;

            if (+amount.value >= originalLunch.original) {
                originalLunch.modify = true;
            }
        }
        while (tbody.children.length - 1 > +amount.value) {
            tbody.removeChild(tbody.lastElementChild);
        }
        let i = tbody.children.length;
        while (tbody.children.length - 1 < +amount.value) {
            const tr = document.createElement('tr'),
                th = document.createElement('th');
                

            th.tabindex = 1;
            th.contentEditable = true;
            th.textContent = i++;
            tr.append(th);
            
            cTd(i, tr);
            
            tbody.appendChild(tr);
        }
        modifyLunch();
        run();
    },
    run = () => {
        const courses = {};
        for (let j = 1; j <= 5; j++) {
            for (let i = 1; i <= +amount.value; i++) {
                const _id = `${j}-${i}`,
                    temp = id(_id).textContent;
                if (temp) {
                    courses[_id] = temp;

                    if (temp !== 'Mittag') {
                        coursesAll[_id] = temp;
                    } else if (coursesAll.hasOwnProperty(_id)) {
                        delete coursesAll[_id];
                    }

                } else if (coursesAll.hasOwnProperty(_id)) delete coursesAll[_id];
            }
        }
        courses.amount = +amount.value;
        if (checkbox.checked && +lunch.value !== 0) {
            courses.lunch = +lunch.value;
        } else {
            courses.lunch = 0;
        }

        id('result').value = JSON.stringify(courses, null, 4);
    },
    modifyLunch = () => {
        if (+lunch.value > +lunch.max) {
            lunch.value = lunch.max;
        }
        if (+lunch.value < +lunch.min) {
            lunch.value = lunch.min;
        }
        if (+lunch.max > +lunch.value) {
            originalLunch.original = +lunch.value;
            originalLunch.modify = true;
        }
        const rowWas = +table.dataset.lunchRow,
            rowWill = +lunch.value;
        table.dataset.lunchRow = rowWill !== 0 ? rowWill : 0;

        if (rowWas !== 0 && rowWas !== -1) {
            for (let i = 1; i <= 5; i++) {
                const element = id(i + '-' + rowWas);
                if (element.textContent === 'Mittag') element.textContent = '';
            }
        }
        if (checkbox.checked && rowWill !== 0) {
            for (let i = 1; i <= 5; i++) {
                const element = id(i + '-' + rowWill);
                if (element.textContent === '') element.textContent = 'Mittag';
            }
        }
        lunch.disabled = !checkbox.checked;
        run();
    },
    handleScroll = e => {
        e.preventDefault();
        e.stopPropagation();
        if (!e.target.disabled) {
            let newNum = +e.target.value + (e.deltaY === 150 ? -1 : 1);
            if (e.target.max && newNum > +e.target.max) newNum = +e.target.max;
            if (e.target.min && newNum < +e.target.min) newNum = +e.target.min;
            if (e.target.value !== ('' + newNum)) {
                e.target.value = newNum;
                e.target.dispatchEvent(new Event('input'));
            }
        }
    },
    inputJSON = e => {
        try {
            const json = JSON.parse(e.target.value);
            if (json.hasOwnProperty('amount') && json.hasOwnProperty('lunch')) {
                amount.value = json.amount;
                if (json.lunch !== 0) {
                    lunch.value = json.lunch;
                    checkbox.checked = true;
                    table.dataset.lunchRow = json.lunch;
                } else {
                    checkbox.checked = false;
                    lunch.value = '';
                    table.dataset.lunchRow = 0;
                }
                amount.dispatchEvent(new Event('input'));

                for (const key in json) {
                    if (key === 'amount' || key === 'lunch') {
                        continue;
                    } else if (json.hasOwnProperty(key) && regex.exec(key)) {
                        id(key).textContent = json[key];
                    }
                }
                run();
            }
        } catch (a) {}
    };


amount.value = 9;
lunch.value = 6;
add();
run();
amount.oninput = add;
checkbox.oninput = modifyLunch;
lunch.oninput = modifyLunch;
table.oninput = run;
amount.onmousewheel = handleScroll;
lunch.onmousewheel = handleScroll;

const regex = /^\d+-\d+$/;

id('result').oninput = inputJSON;