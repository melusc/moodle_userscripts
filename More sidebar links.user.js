// ==UserScript==
// @name         Mensa Menü, Printer & Schulnetz
// @version      1.2
// @author       lusc
// @match        https://moodle.ksasz.ch/*
// @downloadURL  https://github.com/melusc/lusc/raw/master/More%20sidebar%20links.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/More%20sidebar%20links.user.js
// ==/UserScript==

var doc = document.querySelector('[class="type_system depth_2 contains_branch"]');
doc = doc.children[1];


//Mensa Menü

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

var result = getWeekNumber(new Date());
result = `${result[1]}`;
if (result.length == 1) {
    result = `0${result}`;
}

var link = `https://www.ksasz.ch/images/PDF-Dokumente/Mensa/MeWo${result}.pdf`,
    li = document.createElement('li'),
    p = document.createElement('p'),
    a = document.createElement('a'),
    img = document.createElement('img'),
    span = document.createElement('span');

img.setAttribute('class', 'icon navicon');
img.setAttribute('aria-hidden',true);
img.setAttribute('src', 'https://moodle.ksasz.ch/theme/image.php/clean/core/1557402677/i/course');
img.setAttribute('tabindex',-1);


a.setAttribute('tabindex',-1);
a.id = 'label_mensa_menü';
a.setAttribute('title','Mensa Menü');
a.setAttribute('href', link);
a.setAttribute('target', '_blank');
a.setAttribute('rel', 'noopener noreferrer');

p.setAttribute('class', 'tree_item hasicon');
p.setAttribute('role','treeitem');
p.id = 'expandable_branch_mensa_menü';

span.setAttribute('class','item-content-wrap');
span.appendChild(document.createTextNode('Mensa Menü'));

a.appendChild(img);
a.appendChild(span);

p.appendChild(a);

li.appendChild(p);

doc.appendChild(li);


//Schulnetz

var link2 = `https://www.schul-netz.com/ausserschwyz/`,
    li2 = document.createElement('li'),
    p2 = document.createElement('p'),
    a2 = document.createElement('a'),
    img2 = document.createElement('img'),
    span2 = document.createElement('span');


img2.setAttribute('class', 'icon navicon');
img2.setAttribute('aria-hidden',true);
img2.setAttribute('src', 'https://moodle.ksasz.ch/theme/image.php/clean/core/1557402677/i/course');
img2.setAttribute('tabindex',-1);

a2.setAttribute('tabindex',-1);
a2.id = 'label_mensa_menü';
a2.setAttribute('title','Schulnetz');
a2.setAttribute('href', link2);
a2.setAttribute('target', '_blank');
a2.setAttribute('rel', 'noopener noreferrer');

p2.setAttribute('class', 'tree_item hasicon');
p2.setAttribute('role','treeitem');
p2.id = 'expandable_branch_schulnetz';

span2.setAttribute('class','item-content-wrap');
span2.appendChild(document.createTextNode('Schulnetz'));

a2.appendChild(img2);
a2.appendChild(span2);

p2.appendChild(a2);

li2.appendChild(p2);

doc.appendChild(li2);


//Printer

var link1 = `http://printer.ksasz.ch:9191/`,
    li1 = document.createElement('li'),
    p1 = document.createElement('p'),
    a1 = document.createElement('a'),
    img1 = document.createElement('img'),
    span1 = document.createElement('span');

img1.setAttribute('class', 'icon navicon');
img1.setAttribute('aria-hidden',true);
img1.setAttribute('src', 'https://moodle.ksasz.ch/theme/image.php/clean/core/1557402677/i/course');
img1.setAttribute('tabindex',-1);


a1.setAttribute('tabindex',-1);
a1.id = 'label_mensa_menü';
a1.setAttribute('title','Drucker');
a1.setAttribute('href', link1);
a1.setAttribute('target', '_blank');
a1.setAttribute('rel', 'noopener noreferrer');

p1.setAttribute('class', 'tree_item hasicon');
p1.setAttribute('role','treeitem');
p1.id = 'expandable_branch_drucker';

span1.setAttribute('class','item-content-wrap');
span1.appendChild(document.createTextNode('Drucker'));

a1.appendChild(img1);
a1.appendChild(span1);

p1.appendChild(a1);

li1.appendChild(p1);

doc.appendChild(li1);
