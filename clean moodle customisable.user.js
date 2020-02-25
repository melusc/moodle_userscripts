// ===UserScript===
// @name        Clean moodle customisable
// @version     2.0
// @include     *://moodle.ksasz.ch/*
// @Author      lusc
// @description Improving the looks of moodle
// @downloadURL https://github.com/melusc/lusc/raw/master/clean%20moodle%20customisable.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/clean%20moodle%20customisable.user.js
// ===/UserScript===

//Instructions
/*
customId: format "label_3_*"
   the Id can be found by pressing f12 and selecting the to be edited text
custom ('replace'/'remove') either replaces the text with your custom text or removes the whole text

//Leave empty if 'remove' is selected
customReplace is the text you want to edit
customReplaceWith is the text you want to replace the text with

//Just add more to edit more
*//*
Example:
run('label_3_6', 'replace', 'Wahl des Schwerpunktfaches für 1. Gymi-Klassen 2020', 'SPFWahl');
run('label_3_7', 'remove');
*/


run('label_3_10', 'remove');
//Code

function run(customId, custom, customReplace, customReplaceWith){
    if (custom === 'remove'){
        var elem = document.getElementById(customId);
        elem.parentNode.removeChild(elem);
    } else {
        document.getElementById(customId).innerHTML = document.getElementById(customId).innerHTML.replace(customReplace, customReplaceWith);
    }
}
