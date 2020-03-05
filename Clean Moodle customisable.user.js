// ===UserScript===
// @name        Clean Moodle customisable
// @namespace   https://github.com/melusc/lusc
// @version     3.3
// @include     *://moodle.ksasz.ch/*
// @Author      lusc
// @description Improving the looks of moodle
// @downloadURL https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20customisable.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20customisable.user.js
// ===/UserScript===
'use strict';
let arrayUS = [];

//Sort sidebar alphabetically?
let sortAlphabetically = true;


//Instructions, read closely
/*
run(custom, customReplace, customReplaceWith)
custom ['replace'/'remove'] either replaces the text with your custom text or removes the whole text

customReplace is the text you want to edit

//Leave empty if 'remove' is selected

customReplaceWith is the text you want to replace the text with
//Note that the text may have a whitespace at the end, this whitespace is necessary and it won't work without

//Just add more if needed

//Note that all 'selectors' must have either '' or "" around them
*//*
Example:
run('replace','Musik AlC Grundlagenfach','Musik');
run('remove','Musik AlC Grundlagenfach');
*/

run('replace','...','...');
run('remove','...');

//Code
function run(custom, customReplace, customReplaceWith) {
    let thisHeading = document.querySelector(`[title="${customReplace}"]`);
    if (custom === 'remove') {
        if (thisHeading) {
            thisHeading = thisHeading.parentNode.parentNode;
            thisHeading.parentNode.removeChild(thisHeading);
        } else if (document.querySelector('.block_navigation.block')) {
            alert(`Error removing "${customReplace}"! Check if it's written correctly or if you might be missing a whitespace at the end.`);
        }
    } else if (custom === 'replace') {
        if (thisHeading) {
            thisHeading.childNodes[1].innerHTML = customReplaceWith;
        } else if (document.querySelector('.block_navigation.block')) {
            alert(`Error replacing "${customReplace}"! Check if it's written correctly or if you might be missing a whitespace at the end.`);
        }
    } else if (document.querySelector('.block_navigation.block')) {
        alert(`Unable to "${custom}" "${customReplace}"`);
    }
}
document.title = document.title.replace('Moodle', 'Moodled');
if (sortAlphabetically) {
    let i = 0;
    while (document.querySelector('.type_system.depth_2.contains_branch').children[1].children[i]) {
        if (document.querySelector('.type_system.depth_2.contains_branch').children[1].children[i].className == 'type_course depth_3 item_with_icon') {
            arrayUS.push(document.querySelector('.type_system.depth_2.contains_branch').children[1].children[i].children[0].children[0].children[1].innerHTML);
        }
        i++;
    }
    let arrayS = arrayUS.slice().sort(),
        arrayDoc = []
    let j;
    for (j = 0; arrayUS.length > j; j++) {
        let findIndex = (element) => element == arrayS[j];
        arrayDoc.push(document.querySelector('.type_system.depth_2.contains_branch').children[1].children[arrayUS.findIndex(findIndex)])
    }
    let k;
    for (k = 0; arrayUS.length > k; k++) {
        let doc = arrayDoc[k];
        let docOther = document.querySelector('.type_system.depth_2.contains_branch').children[1].children[k + 1];
        document.querySelector('.type_system.depth_2.contains_branch').children[1].insertBefore(doc, docOther);
    }
}
