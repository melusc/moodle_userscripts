// ==UserScript==
// @name         More sidebar links
// @description  Adds more links to the sidebar in moodle and is fully customisable
// @version      2020.04.03a
// @author       lusc
// @match        https://moodle.ksasz.ch/*
// @exclude      *://moodle.ksasz.ch/online*
// @downloadURL  https://github.com/melusc/lusc/raw/master/More%20sidebar%20links.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/More%20sidebar%20links.user.js
// ==/UserScript==
'use strict';

//Adds schulNetz, current lunch menu, KSA printing website, a duden search bar, a wikipedia search bar and a search bar to find lowest common multiple

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return [d.getUTCFullYear(), weekNo];
}
let result = getWeekNumber(new Date())[1];
if (result.length == 1) {
    result = `0${ result }`;
}
const linkMensa = `https://www.ksasz.ch/images/PDF-Dokumente/Mensa/MeWo${ result }.pdf`;

add('Drucker', 'http://printer.ksasz.ch:9191/'); //Adds link to ksa printer
add('Mensa Menü', linkMensa); //Adds link to ksa menu
add('schulNetz', 'https://www.schul-netz.com/ausserschwyz/'); //Adds link to ksa schulNetz
// search('https://www.duden.de/suchen/dudenonline/%s', 'duden.de'); //Adds search bar for duden
// search('https://en.wikipedia.org/w/index.php?search=%s', 'en.wikipedia.org'); //Adds search bar for wikipedia
lcm(); //Adds input to find lowest common multiple

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
    a.id = `label_${name.toLowerCase().replace(/\s/g,'_')}`;
    a.setAttribute('title', name);
    a.setAttribute('href', link);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    p.setAttribute('class', 'tree_item hasicon');
    p.setAttribute('role', 'treeitem');
    p.id = `expandable_branch_${name.toLowerCase().replace(/\s/g,'_')}`;
    span.setAttribute('class', 'item-content-wrap');
    span.appendChild(document.createTextNode(name));
    a.appendChild(img);
    a.appendChild(span);
    p.appendChild(a);
    li.appendChild(p);
    let doc = document.querySelector('[class="type_system depth_2 contains_branch"] > ul');
    doc.appendChild(li);
}

function search(url, name) {
    if (window.location.href == 'https://moodle.ksasz.ch/') {
        let input = document.createElement('input'),
            sanitisedName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        name = name.replace(/[^a-zA-Z0-9:\/.&;]/g, '');
        input.placeholder = `Suche auf ${ name }`;
        input.type = 'text';
        input.id = `${ sanitisedName }Suche`;
        let doc = document.querySelector('[class="type_system depth_2 contains_branch"] > ul');
        doc.appendChild(input);
        document.querySelector(`#${ sanitisedName }Suche`).addEventListener('keyup',e=> {
            if (e.which === 13) {
                window.open(url.replace('%s', e.target.value), '_blank');
                e.target.value = '';
            }
        });
    }
}

function lcm() {
    if (window.location.href == 'https://moodle.ksasz.ch/') {
        let input = document.createElement('input'),
            url = 'https://www.calculatorsoup.com/calculators/math/lcm.php?input=%s&data=none&action=solve';
        input.placeholder = 'Get LCM of numbers';
        input.type = 'text';
        input.id = 'calculatorSoupSuche';
        let doc = document.querySelector('[class="type_system depth_2 contains_branch"] > ul');
        doc.appendChild(input);
        document.querySelector('#calculatorSoupSuche').addEventListener('keyup',e=>{
            if (e.which === 13) {
                let value = e.target.value;
                value = value.replace(/[^0-9,-.\s]+/g, ',');
                value = value.replace(/[.\s]+/g, ',');
                value = value.replace(/,{2,}/g, ',');
                value = value.replace(/-{2,}/g, '-');
                value = value.replace(/,$/, '');
                value = value.replace(/^,/, '');
                let occurences = value.split('-').length - 1,
                    splitted = value.match(/[0-9]+-[0-9]+/g) || false,
                    occurencesArray;
                if (splitted) {
                    occurencesArray = splitted.length;
                    for (let j = 0; j < splitted.length; j++) {
                        let first = Number(splitted[j].replace(/-[0-9]+/g).replace(/.+,/g, '').replace(/[^0-9]/g, '')),
                            last = Number(splitted[j].replace(/[0-9]+-/g).replace(/,.+/g, '').replace(/[^0-9]/g, ''));
                        value = value.replace(first + '-' + last, '');
                        value = value.replace(/[^0-9,-]+/g, '');
                        if (first > last) {
                            let temp = first;
                            first = last;
                            last = temp;
                        }
                        for (let i = first + 1; i <= last; i++) {
                            first += `,${ i }`;
                        }
                        value = first + ',' + value;
                        value = value.replace(/,{2,}/g, ',');
                        value = value.replace(/,$/, '');
                        value = value.replace(/^,/, '');
                    }
                    value = value.replace(/[^0-9,]/g, ',').replace(/,{2,}/g, ',').replace(/,$/, '').replace(/^,/, '');
                }
                value = value.split(',');
                value.sort((a, b) => a - b);
                var uniqueNumbers = [];
                value.forEach((el,index)=>{
                    if (uniqueNumbers.indexOf(el) == -1) uniqueNumbers.push(el);
                });
                value = uniqueNumbers;
                value = value.join(',');
                value = String(value);
                value = value.replace(/[^0-9,]/g, ',').replace(/,{2,}/g, ',').replace(/,$/, '').replace(/^,/, '');
                let test;
                if (!splitted) {
                    test = true;
                } else {
                    test = occurences == occurencesArray;
                }
                if (test && value.length > 1 && value.includes(',')) {
                    window.open(url.replace('%s', value.replace(/,/g, '%2C')), '_blank');
                    e.target.value = '';
                } else {
                    alert('Error, falsy input');
                }
            }
        });
    }
}
