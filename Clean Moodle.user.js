// ===UserScript===
// @name        Clean Moodle
// @namespace   https://github.com/melusc/lusc
// @version     2020.04.29c
// @include     *://moodle.ksasz.ch/*
// @exclude     *://moodle.ksasz.ch/info*
// @Author      lusc
// @description Improving the looks of Moodle
// @downloadURL https://github.com/melusc/lusc/raw/master/Clean%20Moodle.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/Clean%20Moodle.user.js
// @run-at      document-end
// @grant       GM_setValue
// @grant       GM_getValue
// ===/UserScript===
'use strict';

/*
 * Click on name in top right and click on preferences, there click on Clean Moodle -> settings
 *
 * Or go directly to https://moodle.ksasz.ch/cleanMoodle
 */



if (window.location.pathname != '/cleanMoodle') {
    sort(true);
}

function runner(sideBar) {
    let removeArr = GM_getValue('remove'),
        replaceArr = GM_getValue('replace');
    for (let i = 0; i < removeArr.length; i++) {
        remove(removeArr[i], sideBar);
    }
    for (let i = 0; i < replaceArr.length; i++) {
        replace(replaceArr[i][0], replaceArr[i][1], sideBar);
    }
}
async function sort(e) {
    let sideBar = document.getElementsByClassName('type_system depth_2 contains_branch')[0];
    await runner(sideBar);
    if (e) {
        let unsortArr = [],
            li = Array.from(sideBar.children[1].children);

        for (let i = 0; i < li.length; i++) {
            unsortArr.push(li[i].innerText);
        }
        let sortArr = unsortArr.slice().sort();

        for (let i = 0; i < unsortArr.length; i++) {
            sideBar.children[1].insertBefore(li[unsortArr.indexOf(sortArr[i])], sideBar.children[1].children[i]);
        }
    }
}

function remove(selector, sideBar) {
    let thisHeading = sideBar.querySelector(`[title="${selector}"]`);
    if (!thisHeading) {
        thisHeading = sideBar.querySelector(`[title="${selector} "]`);
    }
    if (thisHeading) {
        thisHeading = thisHeading.parentElement.parentElement;
        thisHeading.parentElement.removeChild(thisHeading);
    } else if (sideBar) {
        alert(`Error removing "${selector}"! Check if it's written correctly.`);
    }
}

function replace(selector, replace, sideBar) {
    let thisHeading = sideBar.querySelector(`[title="${selector}"]`);
    if (!thisHeading) {
        thisHeading = sideBar.querySelector(`[title="${selector} "]`);
    }
    if (sideBar && !thisHeading) {
        alert(`Error replacing "${selector}"! Check if it's written correctly.`);
    } else if (thisHeading.parentElement.parentElement.className.startsWith('type_course depth_3 i')) {
        thisHeading.children[1].innerHTML = replace;
    } else if (thisHeading.parentElement.parentElement.className.startsWith('type_course depth_3 c')) {
        thisHeading.innerHTML = replace;
    }
}

if (window.location.pathname == '/user/preferences.php') {
    let div = document.createElement('div');
    div.className = 'span4 preferences-group';

    let h3 = document.createElement('h3');
    h3.innerHTML = 'Clean Moodle';
    div.appendChild(h3);

    let ul = document.createElement('ul'),
        li = document.createElement('li');
    div.appendChild(ul);
    ul.appendChild(li);

    let a = document.createElement('a');
    a.href = 'https://moodle.ksasz.ch/cleanMoodle';
    a.setAttribute('target', '_blank');
    li.appendChild(a);

    let img = document.createElement('img');
    img.className = 'icon navicon';
    img.setAttribute('aria-hidden', true);
    img.setAttribute('alt', '');
    img.src = 'https://moodle.ksasz.ch/theme/image.php/clean/core/1587679874/i/navigationitem';
    a.appendChild(img);

    let settings = document.createTextNode('Settings');
    a.appendChild(settings);

    document.querySelectorAll('.span12.preferences-groups > .row-fluid')[0].appendChild(div);
}

if (window.location.pathname == '/cleanMoodle') {
    setup();
}
const hr = () => {
    return document.createElement('hr');
};

function setup() {
    if (location.protocol !== "https:") {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
    document.title = 'Clean Moodle Setup';

    let icon = document.createElement('link');
    icon.setAttribute('rel', 'shortcut icon');
    icon.href = 'https://moodle.ksasz.ch/theme/image.php/clean/theme/1587679874/favicon';
    document.head.appendChild(icon);
    while (document.body.lastChild) {
        document.body.removeChild(document.body.lastChild);
    }
    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type', 'text/css');
    style.href = 'https://moodle.ksasz.ch/theme/styles.php/clean/1587679874_1557394291/all';
    document.head.appendChild(style);
    fetch('https://moodle.ksasz.ch/')
        .then(e => {
            return e.text();
        })
        .then(e => {
            let response = new DOMParser().parseFromString(e, 'text/html'),
                login = response.getElementById('login');
            if (login) {
                window.confirm('You are logged out\nLogin, return and reload page');
                window.open('https://moodle.ksasz.ch/login/index.php', '_blank');
            } else {

                let sidebar = response.getElementById('block-region-side-pre'),
                    content = response.getElementById('region-main');

                while (content.getElementsByClassName('section img-text')[0].lastChild) {
                    content.getElementsByClassName('section img-text')[0].removeChild(content.getElementsByClassName('section img-text')[0].lastChild);
                }

                let removeLi = document.createElement('li'),
                    removeButton = document.createElement('button'),
                    clearRemoveButton = document.createElement('button'),

                    replaceLi = document.createElement('li'),
                    replaceButton = document.createElement('button'),
                    clearReplaceButton = document.createElement('button');


                removeLi.appendChild(hr());

                removeButton.innerHTML = 'Add remover';
                removeButton.addEventListener('click', () => {
                    addRemover();
                });
                removeLi.appendChild(removeButton);

                clearRemoveButton.innerHTML = 'Clear removers';
                clearRemoveButton.addEventListener('click', () => {
                    clearRemove();
                });
                removeLi.appendChild(clearRemoveButton);

                content.getElementsByClassName('section img-text')[0].appendChild(removeLi);


                replaceLi.appendChild(hr());

                replaceButton.innerHTML = 'Add replacer';
                replaceButton.addEventListener('click', () => {
                    addReplacer();
                });
                replaceLi.appendChild(replaceButton);

                clearReplaceButton.innerHTML = 'Clear replacers';
                clearReplaceButton.addEventListener('click', () => {
                    clearReplace();
                });
                replaceLi.appendChild(clearReplaceButton);

                content.getElementsByClassName('section img-text')[0].appendChild(replaceLi);

                content.getElementsByClassName('section img-text')[0].style.listStyleType = 'none';

                document.body.appendChild(content);

                sidebar.removeChild(sidebar.getElementsByClassName('block_calendar_month  block hidden')[0]);
                document.body.appendChild(sidebar);

                sort(true);
                return content;
            }
        })
        .then(a => {
            let removeArr = GM_getValue('remove'),
                removeButtonsLi = document.createElement('li');
            removeButtonsLi.appendChild(hr());
            for (let i = 0; i < removeArr.length; i++) {
                let removeButton = document.createElement('button');
                removeButton.innerHTML = 'Stop removing "' + removeArr[i] + '"';
                removeButton.addEventListener('click', e => {
                    removeRemover(e);
                });
                removeButton.id = encodeURI(removeArr[i]);
                removeButton.style.display = 'block';
                removeButtonsLi.appendChild(removeButton);
            }

            let replaceArr = GM_getValue('replace'),
                replaceButtonsLi = document.createElement('li');
            replaceButtonsLi.appendChild(hr());
            for (let i = 0; i < replaceArr.length; i++) {
                let replaceButton = document.createElement('button');
                replaceButton.innerHTML = 'Stop renaming "' + replaceArr[i][0] + '" to "' + replaceArr[i][1] + '"';
                replaceButton.addEventListener('click', e => {
                    removeReplacer(e);
                });
                replaceButton.id = encodeURI(replaceArr[i][0]);
                replaceButton.style.display = 'block';
                replaceButtonsLi.appendChild(replaceButton);
            }



            a.getElementsByClassName('section img-text')[0].appendChild(removeButtonsLi);
            a.getElementsByClassName('section img-text')[0].appendChild(replaceButtonsLi);
        });
}

function removeRemover(e) {
    let removeArr = GM_getValue('remove'),
        pos = removeArr.indexOf(decodeURI(e.target.id));
    removeArr.splice(pos, 1);
    GM_setValue('remove', removeArr);
    redo();
}

function removeReplacer(e) {
    let replaceArr = GM_getValue('replace'),
        pos;
    for (let i = 0; i < replaceArr.length; i++) {
        if (replaceArr[i][0] == decodeURI(e.target.id)) {
            pos = i;
        }
    }
    replaceArr.splice(pos, 1);
    GM_setValue('replace', replaceArr);
    redo();
}

function addRemover() {
    let remove = prompt('Name of link to be removed', 'Allgemeine Informationen');

    if (!(remove == null || remove == '') && (document.getElementsByClassName('type_system depth_2 contains_branch')[0].querySelector('a[title="' + remove + '"]') || document.getElementsByClassName('type_system depth_2 contains_branch')[0].querySelector('a[title="' + remove + ' "]'))) {
        let removeArr = GM_getValue('remove');
        removeArr.push(remove);
        removeArr.sort();
        GM_setValue('remove', removeArr);
        redo();
    } else if (!(remove == null || remove == '')) {
        alert('Unable to find "' + remove + '"');
        addRemover();
    }
}

function addReplacer() {
    let replace = prompt('Name of link to be replaced', 'Allgemeine Informationen'),
        replaceWith;
    if ((!(replace == null || replace == '')) && (document.getElementsByClassName('type_system depth_2 contains_branch')[0].querySelector('a[title="' + replace + '"]') || document.getElementsByClassName('type_system depth_2 contains_branch')[0].querySelector('a[title="' + replace + ' "]'))) {
        replaceWith = prompt('Name to be replaced with', 'Allgemeine Infos');

        if (!(replaceWith == null || replaceWith == '')) {
            let replaceArr = GM_getValue('replace');

            replaceArr.push([replace, replaceWith]);
            replaceArr.sort((a, b) => {
                if (a[0] < b[0]) {
                    return -1;
                } else if (a[0] > b[0]) {
                    return 1;
                } else {
                    return 0;
                }
            });
            GM_setValue('replace', replaceArr);
            redo();

        }
    } else if (!(replace == null || replace == '')) {
        alert('Unable to find "' + replace + '"');
        addReplacer();
    }
}

function clearRemove() {
    if (window.confirm('Are you sure?\nThis action is irreversible')) {
        GM_setValue('remove', []);
        redo();
    }
}

function clearReplace() {
    if (window.confirm('Are you sure?\nThis action is irreversible')) {
        GM_setValue('replace', []);
        redo();
    }
}

function redo() {
    location.reload();
}
