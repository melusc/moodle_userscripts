// ==UserScript==
// @name         Moodle Timetable
// @version      2020.04.22a
// @author       lusc
// @match        *://moodle.ksasz.ch/
// @match        *://moodle.ksasz.ch/?
// @match        *://moodle.ksasz.ch/?lang=*
// @updateURL    https://github.com/melusc/lusc/raw/master/Timetable%20in%20Moodle.user.js
// @downloadURL  https://github.com/melusc/lusc/raw/master/Timetable%20in%20Moodle.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==
'use strict';
let customTimeSlot = '', //Leave empty this is for my testing
    notify = true,
    times = {
        1: ['8:00', '8:45'],
        2: ['8:45', '9:30'],
        3: ['9:50', '10:35'],
        4: ['10:40', '11:25'],
        5: ['11:30', '12:15'],
        6: ['12:15', '13:10'],
        7: ['13:10', '13:55'],
        8: ['13:55', '14:40'],
        9: ['14:50', '15:35']
    },
    text = {
        tt: 'Stundenplan',
        nL: 'Kein Unterricht',
        nLA: 'Kein Unterricht mehr',
        now: 'Jetzt',
        after: 'Nachher',
        break: 'Grosse Pause, dann',
        wE: 'Wochenende',
        next: 'Jetzt:',
        cTS: 'customTimeSlot activated\nUse only for testing'
    };

if (!GM_getValue('lessons')) GM_setValue('lessons', {});

let interval = setInterval(timeTable, 10000),

    strong = c('strong'),
    p = c('p'),
    div1 = c('div'),
    div2 = c('div'),
    div3 = c('div'),
    div4 = c('div'),
    li = c('li'),
    p2 = c('p'),
    hr = c('hr'),

    timeSlot,
    oldTimeSlot,
    newPage = true;


strong.innerHTML = text.tt;
strong.style = 'font-size: medium;';

div1.className = 'no-overflow';
div1.id = 'currentLesson';

div2.className = 'no-overflow';

div3.className = 'contentwithoutlink';

div4.className = 'mod-indent-outer';

li.className = 'activity label modtype_label ';

li.id = 'module-currentClass';

p.appendChild(strong);
div1.appendChild(p);
div1.appendChild(p2);
div2.appendChild(div1);
div3.appendChild(hr);
div3.appendChild(div2);
div4.appendChild(div3);
li.appendChild(div4);
document.querySelector('.section.img-text').insertBefore(li, document.querySelector('.section.img-text').children[0]);

let timesArr = {
    1: times['1'][0].split(':')
};
for (let j = 1; j <= Object.keys(times).length; j++) {
    timesArr[j + 1] = times[j][1].split(':');
}
let timesMin = {};
for (let k = 1; k <= Object.keys(timesArr).length; k++) {
    timesMin[k] = timesArr[k][0] * 60 + Number(timesArr[k][1]);
}
timeTable();

function timeTable() {
    oldTimeSlot = timeSlot;
    let date = new Date();
    let hour = date.getHours(),
        minute = date.getMinutes() + hour * 60;

    for (let i = 1; i <= Object.keys(times).length; i++) {
        if (minute >= timesMin[i] && minute <= timesMin[i + 1]) timeSlot = i;
    }
    if (minute < timesMin['1']) timeSlot = 0;
    else if (minute > timesMin[Object.keys(times).length + 1]) timeSlot = -1;

    if (timeSlot != oldTimeSlot) {
        let day = date.getDay();
        if (customTimeSlot) {
            timeSlot = +customTimeSlot;
            console.log(text.cTS);
        }
        let currentLesson,
            nextLesson,
            otherLessons,
            colour = window.getComputedStyle(document.querySelector('#label_1_1'), null).getPropertyValue('color'),
            time1,
            time2,
            k = timeSlot + 1,
            both;
        currentLesson = GM_getValue('lessons')[`${day}-${timeSlot}`];
        nextLesson = GM_getValue('lessons')[`${day}-${timeSlot + 1}`];

        while(!otherLessons && k <= Object.keys(times).length){
            otherLessons = GM_getValue('lessons')[`${day}-${k}`];
            k++;
        }
        console.log(otherLessons);

        if (!nextLesson && !currentLesson && !otherLessons) both = true;

        if (!nextLesson) {
            nextLesson = text.nL;
            time2 = `<div style="color:${colour};font-weight:400;display:inline">:</div>`;
        } else {
            time2 = '<div style="color:white;display:inline;font-weight:400;"> (' + times[timeSlot + 1][0] + '-' + times[timeSlot + 1][1] + '):</div>';
        }
        let links = Array.from(document.getElementsByClassName('type_system depth_2 contains_branch')[0].getElementsByClassName('type_course depth_3 item_with_icon')),
            currentLink,
            nextLink;
        for (let i = 0; i < links.length; i++){
            if (links[i].getElementsByTagName('span')[0].innerHTML == currentLesson) currentLink = links[i];
            if (links[i].getElementsByTagName('span')[0].innerHTML == nextLesson) nextLink = links[i];
        }
        if (currentLink) currentLink = currentLink.getElementsByTagName('a')[0].href;
        if (nextLink) nextLink = nextLink.getElementsByTagName('a')[0].href;
        if (!currentLesson) {
            if (!both) currentLesson = text.nL;
            else {
                currentLesson = text.nLA;
                clearInterval(interval);
                console.log('Cleared interval');
            }
            time1 = `<div style="color:${colour};font-weight:400;display:inline">:</div>`;
        } else {
            time1 = '<div style="color:white;display:inline;font-weight:400;"> (' + times[timeSlot][0] + '-' + times[timeSlot][1] + '):</div>';
        }
        if (day != 6 && day != 0) {
            let x = `
<table>
<tbody style="font-size: large;">
<tr>
<th style="color: ${colour};">${text.now + time1}</th>
<td style="padding-left: 10px;">`;

            if (currentLink) {
                x += `
<a href="${currentLink}">${currentLesson}</a>
</td>`;
            } else {
                x += currentLesson + '</td>';
            }

            x += `
</tr>`;

            if (!both) {
                x += `
<tr>
<th style="color: ${colour};">${text.after + time2}</th>
<td style="padding-left: 10px;">`;

                if (nextLink) {
                    x += `
<a href="${nextLink}">${nextLesson}</a>
</td>`;
                } else {
                    x += nextLesson + '</td>';
                }

                x += `
</tr>`;
            }
            x += `
</tbody>
</table>`;
            document.querySelector('#currentLesson').children[1].innerHTML = x;
            console.log(new Date(), 'refreshed');
            if(!both && !newPage && notify){
                console.log('notified at', new Date())
                let notification = new Notification(text.next,{
                    icon: 'https://i.imgur.com/ZtPH8v7.png',
                    body: currentLesson
                });
                notification.onclick = e=>{
                    e.preventDefault();
                    if(currentLink){
                        window.open(currentLink);
                    }
                }
            }
            newPage = false;
        }
        else if (window.location.href === 'https://moodle.ksasz.ch/') {
            document.querySelector('#currentLesson').children[1].innerHTML = `<strong style="color:${colour}; font-size:large;">${text.wE}</strong>`;
        }
    }
}

function c(e){
    return document.createElement(e);
}
