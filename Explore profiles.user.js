// ==UserScript==
// @name         Explore profiles
// @version      2020.04.12c
// @author       lusc
// @match        *://moodle.ksasz.ch/user/profile.php*
// @downloadURL  https://github.com/melusc/lusc/raw/master/Explore%20profiles.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/Explore%20profiles.user.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==


/*
 *     Tried and tested with Tampermonkey on Chrome
 */

console.log(GM_getValue('test'));

GM_addStyle(`
button{
   border:1px solid white;
   border-radius:2px;
   color:white;
   background-color:transparent;
   background-image:linear-gradient(to bottom,transparent,transparent);
   text-shadow:0 1px 1px transparent;
}
button:hover{
   background-color:transparent;
   background-image:linear-gradient(to bottom,transparent,transparent);
   color:white;
   filter: brightness(0.75);
}`);
let url = window.location,
    params = new URLSearchParams(url.search.slice(1));

if (document.getElementsByClassName('alert alert-error alert-block fade in ')[0]) {
    if (localStorage.getItem('action')) {
        console.log('Del');
        console.log(localStorage.getItem('action'));
        GM_setValue(params.get('id'),true);
        explorer(false, localStorage.getItem('action'));
    }
}

function c(e) {
    return document.createElement(e);
}
let button1 = c('button'),
    button2 = c('button'),
    button3 = c('button'),
    button4 = c('button'),
    button5 = c('button'),
    div = c('div');
button1.id = "+1";
button2.id = "-1";
button3.id = "rand";
button4.id = "+10";
button5.id = "-10";
button1.innerHTML = 'Next profile';
button2.innerHTML = 'Previous profile';
button3.innerHTML = 'Random profile';
button4.innerHTML = '+10 profiles';
button5.innerHTML = '-10 profiles';
div.appendChild(button2);
div.appendChild(button1);
div.appendChild(button3);
div.appendChild(button5);
div.appendChild(button4);
let buttons = div.getElementsByTagName('button');
for (let i = 0, length = buttons.length; i < length; i++) {
    buttons[i].onclick = e => {
        explorer(e.target);
    };
}
let header = document.getElementsByClassName('page-header-headings')[0];
header.appendChild(div);

function explorer(e, action) {
    if (!action) {
        action = +e.id;
    }
    action = +action;
    console.log(action);
    if (isNaN(action)) {
        randNum();
    } else {
        let id = +params.get('id') + action;
//         params.set('id', id);
        numCheck(action,id);
    }
    if (e) {
        localStorage.setItem('action', e.id);
    }
    window.location.search = '?' + params.toString();
}

function randNum() {
    let num = Math.floor(Math.random() * 1745 + 2);
    console.log(num);
    if /**/ (num > 76 && 101 > num) randNum();
    else if (num > 112 && 630 > num) randNum();
    else if (num > 630 && 636 > num) randNum();
    else if (num > 644 && 649 > num) randNum();
    else if (num > 651 && 659 > num) randNum();
    else if (num > 659 && 779 > num) randNum();
    else if (num > 779 && 784 > num) randNum();
    else if (num > 784 && 800 > num) randNum();
    else if (num > 800 && 817 > num) randNum();
    else if (num > 828 && 885 > num) randNum();
    else if (num > 885 && 894 > num) randNum();
    else if (num > 894 && 903 > num) randNum();
    else if (num > 905 && 911 > num) randNum();
    else if (num > 911 && 927 > num) randNum();
    else if (num > 927 && 935 > num) randNum();
    else if (num > 935 && 945 > num) randNum();
    else if (num > 945 && 954 > num) randNum();
    else if (num > 954 && 959 > num) randNum();
    else if (num > 959 && 967 > num) randNum();
    else if (num > 967 && 978 > num) randNum();
    else if (num > 978 && 987 > num) randNum();
    else if (num > 988 && 994 > num) randNum();
    else if (num > 994 && 999 > num) randNum();
    else if (num > 1004 && 1038 > num) randNum();
    else if (num > 1038 && 1045 > num) randNum();
    else if (num > 1045 && 1050 > num) randNum();
    else if (num > 1185 && 1190 > num) randNum();
    else if (num > 1191 && 1203 > num) randNum();
    else if (num > 1367 && 1375 > num) randNum();
    else if (GM_getValue(num) == true) randNum();
    else {
        params.set('id', num);
    }
}
function numCheck(action,num,re){
    if(re) num += +action;
    console.log(num);
    if /**/ (num > 76 && 101 > num) numCheck(action, num, !0);
    else if (num > 112 && 630 > num) numCheck(action, num, !0);
    else if (num > 630 && 636 > num) numCheck(action, num, !0);
    else if (num > 644 && 649 > num) numCheck(action, num, !0);
    else if (num > 651 && 659 > num) numCheck(action, num, !0);
    else if (num > 659 && 779 > num) numCheck(action, num, !0);
    else if (num > 779 && 784 > num) numCheck(action, num, !0);
    else if (num > 784 && 800 > num) numCheck(action, num, !0);
    else if (num > 800 && 817 > num) numCheck(action, num, !0);
    else if (num > 828 && 885 > num) numCheck(action, num, !0);
    else if (num > 885 && 894 > num) numCheck(action, num, !0);
    else if (num > 894 && 903 > num) numCheck(action, num, !0);
    else if (num > 905 && 911 > num) numCheck(action, num, !0);
    else if (num > 911 && 927 > num) numCheck(action, num, !0);
    else if (num > 927 && 935 > num) numCheck(action, num, !0);
    else if (num > 935 && 945 > num) numCheck(action, num, !0);
    else if (num > 945 && 954 > num) numCheck(action, num, !0);
    else if (num > 954 && 959 > num) numCheck(action, num, !0);
    else if (num > 959 && 967 > num) numCheck(action, num, !0);
    else if (num > 967 && 978 > num) numCheck(action, num, !0);
    else if (num > 978 && 987 > num) numCheck(action, num, !0);
    else if (num > 988 && 994 > num) numCheck(action, num, !0);
    else if (num > 994 && 999 > num) numCheck(action, num, !0);
    else if (num > 1004 && 1038 > num) numCheck(action, num, !0);
    else if (num > 1038 && 1045 > num) numCheck(action, num, !0);
    else if (num > 1045 && 1050 > num) numCheck(action, num, !0);
    else if (num > 1185 && 1190 > num) numCheck(action, num, !0);
    else if (num > 1191 && 1203 > num) numCheck(action, num, !0);
    else if (num > 1367 && 1375 > num) numCheck(action, num, !0);
    else if (GM_getValue(num) == true) numCheck(action, num, !0);
    else {
        params.set('id', num);
    }
}
