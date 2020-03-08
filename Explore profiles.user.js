// ==UserScript==
// @name         Explore profiles
// @namespace    https://github.com/melusc/lusc
// @version      1.5
// @author       lusc
// @match        *://moodle.ksasz.ch/user/profile.php*
// @downloadURL  https://github.com/melusc/lusc/raw/master/Explore%20profiles.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/Explore%20profiles.user.js
// ==/UserScript==
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
let style = document.createElement("style");
style.innerHTML += `
input.buttons {
    border: 1px solid #1a2027!important;
    border-radius: 2px;
    background-color: #fff;
    background-image: linear-gradient(to bottom,#fff,#fff);
    color: #1a2027;
    text-shadow: 0 1px 1px rgba(255,255,255,0)!important;
    box-shadow: inset 0 1px 0 transparent,0 1px 2px transparent;
}
input.buttons:hover {
    background-color: #e5e5e5;
    color: #30363c;
    background-image: linear-gradient(to bottom,#e5e5e5,#e5e5e5);
}`;
document.head.appendChild(style);

let url = Number(new URLSearchParams(window.location.search).get('id'));
if (!url) {
    url = 1612;
}
let randNum = Math.floor((Math.random() * 1744) + 2);
randNum1();
function randNum1(){
    if (randNum < 101 && randNum > 76) {
        randNum = Math.floor((Math.random() * 1744) + 2);
        randNum1();
    } else if (randNum < 630 && randNum > 112) {
        randNum = Math.floor((Math.random() * 1744) + 2);
        randNum1();
    } else if (randNum < 779 && randNum > 659) {
        randNum = Math.floor((Math.random() * 1744) + 2);
        randNum1();
    } else if (randNum < 817 && randNum > 800) {
        randNum = Math.floor((Math.random() * 1744) + 2);
        randNum1();
    } else if (randNum < 885 && randNum > 828) {
        randNum = Math.floor((Math.random() * 1744) + 2);
        randNum1();
    } else if (randNum < 927 && randNum > 911) {
        randNum = Math.floor((Math.random() * 1744) + 2);
        randNum1();
    } else if (randNum < 945 && randNum > 935) {
        randNum = Math.floor((Math.random() * 1744) + 2);
        randNum1();
    } else if (randNum < 978 && randNum > 967) {
        randNum = Math.floor((Math.random() * 1744) + 2);
        randNum1();
    } else if (randNum < 1038 && randNum > 1004) {
        randNum = Math.floor((Math.random() * 1744) + 2);
        randNum1();
    } else if (randNum < 1203 && randNum > 1191) {
        randNum = Math.floor((Math.random() * 1744) + 2);
        randNum1();
    }
}
let prevUrl = `https://moodle.ksasz.ch/user/profile.php?id=${url - 1}`,
    nextUrl = `https://moodle.ksasz.ch/user/profile.php?id=${url + 1}`,
    prevUrl10 = `https://moodle.ksasz.ch/user/profile.php?id=${url - 10}`,
    nextUrl10 = `https://moodle.ksasz.ch/user/profile.php?id=${url + 10}`,
    randUrl = `https://moodle.ksasz.ch/user/profile.php?id=${randNum}`,
    action = getCookie('action'),
    form = document.createElement('form'),
    prev = document.createElement('input'),
    next = document.createElement('input'),
    prev10 = document.createElement('input'),
    next10 = document.createElement('input'),
    rand = document.createElement('input');

prev.setAttribute('type','button');
prev.setAttribute('value','Previous profile');
prev.setAttribute('class','buttons');
prev.setAttribute('onclick',`window.location.href='${prevUrl}';document.cookie = 'action=-1';`);
form.appendChild(prev);

next.setAttribute('type','button');
next.setAttribute('value','Next profile');
next.setAttribute('class','buttons');
next.setAttribute('onclick',`window.location.href='${nextUrl}';document.cookie = 'action=+1';`);
form.appendChild(next);

prev10.setAttribute('type','button');
prev10.setAttribute('value','-10 profiles');
prev10.setAttribute('class','buttons');
prev10.setAttribute('onclick',`window.location.href='${prevUrl10}';document.cookie = 'action=-10';`);
form.appendChild(prev10);

next10.setAttribute('type','button');
next10.setAttribute('value','+10 profiles');
next10.setAttribute('class','buttons');
next10.setAttribute('onclick',`window.location.href='${nextUrl10}';document.cookie = 'action=+10';`);
form.appendChild(next10);

rand.setAttribute('type','button');
rand.setAttribute('value','Random profile');
rand.setAttribute('class','buttons');
rand.setAttribute('onclick',`window.location.href='${randUrl}';document.cookie = 'action=rand';`);
form.appendChild(rand);
form.setAttribute('style','display:inline');
form.id = 'exploreProfiles';

const whitespace = document.createElement('span');
whitespace.innerHTML = '&nbsp;&nbsp;&nbsp;';

document.querySelector('.page-header-headings').appendChild(whitespace);
document.querySelector('.page-header-headings').appendChild(form);
document.querySelector('.page-header-headings').children[0].setAttribute('style','display:inline');

var doc = document.querySelector('.alert').innerHTML;
if (doc) {
    if (url <= 1745) {
        if (url >= 2) {
            if (action == +1) {
                window.open(nextUrl,'_self');
            } else if (action == -1) {
                window.open(prevUrl,'_self');
            } else if (action == +10) {
                window.open(nextUrl10,'_self');
            } else if (action == -10) {
                window.open(prevUrl10,'_self');
            } else if (action == 'rand') {
                window.open(randUrl,'_self');
            }
        } else {
            window.open(`https://moodle.ksasz.ch/user/profile.php?id=1745`,'_self');
        }
    } else {
        window.open(`https://moodle.ksasz.ch/user/profile.php?id=2`,'_self');
    }
}
