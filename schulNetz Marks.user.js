// ==UserScript==
// @name         schulNetz Marks copy pasteable
// @version      2020.04.04a
// @author       lusc
// @match        https://www.schul-netz.com/ausserschwyz/index.php?pageid=21311*
// @downloadURL  https://github.com/melusc/lusc/raw/master/schulNetz%20Marks.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/schulNetz%20Marks.user.js
// @grant        none
// ==/UserScript==
'use strict';
let text = {
        grab: 'Grab marks',
        remove: 'Remove textarea',
        marks: 'Marks',
        fail: 'Marks below 4:',
        failSmall: 'Maximum of three allowed:',
        all: 'All marks:',
        avg: 'Average:',
        sum: 'Summary: Currently',
        sumF: 'failing',
        sumP: 'passing',
        compDub: 'Compensate failing marks double:'
    },
    button = document.createElement('button');
button.innerHTML = text.grab;
button.setAttribute('onclick', 'grabMarks()');
button.style.backgroundColor = 'transparent';
button.style.border = '1px solid #a9a9a9';
button.style.borderRadius = '2px';
button.style.outline = 'none';
button.className = 'userScriptGenerated';

let page = document.getElementsByTagName('page');
Array.from(page).forEach(a => {
    if (a.innerHTML.indexOf('Aktuelle Noten') != -1) page = a;
});
let h3 = page.getElementsByTagName('h3');
Array.from(h3).forEach(a => {
    if (a.innerHTML.indexOf('Aktuelle Noten') != -1) h3 = a;
});
let pageChildren = Array.from(page.children),
    indexH3 = -1;
for (let h = 0; h < pageChildren.length; h++) {
    if (pageChildren[h] == h3) indexH3 = h;
}
page.insertBefore(button, pageChildren[indexH3 + 1]);

let style = document.createElement('style');
style.innerHTML = '.userScriptGenerated:hover{filter: brightness(85%);}';
document.head.appendChild(style);

const roundNum = (num, power) => {
        return Math.round(+num * Math.pow(10, +power)) / Math.pow(10, +power);
    },
    br = () => {
        return document.createElement('br');
    },
    cDiv = () => {
        return document.createElement('div');
    },
    cH3 = () => {
        return document.createElement('h3');
    },
    styler = e => {
        e.style.display = 'inline';
        e.style.fontSize = 'inherit';
    },
    red = e => {
        e.style.color = 'red';
    },
    green = e => {
        e.style.color = 'green';
    };
window.grabMarks = () => {
    let marksTbody = document.getElementsByClassName('mdl-data-table mdl-js-data-table mdl-table--listtable');
    Array.from(marksTbody).forEach(a => {
        if (a.innerHTML.indexOf('Kurs') != -1) marksTbody = a;
    });
    marksTbody = marksTbody.getElementsByTagName('tbody')[0];
    let tr = Array.from(marksTbody.children),
        trArr = [],
        marksArrNum = [],
        marksArrName = [],
        failedNums = [],
        failedNames = [];
    tr.forEach(a => {
        if (!a.style.display) trArr.push(a);
    });
    trArr.forEach(a => {
        if (+a.children[1].innerHTML.replace(/[^0-9.]/g, '')) {
            marksArrNum.push(Math.round(+(a.children[1].innerHTML.replace(/[^0-9.]/g, '')) * 2) / 2);
            marksArrName.push(a.children[0].innerHTML);
        }
    });
    marksArrName.forEach((a, index) => {
        let temp = new DOMParser().parseFromString(a, 'text/html').body;
        temp.removeChild(temp.getElementsByTagName('b')[0]);
        temp.removeChild(temp.getElementsByTagName('br')[0]);
        marksArrName[index] = temp.innerHTML;
    });
    marksArrNum.forEach((e, index) => {
        if (e < 4) {
            failedNums.push(e);
            failedNames.push(marksArrName[index]);
        }
    });
    let marksObj = '';
    marksArrName.forEach((a, index) => {
        marksObj += marksArrName[index] + '&#09;' + marksArrNum[index] + '\n';
    });
    marksObj = marksObj.replace(/\n$/, '');
    let textArea = document.createElement('textarea'),
        all = cH3(),
        fail = cH3(),
        failedText = document.createElement('textarea'),
        small = document.createElement('small'),
        avgH3 = cH3(),
        avgDiv = cDiv(),
        summary = cH3(),
        sumDiv = cDiv(),
        div = cDiv(),
        compDubH3 = cH3(),
        compDubDiv = cDiv(),
        compDubDivP = cDiv(),
        compDubDivN = cDiv(),
        failedString = '',
        compDub = 0,
        compDubP = 0,
        compDubN = 0,
        numFailed = 0;
    textArea.setAttribute('readonly', '');
    textArea.setAttribute('onClick', 'this.focus();this.select()');
    textArea.style.width = '300px';
    textArea.style.outline = 'none';
    fail.innerHTML = text.fail;
    all.innerHTML = text.all;
    all.style.marginBottom = '6px';
    textArea.innerHTML = marksObj;
    failedNums.forEach((e, i) => {
        failedString += failedNames[i] + '&#09;' + failedNums[i] + '\n';
    });
    marksArrNum.forEach(e => {
        if (e < 4) compDub += (e - 4) * 2;
        else compDub += e - 4;
    });
    marksArrNum.forEach(e => {
        if (e < 4) compDubN += (e - 4) * 2;
        else compDubP += e - 4;
    });
    if (compDubN == 0) compDubN = '-' + compDubN;
    compDubH3.innerHTML = text.compDub + '&nbsp;';
    if (compDub < 0) red(compDubDiv);
    else green(compDubDiv);
    compDubN = String(compDubN).replace('-', '- ');
    styler(compDubDiv);
    styler(compDubDivP);
    styler(compDubDivN);
    green(compDubDivP);
    compDubDivP.innerHTML = '+ ' + compDubP;
    red(compDubDivN);
    compDubDivN.innerHTML = compDubN;
    compDubDiv.innerHTML = compDub;
    console.log(compDubDiv);
    compDubH3.appendChild(compDubDivP);
    compDubH3.innerHTML += '&nbsp;';
    compDubH3.appendChild(compDubDivN);
    compDubH3.innerHTML += '&nbsp;=&nbsp;';
    compDubH3.appendChild(compDubDiv);
    failedString = failedString.replace(/\n$/, '');
    if (failedString.split('\n')[0]) numFailed = failedString.split('\n').length;
    failedText.innerHTML = failedString;
    failedText.setAttribute('readonly', '');
    failedText.setAttribute('onClick', 'this.focus();this.select()');
    failedText.style.width = '300px';
    failedText.style.outline = 'none';
    fail.style.marginBottom = '2px';
    small.innerHTML = text.failSmall + '&nbsp;';
    div.innerHTML = numFailed;
    if (numFailed > 3) red(div);
    else green(div);
    styler(div);
    small.appendChild(div);

    function insert(Arr) {
        window.elRemove = Arr;
        for (let i = 0; i < Arr.length; i++) {
            page.insertBefore(Arr[i], pageChildren[indexH3 + 1]);
        }
    }
    let avg = 0;
    marksArrNum.forEach(e => {
        avg += +e;
    });
    avg /= marksArrNum.length;
    avg = roundNum(avg, 3);
    avgH3.innerHTML = text.avg + '&nbsp;';
    avgDiv.innerHTML = avg;
    if (avg < 4) red(avgDiv);
    else green(avgDiv);
    styler(avgDiv);
    avgH3.appendChild(avgDiv);
    styler(sumDiv);
    if (numFailed > 3 || avg < 4 || compDub < 0) {
        sumDiv.innerHTML = text.sumF;
        red(sumDiv);
    } else {
        sumDiv.innerHTML = text.sumP;
        green(sumDiv);
    }
    summary.innerHTML = text.sum + '&nbsp;';
    summary.appendChild(sumDiv);
    insert([br(), br(), summary, all, textArea, br(), br(), fail, small, br(), br(), failedText, br(), br(), avgH3, compDubH3]);
    textArea.style.height = textArea.scrollHeight + 'px';
    failedText.style.height = failedText.scrollHeight + 'px';
    button.innerHTML = text.remove;
    button.setAttribute('onclick', 'removeBut()');
};
window.removeBut = () => {
    window.elRemove.forEach(e => {
        e.parentElement.removeChild(e);
    });
    button.setAttribute('onclick', 'grabMarks()');
    button.innerHTML = text.grab;
};
