// ==UserScript==
// @name         More sidebar links
// @description  Adds more links to the sidebar in moodle and is fully customisable
// @version      1.5
// @author       lusc
// @match        https://moodle.ksasz.ch/*
// @exclude      *://moodle.ksasz.ch/online*
// @downloadURL  https://github.com/melusc/lusc/raw/master/More%20sidebar%20links.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/More%20sidebar%20links.user.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js#sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=
// ==/UserScript==
'use strict';
//Currently adds schulNetz, current lunch menu, KSA printing website and a duden search bar


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
let doc = document.querySelector('[class="type_system depth_2 contains_branch"] > ul');

add('Drucker', 'http://printer.ksasz.ch:9191/');
add('Mensa Menü', linkMensa);
add('schulNetz', 'https://www.schul-netz.com/ausserschwyz/');
search('https://www.duden.de/suchen/dudenonline/%s','duden.de');
search('https://en.wikipedia.org/w/index.php?search=%s','en.wikipedia.org');


function add(name, link) {
    let li = document.createElement('li'),
        p = document.createElement('p'),
        a = document.createElement('a'),
        img = document.createElement('img'),
        span = document.createElement('span');

    img.setAttribute('class', 'icon navicon');
    img.setAttribute('aria-hidden', true);
    img.setAttribute('src', 'https://moodle.ksasz.ch/theme/image.php/clean/core/1557402677/i/course');
    img.setAttribute('tabindex', -1);

    a.setAttribute('tabindex', -1);
    a.id = `label_${name.toLowerCase().replace(' ','_')}`;
    a.setAttribute('title', name);
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');

    p.setAttribute('class', 'tree_item hasicon');
    p.setAttribute('role', 'treeitem');
    p.id = `expandable_branch_${name.toLowerCase().replace(' ','_')}`;

    span.setAttribute('class', 'item-content-wrap');
    span.appendChild(document.createTextNode(name));

    a.appendChild(img);
    a.appendChild(span);

    p.appendChild(a);

    li.appendChild(p);

    doc.appendChild(li);
}

function search(url,name){
    let input = document.createElement('input'),
        sanitisedName = name.toLowerCase().replace(/[^a-z0-9]/g,'');
    name = name.replace(/[^a-zA-Z0-9:\/.&;]/g,'');
    input.placeholder = `Suche auf ${name}`;
    input.type = 'text';
    input.id = `${sanitisedName}Suche`;
    doc.appendChild(input);

    $(`#${sanitisedName}Suche`).on('keydown keyup', function(e) {
        if (e.which === 13) {
            window.open(url.replace('%s',e.target.value), '_blank');
            e.target.value = '';
        }
    });
}
