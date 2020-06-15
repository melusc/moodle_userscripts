// ===UserScript===
// @name        Clean Moodle
// @namespace   https://github.com/melusc/lusc
// @version     2020.06.15a
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
/* jshint esversion: 10 */
'use strict';
/* testing2 */
/*
 * Click on name in top right and click on preferences, there click on Clean Moodle -> settings
 *
 * Or go directly to https://moodle.ksasz.ch/cleanMoodle/
 */

addEventListener('cleanMoodle', () => {
    sort(true); // set to false if you don't want it to sort the sidebar
});

async function sort(e, sidebar) {
    if (!sidebar) {
        sidebar = document.getElementsByClassName('type_system depth_2 contains_branch')[0];
    }
    if (sidebar) {
        const removeArr = GM_getValue('remove'),
              replaceArr = GM_getValue('replace');
        for (let i = 0; i < removeArr.length; i++) {
            remove(removeArr[i], sidebar);
        }
        for (let i = 0; i < replaceArr.length; i++) {
            replace(replaceArr[i][0], replaceArr[i][1], sidebar);
        }
        if (e) {
            const li = [...sidebar.children[1].getElementsByClassName('type_course depth_3')];

            li.sort((a, b) => {
                a = a.textContent.toLowerCase();
                b = b.textContent.toLowerCase();
                if (a < b) return -1;
                else if (a > b) return 1;
                else return 0;
            });
            for (let i = 0; i < li.length; i++) {
                sidebar.children[1].appendChild(li[i]);
            }
        }
        console.log(`%c[%cClean Moodle%c] %cVersion %c${GM_info.script.version} %cby %clusc`, 'color: #fe4c4c', 'color:initial', 'color: #fe4c4c', 'color:initial','color: #fe4c4c', 'color:initial', 'color:#58e');
    }
}

async function remove(selector, sidebar) {
    let thisHeading = sidebar.querySelector(`[title="${selector}"]`);
    if (!thisHeading) {
        thisHeading = sidebar.querySelector(`[title="${selector} "]`);
    }
    if (thisHeading) {
        thisHeading = thisHeading.closest('li');
        if (thisHeading && !thisHeading.classList.contains('current_branch')) {
            thisHeading.remove();
        }
    } else {
        alert(`Error removing "${selector}"! Check if it's written correctly.`);
    }
}

async function replace(selector, replace, sidebar) {
    let thisHeading = sidebar.querySelector(`[title="${selector}"]`);
    if (!thisHeading) {
        thisHeading = sidebar.querySelector(`[title="${selector} "]`);
    }
    if (thisHeading) {
        if (thisHeading.closest('li').classList.contains('item_with_icon')) {
            thisHeading.children[1].innerHTML = replace;
        } else if (thisHeading.closest('li').classList.contains('current_branch')) {
            thisHeading.innerHTML = replace;
        }
    } else {
        alert(`Error replacing "${selector}"! Check if it's written correctly.`);
    }
}
if (!location.pathname.toLowerCase().startsWith('/cleanmoodle')) {
    dispatchEvent(new Event('cleanMoodle'));
    GM_addValueChangeListener('remove', (a, b, c, remote) => {
        if (remote) {
            fetch(location)
                .then(e => e.text())
                .then(e => {
                e = new DOMParser().parseFromString(e, 'text/html');
                document.getElementById('inst4').outerHTML = e.getElementById('inst4').outerHTML;
                dispatchEvent(new Event('cleanMoodle'));
                dispatchEvent(new Event('customIcons'));
                dispatchEvent(new Event('moreSidebarLinks'));
            });
        }
    });
    GM_addValueChangeListener('replace', (a, b, c, remote) => {
        if (remote) {
            fetch('/')
                .then(e => e.text())
                .then(e => {
                e = new DOMParser().parseFromString(e, 'text/html');
                document.getElementById('inst4').outerHTML = e.getElementById('inst4').outerHTML;
                dispatchEvent(new Event('cleanMoodle'));
                dispatchEvent(new Event('customIcons'));
            });
        }
    });
}

if (location.pathname === '/user/preferences.php') {
    const element = document.getElementById('maincontent').parentElement.children[2].children[0].cloneNode(true),
          temp = element.getElementsByClassName('card-text')[0];
    element.getElementsByTagName('h4')[0].innerHTML = 'Clean Moodle';

    while (temp.children.length != 1) temp.lastChild.remove();
    const a = temp.children[0].children[0];
    a.href = 'https://moodle.ksasz.ch/cleanMoodle/';
    a.setAttribute('target', '_blank');
    a.innerHTML = 'Settings';

    document.getElementById('maincontent').parentElement.children[2].appendChild(element);
}

if (location.pathname.toLowerCase().startsWith('/cleanmoodle')) {
    history.replaceState({}, '', '/cleanMoodle/');
    setup(true);
}

function setup(newPage) {
    if (location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
    document.title = 'Clean Moodle Setup';

    const icon = c('link');
    icon.setAttribute('rel', 'shortcut icon');
    icon.href = 'https://moodle.ksasz.ch/theme/image.php/classic/theme/1588340020/favicon';
    document.head.appendChild(icon);

    if (newPage) {
        while (document.body.lastChild) {
            document.body.lastChild.remove();
        }
    }

    const style = c('link');
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
    fetch('/')
        .then(e => e.text())
        .then(e => {
        if (!newPage) {
            while (document.body.lastChild) {
                document.body.lastChild.remove();
            }
        }
        const response = new DOMParser().parseFromString(e, 'text/html'),
              login = response.getElementById('login');
        if (login) {
            confirm('You are logged out\nLogin, return and reload page');
            open('https://moodle.ksasz.ch/login/index.php', '_blank');
            return false;
        } else {

            const sidebar = response.getElementById('inst4'),
                  content = response.getElementById('region-main'),
                  x = content.getElementsByClassName('section img-text')[0];
            sort(true, sidebar.getElementsByClassName('type_system depth_2 contains_branch')[0]);

            while (x.lastChild) {
                x.lastChild.remove();
            }

            const selectRemove = c('select'),
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
                const value = elements[i].getElementsByTagName('a')[0].title,
                      replaceArr = GM_getValue('replace');
                loop2:
                for (let i = 0; i < replaceArr.length; i++) {
                    if (value.trim() == replaceArr[i][0].trim()) continue loop1;
                }
                const option = c('option');
                option.value = value;
                option.innerHTML = value;
                selectRemove.appendChild(option);
            }
            const removeLi = c('li'),
                  removeButton = c('button'),
                  clearRemoveButton = c('button'),
                  removeH3 = c('h3'),

                  replaceLi = c('li'),
                  replaceButton = c('button'),
                  clearReplaceButton = c('button'),
                  replaceH3 = c('h3');


            removeLi.appendChild(c('hr'));

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


            replaceLi.appendChild(c('hr'));

            replaceH3.innerHTML = 'Replacers';
            replaceLi.appendChild(replaceH3);

            const selectReplace = c('select'),
                  defaultOptionReplace = c('option');
            selectReplace.id = 'selectReplace';
            defaultOptionReplace.setAttribute('selected', true);
            defaultOptionReplace.setAttribute('disabled', true);
            defaultOptionReplace.setAttribute('hidden', true);
            defaultOptionReplace.innerHTML = 'Pick element to be replaced';
            selectReplace.appendChild(defaultOptionReplace);
            loop1:
            for (let i = 0; i < elements.length; i++) {
                const option = c('option'),
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
            const input = c('input');
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

            const div5 = response.getElementById('region-main-box').cloneNode(false);
            div5.appendChild(content);

            let element = response.getElementById('block-region-side-pre');
            element.appendChild(sidebar);
            let tree = element.cloneNode(true);
            while (element.parentElement.nodeName !== 'BODY') {
                let temp = tree.cloneNode(true);
                tree = element.parentElement.cloneNode(false);
                tree.appendChild(temp);
                element = element.parentElement;
            }
            document.body.appendChild(tree);
            document.getElementById('page-content').appendChild(div5);

            let aside = document.getElementById('inst4').parentElement;
            while (aside.children.length !== 1) {
                aside.firstChild.remove();
            }

            if (content) {
                const removeArr = GM_getValue('remove'),
                      removeButtonsLi = c('li');
                removeButtonsLi.appendChild(c('hr'));
                for (let i = 0; i < removeArr.length; i++) {
                    const removeButton = c('button');
                    removeButton.innerHTML = 'Stop removing "' + removeArr[i] + '"';
                    removeButton.addEventListener('click', removeRemover);
                    removeButton.dataset.id = removeArr[i];
                    removeButton.style.display = 'block';
                    removeButtonsLi.appendChild(removeButton);
                }

                const replaceArr = GM_getValue('replace'),
                      replaceButtonsLi = c('li');
                replaceButtonsLi.appendChild(c('hr'));
                for (let i = 0; i < replaceArr.length; i++) {
                    const replaceButton = c('button');
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
    const removeArr = GM_getValue('remove'),
          pos = removeArr.indexOf(e.target.dataset.id);
    removeArr.splice(pos, 1);
    GM_setValue('remove', removeArr);
    redo();
}

function removeReplacer(e) {
    const replaceArr = GM_getValue('replace');
    let pos;
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
    const remove = document.getElementById('selectRemove').value,
          x = document.getElementsByClassName('type_system depth_2 contains_branch')[0];
    if (remove != 'Pick element to be removed') {
        const replaceArr = GM_getValue('replace'),
              removeArr = GM_getValue('remove');
        removeArr.push(remove);
        removeArr.sort();
        GM_setValue('remove', removeArr);
        redo();
    }
}

function addReplacer() {
    const replace = document.getElementById('selectReplace').value,
          replaceWith = document.getElementById('inputReplace').value,
          x = document.getElementsByClassName('type_system depth_2 contains_branch')[0];
    if (replace != 'Pick element to be replaced' && replaceWith !== '') {
        const replaceArr = GM_getValue('replace');

        replaceArr.push([replace, replaceWith]);
        replaceArr.sort((a, b) => {
            if (a[0] < b[0]) return -1;
            else if (a[0] > b[0]) return 1;
            else return 0;
        });
        GM_setValue('replace', replaceArr);
        redo();
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
Element.prototype.remove = function(){
    this.parentElement.removeChild(this);
};