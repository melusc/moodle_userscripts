// ===UserScript===
// @name        Clean Moodle
// @namespace   https://github.com/melusc/lusc
// @version     2020.05.10a
// @include     *://moodle.ksasz.ch/*
// @exclude     *://moodle.ksasz.ch/info*
// @exclude     *://moodle.ksasz.ch/lib*
// @Author      lusc
// @description Improving the looks of Moodle
// @downloadURL https://github.com/melusc/lusc/raw/master/Clean%20Moodle.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/Clean%20Moodle.user.js
// @run-at      document-end
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// ===/UserScript===
'use strict';
/*
 * Click on name in top right and click on preferences, there click on Clean Moodle -> settings
 *
 * Or go directly to https://moodle.ksasz.ch/cleanMoodle
 */

addEventListener('cleanMoodle',()=>{
    let sideBar = document.getElementsByClassName('type_system depth_2 contains_branch')[0];
    sort(true); // set to false if you don't want it to sort the sidebar

    function runner() {
        let removeArr = GM_getValue('remove'),
            replaceArr = GM_getValue('replace');
        for (let i = 0; i < removeArr.length; i++) {
            remove(removeArr[i], sideBar);
        }
        for (let i = 0; i < replaceArr.length; i++) {
            replace(replaceArr[i][0], replaceArr[i][1], sideBar);
        }
    }
    function sort(e) {
        runner();
        if (e) {
            let unsortArr = [],
                li = Array.from(sideBar.children[1].getElementsByClassName('type_course depth_3'));

            for (let i = 0; i < li.length; i++) {
                unsortArr.push(li[i].innerText);
            }
            let sortArr = unsortArr.slice().sort();

            for (let i = 0; i < unsortArr.length; i++) {
                sideBar.children[1].insertBefore(li[unsortArr.indexOf(sortArr[i])], sideBar.children[1].children[i]);
            }
        }
        console.log('Clean moodle version ' + GM_info.script.version + ' by lusc')
    }

    function remove(selector) {
        let thisHeading;
        try{
            thisHeading = sideBar.querySelector(`[title="${selector}"]`);
            if (!thisHeading){
                thisHeading = sideBar.querySelector(`[title="${selector} "]`);
            }
            if (!thisHeading) throw new Error('Could not find "' + selector + '"')
            thisHeading = thisHeading.parentElement.parentElement;
            if (thisHeading && !thisHeading.className.match(/\bcurrent_branch\b/)) {
                thisHeading.parentElement.removeChild(thisHeading);
            }
        }
        catch (e) {
            console.log(e)
            alert(`Error removing "${selector}"! Check if it's written correctly.`);
        }
    }

    function replace(selector, replace) {
        let thisHeading;
        try {
            thisHeading = sideBar.querySelector(`[title="${selector}"]`);
            if (!thisHeading){
                thisHeading = sideBar.querySelector(`[title="${selector} "]`);
            }
            if (!thisHeading) throw new Error('Could not find "' + selector + '"');
            if (thisHeading.parentElement.parentElement.className.startsWith('type_course depth_3 i')) {
                thisHeading.children[1].innerHTML = replace;
            } else if (thisHeading.parentElement.parentElement.className.startsWith('type_course depth_3 c')) {
                thisHeading.innerHTML = replace;
            }
        }
        catch(e) {
            console.log(e)
            alert(`Error replacing "${selector}"! Check if it's written correctly.`);
        }
    }
});
if (window.location.pathname != '/cleanMoodle') {
    dispatchEvent(new Event('cleanMoodle'));
}

if (window.location.pathname == '/user/preferences.php') {
    let div = document.createElement('div');
    div.className = 'col-md-4';

    let div2 = document.createElement('div');
    div2.className = 'card mb-3';
    div.appendChild(div2);

    let div5 = document.createElement('div');
    div5.className = 'card-body';
    div2.appendChild(div5);

    let h4 = document.createElement('h4');
    h4.className = 'card-title';
    h4.innerHTML = 'Clean Moodle';
    div5.appendChild(h4);

    let div3 = document.createElement('div');
    div3.className = 'card-text';
    div5.appendChild(div3);

    let div4 = document.createElement('div');
    div3.appendChild(div4);

    let a = document.createElement('a');
    a.href = 'https://moodle.ksasz.ch/cleanMoodle';
    a.setAttribute('target', '_blank');
    a.innerHTML = 'Settings';
    div4.appendChild(a);

    document.getElementById('maincontent').parentElement.children[2].appendChild(div);
}

if (window.location.pathname === '/cleanMoodle') {
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
    icon.href = 'https://moodle.ksasz.ch/theme/image.php/classic/theme/1588340020/favicon';
    document.head.appendChild(icon);

    while (document.body.lastChild) {
        document.body.removeChild(document.body.lastChild);
    }

    let style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type', 'text/css');
    style.href = 'https://moodle.ksasz.ch/theme/styles.php/classic/1588340020_1588339031/all';
    document.head.appendChild(style);

    GM_addStyle(`
        button{
            background-color:transparent;
            border: 1px solid white;
            border-radius: 0.25rem;
            color:white;
            margin-top: 10px;
        }
    `);
    fetch('https://moodle.ksasz.ch/')
        .then(e => {
        return e.text();
    })
        .then(e => {
        let response = new DOMParser().parseFromString(e, 'text/html'),
            login = response.getElementById('login');
        if (login) {
            confirm('You are logged out\nLogin, return and reload page');
            window.open('https://moodle.ksasz.ch/login/index.php', '_blank');
            return false;
        } else {

            let sidebar = response.getElementById('inst4'),
                content = response.getElementById('region-main');

            while (content.getElementsByClassName('section img-text')[0].lastChild) {
                content.getElementsByClassName('section img-text')[0].removeChild(content.getElementsByClassName('section img-text')[0].lastChild);
            }

            let removeLi = document.createElement('li'),
                removeButton = document.createElement('button'),
                clearRemoveButton = document.createElement('button'),
                removeH3 = document.createElement('h3'),

                replaceLi = document.createElement('li'),
                replaceButton = document.createElement('button'),
                clearReplaceButton = document.createElement('button'),
                replaceH3 = document.createElement('h3');


            removeLi.appendChild(hr());

            removeH3.innerHTML = 'Removers';
            removeLi.appendChild(removeH3);

            removeButton.innerHTML = 'Add remover';
            removeButton.style.display = 'block';
            removeButton.addEventListener('click', () => {
                addRemover();
            });
            removeLi.appendChild(removeButton);

            clearRemoveButton.innerHTML = 'Clear all';
            clearRemoveButton.style.display = 'block';
            clearRemoveButton.style.color = 'red';
            clearRemoveButton.addEventListener('click', () => {
                clearRemove();
            });
            removeLi.appendChild(clearRemoveButton);

            content.getElementsByClassName('section img-text')[0].appendChild(removeLi);


            replaceLi.appendChild(hr());

            replaceH3.innerHTML = 'Replacers';
            replaceLi.appendChild(replaceH3);

            replaceButton.innerHTML = 'Add replacer';
            replaceButton.style.display = 'block';
            replaceButton.addEventListener('click', addReplacer);
            replaceLi.appendChild(replaceButton);

            clearReplaceButton.innerHTML = 'Clear all';
            clearReplaceButton.style.display = 'block';
            clearReplaceButton.style.color = 'red';
            clearReplaceButton.addEventListener('click', clearReplace);
            replaceLi.appendChild(clearReplaceButton);

            content.getElementsByClassName('section img-text')[0].appendChild(replaceLi);

            content.getElementsByClassName('section img-text')[0].style.listStyleType = 'none';

            document.body.appendChild(content);

            let aside = document.createElement('aside');
            aside.id = 'block-region-side-pre';
            aside.className = 'block-region';
            aside.dataset.blockregion = 'side-pre';
            aside.dataset.droptarget = 1;
            aside.appendChild(sidebar);

            let section = document.createElement('section');
            section.dataset.region = 'blocks-column';
            section.className = 'hidden-print';
            section.appendChild(aside);

            let div = document.createElement('div');
            div.className = 'columnleft blockcolumn  has-blocks ';
            div.appendChild(section);

            let div5 = document.createElement('div');
            div5.id = 'region-main-box';
            div5.className = 'region-main';
            div5.appendChild(content);

            let div2 = document.createElement('div');
            div2.id = 'page-content';
            div2.className = 'row  blocks-pre   blocks-post  d-print-block';
            div2.appendChild(div5);
            div2.appendChild(div);

            let div3 = document.createElement('div');
            div3.id = 'page';
            div3.className = 'container-fluid d-print-block';
            div3.appendChild(div2);

            let div4 = document.createElement('div');
            div4.id = 'page-wrapper';
            div4.className = 'd-print-block';
            div4.appendChild(div3);

            document.body.appendChild(div4);

            dispatchEvent(new Event('cleanMoodle'));
            return content;
        }
    })
        .then(a => {
        if (a) {
            let removeArr = GM_getValue('remove'),
                removeButtonsLi = document.createElement('li');
            removeButtonsLi.appendChild(hr());
            for (let i = 0; i < removeArr.length; i++) {
                let removeButton = document.createElement('button');
                removeButton.innerHTML = 'Stop removing "' + removeArr[i] + '"';
                removeButton.addEventListener('click', removeRemover);
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
                replaceButton.addEventListener('click', removeReplacer);
                replaceButton.id = encodeURI(replaceArr[i][0]);
                replaceButton.style.display = 'block';
                replaceButtonsLi.appendChild(replaceButton);
            }



            a.getElementsByClassName('section img-text')[0].appendChild(removeButtonsLi);
            a.getElementsByClassName('section img-text')[0].appendChild(replaceButtonsLi);
        }
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
    if (prompt('Are you sure?\nThis action is irreversible\nTo confirm type confirm').toLowerCase() == 'confirm') {
        GM_setValue('remove', []);
        redo();
    }
}

function clearReplace() {
    if (prompt('Are you sure?\nThis action is irreversible\nTo confirm type confirm').toLowerCase() == 'confirm') {
        GM_setValue('replace', []);
        redo();
    }
}

function redo() {
    location.reload();
}
