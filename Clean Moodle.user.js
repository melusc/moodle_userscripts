// ===UserScript===
// @name        Clean Moodle
// @namespace   https://github.com/melusc/lusc
// @version     2020.04.04a
// @include     *://moodle.ksasz.ch/*
// @exclude     *://moodle.ksasz.ch/online*
// @Author      lusc
// @description Improving the looks of Moodle
// @downloadURL https://github.com/melusc/lusc/raw/master/Clean%20Moodle.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/Clean%20Moodle.user.js
// @run-at      document-end
// ===/UserScript===
'use strict';

//Sort Courses-sidebar alphabetically?
let sortAlphabetically = true;

run('replace', '...', '---'); //Replaces the name of the course "..." with "---"
run('remove', '...'); //Removes the course "..."

if (window.location.href == 'https://moodle.ksasz.ch/') {
    cleanLinks('https://example.com/egg-sample'); //Removes the link https://example.com/egg-sample from the right sidebar
}

//Code
function run(what, selector, replace) {
    let thisHeading = document.querySelector('.type_system.depth_2.contains_branch').querySelector(`[title="${selector}"]`);
    if (!thisHeading) {
        thisHeading = document.querySelector('.type_system.depth_2.contains_branch').querySelector(`[title="${selector} "]`);
    }
    if (what === 'remove') {
        if (thisHeading) {
            thisHeading = thisHeading.parentElement.parentElement;
            thisHeading.parentElement.removeChild(thisHeading);
        } else if (document.querySelector('.block_navigation.block')) {
            alert(`Error removing "${selector}"! Check if it's written correctly or if you might be missing a whitespace at the end.`);
        }
    } else if (what === 'replace') {
        if (document.getElementsByClassName('block_navigation block')[0] && !thisHeading) {
            alert(`Error replacing "${selector}"! Check if it's written correctly or if you might be missing a whitespace at the end.`);
        } else if (thisHeading.parentElement.parentElement.className.startsWith('type_course depth_3 i')) {
            thisHeading.children[1].innerHTML = replace;
        } else if (thisHeading.parentElement.parentElement.className.startsWith('type_course depth_3 c')) {
            thisHeading.innerHTML = replace;
        }
    } else if (document.getElementsByClass('block_navigation block')[0]) {
        alert(`Unable to "${what}" "${selector}"`);
    }
}
let arrayUS = [];
if (sortAlphabetically) {
    let i = 0;
    let doc = Array.from(document.querySelector('.type_system.depth_2.contains_branch').children[1].children);
    doc.forEach((e, i) => {
        if (doc[i].className == 'type_course depth_3 item_with_icon') {
            arrayUS.push(doc[i].children[0].children[0].children[1].innerHTML)
        } else if (doc[i].className.startsWith('type_course depth_3 contains_branch')) {
            arrayUS.push(doc[i].children[0].children[0].innerHTML)
        }
    });
    let arrayS = arrayUS.slice().sort(),
        arrayDoc = [];
    arrayUS.forEach((e, i) => {
        arrayDoc.push(document.querySelector('.type_system.depth_2.contains_branch').children[1].children[arrayUS.indexOf(arrayS[i])]);
    });
    arrayUS.forEach((e, i) => {
        let docOther = document.querySelector('.type_system.depth_2.contains_branch').children[1].children[i + 1];
        document.querySelector('.type_system.depth_2.contains_branch').children[1].insertBefore(arrayDoc[i], docOther);
    });
}

function cleanLinks(link) {
    let e = document.getElementById('inst161').querySelector(`[href="${link}"]`),
        elementArray = Array.from(e.parentElement.children).indexOf(e);
    if (elementArray != -1) {
        if (e.parentElement.childElementCount > elementArray + 1) {
            e.parentElement.removeChild(e.parentElement.children[elementArray + 1]);
            e.parentElement.removeChild(e.parentElement.children[elementArray]);
        } else if (e.parentElement.childElementCount <= 1) e.parentElement.parentElement.removeChild(e.parentElement);
        else e.parentElement.removeChild(e.parentElement.children[elementArray]);
    }
}
