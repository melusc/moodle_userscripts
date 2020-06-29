// ===UserScript===
// @name         Clean Moodle
// @namespace    https://github.com/melusc/lusc
// @version      2020.06.26a
// @include      *://moodle.ksasz.ch/*
// @exclude      *://moodle.ksasz.ch/info*
// @exclude      *://moodle.ksasz.ch/lib*
// @Author       lusc
// @description  Improving the looks of Moodle
// @downloadURL  https://github.com/melusc/lusc/raw/master/Clean%20Moodle.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/Clean%20Moodle.user.js
// @run-at       document-end
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_registerMenuCommand
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
        console: [`%c[%cClean Moodle%c] %cVersion %c${GM_info.script.version} %cby %clusc`, 'color: #fe4c4c', 'color:', 'color: #fe4c4c', 'color:', 'color: #fe4c4c', 'color:', 'color:#58e'],
        error: 'Couldn\'t find "{{{s}}}"! As a result, "{{{s}}}" has been removed from the list.',
        userPreferences: {
            anchor: 'Settings',
            title: 'Clean Moodle'
        },
        settings: {
            pageTitle: 'Clean Moodle Setup',
            loggedOut: 'You appear to be logged out!\nLogin, return and reload page',
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
        easterEgg: true
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
        settingsGear(document);
        if (!e.detail || e.detail.newPage) {
            console.log(...lang.console);
        }
    }
}

async function remove(selector, sidebar) {
    let element = sidebar.querySelector(`[title="${selector}"]`);

    if (element) {
        element = element.closest('li');
        const cL = element.classList;
        if (element && !(cL.contains('current_branch') || cL.contains('contains_branch'))) {
            element.remove();
        }
    } else {
        alert(lang.error.replace(/{{{s}}}/g, selector));
        const removeArr = GM_getValue('remove');
        for (let i = 0; i < removeArr.length; i++) {
            if (removeArr[i] === selector) {
                removeArr.splice(i--, 1);
            }
        }
        GM_setValue('remove', removeArr);
    }
}


async function replace(selector, replace, sidebar) {
    const element = sidebar.querySelector(`[title="${selector}"]`);
    if (element) {
        const cL = element.closest('li').classList;
        if (cL.contains('item_with_icon')) {
            element.children[1].textContent = replace;
        } else if (cL.contains('current_branch') || cL.contains('contains_branch')) {
            element.textContent = replace;
        }
    } else {
        alert(lang.error.replace(/{{{s}}}/g, selector));
        removeReplacer(selector);
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
} else {
    dispatchEvent(new CustomEvent('cleanMoodle', {
        detail: {
            newPage: true
        }
    }));
    GM_addValueChangeListener('remove', reloadFrontpage);
    GM_addValueChangeListener('replace', reloadFrontpage);
    GM_addValueChangeListener('sort', reloadFrontpage);
    GM_registerMenuCommand('Toggle sorting', () => {
        GM_setValue('sort', !GM_getValue('sort'));
        reloadFrontpage(0, 0, 0, true);
    });
    GM_registerMenuCommand('Open settings', () => {
        open('https://moodle.ksasz.ch/cleanMoodle/', '_blank');
    });
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
                location.href = 'https://moodle.ksasz.ch/login/index.php';
                return;
            } else {
                const style = GM_addStyle(`
span[contenteditable]:empty::before {
    content:"Reset to \\"{name}\\"";
}
span#spanEditable {
    outline: none;
    white-space: pre;
}`);
                style.id = 'styleEmpty';
                style.dataset.selected = '{name}';
                response.getElementById('inst4').style.userSelect = 'none';
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

                const main = response.getElementById('maincontent').parentNode;
                main.firstChild.remove();
                main.lastChild.remove();

                const mainContent = response.getElementById('region-main-box'),
                    mainContentUl = mainContent.getElementsByClassName('section img-text')[0];

                mainContentUl.clearChildren();

                tree.querySelector('#page-content').children[0].before(mainContent); // getElementById seems to not work

                document.body.appendChild(tree);

                if (settings.easterEgg) {
                    settingsGear(document, lang.settings.easterEgg);
                }



                /*** Settings ***/
                const form = c('form'),
                    selectedCourseDiv = c('div'),
                    li = c('li'),
                    title = c('h2');

                form.id = 'form';

                title.textContent = lang.settings.title;
                title.style.userSelect = 'none';

                selectedCourseDiv.dataset.selectedCourse = null;
                selectedCourseDiv.textContent = lang.settings.selectCourse;
                selectedCourseDiv.style.userSelect = 'none';
                selectedCourseDiv.id = 'selectedCourseDiv';

                const replaceLabel = createLabel(lang.settings.replace),
                    replaceText = document.createTextNode(lang.settings.replaceText);

                replaceLabel.style.marginTop = '10px';
                replaceLabel.firstElementChild.defaultChecked = true;
                replaceLabel.appendChild(replaceText);


                const removeLabel = createLabel(lang.settings.remove),
                    removeText = document.createTextNode(lang.settings.removeText);

                removeLabel.style.marginBottom = '10px';
                removeLabel.appendChild(removeText);

                const submitButton = c('button');
                submitButton.textContent = lang.settings.button;
                submitButton.style.display = 'block';
                submitButton.style.userSelect = 'none';
                submitButton.onclick = submit;


                li.appendChild(title);
                form.appendChild(selectedCourseDiv);
                form.appendChild(replaceLabel);
                form.appendChild(removeLabel);
                form.appendChild(submitButton);
                li.appendChild(form);
                mainContentUl.appendChild(li);
                mainContentUl.style.listStyle = 'none';


                const sortLi = c('li'),
                    sortCheckbox = c('input'),
                    sortLabel = c('label'),
                    sortTitle = c('h2');
                sortTitle.textContent = lang.settings.sortTitle;
                sortTitle.style.userSelect = 'none';
                sortCheckbox.type = 'checkbox';
                sortCheckbox.style.marginRight = '10px';
                if (GM_getValue('sort')) {
                    sortCheckbox.defaultChecked = true;
                }
                sortLabel.oninput = e => {
                    GM_setValue('sort', sortCheckbox.checked);
                    reload(false);
                };
                sortLabel.style.userSelect = 'none';
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

        if (li) {
            if (li.dataset.removed === '1') {
                const removeArr = GM_getValue('remove');
                removeArr.splice(removeArr.indexOf(anchor.title), 1);
                GM_setValue('remove', removeArr);
                setup(false);
            } else {
                const replaceInput = document.getElementById('replaceInput'),
                    selectedCourseDiv = document.getElementById('selectedCourseDiv');

                selectedCourseDiv.clearChildren();
                selectedCourseDiv.appendChild(li.getElementsByTagName('p')[0].cloneNode(true));
                const span = selectedCourseDiv.getElementsByTagName('span')[0];

                span.contentEditable = document.getElementById('replaceRadio').checked;
                span.id = 'spanEditable';

                selectedCourseDiv.dataset.selectedCourse = anchor.title;
                selectedCourseDiv.dataset.selectedCourseMod = span.textContent;

                span.onkeydown = e => {
                    if (e.key === 'Enter') {
                        submit(e);
                    }
                };

                span.onpaste = e => {
                    e.preventDefault();
                    e.stopPropagation();

                    const sel = getSelection(),
                        string = span.textContent;

                    let clipboard = e.clipboardData.getData('text/plain'),
                        start = sel.anchorOffset,
                        end = sel.focusOffset;
                    if (start > end)[start, end] = [end, start];

                    clipboard = clipboard.replace(/(\r?\n|\r)/gm, '');


                    span.textContent = string.slice(0, start) + clipboard + string.slice(end);
                    selectSpan(start + clipboard.length);
                };
                selectSpan();

                if (document.getElementById('removeRadio').checked) span.textContent = anchor.title;

                const styleSheet = document.getElementById('styleEmpty'),
                    content = styleSheet.dataset.selected;
                styleSheet.dataset.selected = anchor.title;
                styleSheet.textContent = styleSheet.textContent.replace(content, anchor.title);
            }
        }
    }
}

function handleCheckbox(e) {
    const remove = document.getElementById('removeRadio'),
        selectedCourse = document.getElementById('selectedCourseDiv').dataset,
        span = document.getElementById('spanEditable');
    if (span) {
        if (e.target.closest('label') === remove.parentElement) {
            span.contentEditable = false;
            selectedCourse.selectedCourseMod = span.textContent;
            span.textContent = selectedCourse.selectedCourse;
        } else {
            span.contentEditable = true;
            span.textContent = selectedCourse.selectedCourseMod;
            selectSpan();
        }
    }
}

function submit(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.nodeName === 'BUTTON' || e.key === 'Enter') {
        const remove = document.getElementById('removeRadio'),
            selectedCourse = document.getElementById('selectedCourseDiv').dataset.selectedCourse,
            span = document.getElementById('spanEditable'),
            formData = new FormData(document.getElementById('form'));

        if (selectedCourse !== 'null') {
            if (formData.get('radioSelection') === 'remove') {
                removeReplacer(selectedCourse);
                removeRemover(selectedCourse);

                const removeArr = GM_getValue('remove');
                removeArr.push(selectedCourse);
                removeArr.sort((a, b) => {
                    a = a.toLowerCase();
                    b = b.toLowerCase();
                    if (a < b) return -1;
                    else if (a > b) return 1;
                    else return 0;
                });
                GM_setValue('remove', removeArr);
            } else {
                if (span.textContent === '' || span.textContent === selectedCourse) {
                    removeReplacer(selectedCourse);
                } else {
                    removeReplacer(selectedCourse);
                    addReplacer(selectedCourse, span.textContent);
                }
            }
            reload(true);
        } else alert(lang.settings.noCourse);
    }
}


function reload(reset) {
    if (reset) {
        document.getElementsByTagName('form')[0].reset();
        const selectedCourse = document.getElementById('selectedCourseDiv');

        selectedCourse.clearChildren();
        selectedCourse.appendChild(document.createTextNode(lang.settings.selectCourse));
        selectedCourse.dataset.selectedCourse = null;
        selectedCourse.dataset.selectedCourseMod = null;
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

            if (settings.easterEgg) {
                settingsGear(e, lang.settings.easterEgg);
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

function addReplacer() {
    const replaceArr = GM_getValue('replace');
    replaceArr.push([...arguments]);
    replaceArr.sort((a, b) => {
        a = a[0].toLowerCase();
        b = b[0].toLowerCase();
        if (a < b) return -1;
        else if (a > b) return 1;
        else return 0;
    });
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

function removeRemover(e) {
    const removeArr = GM_getValue('remove');
    for (let i = 0; i < removeArr.length; i++) {
        if (removeArr[i] === e) {
            removeArr.splice(i--, 1);
        }
    }
    GM_setValue('remove', removeArr);
}

function createLabel(e) {
    const radio = c('input'),
        label = c('label');

    radio.id = e + 'Radio';
    radio.type = 'radio';
    radio.name = 'radioSelection';
    radio.style.marginRight = '5px';
    radio.value = e;

    label.for = e + 'Radio';
    label.style.display = 'block';
    label.style.userSelect = 'none';
    label.oninput = handleCheckbox;
    label.appendChild(radio);
    return label;
}

function reloadFrontpage(name, oldVal, newVal, remote) {
    if (remote) {
        fetch('/')
            .then(e => e.text())
            .then(e => {
                e = new DOMParser().parseFromString(e, 'text/html');
                if (!e.getElementById('login')) {
                    document.getElementById('inst4').clearChildren();
                    document.getElementById('inst4').appendChild(e.getElementById('inst4').children[0]);
                    dispatchEvent(new CustomEvent('cleanMoodle', {
                        detail: {
                            newPage: false
                        }
                    }));
                    dispatchEvent(new Event('customIcons'));
                    if (!location.pathname.toLowerCase().startsWith('/customicons')) {
                        dispatchEvent(new Event('moreSidebarLinks'));
                    }
                } else location.href = 'https://moodle.ksasz.ch/login/index.php';
            });
    }
}

function settingsGear(context, e) {
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
        context.getElementById('instance-4-header').appendChild(settingsAnchor);
    } catch (a) {}
}

function selectSpan(e) {
    const span = document.getElementById('spanEditable'),
        range = new Range(),
        sel = getSelection(),
        start = (typeof e === 'number') ? e : span.textContent.length;

    span.focus();
    range.setStart(span.childNodes[0], start);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
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