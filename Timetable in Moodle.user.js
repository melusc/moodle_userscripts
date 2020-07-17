// ==UserScript==
// @name         Moodle Timetable v2.0
// @version      2020.07.17e
// @author       lusc
// @include      https://moodle.ksasz.ch/
// @include      https://moodle.ksasz.ch/?*
// @include      https://melusc.github.io/lusc/Stundenplan%20v2.0*
// @updateURL    https://github.com/melusc/lusc/raw/master/Timetable%20in%20Moodle.user.js
// @downloadURL  https://github.com/melusc/lusc/raw/master/Timetable%20in%20Moodle.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_addStyle
// @grant        GM_notification
// @run-at       document-end
// ==/UserScript==
/* jshint esversion: 10 */
/* global updateTextarea: true, textarea: true, handleJSON: true */
'use strict';

const holiday = true;
const c = e => document.createElement(e);
let interval = null;
let innerDiv = null;
let then;
let tbody;
let sidebar;


if (location.pathname.indexOf('Stundenplan') !== -1 && document.getElementById('userScriptSave')) {
    const storage = {};
    for (let i = 0; i < GM_listValues().length; i++) {
        storage[GM_listValues()[i]] = GM_getValue(GM_listValues()[i]);
    }
    textarea.value = JSON.stringify(storage, null, 2);
    handleJSON();
    const element = document.getElementById('userScriptSave');
    element.style.display = '';
    document.getElementById('textareaOuter').style.display = 'none';
    element.addEventListener('click', e => {
        updateTextarea();
        const json = JSON.parse(textarea.value);
        const keys = Object.keys(json);
        for (let i = 0; i < keys.length; i++) {
            GM_setValue(keys[i], json[keys[i]]);
        }

        const text = element.textContent;
        element.classList.add('saved');
        element.textContent = '✓';
        element.addEventListener('animationend', () => {
            element.classList.remove('saved');
            element.textContent = text;
        }, {
            once: true
        });

    });
} else if (location.pathname === '/' && !holiday && GM_getValue('times') && GM_getValue(1) && GM_getValue(2) && GM_getValue(3) && GM_getValue(5)) {
    sidebar = document.querySelector('li.type_unknown.depth_1.contains_branch.current_branch').getElementsByTagName('ul')[0].getElementsByTagName('ul')[0];
    const outerLi = c('li');
    outerLi.classList.add('activity', 'label', 'modtype_label');
    outerLi.id = 'module-timetable';
    const outerDiv = c('div');
    outerDiv.classList.add('mod-indent-outer');
    innerDiv = c('div');
    innerDiv.classList.add('contentwithoutlink');
    innerDiv.appendChild(c('hr'));
    outerDiv.appendChild(innerDiv);
    outerLi.appendChild(outerDiv);

    const ulBody = document.querySelector('div.box.py-3.generalbox.sitetopic > ul.section.img-text');
    ulBody.prepend(outerLi);

    const color = getComputedStyle(document.getElementById('label_1_1')).color;

    GM_addStyle(`
.table {
    display: table;
    border-collapse: collapse;
    width: 80%;
    table-layout: fixed;
    margin-bottom: 0;
}
.tbody {
    display: table-row-group;
}
.row {
    display: table-row;
}
.td,
.th {
    display: table-cell;
    font-size: 18px;
    width: max-width;
}
.th,
.color{
    color:${color};
}
.bold,
.th {
    font-weight: bold;
}
.bold{
font-size:medium;
}
.white {
    display: inline;
    margin-left: 5px;
    color: white;
    font-weight: initial;
}`);

    time(true);
    interval = setInterval(time, 10000);
}

function time(dontNotify) {
    const color = getComputedStyle(document.getElementById('label_1_1')).color;

    const day = new Date().getDay();
    if (day === 0 || day === 6) {
        const strong = document.createElement('strong');
        strong.style.color = color;
        strong.style.fontSize = 'larger';
        strong.textContent = 'Wochenende';
        innerDiv.appendChild(strong);
    } else {
        const times = GM_getValue('times');
        const date = new Date();
        const now = date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
        let course = -1;
        if (now < times[0][0]) {
            course = 0;
        } else {
            if (now < times[0][1]) course = 1;
            for (let i = 0; i < times.length; i++) {
                if (now > times[i][1]) course = i + 2;
            }
        }
        if (course > Math.max(...Object.keys(GM_getValue(day)))) {
            course = -2;
        }
        if (now === -2) {
            if (interval) clearInterval(interval);
            if (tbody) innerDiv.removeChild(tbody.parentNode);
            const free = c('div');
            free.classList.add('bold');
            free.textContent = 'Frei';
            innerDiv.appendChild(free);
        } else if (course !== then) {
            then = course;

            if (!tbody) {
                const title = c('div');
                title.classList.add('bold');
                title.textContent = 'Stundenplan';
                innerDiv.appendChild(title);

                const table = c('div');
                table.classList.add('table');
                tbody = c('div');
                tbody.classList.add('tbody');
                table.appendChild(tbody);
                innerDiv.appendChild(table);
            }

            while (tbody.lastChild) tbody.removeChild(tbody.lastChild);

            let currentRow;
            let nextRow;
            let currentCourse;
            if (course > -1) {
                const currentTime = parseTime(times[course - 1]);
                currentCourse = GM_getValue(day)[course] || 'Frei';
                currentRow = createRow('Jetzt', currentTime, currentCourse);
            }
            if (course > -2) {
                const nextTime = parseTime(times[course]);
                const nextCourse = GM_getValue(day)[course + 1] || 'Frei';
                nextRow = createRow('Nachher', nextTime, nextCourse);
            } else {
                const free = c('div');
                free.classList.add('bold', 'color');
                free.textContent = 'Frei';
                innerDiv.appendChild(free);
            }
            if (currentRow) {
                tbody.append(currentRow.row);
            }
            if (nextRow) {
                tbody.append(nextRow.row);
            }

            if (!dontNotify) {
                if (currentCourse && currentCourse !== 'Frei') {
                    const notificationObj = {
                        text: currentCourse,
                        title: 'Jetzt',
                        image: 'https://i.imgur.com/ZtPH8v7.png',
                        silent: false,
                        timeout: 5000,
                        onclick: () => {
                            open(currentRow.link || 'https://moodle.ksasz.ch/');
                        },
                    };
                    GM_notification(notificationObj);
                    console.log(notificationObj);
                }
            }
        }
    }
}

function createRow(name, time, value) {
    let link;

    if (value !== 'Frei') {
        for (let i = 0; i < sidebar.childElementCount; i++) {
            if (sidebar.children[i].nodeName === 'LI' && sidebar.children[i].getElementsByTagName('span')[0].textContent.toLowerCase().trim() === value.toLowerCase().trim()) {
                link = sidebar.children[i].getElementsByTagName('a')[0].href;
                break;
            }
        }
    }

    const row = c('div');
    row.classList.add('row');
    const head = c('div');
    head.classList.add('th');
    head.textContent = name;
    const div = c('div');
    div.textContent = time ? '(' + time + '):' : ':';
    div.classList.add('white');
    head.append(div);
    const data = c('div');
    data.classList.add('td');
    if (typeof(link) !== 'undefined') {
        const a = c('a');
        a.textContent = value;
        a.href = link;
        data.append(a);
    } else {
        data.textContent = value;
    }
    row.append(head, data);
    return {
        row,
        link
    };
}

function parseTime(e) {
    if (typeof(e) !== 'undefined') {
        const [first, second] = e;
        const firstMin = first % 60;
        const firstHour = (first - firstMin) / 60;

        const secondMin = second % 60;
        const secondHour = (second - secondMin) / 60;
        const currentTime = `${('0' + firstHour).slice(-2)}:${('0' + firstMin).slice(-2)} - ${('0' + secondHour).slice(-2)}:${('0' + secondMin).slice(-2)}`;
        return currentTime;
    } else return null;
}