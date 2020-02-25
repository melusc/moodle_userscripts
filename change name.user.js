// ==UserScript==
// @name         .
// @version      1.4
// @author       lusc
// @match        moodle.ksasz.ch/*
// @grant        none
// ==/UserScript==

document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(/Caprioni/g,'Müller');
document.querySelector('body').innerHTML = document.querySelector('body').innerHTML.replace(/caprioni/g,'müller');
