// ===UserScript===
// @name        Clean Moodle customisable
// @namespace   https://github.com/melusc/lusc
// @version     3.4.2
// @include     *://moodle.ksasz.ch/*
// @Author      lusc
// @description Improving the looks of Moodle
// @downloadURL https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20customisable.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20customisable.user.js
// ===/UserScript===
'use strict';

//Sort sidebar alphabetically?
let sortAlphabetically = true;

//Read instructions thoroughly and see example below
/*
1) Format:

   run('custom', 'customReplace', 'customReplaceWith');


2) Explanation of variables

   2.1) custom ['replace'/'remove'] either replaces the text with your custom text or removes the whole text


   2.2) customReplace selects the text to be either removed or replaced

      - e.g. 'Allgemeine Informationen'


   2.3) customReplaceWith is the text you want to replace the text with //Leave empty if 'remove' is selected

      - e.g. 'Allgemeine Infos'

---Note that all variables must have either '' or "" around them


3) Example:

run('replace','Allgemeine Informationen','Allgemeine Infos'); //Replaces the text 'Allgemeine Informationen' with Allgemeine Infos
run('remove','Allgemeine Informationen'); //Removes the link entirely

//The number of is not limited, just add more if necessary
*/

run('replace','...','---'); //Modify this
run('remove','...'); //And this, and add more below

//Code
function run(custom, customReplace, customReplaceWith) {
    let thisHeading = document.querySelector('.type_system.depth_2.contains_branch').querySelector(`[title="${customReplace}"]`);
    if (!thisHeading) {
        thisHeading = document.querySelector('.type_system.depth_2.contains_branch').querySelector(`[title="${customReplace} "]`);
    }
    if (custom === 'remove') {
        if (thisHeading) {
            thisHeading = thisHeading.parentNode.parentNode;
            thisHeading.parentNode.removeChild(thisHeading);
        } else if (document.querySelector('.block_navigation.block')) {
            alert(`Error removing "${customReplace}"! Check if it's written correctly or if you might be missing a whitespace at the end.`);
        }
    } else if (custom === 'replace') {
        if (document.querySelector('.block_navigation.block') && !thisHeading) {
            alert(`Error replacing "${customReplace}"! Check if it's written correctly or if you might be missing a whitespace at the end.`);
        } else if (thisHeading.parentNode.parentNode.className.startsWith('type_course depth_3 i')) {
            thisHeading.children[1].innerHTML = customReplaceWith;
        } else if (thisHeading.parentNode.parentNode.className.startsWith('type_course depth_3 c')) {
            thisHeading.innerHTML = customReplaceWith;
        }
    } else if (document.querySelector('.block_navigation.block')) {
        alert(`Unable to "${custom}" "${customReplace}"`);
    }
}
document.title = document.title.replace('Moodle', 'Moodled');
let arrayUS = [];
if (sortAlphabetically) {
    let i = 0;
    while (document.querySelector('.type_system.depth_2.contains_branch').children[1].children[i]) {
        if (document.querySelector('.type_system.depth_2.contains_branch').children[1].children[i].className == 'type_course depth_3 item_with_icon') {
            arrayUS.push(document.querySelector('.type_system.depth_2.contains_branch').children[1].children[i].children[0].children[0].children[1].innerHTML);
        } else if (document.querySelector('.type_system.depth_2.contains_branch').children[1].children[i].className.startsWith('type_course depth_3 contains_branch')) {
            arrayUS.push(document.querySelector('.type_system.depth_2.contains_branch').children[1].children[i].children[0].children[0].innerHTML);
        }
        i++;
    }
    let arrayS = arrayUS.slice().sort(),
        arrayDoc = [],
        j;
    for (j = 0; arrayUS.length > j; j++) {
        arrayDoc.push(document.querySelector('.type_system.depth_2.contains_branch').children[1].children[arrayUS.findIndex((element) => element == arrayS[j])]);
    }
    let k;
    for (k = 0; arrayUS.length > k; k++) {
        let doc = arrayDoc[k];
        let docOther = document.querySelector('.type_system.depth_2.contains_branch').children[1].children[k + 1];
        document.querySelector('.type_system.depth_2.contains_branch').children[1].insertBefore(doc, docOther);
    }
}
