// ==UserScript==
// @name         Alberto Müller
// @version      1.5
// @author       lusc
// @match        https://moodle.ksasz.ch/user/profile.php?*
// @grant        none
// ==/UserScript==

let script = document.createElement('script');
script.innerHTML = `window.onload=function fun(){if(document.querySelector('.page-header-headings').childNodes[0].innerHTML=='Alberto Caprioni'){let whitespace=document.createElement('span');whitespace.innerHTML='&nbsp;&nbsp;&nbsp;';whitespace.setAttribute('style','display:inline');whitespace.id='whitespace';let input=document.createElement('input');input.setAttribute('type','button');input.setAttribute('value','Beautify profile');input.setAttribute('class','buttons');input.setAttribute('id','beautifyProfile');input.setAttribute('onclick',"document.querySelector('body').innerHTML=document.querySelector('body').innerHTML.replace(/Caprioni/g,'Müller');document.querySelector('body').innerHTML=document.querySelector('body').innerHTML.replace(/caprioni/g,'müller');let thisHeading = document.querySelector('#beautifyProfile'); thisHeading.parentNode.removeChild(thisHeading);let whitespace = document.querySelector('#whitespace'); whitespace.parentNode.removeChild(whitespace)");if(document.querySelector('#exploreProfiles')){document.querySelector('.page-header-headings').insertBefore(input,document.querySelector('.page-header-headings').children[2]);document.querySelector('.page-header-headings').insertBefore(whitespace,document.querySelector('.page-header-headings').children[3])}else{document.querySelector('.page-header-headings').childNodes[0].setAttribute('style','display:inline');input.setAttribute('style','display:inline');document.querySelector('.page-header-headings').appendChild(whitespace);document.querySelector('.page-header-headings').appendChild(input)}}};`;
document.head.appendChild(script);
