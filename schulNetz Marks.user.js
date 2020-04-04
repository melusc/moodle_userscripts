// ==UserScript==
// @name          schulNetz Marks copy pasteable
// @version       2020.04.04b
// @author        lusc
// @match         https://www.schul-netz.com/ausserschwyz/index.php?pageid=21311*
// @downloadURL   https://github.com/melusc/lusc/raw/master/schulNetz%20Marks.user.js
// @updateURL     https://github.com/melusc/lusc/raw/master/schulNetz%20Marks.user.js
// @grant         none
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
Array.from(page).forEach(e => {
    if (e.innerHTML.indexOf('Aktuelle Noten') != -1) page = e;
});
let h3 = page.getElementsByTagName('h3');
Array.from(h3).forEach(e => {
    if (e.innerHTML.indexOf('Aktuelle Noten') != -1) h3 = e;
});
let pageChildren = Array.from(page.children),
    indexH3 = -1;
pageChildren.forEach((e, i) => {
    if (e == h3) indexH3 = i;
});
page.insertBefore(button, pageChildren[indexH3 + 1]);

let style = document.createElement('style');
style.innerHTML = '.userScriptGenerated:hover{filter: brightness(85%);}';
document.head.appendChild(style);

//Round Numbers
const roundNum = (num, power) => {
        return Math.round(+num * Math.pow(10, +power)) / Math.pow(10, +power);
    },
    //Create linebreak
    br = () => {
        return document.createElement('br');
    },
    //create divider
    cDiv = () => {
        let e = document.createElement('div');
        e.style.display = 'inline';
        e.style.fontSize = 'inherit';
        return e;
    },
    //create h3 element
    cH3 = () => {
        return document.createElement('h3');
    },
    //Style element red
    red = e => {
        e.style.color = 'red';
    },
    //Style element green
    green = e => {
        e.style.color = 'green';
    },
    //Style textArea
    textStyler = e => {
        e.setAttribute('readonly', '');
        e.setAttribute('onClick', 'this.focus();this.select()');
        e.style.width = '300px';
        e.style.outline = 'none';
        e.style.height = e.scrollHeight + 'px';
    },
    //Inserting elements in right order
    insert = arr => {
        window.elRemove = arr;
        arr.forEach(e => {
            page.insertBefore(e, pageChildren[indexH3 + 1]);
        });
    };



window.grabMarks = () => {
    let marksTbody = document.getElementsByClassName('mdl-data-table mdl-js-data-table mdl-table--listtable');
    Array.from(marksTbody).forEach(a => {
        if (a.innerHTML.indexOf('Kurs') != -1) marksTbody = a.getElementsByTagName('tbody')[0];
    });

    //Finding Marks and stringifying them
    let textArea = document.createElement('textarea'),
        all = cH3(),
        marksArrNum = [],
        marksArrName = [],
        trArr = [],
        tr = Array.from(marksTbody.children),
        marksString = '';
    all.innerHTML = text.all;
    all.style.marginBottom = '6px';
    tr.forEach(a => {
        if (!a.style.display) trArr.push(a);
    });
    trArr.forEach(a => {
        if (+a.children[1].innerHTML.replace(/[^0-9.]/g, '')) {
            marksArrNum.push(Math.round(+(a.children[1].innerHTML.replace(/[^0-9.]/g, '')) * 2) / 2);
            marksArrName.push(a.children[0].innerHTML);
        }
    });
    marksArrName.forEach((a, i) => {
        let temp = new DOMParser().parseFromString(a, 'text/html').body;
        temp.removeChild(temp.getElementsByTagName('b')[0]);
        temp.removeChild(temp.getElementsByTagName('br')[0]);
        marksArrName[i] = temp.innerHTML;
    });
    marksArrName.forEach((a, index) => {
        marksString += marksArrName[index] + '&#09;' + marksArrNum[index] + '\n';
    });
    marksString = marksString.replace(/\n$/, '');
    textArea.innerHTML = marksString;



    //All failed marks
    let fail = cH3(),
        failedText = document.createElement('textarea'),
        failedNums = [],
        failedNames = [],
        failedString = '';
    fail.innerHTML = text.fail;
    marksArrNum.forEach((e, i) => {
        if (e < 4) {
            failedNums.push(e);
            failedNames.push(marksArrName[i]);
        }
    });
    failedNums.forEach((e, i) => {
        failedString += failedNames[i] + '&#09;' + failedNums[i] + '\n';
    });
    failedString = failedString.replace(/\n$/, '');
    fail.style.marginBottom = '2px';
    failedText.innerHTML = failedString;



    //Compensate Double
    let compDubH3 = cH3(),
        compDubDiv = cDiv(),
        compDubDivP = cDiv(),
        compDubDivN = cDiv(),
        compDub = 0,
        compDubP = 0,
        compDubN = 0;
    marksArrNum.forEach(e => {
        if (e < 4) compDubN += (e - 4) * 2;
        else compDubP += e - 4;
    });
    compDub = compDubP + compDubN;
    if (compDubN == 0) compDubN = '-' + compDubN;
    if (compDub < 0) red(compDubDiv);
    else green(compDubDiv);
    if (compDub == 0) compDubDiv.style.color = 'orange';
    compDubN = String(compDubN).replace('-', '-&nbsp;');
    red(compDubDivN);
    compDubDivN.innerHTML = compDubN;
    compDubDivP.innerHTML = '+&nbsp;' + compDubP;
    green(compDubDivP);
    compDubDiv.innerHTML = compDub;
    compDubH3.innerHTML = text.compDub + '&nbsp;';
    compDubH3.appendChild(compDubDivP);
    compDubH3.innerHTML += '&nbsp;';
    compDubH3.appendChild(compDubDivN);
    compDubH3.innerHTML += '&nbsp;=&nbsp;';
    compDubH3.appendChild(compDubDiv);



    let div = cDiv(),
        small = document.createElement('small'),
        numFailed = 0;
    if (failedString.split('\n')[0]) numFailed = failedString.split('\n').length;
    if (numFailed > 3) red(div);
    else green(div);
    div.innerHTML = numFailed;
    small.innerHTML = text.failSmall + '&nbsp;';
    small.appendChild(div);



    let avg = 0,
        avgH3 = cH3(),
        avgDiv = cDiv();
    marksArrNum.forEach(e => {
        avg += +e;
    });
    avg /= marksArrNum.length;
    avg = roundNum(avg, 3);
    avgH3.innerHTML = text.avg + '&nbsp;';
    avgDiv.innerHTML = avg;
    if (avg < 4) red(avgDiv);
    else green(avgDiv);
    avgH3.appendChild(avgDiv);



    let summary = cH3(),
        sumDiv = cDiv();
    if (numFailed > 3 || compDub < 0) {
        sumDiv.innerHTML = text.sumF;
        red(sumDiv);
    } else {
        sumDiv.innerHTML = text.sumP;
        green(sumDiv);
    }
    summary.innerHTML = text.sum + '&nbsp;';
    summary.appendChild(sumDiv);

    insert([br(), br(), summary, all, textArea, br(), br(), fail, small, br(), br(), failedText, br(), br(), avgH3, compDubH3]);

    textStyler(textArea);
    textStyler(failedText);
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
