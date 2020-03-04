// ===UserScript===
// @name        Clean Moodle customisable
// @namespace   Clean Moodle customisable
// @version     3.2.5
// @include     *://moodle.ksasz.ch/*
// @Author      lusc
// @description Improving the looks of moodle
// @downloadURL https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20customisable.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20customisable.user.js
// ===/UserScript===

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
run('replace', 'Musik AlC Grundlagenfach', 'Musik');
run('remove', 'Musik AlC Grundlagenfach');
*/

run('...');

//Code

function run(custom, customReplace, customReplaceWith) {
    if (custom === 'remove') {
        let thisHeading = document.querySelector(`[title="${customReplace}"]`);
        thisHeading
            .parentNode
            .removeChild(thisHeading)
    } else if (custom === 'replace') {
        let thisHeading = document.querySelector(`[title="${customReplace}"]`);
        thisHeading.childNodes[1].innerHTML = customReplaceWith
    }
}
document.title = document.title.replace('Moodle','Moodled');
