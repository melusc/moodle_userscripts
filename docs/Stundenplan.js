'use strict';
Element.prototype.ac = function(e) {
    this.appendChild(e);
};
const id = e => document.getElementById(e),

    amount = id('amount'),
    lunch = id('lunch'),
    checkbox = id('checkbox'),
    table = id('table'),
    tbody = table.firstElementChild,
    cTd = (e, f) => {
        const td = document.createElement('td');
        td.contentEditable = true;
        td.id = e + '-' + f;
        td.tabIndex = f * amount.value + 1;
        return td;
    },
    tI = (a, num) => {
        a.setAttribute('tabindex', num * amount.value);
    },
    fillLunch = a => {
        for (let i = 0; i < a.length; i++) {
            a[i].textContent = 'Mittag';
        }
    },
    add = () => {
        lunch.max = amount.value;
        if (+amount.value < +lunch.value) {
            lunch.value = amount.value;
            table.dataset.lunchRow = amount.value;
        }
        while (tbody.children.length > 1) tbody.removeChild(tbody.lastChild);
        for (let i = 1; i <= +amount.value; i++) {

            const tr = document.createElement('tr'),
                th = document.createElement('th'),
                td1 = cTd(i, 1),
                td2 = cTd(i, 2),
                td3 = cTd(i, 3),
                td4 = cTd(i, 4),
                td5 = cTd(i, 5),
                inputTh = document.createElement('input');
            inputTh.tabindex = i

            if (checkbox.checked && +lunch.value && i === +lunch.value) {
                fillLunch([td1, td2, td3, td4, td5]);
            }

            inputTh.value = i;
            th.style.width = '80px';
            inputTh.style.width = '90%';
            inputTh.setAttribute('tabindex', -1);
            th.ac(inputTh);
            tr.ac(th);

            tr.ac(td1);
            tr.ac(td2);
            tr.ac(td3);
            tr.ac(td4);
            tr.ac(td5);
            tbody.ac(tr);
        }
        run();
    },
    run = e => {
        const doc = {};
        for (let j = 1; j <= 5; j++) {
            for (let i = 1; i <= +amount.value; i++) {
                const _id = `${i}-${j}`,
                    temp = id(_id).textContent;
                if (temp) {
                    doc[_id] = temp;
                }
            }
        }
        id('result').value = JSON.stringify(doc, null, 4);
    },
    modifyLunch = e => {
        if (+lunch.value > +lunch.max) {
            lunch.value = lunch.max;
            return;
        }
        const rowWas = table.dataset.lunchRow,
            rowWill = lunch.value;

        if (rowWas === 'null' || rowWas === '') {
            if (checkbox.checked) {
                for (let i = 1; i <= 5; i++) {
                    const element = id(rowWill + '-' + i);
                    if (element.textContent === '') element.textContent = 'Mittag';
                }
                table.dataset.lunchRow = rowWill;
            }
        } else {
            if (checkbox.checked) {
                for (let i = 1; i <= 5; i++) {
                    const element = id(rowWas + '-' + i);
                    if (element.textContent === 'Mittag') element.textContent = '';
                }

if (rowWill !== ''){
                for (let i = 1; i <= 5; i++) {
                    const element = id(rowWill + '-' + i);
                    if (element.textContent === '') element.textContent = 'Mittag';
                }
                table.dataset.lunchRow = rowWill;
}
else table.dataset.lunchRow = null;
            } else {
                table.dataset.lunchRow = null;
                for (let i = 1; i <= 5; i++) {
                    const element = id(rowWas + '-' + i);
                    if (element.textContent === 'Mittag') element.textContent = '';
                }
            }
        }
        add();

    };


amount.value = 9;
lunch.value = 5;
add();
run();
amount.oninput = add;
checkbox.oninput = modifyLunch;
lunch.oninput = modifyLunch;
document.getElementsByTagName('table')[0].oninput = run;