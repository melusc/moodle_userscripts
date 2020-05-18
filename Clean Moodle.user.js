// ===UserScript===
// @name        Clean Moodle
// @namespace   https://github.com/melusc/lusc
// @version     2020.05.15a
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
// @grant       GM_addValueChangeListener
// ===/UserScript===
'use strict';

/*
 * Click on name in top right and click on preferences, there click on Clean Moodle -> settings
 *
 * Or go directly to https://moodle.ksasz.ch/cleanMoodle
 */

addEventListener('cleanMoodle', () => {
    sort(true); // set to false if you don't want it to sort the sidebar
});

function sort(e, sidebar) {
    if (!sidebar) {
        sidebar = document.getElementsByClassName('type_system depth_2 contains_branch')[0];
    }
    if (sidebar) {
        runner(sidebar);
        if (e) {
            const li = Array.from(sidebar.children[1].getElementsByClassName('type_course depth_3'));

            li.sort((a, b) => {
                a = a.textContent;
                b = b.textContent;
                if (a < b) return -1;
                else if (a > b) return 1;
                else return 0;
            });
            for (let i = 0; i < li.length; i++) {
                sidebar.children[1].appendChild(li[i]);
            }
        }
        console.log('Clean moodle version ' + GM_info.script.version + ' by lusc');
    }
}

function runner(sidebar) {
    let removeArr = GM_getValue('remove'),
        replaceArr = GM_getValue('replace');
    for (let i = 0; i < removeArr.length; i++) {
        remove(removeArr[i], sidebar);
    }
    for (let i = 0; i < replaceArr.length; i++) {
        replace(replaceArr[i][0], replaceArr[i][1], sidebar);
    }
}


function remove(selector, sidebar) {
    let thisHeading = sidebar.querySelector(`[title="${selector}"]`);
    if (!thisHeading) {
        thisHeading = sidebar.querySelector(`[title="${selector} "]`);
    }
    if (thisHeading) {
        thisHeading = thisHeading.parentElement.parentElement;
        if (thisHeading && !thisHeading.className.match(/\bcurrent_branch\b/)) {
            thisHeading.parentElement.removeChild(thisHeading);
        }
    } else {
        alert(`Error removing "${selector}"! Check if it's written correctly.`);
    }
}

function replace(selector, replace, sidebar) {
    let thisHeading = sidebar.querySelector(`[title="${selector}"]`);
    if (!thisHeading) {
        thisHeading = sidebar.querySelector(`[title="${selector} "]`);
    }
    if (thisHeading) {
        if (thisHeading.parentElement.parentElement.className.startsWith('type_course depth_3 i')) {
            thisHeading.children[1].innerHTML = replace;
        } else if (thisHeading.parentElement.parentElement.className.startsWith('type_course depth_3 c')) {
            thisHeading.innerHTML = replace;
        }
    } else {
        alert(`Error replacing "${selector}"! Check if it's written correctly.`);
    }
}
if (location.pathname.toLowerCase() !== '/cleanmoodle') {
    dispatchEvent(new Event('cleanMoodle'));
    GM_addValueChangeListener('remove', (a, b, c, remote) => {
        if (remote) {
            fetch('/')
                .then(e => {
                    return e.text();
                })
                .then(e => {
                    e = new DOMParser().parseFromString(e, 'text/html');
                    document.getElementById('inst4').outerHTML = e.getElementById('inst4').outerHTML;
                    dispatchEvent(new Event('cleanMoodle'));
                    dispatchEvent(new Event('customIcons'));
                });
        }
    });
    GM_addValueChangeListener('replace', (a, b, c, remote) => {
        if (remote) {
            fetch('/')
                .then(e => {
                    return e.text();
                })
                .then(e => {
                    e = new DOMParser().parseFromString(e, 'text/html');
                    document.getElementById('inst4').outerHTML = e.getElementById('inst4').outerHTML;
                    dispatchEvent(new Event('cleanMoodle'));
                    dispatchEvent(new Event('customIcons'));
                });
        }
    });
}

if (location.pathname == '/user/preferences.php') {
    let element = document.getElementById('maincontent').parentElement.children[2].children[0].cloneNode(true),
        temp = element.getElementsByClassName('card-text')[0];
    element.getElementsByTagName('h4')[0].innerHTML = 'Clean Moodle';

    while (temp.children.length != 1) temp.removeChild(temp.lastChild);
    let a = temp.children[0].children[0];
    a.href = 'https://moodle.ksasz.ch/cleanMoodle/';
    a.setAttribute('target', '_blank');
    a.innerHTML = 'Settings';

    document.getElementById('maincontent').parentElement.children[2].appendChild(element);
}

if (location.pathname.toLowerCase().startsWith('/cleanmoodle')) {
    history.replaceState({}, '', '/cleanMoodle/');
    setup(true);
}
const hr = () => {
    return c('hr');
};

function setup(newPage) {
    if (location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
    document.title = 'Clean Moodle Setup';

    let icon = c('link');
    icon.setAttribute('rel', 'shortcut icon');
    icon.href = 'https://moodle.ksasz.ch/theme/image.php/classic/theme/1588340020/favicon';
    document.head.appendChild(icon);

    if (newPage) {
        while (document.body.lastChild) {
            document.body.removeChild(document.body.lastChild);
        }
    }

    let style = c('link');
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
            if (!newPage) {
                while (document.body.lastChild) {
                    document.body.removeChild(document.body.lastChild);
                }
            }
            let response = new DOMParser().parseFromString(e, 'text/html'),
                login = response.getElementById('login');
            if (login) {
                confirm('You are logged out\nLogin, return and reload page');
                open('https://moodle.ksasz.ch/login/index.php', '_blank');
                return false;
            } else {

                let sidebar = response.getElementById('inst4'),
                    content = response.getElementById('region-main'),
                    x = content.getElementsByClassName('section img-text')[0];
                sort(true, sidebar.getElementsByClassName('type_system depth_2 contains_branch')[0]);

                while (x.lastChild) {
                    x.removeChild(x.lastChild);
                }

                let selectRemove = c('select'),
                    elements = sidebar.getElementsByClassName('type_system depth_2 contains_branch')[0].children[1].children,
                    defaultOptionRemove = c('option');
                selectRemove.id = 'selectRemove';
                defaultOptionRemove.setAttribute('selected', true);
                defaultOptionRemove.setAttribute('disabled', true);
                defaultOptionRemove.setAttribute('hidden', true);
                defaultOptionRemove.innerHTML = 'Pick element to be removed';
                selectRemove.appendChild(defaultOptionRemove);
                loop1:
                    for (let i = 0; i < elements.length; i++) {
                        let value = elements[i].getElementsByTagName('a')[0].title,
                            replaceArr = GM_getValue('replace');
                        loop2:
                            for (let i = 0; i < replaceArr.length; i++) {
                                if (value.trim() == replaceArr[i][0].trim()) continue loop1;
                            }
                        let option = c('option');
                        option.value = value;
                        option.innerHTML = value;
                        selectRemove.appendChild(option);
                    }
                let removeLi = c('li'),
                    removeButton = c('button'),
                    clearRemoveButton = c('button'),
                    removeH3 = c('h3'),

                    replaceLi = c('li'),
                    replaceButton = c('button'),
                    clearReplaceButton = c('button'),
                    replaceH3 = c('h3');


                removeLi.appendChild(hr());

                removeH3.innerHTML = 'Removers';
                removeLi.appendChild(removeH3);

                removeButton.innerHTML = 'Select';
                removeButton.addEventListener('click', () => {
                    addRemover();
                });
                removeButton.style.marginLeft = '5px';
                removeLi.appendChild(selectRemove);
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

                let selectReplace = c('select'),
                    defaultOptionReplace = c('option');
                selectReplace.id = 'selectReplace';
                defaultOptionReplace.setAttribute('selected', true);
                defaultOptionReplace.setAttribute('disabled', true);
                defaultOptionReplace.setAttribute('hidden', true);
                defaultOptionReplace.innerHTML = 'Pick element to be replaced';
                selectReplace.appendChild(defaultOptionReplace);
                loop1:
                    for (let i = 0; i < elements.length; i++) {
                        let option = c('option'),
                            value = elements[i].getElementsByTagName('a')[0].title,
                            replaceArr = GM_getValue('replace');
                        loop2:
                            for (let i = 0; i < replaceArr.length; i++) {
                                if (replaceArr[i][0].trim() == value.trim()) continue loop1;
                            }
                        option.value = value;
                        option.innerHTML = value;
                        selectReplace.appendChild(option);
                    }
                let input = c('input');
                input.placeholder = 'Replace with';
                input.id = 'inputReplace';
                input.style.display = 'block';
                input.style.marginTop = '5px';
                input.addEventListener('keyup', e => {
                    if (e.which === 13) addReplacer();
                });

                replaceButton.innerHTML = 'Select';
                replaceButton.addEventListener('click', addReplacer);
                replaceLi.appendChild(selectReplace);
                replaceLi.appendChild(input);
                replaceLi.appendChild(replaceButton);

                clearReplaceButton.innerHTML = 'Clear all';
                clearReplaceButton.style.display = 'block';
                clearReplaceButton.style.color = 'red';
                clearReplaceButton.addEventListener('click', clearReplace);
                replaceLi.appendChild(clearReplaceButton);

                content.getElementsByClassName('section img-text')[0].appendChild(replaceLi);

                content.getElementsByClassName('section img-text')[0].style.listStyleType = 'none';

                document.body.appendChild(content);


                let aside = response.getElementById('block-region-side-pre').cloneNode(false);
                aside.appendChild(sidebar);

                let section = response.querySelector('section.hidden-print').cloneNode(false);
                section.appendChild(aside);

                let div = c('div');
                div.className = 'columnleft blockcolumn  has-blocks ';
                div.appendChild(section);

                let div5 = response.getElementById('region-main-box').cloneNode(false);
                div5.appendChild(content);

                let div2 = response.getElementById('page-content').cloneNode(false);
                div2.appendChild(div5);
                div2.appendChild(div);

                let div3 = response.getElementById('page').cloneNode(false);
                div3.appendChild(div2);

                let div4 = response.getElementById('page-wrapper').cloneNode(false);
                div4.appendChild(div3);

                document.body.appendChild(div4);


                if (content) {
                    let removeArr = GM_getValue('remove'),
                        removeButtonsLi = c('li');
                    removeButtonsLi.appendChild(hr());
                    for (let i = 0; i < removeArr.length; i++) {
                        let removeButton = c('button');
                        removeButton.innerHTML = 'Stop removing "' + removeArr[i] + '"';
                        removeButton.addEventListener('click', removeRemover);
                        removeButton.dataset.id = removeArr[i];
                        removeButton.style.display = 'block';
                        removeButtonsLi.appendChild(removeButton);
                    }

                    let replaceArr = GM_getValue('replace'),
                        replaceButtonsLi = c('li');
                    replaceButtonsLi.appendChild(hr());
                    for (let i = 0; i < replaceArr.length; i++) {
                        let replaceButton = c('button');
                        replaceButton.innerHTML = 'Stop renaming "' + replaceArr[i][0] + '" to "' + replaceArr[i][1] + '"';
                        replaceButton.addEventListener('click', removeReplacer);
                        replaceButton.dataset.id = replaceArr[i][0];
                        replaceButton.style.display = 'block';
                        replaceButtonsLi.appendChild(replaceButton);
                    }



                    content.getElementsByClassName('section img-text')[0].appendChild(removeButtonsLi);
                    content.getElementsByClassName('section img-text')[0].appendChild(replaceButtonsLi);
                }
            }
        });
}

function removeRemover(e) {
    let removeArr = GM_getValue('remove'),
        pos = removeArr.indexOf(e.target.dataset.id);
    removeArr.splice(pos, 1);
    GM_setValue('remove', removeArr);
    redo();
}

function removeReplacer(e) {
    let replaceArr = GM_getValue('replace'),
        pos;
    for (let i = 0; i < replaceArr.length; i++) {
        if (replaceArr[i][0] === e.target.dataset.id) {
            pos = i;
        }
    }
    replaceArr.splice(pos, 1);
    GM_setValue('replace', replaceArr);
    redo();
}

function addRemover() {
    let remove = document.getElementById('selectRemove').value,
        x = document.getElementsByClassName('type_system depth_2 contains_branch')[0];
    if (remove != 'Pick element to be removed' && (x.querySelector(`a[title="${remove}"]`) || x.querySelector(`a[title="${remove} "]`))) {
        let replaceArr = GM_getValue('replace');
        for (let i = 0; i < replaceArr.length; i++) {
            if (replaceArr[i][0].trim() == remove.trim()) {
                alert('Error: Already used');
                return;
            }
        }
        let removeArr = GM_getValue('remove');
        removeArr.push(remove);
        removeArr.sort();
        GM_setValue('remove', removeArr);
        redo();
    } else if (remove != 'Pick element to be removed') {
        alert('Unable to find "' + remove + '"');
    }
}

function addReplacer() {
    let replace = document.getElementById('selectReplace').value,
        replaceWith = document.getElementById('inputReplace').value,
        x = document.getElementsByClassName('type_system depth_2 contains_branch')[0];
    if (replace != 'Pick element to be replaced' && (x.querySelector(`a[title="${remove}"]`) || x.querySelector(`a[title="${remove} "]`))) {

        if (replaceWith != '') {
            let replaceArr = GM_getValue('replace');

            replaceArr.push([replace, replaceWith]);
            replaceArr.sort((a, b) => {
                if (a[0] < b[0]) return -1;
                else if (a[0] > b[0]) return 1;
                else return 0;
            });
            GM_setValue('replace', replaceArr);
            redo();

        }
    } else if (replace != '' && replace != 'Pick element to be replaced') {
        alert('Unable to find "' + replace + '"');
    }
}

function clearRemove() {
    if (prompt('Are you sure?\nThis action is irreversible\nTo confirm type confirm').toLowerCase() === 'confirm') {
        GM_setValue('remove', []);
        redo();
    }
}

function clearReplace() {
    if (prompt('Are you sure?\nThis action is irreversible\nTo confirm type confirm').toLowerCase() === 'confirm') {
        GM_setValue('replace', []);
        redo();
    }
}

function redo() {
    setup(false);
}

function c(e) {
    return document.createElement(e);
}