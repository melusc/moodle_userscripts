// ==UserScript==
// @name         More sidebar links
// @version      1.4
// @author       lusc
// @match        https://moodle.ksasz.ch/*
// @downloadURL  https://github.com/melusc/lusc/raw/master/More%20sidebar%20links.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/More%20sidebar%20links.user.js
// ==/UserScript==

//Currently adds schulNetz, current lunch menu, KSA printing website


//Code

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

let result = getWeekNumber(new Date());
result = result[1];
if (result.length == 1) {
    result = `0${result}`;
}

const linkMensa = `https://www.ksasz.ch/images/PDF-Dokumente/Mensa/MeWo${result}.pdf`;

run('Mensa Menü',linkMensa);
run('schulNetz','https://www.schul-netz.com/ausserschwyz/');
run('Drucker','http://printer.ksasz.ch:9191/');


function run(name, link) {
    let li = document.createElement('li'),
        p = document.createElement('p'),
        a = document.createElement('a'),
        img = document.createElement('img'),
        span = document.createElement('span'),
        doc = document.querySelector('[class="type_system depth_2 contains_branch"]').children[1];

    img.setAttribute('class', 'icon navicon');
    img.setAttribute('aria-hidden',true);
    img.setAttribute('src', 'https://moodle.ksasz.ch/theme/image.php/clean/core/1557402677/i/course');
    img.setAttribute('tabindex',-1);

    a.setAttribute('tabindex',-1);
    a.id = `label_${name.toLowerCase().replace(' ','_')}`;
    a.setAttribute('title', name);
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');

    p.setAttribute('class', 'tree_item hasicon');
    p.setAttribute('role','treeitem');
    p.id = `expandable_branch_${name.toLowerCase().replace(' ','_')}`;

    span.setAttribute('class','item-content-wrap');
    span.appendChild(document.createTextNode(name));

    a.appendChild(img);
    a.appendChild(span);

    p.appendChild(a);

    li.appendChild(p);

    doc.appendChild(li);
}
