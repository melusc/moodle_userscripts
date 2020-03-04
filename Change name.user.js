// ==UserScript==
// @name         Alberto Müller
// @version      1.5
// @author       lusc
// @match        https://moodle.ksasz.ch/user/profile.php?*
// @grant        none
// ==/UserScript==

let script = document.createElement('script');
script.innerHTML = `window.onload=function fun(){let input=document.createElement('input');input.setAttribute('type','button');input.setAttribute('value','Beautify profile');input.setAttribute('class','buttons');input.addEventListener('click',fun1,false);if(document.querySelector('#exploreProfiles')){document.querySelector('.page-header-headings').insertBefore(input,document.querySelector('.page-header-headings').children[2])}else{console.log(false)}function fun1(){document.querySelector('body').innerHTML=document.querySelector('body').innerHTML.replace(/Caprioni/g,'Müller');document.querySelector('body').innerHTML=document.querySelector('body').innerHTML.replace(/caprioni/g,'müller')}};`;
document.head.appendChild(script);
