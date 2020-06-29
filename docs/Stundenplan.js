'use strict';
/* jshint esversion: 10 */
Element.prototype.ac = function(e) {
    this.appendChild(e);
};
const id = e => document.getElementById(e),

    amount = id('amount'),
    lunch = id('lunch'),
    checkbox = id('checkbox'),
    table = id('table'),
    tbody = table.firstElementChild,
    cTd = e => {
        const arr = [];
        for (let i = 1; i <= 5; i++) {
            const td = document.createElement('td');
            td.contentEditable = true;
            td.id = i + '-' + e;
            td.tabIndex = i + 1;
            arr.push(td);
        }
        return arr;
    },
    add = () => {
        lunch.max = amount.value;
        if (+amount.value < +lunch.value) {
            lunch.value = amount.value;
            table.dataset.lunchRow = -1;
        }
        let i = tbody.children.length;
        while (tbody.children.length - 1 > +amount.value) {
            tbody.removeChild(tbody.lastElementChild);
        }
        while (tbody.children.length - 1 < +amount.value) {
            const tr = document.createElement('tr'),
                th = document.createElement('th'),
                [td1, td2, td3, td4, td5] = cTd(i);

            th.tabindex = 1;
            th.contentEditable = true;
            th.textContent = i;
            th.style.width = '80px';
            tr.ac(th);

            tr.ac(td1);
            tr.ac(td2);
            tr.ac(td3);
            tr.ac(td4);
            tr.ac(td5);
            tbody.ac(tr);
            i++;
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
                }
            }
        }
        courses.amount = +amount.value;
        if (checkbox.checked && +lunch.value !== 0) {
            courses.lunch = +lunch.value;
        } else courses.lunch = 0;
        id('result').value = JSON.stringify(courses, null, 4);
    },
    modifyLunch = () => {
        if (+lunch.value > +lunch.max) {
            lunch.value = lunch.max;
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
        run();
    },
    handleScroll = e => {
        e.preventDefault();
        e.stopPropagation();
        let newNum = +e.target.value + (e.deltaY === 150 ? -1 : 1);
        if (e.target.max && newNum > +e.target.max) newNum = +e.target.max;
        if (e.target.min && newNum < +e.target.min) newNum = +e.target.min;
        if (e.target.value !== ('' + newNum)) {
            e.target.value = newNum;
            e.target.dispatchEvent(new Event('input'));
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
                    if (key === 'amount' || key === 'lunch' || !regex.exec(key)) {
                        continue;
                    } else if (json.hasOwnProperty(key)) {
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