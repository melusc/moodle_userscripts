// ===UserScript===
// @name        Clean moodle customisable
// @version     3.0
// @include     *://moodle.ksasz.ch/*
// @Author      lusc
// @description Improving the looks of moodle
// @downloadURL https://github.com/melusc/lusc/raw/master/clean%20moodle%20customisable.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/clean%20moodle%20customisable.user.js
// ===/UserScript===

//Instructions, read closely
/*
run(custom, customReplace, customReplaceWith)
custom ('replace'/'remove') either replaces the text with your custom text or removes the whole text

customReplace is the text you want to edit

//Leave empty if 'remove' is selected
customReplaceWith is the text you want to replace the text with

//Just add more if needed

//Please note that all 'selectors' must have either '' or "" around them
*//*
Example:
run('replace', 'Musik AlC Grundlagenfach', 'Musik');
run('remove', 'Musik AlC Grundlagenfach');
*/

run('...');
//Code

function run(custom, customReplace, customReplaceWith) {
    if (custom === 'remove') {
        var id = `//span[contains(., '${customReplace}')]`
        var headings = document.evaluate(id, document, null, XPathResult.ANY_TYPE, null);
        var thisHeading = headings.iterateNext();
        thisHeading = thisHeading.parentElement.parentElement.parentElement;
        thisHeading.parentNode.removeChild(thisHeading);
    } else {
        var id = `//span[contains(., '${customReplace}')]`
        var headings = document.evaluate(id, document, null, XPathResult.ANY_TYPE, null);
        var thisHeading = headings.iterateNext();
        thisHeading.innerHTML = customReplaceWith;
    }
}
