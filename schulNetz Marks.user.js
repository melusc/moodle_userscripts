// ==UserScript==
// @name         schulNetz Marks copy pasteable
// @version      2020.04.02d
// @author       lusc
// @match        https://www.schul-netz.com/ausserschwyz/index.php?pageid=21311*
// @downloadURL  https://github.com/melusc/lusc/raw/master/schulNetz%20Marks.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/schulNetz%20Marks.user.js
// @grant        none
// ==/UserScript==
'use strict';
let text = {
        grab: "Grab Marks",
        info: "Copy and paste into Excel",
        remove: "Remove textarea"
    },
    button = document.createElement('button');
button.innerHTML = text.grab;
button.setAttribute('onclick', 'grabMarks()');
button.style.backgroundColor = 'transparent';
button.style.border = '1px solid #a9a9a9';
button.style.borderRadius = '2px';
button.style.outline = 'none';
button.className = 'userScriptGenerated';

let page = document.getElementsByClassName('mdl-card mdl-shadow--2dp cls-page--content-card');
Array.from(page).forEach(a => {
    if (a.innerHTML.indexOf('Aktuelle Noten') != -1) page = a;
});
page = page.getElementsByTagName('page');
Array.from(page).forEach(a => {
    if (a.innerHTML.indexOf('Aktuelle Noten') != -1) page = a;
});
let h3 = page.getElementsByTagName('h3');
Array.from(h3).forEach(a => {
    if (a.innerHTML.indexOf('Aktuelle Noten') != -1) page = a.parentElement;
    h3 = a;
});
let pageChildren = Array.from(page.children),
    indexH3 = -1;
for (let h = 0; h < pageChildren.length; h++) {
    if (pageChildren[h] == h3) indexH3 = h;
}
page.insertBefore(button, pageChildren[indexH3 + 1]);

let style = document.createElement('style');
style.innerHTML = `
.userScriptGenerated:hover{
 filter: brightness(85%);
}`;
document.head.appendChild(style);
window.grabMarks = () => {
    let button = page.getElementsByTagName('button');
    Array.from(button).forEach(a => {
        if (a.innerHTML == text.grab) button = a;
    });
    page.removeChild(button);
    let marksTbody = document.getElementsByClassName('mdl-data-table mdl-js-data-table mdl-table--listtable');
    Array.from(marksTbody).forEach(a => {
        if (a.innerHTML.indexOf('Kurs') != -1) marksTbody = a;
    });
    marksTbody = marksTbody.querySelector('tbody');
    let tr = marksTbody.children,
        trArr = [],
        marksArr = [],
        marksArrNum = [],
        marksArrName = [];
    tr = Array.from(tr);
    tr.forEach(a => {
        if (!(a.style.display)) trArr.push(a);
    });
    trArr.forEach(a => {
        if (+(a.children[1].innerHTML)) marksArr.push(a);
    });
    marksArr.forEach(a => {
        marksArrNum.push(+a.children[1].innerHTML);
    });
    marksArr.forEach(a => {
        marksArrName.push(a.children[0].innerHTML);
    });
    for (let j = 0; j < marksArrName.length; j++) {
        marksArrName[j] = marksArrName[j].replace(/<b>.{1,}<\/b>/g, '').replace('<br>', '');
    }
    let marksObj = {};
    for (let i = 0; i < marksArrName.length; i++) {
        marksObj[marksArrName[i]] = marksArrNum[i];
    }
    let textArea = document.createElement('textarea');
    textArea.setAttribute('readonly', '');
    textArea.setAttribute('onClick', 'this.focus();this.select()');
    textArea.style.width = '300px';
    textArea.style.height = '150px';
    textArea.style.outline = 'none';
    marksObj = JSON.stringify(marksObj);
    marksObj != '{}' && (marksObj = marksObj.replace(/[{}"]/g, '').replace(/,/g, '\n').replace(/:/g, '&#09;'));
    let h2 = document.createElement('h2'),
        removeButton = document.createElement('button'),
        br = document.createElement('br'),
        br2 = document.createElement('br');
    h2.innerHTML = text.info;
    removeButton.innerHTML = text.remove;
    removeButton.setAttribute('onclick', 'removeBut()');
    removeButton.style.backgroundColor = 'transparent';
    removeButton.style.border = '1px solid #a9a9a9';
    removeButton.style.borderRadius = '2px';
    removeButton.style.outline = 'none';
    removeButton.className = 'userScriptGenerated';
    textArea.innerHTML = marksObj;
    page.insertBefore(removeButton, pageChildren[indexH3 + 1]);
    page.insertBefore(br, removeButton);
    page.insertBefore(br2, br);
    page.insertBefore(textArea, br2);
    page.insertBefore(h2, textArea);
};
window.removeBut = () => {
    let removeElem = page.children;
    Array.from(removeElem).forEach(a => {
        a.nodeName == 'BR' && a.parentElement.removeChild(a);
    });
    Array.from(removeElem).forEach(a => {
        a.nodeName == 'BUTTON' && a.innerHTML == text.remove && a.parentElement.removeChild(a);
    });
    Array.from(removeElem).forEach(a => {
        a.nodeName == 'H2' && a.innerHTML == text.info && a.parentElement.removeChild(a);
    });
    Array.from(removeElem).forEach(a => {
        a.nodeName == 'TEXTAREA' && String(a.onclick).indexOf('this.focus();this.select()') != -1 && a.parentElement.removeChild(a);
    });
    page.insertBefore(button, pageChildren[indexH3 + 1]);
};
