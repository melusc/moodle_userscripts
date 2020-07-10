'use strict';
/* jshint esversion: 10 */
const id = e => document.getElementById(e);
const amount = id('amount');
const lunch = id('lunch');
const checkbox = id('checkbox');
const table = id('table');
const clearButton = id('clear');
const regex = /^\d+-\d+$/;
const tbody = table.firstElementChild;
const coursesAll = {};
const originalLunch = {
    original: 6,
    modify: true
};
const times = {
    1: '08:00-08:45',
    2: '08:45-09:30',
    3: '09:50-10:35',
    4: '10:40-11:25',
    5: '11:30-12:15',
    6: '12:15-13:10',
    7: '13:10-13:55',
    8: '13:55-14:40',
    9: '14:50-15:35',
};
const cTd = (row, parent) => {
    for (let i = 1; i <= 5; i++) {
        const td = document.createElement('td');
        td.contentEditable = true;
        td.appendChild(document.createElement('br'));
        td.addEventListener('focus', selectAll);
        td.id = i + '-' + row;
        td.tabIndex = i + 1;
        if (coursesAll.hasOwnProperty(td.id)) td.textContent = coursesAll[td.id];
        parent.append(td);
    }
};
const add = () => {
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
        const text = tbody.lastElementChild.firstElementChild.textContent,
            index = tbody.childElementCount - 1;
        if (!times.hasOwnProperty(index) || times[index] !== text) {
            times[index] = text;
        }
        tbody.removeChild(tbody.lastElementChild);
    }
    let i = tbody.children.length;
    while (tbody.children.length - 1 < +amount.value) {
        const tr = document.createElement('tr'),
            th = document.createElement('th');


        th.tabindex = 1;
        th.contentEditable = true;
        th.textContent = times.hasOwnProperty(i) ? times[i] : i;
        tr.append(th);

        cTd(i++, tr);

        tbody.appendChild(tr);
    }
    modifyLunch();
    run();
};
const run = () => {
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
};
const modifyLunch = () => {
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
};
const handleScroll = e => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.target.disabled) {
        const target = e.target.nodeName === 'LABEL' ? e.target.getElementsByTagName('input')[0] : e.target;
        let newNum = +target.value + (e.deltaY === 150 ? -1 : 1);
        if (target.max && newNum > +target.max) newNum = +target.max;
        if (target.min && newNum < +target.min) newNum = +target.min;
        if (target.value !== ('' + newNum)) {
            target.value = newNum;
            target.dispatchEvent(new Event('input'));
        }
    }
};
const inputJSON = e => {
    try {
        const json = JSON.parse(e.target.value);
        if (json.hasOwnProperty('amount') && json.hasOwnProperty('lunch')) {
            clear();
            amount.value = json.amount;
            if (json.lunch !== 0) {
                lunch.value = json.lunch;
                checkbox.checked = true;
            } else {
                checkbox.checked = false;
                lunch.value = 0;
            }
            add();

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
const clear = () => {
    for (let i = 1; i <= 5; i++) {
        for (let j = 1; j <= +amount.value; j++) {
            id(i + '-' + j).textContent = '';
        }
    }
    if (checkbox.checked) checkbox.click();
};
const selectAll = e => {
    const range = new Range();
    const sel = getSelection();
    const end = e.target.textContent.length;
    this.focus();
    range.setStart(e.target.firstChild, 0);
    range.setEnd(e.target.lastChild, end);
    sel.removeAllRanges();
    sel.addRange(range);
};


amount.value = 9;
lunch.value = 6;
add();
run();
amount.addEventListener('input', add);
checkbox.addEventListener('input', modifyLunch);
lunch.addEventListener('input', modifyLunch);
table.addEventListener('input', run);
clearButton.addEventListener('click', clear);
amount.addEventListener('mousewheel', handleScroll);
lunch.parentElement.addEventListener('mousewheel', handleScroll);

id('result').addEventListener('input', inputJSON);