// ===UserScript===
// @name        Clean Moodle
// @namespace   https://github.com/melusc/lusc
// @version     2020.06.16a
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

/*
 * Click on name in top right and click on preferences, there click on Clean Moodle -> settings
 *
 * Or click on gear icon in the left navigation bar
 *
 * Or go directly to https://moodle.ksasz.ch/cleanMoodle/
 */

const lang = {
    console: [`%c[%cClean Moodle%c] %cVersion %c${GM_info.script.version} %cby %clusc`, 'color: #fe4c4c', 'color:initial', 'color: #fe4c4c', 'color:initial', 'color: #fe4c4c', 'color:initial', 'color:#58e'],
    error: `Error removing "{{{s}}}"! Check if it's written correctly.`,
    userPreferences: {
        anchor: 'Settings',
        title: 'Clean Moodle'
    },
    settings: {
        pageTitle: 'Clean Moodle Setup',
        loggedOut: 'You are logged out\nLogin, return and reload page',
        easterEgg: 'Haha, good one',
        title: 'Add replacer / remover',
        selectCourse: 'Select Course on left',
        input: 'Leave input empty to reset name',
        replace: 'replace',
        remove: 'remove',
        replaceText: 'Replace text',
        removeText: 'Remove selected',
        button: 'Save',
        sortTitle: 'Sorting',
        sortText: 'Sort alphabetically',
        noCourse: 'No course selected'
    }
},
      settings = {
          lineThrough: true,
          easterEgg: false
      };


addEventListener('cleanMoodle', start);

async function start(e) {
    const sidebar = document.getElementsByClassName('type_system depth_2 contains_branch')[0];

    if (sidebar) {
        const removeArr = GM_getValue('remove'),
              replaceArr = GM_getValue('replace');
        for (let i = 0; i < removeArr.length; i++) {
            remove(removeArr[i], sidebar);
        }
        for (let i = 0; i < replaceArr.length; i++) {
            replace(replaceArr[i][0], replaceArr[i][1], sidebar);
        }
        sort(sidebar);
        if (!e.detail || e.detail.newPage) {
            console.log.apply(console, lang.console);
        }
    }
}

async function remove(selector, sidebar) {
    let element = sidebar.querySelector(`[title="${selector}"]`);
    if (!element) {
        element = sidebar.querySelector(`[title="${selector} "]`);
    }
    if (element) {
        element = element.closest('li');
        if (element && !element.classList.contains('current_branch')) {
            element.remove();
        }
    } else {
        alert(lang.error.replace('{{{s}}}', selector));
    }
}


async function replace(selector, replace, sidebar) {
    const element = sidebar.querySelector(`[title="${selector}"]`),
          closestLi = element.closest('li').classList;
    if (element) {
        if (closestLi.contains('item_with_icon')) {
            element.children[1].innerText = replace;
        } else if (closestLi.contains('current_branch')) {
            element.innerText = replace;
        }
    } else {
        alert(lang.error.replace('{{{s}}}', selector));
    }
}

function sort(sidebar) {
    if (GM_getValue('sort')) {
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
}

if (location.pathname === '/user/preferences.php') {
    const element = document.getElementById('maincontent').parentElement.children[2].children[0].cloneNode(true),
          temp = element.getElementsByClassName('card-text')[0];
    element.getElementsByTagName('h4')[0].innerHTML = lang.userPreferences.title;

    while (temp.children.length !== 1) temp.lastChild.remove();
    const a = temp.children[0].children[0];
    a.href = 'https://moodle.ksasz.ch/cleanMoodle/';
    a.setAttribute('target', '_blank');
    a.innerHTML = lang.userPreferences.anchor;

    document.getElementById('maincontent').parentElement.children[2].appendChild(element);
}

if (location.pathname.toLowerCase().startsWith('/cleanmoodle')) {
    history.replaceState({}, '', '/cleanMoodle/');
    setup(true);
}
else{
    dispatchEvent(new CustomEvent('cleanMoodle', {
        detail: {
            newPage: true
        }
    }));
    settingsGear();
    GM_addValueChangeListener('remove', reloadFrontpage);
    GM_addValueChangeListener('replace', reloadFrontpage);
    GM_addValueChangeListener('sort', reloadFrontpage);
}

function setup(newPage) {
    if (location.protocol !== 'https:') {
        location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }
    document.title = lang.settings.pageTitle;

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
            confirm(lang.settings.loggedOut);
            open('https://moodle.ksasz.ch/login/index.php');
            return;
        } else {
            let tempSidebar = response.getElementById('inst4');
            const sidebarLinks = tempSidebar.getElementsByTagName('a');
            for (let i = 0; i < sidebarLinks.length; i++) {
                sidebarLinks[i].removeAttribute('href');
            }
            const dashboard = response.getElementsByClassName('item-content-wrap');
            for (let i = 0; i < dashboard.length; i++) {
                if (dashboard[i].textContent === 'Dashboard') {
                    dashboard[i].closest('li').remove();
                    break;
                }
            }
            let tree = tempSidebar.cloneNode(true);
            while (tempSidebar.parentElement.nodeName !== 'BODY') {
                let temp = tree;
                tempSidebar = tempSidebar.parentElement;
                tree = tempSidebar.cloneNode(false);
                tree.appendChild(temp);
            }


            const replaceArr = GM_getValue('replace'),
                  sidebar = tree.getElementsByClassName('type_system depth_2 contains_branch')[0];
            sidebar.getElementsByTagName('ul')[0].onclick = addCourse;

            for (let i = 0; i < replaceArr.length; i++) {
                replace(replaceArr[i][0], replaceArr[i][1], sidebar);
            }

            sort(sidebar);

            const removeArr = GM_getValue('remove');

            for (let i = 0; i < removeArr.length; i++) {
                setupRemove(removeArr[i], sidebar);
            }

            const mainContent = response.getElementById('region-main-box'),
                  mainContentUl = mainContent.getElementsByClassName('section img-text')[0];

            mainContentUl.clearChildren();

            tree.querySelector('#page-content').children[0].before(mainContent);

            document.body.appendChild(tree);

            if (settings.easterEgg){
                settingsGear(lang.settings.easterEgg);
            }



            /*** Settings ***/
            const form = c('form'),
                  selectedCourseDiv = c('div'),
                  li = c('li'),
                  title = c('h2');


            title.innerText = lang.settings.title;

            selectedCourseDiv.dataset.selectedCourse = null;
            selectedCourseDiv.innerText = lang.settings.selectCourse;
            selectedCourseDiv.id = 'selectedCourseDiv';

            const replaceLabel = createLabel(lang.settings.replace),
                  replaceRadio = replaceLabel.children[0],
                  replaceText = document.createTextNode(lang.settings.replaceText);

            replaceRadio.style.marginTop = '10px';
            replaceRadio.defaultChecked = true;
            replaceLabel.appendChild(replaceText);


            const removeLabel = createLabel(lang.settings.remove),
                  removeRadio = removeLabel.children[0],
                  removeText = document.createTextNode(lang.settings.removeText);

            removeRadio.style.marginBottom = '10px';
            removeLabel.appendChild(removeText);

            const replaceInput = c('input');
            replaceInput.type = 'text';
            replaceInput.id = 'replaceInput';
            replaceInput.placeholder = lang.settings.input;
            replaceInput.style.width = '250px';
            replaceInput.style.marginBottom = '10px';
            replaceInput.oninput = submit;

            const submitButton = c('button');
            submitButton.innerText = lang.settings.button;
            submitButton.style.display = 'block';
            submitButton.onclick = submit;


            li.appendChild(title);
            form.appendChild(selectedCourseDiv);
            form.appendChild(replaceLabel);
            form.appendChild(removeLabel);
            form.appendChild(replaceInput);
            form.appendChild(submitButton);
            li.appendChild(form);
            mainContentUl.appendChild(li);
            mainContentUl.style.listStyle = 'none';


            const sortLi = c('li'),
                  sortCheckbox = c('input'),
                  sortLabel = c('label'),
                  sortTitle = c('h2');
            sortTitle.innerText = lang.settings.sortTitle;
            sortCheckbox.type = 'checkbox';
            sortCheckbox.style.marginRight = '10px';
            if (GM_getValue('sort')) {
                sortCheckbox.defaultChecked = true;
            }
            sortLabel.oninput = e => {
                GM_setValue('sort', sortCheckbox.checked);
                reload(false);
            };
            sortLabel.appendChild(sortCheckbox);
            sortLabel.appendChild(document.createTextNode(lang.settings.sortText));
            sortLi.appendChild(sortLabel);
            mainContentUl.appendChild(c('hr'));
            mainContentUl.appendChild(sortTitle);
            mainContentUl.appendChild(sortLi);
        }
    });
}

function addCourse(e) {
    if (e.target.getAttribute('role') !== 'group' || e.target.nodeName !== 'UL') {
        const li = e.target.closest('li'),
              anchor = li.getElementsByTagName('a')[0];
        console.log(li);
        console.log(anchor);

        if (li) {
            if (li.dataset.removed === '1') {
                const removeArr = GM_getValue('remove');
                removeArr.splice(removeArr.indexOf(anchor.title), 1);
                GM_setValue('remove', removeArr);
                setup(false);
            } else {
                const replaceInput = document.getElementById('replaceInput'),
                      selectedCourseDiv = document.getElementById('selectedCourseDiv');
                replaceInput.value = anchor.textContent;
                selectedCourseDiv.clearChildren();
                selectedCourseDiv.appendChild(li.getElementsByTagName('p')[0].cloneNode(true));
                selectedCourseDiv.dataset.selectedCourse = anchor.title;
            }
        }
    }
}

function handleCheckbox(e) {
    const remove = document.getElementById('removeRadio'),
          replaceInput = document.getElementById('replaceInput');
    if (e.target.closest('label') === remove.parentElement) {
        replaceInput.style.display = 'none';
    } else {
        replaceInput.style.display = '';
    }

}

function submit(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.nodeName === 'BUTTON' || e.key === 'Enter') {
        const remove = document.getElementById('removeRadio'),
              replaceInput = document.getElementById('replaceInput'),
              selectedCourse = document.getElementById('selectedCourseDiv').dataset.selectedCourse;

        if (selectedCourse !== 'null') {
            if (remove.checked) {
                const removeArr = GM_getValue('remove');
                for (let i = 0; i < removeArr.length; i++) {
                    if (removeArr[i] === selectedCourse) {
                        removeArr.splice(i--, 1);
                    }
                }
                removeArr.push(selectedCourse);
                removeArr.sort((a, b) => {
                    a = a.toLowerCase();
                    b = b.toLowerCase();
                    if (a < b) return -1;
                    else if (a > b) return 1;
                    else return 0;
                });
                GM_setValue('remove', removeArr);
                removeReplacer(selectedCourse);
            } else {
                if (replaceInput.value === '' || replaceInput.value === selectedCourse) {
                    removeReplacer(selectedCourse);
                } else {
                    removeReplacer(selectedCourse);
                    addReplacer(selectedCourse, replaceInput.value);
                }
            }
            reload(true);
        } else alert(lang.settings.noCourse);
    }
}


function reload(reset) {
    if (reset) {
        document.getElementById('replaceInput').style.display = '';
        document.getElementsByTagName('form')[0].reset();
        const selectedCourse = document.getElementById('selectedCourseDiv');

        selectedCourse.clearChildren();
        selectedCourse.appendChild(document.createTextNode(lang.settings.selectCourse));
    }
    fetch('/')
        .then(e => e.text())
        .then(e => {
        e = new DOMParser().parseFromString(e, 'text/html');
        const replaceArr = GM_getValue('replace'),
              sidebar = e.getElementsByClassName('type_system depth_2 contains_branch')[0];

        for (let i = 0; i < replaceArr.length; i++) {
            replace(replaceArr[i][0], replaceArr[i][1], sidebar);
        }

        sort(sidebar);

        const removeArr = GM_getValue('remove');

        for (let i = 0; i < removeArr.length; i++) {
            setupRemove(removeArr[i], sidebar);
        }

        const sidebarLinks = sidebar.getElementsByTagName('a');
        for (let i = 0; i < sidebarLinks.length; i++) {
            sidebarLinks[i].removeAttribute('href');
        }
        const dashboard = e.getElementsByClassName('item-content-wrap');
        for (let i = 0; i < dashboard.length; i++) {
            if (dashboard[i].textContent === 'Dashboard') {
                dashboard[i].closest('li').remove();
                break;
            }
        }
        sidebar.getElementsByTagName('ul')[0].onclick = addCourse;

        document.getElementById('inst4').clearChildren();
        document.getElementById('inst4').appendChild(e.getElementById('inst4').children[0]);
    });
}

function setupRemove(e, sidebar) {
    const element = sidebar.querySelector(`[title="${e}"]`);
    element.style.color = 'grey';
    if (settings.lineThrough) {
        element.children[1].style.textDecoration = 'line-through';
    }
    sidebar.getElementsByTagName('ul')[0].appendChild(element.closest('li'));
    element.closest('li').dataset.removed = 1;
}

function addReplacer(e, f) {
    const replaceArr = GM_getValue('replace');
    replaceArr.push([e, f]);
    GM_setValue('replace', replaceArr);
}

function removeReplacer(e) {
    const replaceArr = GM_getValue('replace');
    for (let i = 0; i < replaceArr.length; i++) {
        if (replaceArr[i][0] === e) {
            replaceArr.splice(i--, 1);
        }
    }
    GM_setValue('replace', replaceArr);
}

function createLabel(e) {
    const radio = c('input'),
          label = c('label');

    radio.id = e + 'Radio';
    radio.type = 'radio';
    radio.name = 'radioSelection';
    radio.style.marginRight = '5px';
    label.for = e + 'Radio';
    label.appendChild(radio);
    label.style.display = 'block';
    label.oninput = handleCheckbox;
    return label;
}

function reloadFrontpage() {
    if (arguments[3]) {
        fetch('/')
            .then(e => e.text())
            .then(e => {
            e = new DOMParser().parseFromString(e, 'text/html');
            document.getElementById('inst4').clearChildren();
            document.getElementById('inst4').appendChild(e.getElementById('inst4').children[0]);
            settingsGear();
            dispatchEvent(new CustomEvent('cleanMoodle', {
                detail: {
                    newPage: false
                }
            }));
            dispatchEvent(new Event('customIcons'));
            dispatchEvent(new Event('moreSidebarLinks'));
        });
    }
}

function settingsGear(e) {
    const settingsAnchor = c('a'),
          settingsIcon = c('i');

    settingsAnchor.href = '/cleanMoodle/';
    settingsAnchor.target = '_blank';
    if (e) {
        settingsAnchor.onclick = ev => {
            ev.preventDefault();
            ev.stopPropagation();
            alert(e);
        };
    }
    settingsAnchor.style.marginLeft = '5px';

    settingsIcon.classList.add('fa', 'fa-gear');
    settingsIcon.setAttribute('aria-hidden', true);
    settingsAnchor.appendChild(settingsIcon);
    try {
    document.getElementById('instance-4-header').appendChild(settingsAnchor);
    } catch(a){}
}

function c(e) {
    return document.createElement(e);
}
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};

Element.prototype.clearChildren = function() {
    while (this.lastChild) {
        this.lastChild.remove();
    }
};
