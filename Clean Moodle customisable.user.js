// ===UserScript===
// @name        Clean Moodle customisable
// @namespace   https://github.com/melusc/lusc
// @version     3.5
// @include     *://moodle.ksasz.ch/*
// @Author      lusc
// @description Improving the looks of Moodle
// @downloadURL https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20customisable.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20customisable.user.js
// ===/UserScript===
'use strict';

//Sort sidebar alphabetically?
let sortAlphabetically = true;

run('replace','...','---')
run('remove','...')

cleanLinks('...')

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
function cleanLinks(el) {
	let nodes = document.querySelector('#inst161').querySelector(`[href="${el}"]`),
		elementArray = Array.prototype.indexOf.call(nodes.parentElement.children, nodes);
	if (elementArray >= 0) {
		if (nodes.parentElement.childElementCount > elementArray + 1) {
			nodes.parentElement.removeChild(nodes.parentElement.children[elementArray + 1]);
			nodes.parentElement.removeChild(nodes.parentElement.children[elementArray]);
		} else if (nodes.parentElement.childElementCount <= 1) {
			nodes.parentElement.parentElement.removeChild(nodes.parentElement);
		} else {
			nodes.parentElement.removeChild(nodes.parentElement.children[elementArray]);
		}
	}
}
