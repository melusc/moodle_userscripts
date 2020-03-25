// ==UserScript==
// @name         Timetable in Moodle
// @version      2020.03.25f
// @description  try to take over the world!
// @author       lusc
// @match        *://moodle.ksasz.ch/
// @match        *://moodle.ksasz.ch/?
// @updateURL    https://github.com/melusc/lusc/raw/master/Timetable%20in%20Moodle.user.js
// @downloadURL  https://github.com/melusc/lusc/raw/master/Timetable%20in%20Moodle.user.js
// @grant        none
// ==/UserScript==
'use strict';

//Replace the {object} below with the object that you can get from https://melusc.github.io/lusc/Stundenplan
let lessons = {
    "1-1": "Example"
};

let text = {
    tt: 'Stundenplan',
    nL: 'Kein Unterricht',
    now: 'Jetzt',
    after: 'Nachher',
    break: 'Grosse Pause, dann',
    wE: 'Wochenende!'
};

function refresh() {
    timeTable();
    setTimeout(refresh, 300000);
    console.log(new Date());
}
let date = new Date(),
    minutes = date.getMinutes() + date.getSeconds() / 60 + date.getMilliseconds() / 60000,
    hours = date.getHours();
minutes = Math.ceil(minutes / 5) * 5;
refreshAt(hours, minutes, 3);

function refreshAt(hours, minutes, seconds) {
    let now = new Date();
    let then = new Date();

    if (now.getHours() > hours || (now.getHours() == hours && now.getMinutes() > minutes) || now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
        then.setDate(now.getDate() + 1);
    }
    then.setHours(hours);
    then.setMinutes(minutes);
    then.setSeconds(seconds);

    let timeout = (then.getTime() - now.getTime());
    setTimeout(refresh, timeout);
}

let span = document.createElement('span'),
    strong = document.createElement('strong'),
    p = document.createElement('p'),
    div1 = document.createElement('div'),
    div2 = document.createElement('div'),
    div3 = document.createElement('div'),
    div4 = document.createElement('div'),
    div5 = document.createElement('div'),
    div6 = document.createElement('div'),
    li = document.createElement('li'),
    p2 = document.createElement('p');
span.innerHTML = text.tt;
span.style = "font-size: medium;";
div1.className = "no-overflow";
div1.id = "currentLesson";
div2.className = "no-overflow";
div3.className = "contentwithoutlink ";
div5.className = "mod-indent-outer";
li.className = "activity label modtype_label ";
li.id = "module-currentClass";
strong.appendChild(span);
p.appendChild(strong);
div1.appendChild(p);
div1.appendChild(p2);
div2.appendChild(div1);
div3.appendChild(div2);
div4.appendChild(div3);
div5.appendChild(div4);
div6.appendChild(div5);
li.appendChild(div6);
document.querySelector('.section.img-text').insertBefore(li, document.querySelector('.section.img-text').children[0]);
timeTable();

function timeTable() {
    let day = date.getDay(),
        hour = date.getHours(),
        minute = date.getMinutes() + hour * 60;
    let timeSlot;
    if (minute >= 480 && minute <= 525) timeSlot = 1;
    else if (minute >= 525 && minute <= 570) timeSlot = 2;
    else if (minute >= 570 && minute <= 635) timeSlot = 3;
    else if (minute >= 635 && minute <= 685) timeSlot = 4;
    else if (minute >= 685 && minute <= 735) timeSlot = 5;
    else if (minute >= 735 && minute <= 790) timeSlot = 6;
    else if (minute >= 790 && minute <= 835) timeSlot = 7;
    else if (minute >= 835 && minute <= 880) timeSlot = 8;
    else if (minute >= 880 && minute <= 935) timeSlot = 9;
    else if (minute < 480) timeSlot = 0;
    else timeSlot = -1;

    let currentLesson,
        nextLesson;
    currentLesson = lessons[`${day}-${timeSlot}`];
    nextLesson = lessons[`${day}-${timeSlot + 1}`];
    if (!nextLesson) nextLesson = text.nL;
    if (!currentLesson) currentLesson = text.nL;
    if (timeSlot == 2 && day < 6) {
        document.querySelector('#currentLesson').children[1].innerHTML = `
<table>
    <tbody style="font-size: large;">
        <tr>
            <th style="color: var(--links);">${text.now}:</th>
            <td style="padding-left: 10px;">${currentLesson}</td>
        </tr>
        <tr>
            <th style="color: var(--links);">${text.after}:</th>
            <td style="padding-left: 10px;">${text.break} ${nextLesson}</td>
        </tr>
    </tbody>
</table>`;
    } else if (day < 6) {
        document.querySelector('#currentLesson').children[1].innerHTML = `
<table>
    <tbody style="font-size: large;">
        <tr>
            <th style="color: var(--links);">${text.now}:</th>
            <td style="padding-left: 10px;">${currentLesson}</td>
        </tr>
        <tr>
            <th style="color: var(--links);">${text.after}:</th>
            <td style="padding-left: 10px;">${nextLesson}</td>
        </tr>
    </tbody>
</table>`;
    } else {
        document.querySelector('#currentLesson').children[1].innerHTML = `<strong style="color:var(--links); font-size:large;">${text.wE}</strong>`;
    }
}
