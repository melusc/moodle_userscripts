// ==UserScript==
// @name         schulNetz Marks copy pasteable
// @version      2020.04.03
// @author       lusc
// @match        https://www.schul-netz.com/ausserschwyz/index.php?pageid=21311*
// @downloadURL  https://github.com/melusc/lusc/raw/master/schulNetz%20Marks.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/schulNetz%20Marks.user.js
// @grant        none
// ==/UserScript==
'use strict';
let text = {
        grab: "Grab Marks",
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

let page = document.getElementsByTagName('page');
Array.from(page).forEach(a => {
    a.innerHTML.indexOf('Aktuelle Noten') != -1&&(page = a);
});
let h3 = page.getElementsByTagName('h3');
Array.from(h3).forEach(a => {
    a.innerHTML.indexOf('Aktuelle Noten') != -1&&(h3 = a);
});
let pageChildren = Array.from(page.children),
    indexH3 = -1;
for (let h = 0; h < pageChildren.length; h++) {
    pageChildren[h]==h3&&(indexH3 = h);
}
page.insertBefore(button, pageChildren[indexH3 + 1]);

let style = document.createElement('style');
style.innerHTML = '.userScriptGenerated:hover{filter: brightness(85%);}';
document.head.appendChild(style);

window.grabMarks = () => {
    let marksTbody = document.getElementsByClassName('mdl-data-table mdl-js-data-table mdl-table--listtable');
    Array.from(marksTbody).forEach(a => {
        if (a.innerHTML.indexOf('Kurs') != -1) marksTbody = a;
    });
    marksTbody = marksTbody.getElementsByTagName('tbody')[0];
    let tr = Array.from(marksTbody.children),
        trArr = [],
        marksArrNum = [],
        marksArrName = [];
    tr.forEach(a => {
        !a.style.display&&trArr.push(a);
    });
    trArr.forEach(a => {
       +a.children[1].innerHTML.replace(/[^0-9.]/g,'')&&marksArrNum.push(+a.children[1].innerHTML.replace(/[^0-9.]/g,''))&&marksArrName.push(a.children[0].innerHTML);
    });
    marksArrName.forEach((a,index)=>{
        let temp = new DOMParser().parseFromString(a, "text/html").body;
        temp.removeChild(temp.getElementsByTagName('b')[0]);
        temp.removeChild(temp.getElementsByTagName('br')[0]);
        marksArrName[index] = temp.innerHTML;
    });
    let marksObj = '';
    marksArrName.forEach((a,index)=>{
        marksObj += marksArrName[index] + '&#09;' + marksArrNum[index] + '\n';
    });
    marksObj = marksObj.replace(/\n$/,'');
    let textArea = document.createElement('textarea');
    textArea.setAttribute('readonly', '');
    textArea.setAttribute('onClick', 'this.focus();this.select()');
    textArea.style.width = '300px';
    textArea.style.height = '150px';
    textArea.style.outline = 'none';
    let br = document.createElement('br'),
        br2 = document.createElement('br');
    textArea.innerHTML = marksObj;
    page.insertBefore(textArea, pageChildren[indexH3 + 1]);
    page.insertBefore(br, textArea);
    page.insertBefore(br2, br);
    button.innerHTML = text.remove;
    button.setAttribute('onclick','removeBut()');
};
window.removeBut = () => {
    let removeElem = Array.from(page.children);
    removeElem.forEach(a => {
        a.nodeName == 'BR' && a.parentElement.removeChild(a);
    });
    removeElem.forEach(a => {
        a.nodeName == 'TEXTAREA' && String(a.onclick).indexOf('this.focus();this.select()') != -1 && a.parentElement.removeChild(a);
    });
    button.setAttribute('onclick','grabMarks()');
    button.innerHTML = text.grab;
};
