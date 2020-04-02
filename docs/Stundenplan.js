let amount,
lunch;

const add = e=>{
  lunch.max=e.value;
  e.value < lunch.value && (lunch.value = e.value);
    let permanent = document.getElementsByTagName('tbody')[0].querySelector('#permanent');
    document.getElementsByTagName('tbody')[0].innerHTML = '';
    document.getElementsByTagName('tbody')[0].appendChild(permanent);
    for (let i = 1; i <= e.value; i++) {
        const cI = () => {
                return document.createElement('input');
            },
            cTd = () => {
                return document.createElement('td');
            };
        let tr = document.createElement('tr'),
            th = document.createElement('th'),
            td1 = cTd(),
            td2 = cTd(),
            td3 = cTd(),
            td4 = cTd(),
            td5 = cTd(),
            input1 = cI(),
            input2 = cI(),
            input3 = cI(),
            input4 = cI(),
            input5 = cI(),
            inputTh = document.createElement('input');
        input1.id = `1-${i}`;
        input2.id = `2-${i}`;
        input3.id = `3-${i}`;
        input4.id = `4-${i}`;
        input5.id = `5-${i}`;
        const addEl = a => {
            a.addEventListener('keyup', a => run(a));
        };
        addEl(input1);
        addEl(input2);
        addEl(input3);
        addEl(input4);
        addEl(input5);

        const tI = (a, num) => {
            a.setAttribute('tabindex', num * e.value);
        };
        tI(input1, 1);
        tI(input2, 2);
        tI(input3, 3);
        tI(input4, 4);
        tI(input5, 5);
        const l5 = a=>{a.value = 'Mittag';};
         lunch.value && i == lunch.value && (l5(input1),l5(input2),l5(input3),l5(input4),l5(input5));

        td1.appendChild(input1);
        td2.appendChild(input2);
        td3.appendChild(input3);
        td4.appendChild(input4);
        td5.appendChild(input5);

        inputTh.value = i;
        th.style.width = '80px';
        inputTh.style.width = '90%';
        inputTh.setAttribute('tabindex', -1);
        th.appendChild(inputTh);
        tr.appendChild(th);
        const ac = a => {
            tr.appendChild(a);
        };
        ac(td1);
        ac(td2);
        ac(td3);
        ac(td4);
        ac(td5);
        document.getElementsByTagName('tbody')[0].appendChild(tr);
    }
    run();
}

const run = e=>{
    let doc = {};
    for (let j = 1; j <= 5; j++) {
        for (let i = 1; i <= amount.value; i++) {
            if (document.querySelector(`[id="${j}-${i}"]`).value) {
                doc[`${j}-${i}`] = document.querySelector(`[id="${j}-${i}"]`).value;
            }
        }
    }
    doc = JSON.stringify(doc);
    if (doc != '{}') {
        doc = doc.replace('{', '{\n    ');
        doc = doc.replace(/,/g, ',\n    ');
        doc = doc.replace('}', '\n}');
    }
    document.querySelector('#result').value = doc;
}

window.onload = () => {
  amount = document.getElementById('amount');
  lunch = document.getElementById('lunch');
  amount.value = 9;
  lunch.value = 5;
  add(amount);
  run();
  amount.addEventListener('change', () => {
    add(amount);
  });
  amount.addEventListener('keyup', () => {
    add(amount);
  });
  lunch.addEventListener('change', () => {
    add(amount);
  });
  lunch.addEventListener('keyup', () => {
    add(amount);
  });
};
