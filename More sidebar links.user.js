// ==UserScript==
// @name         Moodle more sidebar links
// @description  Adds more links to the sidebar in moodle and is somewhat customisable
// @version      2020.07.19a
// @author       lusc
// @match        https://moodle.ksasz.ch/
// @match        https://moodle.ksasz.ch/?*
// @downloadURL  https://github.com/melusc/lusc/raw/master/More%20sidebar%20links.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/More%20sidebar%20links.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-end
// ==/UserScript==
/* jshint esversion: 10 */
'use strict';

let sidebar;

addEventListener('moreSidebarLinks', async() => {
    // ^ this allows me to reload the script when Clean Moodle or similar has to reload the sidebar

    sidebar = document.getElementsByClassName('type_system depth_2 contains_branch')[0].getElementsByTagName('ul')[0];

    const hr = document.createElement('hr');
    sidebar.appendChild(hr);


    const links = [
        ['Drucker', 'http://printer.ksasz.ch:9191/user/', 'https://i.imgur.com/o3hbaMi.png'], //Adds link to ksa printer
        [GM_getValue('aText'), GM_getValue('aHref'), 'https://i.imgur.com/FQ61BI0.png', 'mensaMenu'], //Adds link to ksa menu
        ['Moodle info', '/info/'], // Link to overview of my scripts
        //         ['schulNetz', 'https://www.schul-netz.com/ausserschwyz/', 'https://i.imgur.com/euAuiRs.png'], //Adds link to ksa schulNetz
    ];
    await add(links);
    //             await search('https://www.duden.de/suchen/dudenonline/{{{%s}}}', 'duden.de'); //Adds search bar for duden
    //             await search('https://en.wikipedia.org/w/index.php?search={{{%s}}}', 'en.wikipedia.org'); //Adds search bar for wikipedia
    //             await lcm(); //Adds input to find lowest common multiple
});


async function add(arr) {
    arr.sort((a, b) => {
        a = a[0].toLowerCase();
        b = b[0].toLowerCase();

        if (a < b) return -1;
        else if (a > b) return 1;
        else return 0;
    });
    for (let i = 0; i < arr.length; i++) {
        const [name, link, icon, fnName] = arr[i],
            li = document.createElement('li'),
            p = document.createElement('p'),
            a = document.createElement('a'),
            img = new Image(),
            span = document.createElement('span');

        img.classList.add('icon', 'navicon');
        img.ariaHidden = true;
        if (icon) {
            img.src = await fetchImage(fnName || name, icon);
        } else {
            img.src = await fetchImage('default', 'https://moodle.ksasz.ch/theme/image.php/classic/theme/1588340020/favicon');
        }
        img.onload = () => {
            URL.revokeObjectURL(img.src);
        };
        img.tabIndex = -1;
        a.tabIndex = -1;
        a.title = name;
        a.href = link;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        p.classList.add('tree_item', 'hasicon');
        p.setAttribute('role', 'treeitem');
        span.classList.add('item-content-wrap');
        span.textContent = name;
        a.appendChild(img);
        a.appendChild(span);
        p.appendChild(a);
        li.appendChild(p);
        sidebar.appendChild(li);
        if(fnName === 'mensaMenu') {
            updateMensa(a);

        }
    }
}

async function updateMensa(anchor){
    if (new Date() - GM_getValue('last') > 2 * 60 * 60 * 1000) { // two hours
        console.log('%c[%cMensa Menu%c] %cxhr', 'color: #fe4c4c', 'color:', 'color: #fe4c4c', 'color:');
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://www.ksasz.ch/de/service/angebote/mensa',
            async: true,
            anonymous: true,
            nocache: true,
            revalidate: true,
            headers:{
                'user-agent':'',
                'accept-language':'',
                connection: '',
            },
            onload: e => {
                const parsed = new DOMParser().parseFromString(e.response, 'text/html'),
                    a = parsed.querySelector('a[href^="/images/PDF-Dokumente/Mensa/Me"][href$=".pdf"]');
//                 const div = document.createElement('div');
//                 const matched = e.response.match(/<a href="\/images\/PDF-Dokumente\/Mensa\/Men?Wo\d{1,2}\.pdf" target="_blank">Menü vom \d{1,2}\. - \d{1,2}\.\d{1,2}\.\d{4}<\/a>/i)[0];
//                 div.innerHTML = matched;
//                 const a = div.firstElementChild;

                anchor.getElementsByTagName('span')[0].textContent = a.textContent;
                anchor.title = a.textContent;
                anchor.href = a.href;

                GM_setValue('last', new Date().getTime());
                GM_setValue('aHref', a.href);
                GM_setValue('aText', a.textContent);

                console.log('%c[%cMensa Menu%c] %cxhr done', 'color: #fe4c4c', 'color:', 'color: #fe4c4c', 'color:');
            }
        });
    }
}

function search(url, name) {
    if (location.pathname === '/') {
        const input = document.createElement('input');
        name = name.replace(/[^\w:\/.&;]/g, '');
        input.placeholder = `Search on ${ name }`;
        input.type = 'text';

        sidebar.appendChild(input);
        input.onkeyup = e => {
            if (e.which === 13) {
                open(url.replace('{{{%s}}}', e.target.value), '_blank');
                e.target.value = '';
            }
        };
    }
}

function lcm() {
    if (location.pathname === '/') {
        const input = document.createElement('input'),
            url = 'https://www.calculatorsoup.com/calculators/math/lcm.php?input={{{%s}}}&data=none&action=solve';
        input.placeholder = 'Get LCM of numbers';
        input.type = 'text';

        sidebar.appendChild(input);

        input.onkeyup = e => {
            if (e.which === 13) {
                let value = e.target.value;
                value = value
                    .replace(/\s*-+\s*/g, '-')
                    .replace(/[^\d,-]+/g, ',')
                    .replace(/,+/g, ',')
                    .replace(/-+/g, '-')
                    .replace(/,$/g, '')
                    .replace(/^,/g, '');
                const occurences = value.split('-').length - 1,
                    splitted = value.match(/\d+-\d+/g);
                let occurencesArray;
                if (splitted) {
                    occurencesArray = splitted.length;
                    for (let j = 0; j < splitted.length; j++) {
                        let first = +splitted[j].match(/^\d+/),
                            last = +splitted[j].match(/\d+$/);
                        value = value.replace(`${ first }-${ last}`, '');
                        value = value.replace(/[^0-9,-]+/g, '');
                        if (first > last)[first, last] = [+last, +first];

                        for (let i = first; i <= last; ++i) {
                            first += `,${ i }`;
                        }
                        value = first + ',' + value;
                        value = value.replace(/,+/g, ',');
                        value = value.replace(/(^,|,$)/g, '');
                    }
                    value = value.replace(/[^\d,]/g, ',').replace(/,+/g, ',').replace(/(^,|,$)/g, '');
                }
                value = value.split(',');
                value.sort((a, b) => +a - +b);

                const uniques = {};
                for (let i = 0; i < value.length; i++) {
                    if (!uniques.hasOwnProperty(value[i])) {
                        uniques[value[i]] = true;
                    }
                }
                value = Object.keys(uniques).map(Number);

                value = value.join(',');
                console.log(value);

                if (value.includes(',') && (!splitted || occurences === occurencesArray) && value.length > 2 && value.length <= 100) {
                    open(url.replace('{{{%s}}}', value));
                    e.target.value = '';
                } else {
                    alert('Error, falsy input\nProbably too long or too short');
                }
            }
        };
    }
}

function fetchImage(name, src) {
    const images = GM_getValue('images');

    return new Promise(resolve => {
        if (GM_getValue('images')[name]) {
            const value = images[name];
            const base64 = atob(images[name].split('base64,')[1]);
            const uint8 = new Uint8Array(base64.split('').map(e => e.charCodeAt(0)));
            const type = value.match(/(?<=data:)\w+\/[\w.]+(?=;)/)[0];
            const blob = new Blob([uint8], {
                type: type
            });
            const objectUrl = URL.createObjectURL(blob);
            resolve(objectUrl);
        } else {
            fetch(src)
                .then(e => e.blob())
                .then(e => {
                    const fr = new FileReader();
                    fr.onload = () => {
                        images[name] = fr.result;
                        GM_setValue('images', images);
                        resolve(URL.createObjectURL(e));
                    };
                    fr.readAsDataURL(e);
                });
        }

    });
}
if (document.getElementById('inst4')) dispatchEvent(new Event('moreSidebarLinks'));