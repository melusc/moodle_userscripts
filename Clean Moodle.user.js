// ===UserScript===
// @name        Clean Moodle
// @namespace   https://github.com/melusc/lusc
// @version     2020.04.16a
// @include     *://moodle.ksasz.ch/*
// @exclude     *://moodle.ksasz.ch/info*
// @Author      lusc
// @description Improving the looks of Moodle
// @downloadURL https://github.com/melusc/lusc/raw/master/Clean%20Moodle.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/Clean%20Moodle.user.js
// @run-at      document-end
// @grant       GM_setValue
// @grant       GM_getValue
// ===/UserScript===
'use strict';

//Code
if (!GM_getValue('replace')) {
    GM_setValue('replace', []);
}
let sideBar = document.getElementsByClassName('type_system depth_2 contains_branch')[0];

/*
 *   Sort side bar alphabetically?
 */
     sort(true);

function runner() {
    for (let i = 0, length = GM_getValue('remove').length; i < length; i++) {
        remove(GM_getValue('remove')[i]);
    }
    for (let i = 0, length = GM_getValue('replace').length; i < length; i++) {
        replace(GM_getValue('replace')[i][0], GM_getValue('replace')[i][1]);
    }

    if (window.location.href == 'https://moodle.ksasz.ch/') {
        for (let i = 0, length = GM_getValue('cleanlinks').length; i < length; i++) {
            cleanLinks(GM_getValue('cleanlinks')[i]);
        }
    }
}
async function sort(e) {
    await runner();
    if (e) {
        let arrayUS = [],
            i = 0,
            li = Array.from(sideBar.children[1].children);
        for (let i = 0, length = li.length; i < length; i++){
            if (li[i].className == 'type_course depth_3 item_with_icon') {
                arrayUS.push(li[i].children[0].children[0].children[1].innerHTML);
            } else if (li[i].className.startsWith('type_course depth_3 contains_branch')) {
                arrayUS.push(li[i].children[0].children[0].innerHTML);
            }
        }

        let arrayS = arrayUS.slice().sort(),
            arrayDoc = [];

        for (let i = 0, length = arrayUS.length;i < length; i++){
            arrayDoc.push(sideBar.children[1].children[arrayUS.indexOf(arrayS[i])]);
        }

        for (let i = 0, length = arrayUS.length;i < length; i++){
            let docOther = sideBar.children[1].children[i + 1];
            sideBar.children[1].insertBefore(arrayDoc[i], docOther);
        }
    }
}

function cleanLinks(link) {
    let e = document.getElementById('inst161').querySelector(`[href="${link}"]`),
        elementArray = Array.from(e.parentElement.children).indexOf(e);
    if (e) {
        if (e.parentElement.childElementCount > elementArray + 1) {
            e.parentElement.removeChild(e.parentElement.children[elementArray + 1]);
            e.parentElement.removeChild(e.parentElement.children[elementArray]);
        }
        else if (e.parentElement.childElementCount <= 1) {
            e.parentElement.parentElement.removeChild(e.parentElement);
        }
        else {
            e.parentElement.removeChild(e.parentElement.children[elementArray]);
        }
    }
}

function remove(selector) {
    let thisHeading = sideBar.querySelector(`[title="${selector}"]`);
    if (!thisHeading) {
        thisHeading = sideBar.querySelector(`[title="${selector} "]`);
    }
    if (thisHeading) {
        thisHeading = thisHeading.parentElement.parentElement;
        thisHeading.parentElement.removeChild(thisHeading);
    } else if (sideBar) {
        alert(`Error removing "${selector}"! Check if it's written correctly.`);
    }
}

function replace(selector, replace) {
    let thisHeading = sideBar.querySelector(`[title="${selector}"]`);
    if (!thisHeading) {
        thisHeading = sideBar.querySelector(`[title="${selector} "]`);
    }
    if (sideBar && !thisHeading) {
        alert(`Error replacing "${selector}"! Check if it's written correctly.`);
    } else if (thisHeading.parentElement.parentElement.className.startsWith('type_course depth_3 i')) {
        thisHeading.children[1].innerHTML = replace;
    } else if (thisHeading.parentElement.parentElement.className.startsWith('type_course depth_3 c')) {
        thisHeading.innerHTML = replace;
    }
}
