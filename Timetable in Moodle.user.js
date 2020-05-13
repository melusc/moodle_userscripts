// ==UserScript==
// @name         Moodle Timetable
// @version      2020.05.13a
// @author       lusc
// @match        *://moodle.ksasz.ch/
// @match        *://moodle.ksasz.ch/?
// @match        *://moodle.ksasz.ch/?lang=*
// @updateURL    https://github.com/melusc/lusc/raw/master/Timetable%20in%20Moodle.user.js
// @downloadURL  https://github.com/melusc/lusc/raw/master/Timetable%20in%20Moodle.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_addStyle
// ==/UserScript==
'use strict';
console.log(`Moodle timetable version ${GM_info.script.version} by lusc`)
addEventListener('timeTable', () => {
    let customTimeSlot = '', //Leave empty this is for my testing
        notify = true,
        holiday = false,
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
            wE: 'Wochenende',
            next: 'Jetzt:',
            cTS: 'customTimeSlot activated\nUse only for testing',
            hD: 'Ferien!'
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
        newPage = true,
        colour = getComputedStyle(document.getElementById('label_1_1'), null).getPropertyValue('color');


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
    document.getElementsByClassName('section img-text')[0].insertBefore(li, document.getElementsByClassName('section img-text')[0].children[0]);

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
        let date = new Date(),
            hour = date.getHours(),
            minute = date.getMinutes() + hour * 60;

        for (let i = 1; i <= Object.keys(times).length; i++) {
            if (minute >= timesMin[i] && minute <= timesMin[i + 1]) timeSlot = i;
        }
        if (minute < timesMin['1']) timeSlot = 0;
        else if (minute > timesMin[Object.keys(times).length + 1]) timeSlot = -1;

        if (timeSlot != oldTimeSlot) {
            if (!holiday) {
                let day = date.getDay();
                if (customTimeSlot) {
                    timeSlot = +customTimeSlot;
                    console.log(text.cTS);
                }
                let currentLesson,
                    nextLesson,
                    otherLessons,
                    time1,
                    time2,
                    cancel;
                currentLesson = GM_getValue('lessons')[`${day}-${timeSlot}`];
                nextLesson = GM_getValue('lessons')[`${day}-${timeSlot + 1}`];


                let k = timeSlot + 1;
                while (!otherLessons && timeSlot >= 0 && k <= Object.keys(times).length) {
                    otherLessons = GM_getValue('lessons')[`${day}-${k}`];
                    k++;
                }
                console.log(otherLessons);

                if (!nextLesson && !currentLesson && !otherLessons) cancel = true;

                time1 = c('div');
                time1.style.fontWeight = 400;
                time1.style.display = 'inline';

                if (!currentLesson) {
                    if (!cancel) currentLesson = text.nL;
                    else {
                        currentLesson = text.nLA;
                        clearInterval(interval);
                        console.log('Cleared interval');
                    }
                    time1.style.color = colour;
                    time1.innerHTML = ':';
                } else {
                    time1.style.color = 'white';
                    time1.innerHTML = ` (${times[timeSlot][0]} - ${times[timeSlot][1]}):`;
                }

                time2 = c('div');
                time2.style.fontWeight = 400;
                time2.style.display = 'inline';

                if (!nextLesson) {
                    nextLesson = text.nL;

                    time2.style.color = colour;
                    time2.innerHTML = ':';
                } else {
                    time2.style.color = 'white';
                    time2.innerHTML = ` (${times[timeSlot + 1][0]} - ${times[timeSlot + 1][1]}):`;
                }

                let links = document.getElementsByClassName('type_system depth_2 contains_branch')[0].getElementsByClassName('type_course depth_3 item_with_icon'),
                    currentLink,
                    nextLink;

                for (let i = 0; i < links.length; i++) {
                    if (links[i].getElementsByTagName('span')[0].innerText.indexOf(currentLesson) >= 0) currentLink = links[i].getElementsByTagName('a')[0].href;
                    if (links[i].getElementsByTagName('span')[0].innerText.indexOf(nextLesson) >= 0) nextLink = links[i].getElementsByTagName('a')[0].href;
                }


                if (day != 6 && day != 0) {
                    let table = c('table'),
                        tbody = c('tbody');
                    table.appendChild(tbody);

                    tbody.style.fontSize = 'large';
                    tbody.appendChild(cTr(text.now, currentLink, currentLesson, time1));
                    if (!cancel) {
                        tbody.appendChild(cTr(text.after, nextLink, nextLesson, time2));
                    }

                    let p = document.getElementById('currentLesson').children[1];
                    while (p.lastChild) p.removeChild(p.lastChild);
                    p.appendChild(table);

                    console.log(new Date(), 'refreshed');
                    if (!cancel && !newPage && notify) {
                        console.log('notified at', new Date());
                        let notificationObj = {
                            text: currentLesson,
                            title: text.now,
                            image: 'https://i.imgur.com/ZtPH8v7.png',
                            silent: false,
                            timeout: 5000
                        };
                        if (currentLink) {
                            notificationObj.onclick = () => {
                                open(currentLink);
                            };
                        }
                        console.log(notificationObj);
                        GM_notification(notificationObj);
                    }
                    newPage = false;
                } else {
                    let weekEndStrong = c('strong');
                    weekEndStrong.style.color = colour;
                    weekEndStrong.style.fontSize = 'large';
                    weekEndStrong.innerHTML = text.wE;
                    document.getElementById('currentLesson').children[1].appendChild(weekEndStrong);
                }
            } else {
                let holidayStrong = c('strong');
                holidayStrong.style.color = colour;
                holidayStrong.style.fontSize = 'large';
                holidayStrong.innerHTML = text.hD;
                document.getElementById('currentLesson').children[1].appendChild(holidayStrong);
            }
        }
    }

    function c(e) {
        return document.createElement(e);
    }

    function cTr(text, link, lesson, time) {
        let tr = c('tr'),
            th = c('th'),
            td = c('td'),
            textA = document.createTextNode(text);

        th.style.color = colour;
        tr.appendChild(th);

        th.appendChild(textA);
        th.appendChild(time);

        td.style.paddingLeft = '10px';
        tr.appendChild(td);

        if (link) {
            let anchor = c('a');
            anchor.href = link;
            anchor.target = '_blank';
            anchor.innerHTML = lesson;
            td.appendChild(anchor);
        } else {
            let textNode = document.createTextNode(lesson);
            td.appendChild(textNode);
        }
        return tr;
    }
});
if (location.pathname === '/') dispatchEvent(new Event('timeTable'));