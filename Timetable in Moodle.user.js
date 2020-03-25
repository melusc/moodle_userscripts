// ==UserScript==
// @name         Timetable in Moodle
// @version      2020.03.25a
// @description  try to take over the world!
// @author       lusc
// @match        *://moodle.ksasz.ch/
// @match        *://moodle.ksasz.ch/?
// @grant        none
// ==/UserScript==
'use strict';

setTimeout(refresh, 300000);
function refresh() {
    timeTable();
    setTimeout(refresh, 300000);
    console.log(new Date());
}

let text = {
    tt: 'Stundenplan',
    nL: 'Kein Unterricht',
    now: 'Jetzt',
    after: 'Nachher',
    break: 'Pause, dann'
}
let lessons = {
    "1-1": "Biologie",
    "1-2": "Biologie",
    "1-3": "Turnen",
    "1-4": "Physik",
    "1-5": "Physik",
    "1-6": "Mittag",
    "1-7": "Mathe",
    "1-8": "Mathe",
    "2-1": "Musik",
    "2-2": "Musik",
    "2-3": "Deutsch",
    "2-4": "Englisch",
    "2-5": "Englisch",
    "2-6": "Mittag",
    "2-7": "BG",
    "2-8": "BG",
    "3-1": "Französisch",
    "3-2": "Französisch",
    "3-3": "Klassenlehrerstunde",
    "3-4": "Englisch",
    "3-5": "Mittag",
    "3-6": "Mittag",
    "3-7": "Deutsch",
    "3-8": "Deutsch",
    "4-1": "Chemie",
    "4-2": "Chemie",
    "4-3": "Arbeitstechnik",
    "4-4": "Geografie",
    "4-5": "Geografie",
    "4-6": "Mittag",
    "4-7": "Wirtschaft und Recht",
    "4-8": "Wirtschaft und Recht",
    "4-9": "Wirtschaft und Recht",
    "5-1": "Mathematik",
    "5-2": "Mathematik",
    "5-3": "Turnen",
    "5-4": "Turnen",
    "5-5": "Französisch",
    "5-6": "Mittag",
    "5-7": "Geschichte",
    "5-8": "Geschichte"
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
    p2 = document.createElement('p'),
    span2 = document.createElement('span');
span.innerHTML = text.tt;
span.style = "font-size: medium;";
div1.className = "no-overflow";
div1.id = "currentLesson";
div2.className = "no-overflow";
div3.className = "contentwithoutlink ";
div5.className = "mod-indent-outer";
li.className = "activity label modtype_label ";
li.id = "module-currentClass";
span2.style.fontSize = 'Large';
strong.appendChild(span);
p.appendChild(strong);
div1.appendChild(p);
p2.appendChild(span2);
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
    let date = new Date(),
        day = date.getDay(),
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
    if (timeSlot == 2) {
        document.querySelector('#currentLesson').children[1].children[0].innerHTML = `<strong style="color:var(--links)">${text.now}:</strong> ${currentLesson}<br><strong style="color:var(--links)">${text.after}:</strong> ${text.break} ${nextLesson}`;
    } else {
        document.querySelector('#currentLesson').children[1].children[0].innerHTML = `<strong style="color:var(--links)">${text.now}:</strong> ${currentLesson}<br><strong style="color:var(--links)">${text.after}:</strong> ${nextLesson}`;
    }
}