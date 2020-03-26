// ==UserScript==
// @name         Timetable in Moodle
// @version      2020.03.26d
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
},
    times = {
    1:['8:00','8:45'],
    2:['8:45','9:30'],
    3:['9:50','10:35'],
    4:['10:40','11:25'],
    5:['11:30','12:15'],
    6:['12:15','13:10'],
    7:['13:10','13:55'],
    8:['13:55','14:40'],
    9:['14:50','15:35']
},
    text = {
    tt: 'Stundenplan',
    nL: 'Kein Unterricht',
    now: 'Jetzt',
    after: 'Nachher',
    break: 'Grosse Pause, dann',
    wE: 'Wochenende!'
};

function refresh() {
    timeTable();
    let date1 = new Date(),
        minutes1 = date1.getMinutes() + date1.getSeconds() / 60 + date1.getMilliseconds() / 60000,
        hours1 = date1.getHours();
    minutes1 = Math.ceil(minutes1 / 5) * 5;
    refreshAt(hours1, minutes1, 3);
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
    console.log(timeout);
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
    let date2 = new Date();
    let day = date2.getDay(),
        hour = date2.getHours(),
        minute = date2.getMinutes() + hour * 60,
        timesArr = {
            1: times['1'][0].split(':')
        },
        timeSlot;
    for (let j = 1; j <= Object.keys(times).length; j++) {
        timesArr[j + 1] = times[j][1].split(':');
    }
    let timesMin = {};
    for (let k = 1; k <= Object.keys(timesArr).length; k++) {
        timesMin[k] = timesArr[k][0] * 60 + Number(timesArr[k][1]);
    }
    for (let i = 1; i <= Object.keys(times).length; i++){
        if (minute >= timesMin[i] && minute <= timesMin[i + 1]) timeSlot = i;
    }
    if (minute < timesMin['1']) timeSlot = 0;
    else if (minute > timesMin[Object.keys(times).length] + 1) timeSlot = -1;

    let currentLesson,
        nextLesson,
        colour = window.getComputedStyle( document.querySelector('#label_1_1') ,null).getPropertyValue('color'),
        time1,
        time2;
    currentLesson = lessons[`${day}-${timeSlot}`];
    nextLesson = lessons[`${day}-${timeSlot + 1}`];
    if (!nextLesson) {
        nextLesson = text.nL;
        time2 = `<div style="color:${colour};font-weight:400;display:inline">:</div>`;
    }
    else {
        time2 = '<div style="color:white;display:inline;font-weight:400;"> (' + times[timeSlot + 1][0] + "-" + times[timeSlot + 1][1] + "):</div>";
    }
    if (!currentLesson) {
        currentLesson = text.nL;
        time1 = `<div style="color:${colour};font-weight:400;display:inline">:</div>`;
    }
    else {
        time1 = '<div style="color:white;display:inline;font-weight:400;"> (' + times[timeSlot][0] + "-" + times[timeSlot][1] + "):";
    }
    if (day < 6) {
        document.querySelector('#currentLesson').children[1].innerHTML = `
<table>
    <tbody style="font-size: large;">
        <tr>
            <th style="color: ${colour};">${text.now}${time1}</th>
            <td style="padding-left: 10px;">${currentLesson}</td>
        </tr>
        <tr>
            <th style="color: ${colour};">${text.after}${time2}</th>
            <td style="padding-left: 10px;">${nextLesson}</td>
        </tr>
    </tbody>
</table>`;
    } else {
        document.querySelector('#currentLesson').children[1].innerHTML = `<strong style="${colour}; font-size:large;">${text.wE}</strong>`;
    }
}
