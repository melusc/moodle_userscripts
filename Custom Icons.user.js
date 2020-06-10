// ===UserScript===
// @name        Moodle Custom Icons
// @version     2020.06.10c
// @include     *://moodle.ksasz.ch/*
// @exclude     *://moodle.ksasz.ch/info*
// @exclude     *://moodle.ksasz.ch/cleanMoodle*
// @exclude     *://moodle.ksasz.ch/login/index.php
// @exclude     *://moodle.ksasz.ch/pluginfile.php*
// @Author      lusc
// @downloadURL https://github.com/melusc/lusc/raw/master/Custom%20Icons.user.js
// @updateURL   https://github.com/melusc/lusc/raw/master/Custom%20Icons.user.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// @grant       GM_addValueChangeListener
// @run-at      document-body
// ===/UserScript===
/* jshint esversion: 10 */
/* Check out preferences or https://moodle.ksasz.ch/customIcons/ directly */
'use strict';

addEventListener('customIcons', async() => {
    const sidebar = document.getElementById('inst4');
    for (let i = 0; i < GM_listValues().length; i++) {
        const title = GM_listValues()[i];
        if (title === 'updatedAt') continue;
        try {
            const element = sidebar.querySelector(`a[title="${title}"]`),
                img = new Image();
            img.classList.add('icon', 'fa', 'fa-fw', 'navicon');
            img.setAttribute('aria-hidden', 'true');
            img.setAttribute('tabindex', -1);
            img.src = await fetcher(title);
            if (element.children.length) {
                element.replaceChild(img, element.children[0]);
            }
            img.onload = () => {
                URL.revokeObjectURL(img.src);
            };
        } catch (e) {
            console.error(e);
        }
    }
});
GM_addValueChangeListener('updatedAt', async(a, b, c, remote) => {
    if (remote) {
        await fetch('/')
            .then(e => e.text())
            .then(e => {
                e = new DOMParser().parseFromString(e, 'text/html');
                document.getElementById('inst4').innerHTML = e.getElementById('inst4').innerHTML;
            });
        dispatchEvent(new Event('cleanMoodle'));
        dispatchEvent(new Event('customIcons'));
        dispatchEvent(new Event('moreSidebarLinks'));
    }
});

addEventListener('DOMContentLoaded', () => {

    if (location.pathname === '/user/preferences.php') {
        dispatchEvent(new Event('customIcons'));
        const row = document.getElementById('maincontent').parentElement.children[2],
            block = row.children[0].cloneNode(true);
        block.getElementsByClassName('card-title')[0].innerText = 'Custom Icons';
        row.appendChild(block);
        const cardText = block.getElementsByClassName('card-text')[0];
        while (cardText.children.length !== 1) {
            cardText.lastChild.remove();
        }
        block.getElementsByTagName('a')[0].href = '/customIcons/';
        block.getElementsByTagName('a')[0].target = '_blank';
        block.getElementsByTagName('a')[0].innerText = 'Settings';
    } else if (!location.pathname.toLowerCase().startsWith('/customicons')) {
        dispatchEvent(new Event('customIcons'));
    }
});
if (location.pathname.toLowerCase().startsWith('/customicons')) {
    history.pushState({}, '', '/customIcons/');
    document.title = 'Custom Icons settings';
    const icon = document.createElement('link');
    icon.setAttribute('rel', 'shortcut icon');
    icon.href = 'https://moodle.ksasz.ch/theme/image.php/classic/theme/1588340020/favicon';
    document.head.appendChild(icon);

    const style = document.createElement('link');
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('type', 'text/css');
    style.href = 'https://moodle.ksasz.ch/theme/styles.php/classic/1588340020_1588339031/all';
    document.head.appendChild(style);
    while (document.body.lastChild) document.body.lastChild.remove();
    fetch('/')
        .then(e => e.text())
        .then(e => {
            const parsed = new DOMParser().parseFromString(e, 'text/html');

            let element = parsed.getElementById('inst4'),
                tree = parsed.getElementById('inst4').cloneNode(true);
            while (element.parentElement.nodeName !== 'BODY') {
                let temp = tree;
                element = element.parentElement;
                tree = element.cloneNode(false);
                tree.appendChild(temp);
            }
            document.body.appendChild(tree);

            document.body.getElementsByClassName('type_setting depth_2 item_with_icon')[0].remove();

            const regionMainBox = parsed.getElementById('region-main-box'),
                regionMainBoxLi = regionMainBox.getElementsByClassName('section img-text')[0];


            while (regionMainBoxLi.lastChild) regionMainBoxLi.lastChild.remove();
            document.getElementById('page-content').insertBefore(regionMainBox, document.getElementById('page-content').children[0]);
            document.getElementById('user-notifications').remove();
            dispatchEvent(new Event('cleanMoodle'));
            dispatchEvent(new Event('customIcons'));

            const anchors = document.getElementsByTagName('a');
            for (let i = 0; i < anchors.length; i++) {
                anchors[i].onclick = addCourse;
                anchors[i].removeAttribute('href');
            }


            regionMainBoxLi.style.listStyle = 'none';
            const li = document.createElement('li'),
                div = document.createElement('div'),
                title = document.createElement('h2'),
                form = document.createElement('form');
            title.innerText = 'Add icon';
            form.id = 'form';
            div.classList.add('mod-indent-outer', 'contentwithoutlink', 'no-overflow');

            li.appendChild(title);
            li.appendChild(div);
            div.appendChild(form);
            regionMainBoxLi.appendChild(li);

            const selectedCourseDiv = document.createElement('div'),
                selectedCourseText = document.createTextNode('Select course on the left');
            selectedCourseDiv.style.listStyle = 'none';
            selectedCourseDiv.style.marginBottom = '25px';
            selectedCourseDiv.dataset.selected = 'none';
            selectedCourseDiv.id = 'selectedCourseDiv';
            selectedCourseDiv.appendChild(selectedCourseText);
            form.appendChild(selectedCourseDiv);


            const fileInput = document.createElement('input'),
                fileLabel = document.createElement('label');
            fileInput.type = 'file';
            fileInput.id = 'fileInput';
            fileInput.accept = '.png,.jpg,.jpeg';
            fileInput.onchange = handleChange;
            fileLabel.for = 'fileInput';
            fileLabel.innerText = 'Submit file:';
            fileLabel.style.display = 'block';
            fileLabel.style.marginTop = '5px';
            form.appendChild(fileLabel);
            form.appendChild(fileInput);

            const resetButton = document.createElement('button');
            resetButton.innerText = 'Reset File';
            resetButton.id = 'resetButton';
            resetButton.onclick = resetFile;
            resetButton.style.display = 'block';
            resetButton.style.marginTop = '5px';
            resetButton.style.marginBottom = '25px';
            form.appendChild(resetButton);


            const urlInput = document.createElement('input'),
                urlLabel = document.createElement('label');
            urlInput.type = 'url';
            urlInput.id = 'urlInput';
            urlInput.placeholder = 'https://i.imgur.com/...';
            urlInput.onchange = handleChange;
            urlInput.onkeyup = handleChange;
            urlInput.onkeydown = handleFile;
            urlLabel.for = 'urlInput';
            urlLabel.innerText = 'Upload from Url:';
            urlLabel.style.display = 'block';
            form.appendChild(urlLabel);
            form.appendChild(urlInput);


            const submit = document.createElement('button');
            submit.innerText = 'Submit';
            submit.onclick = handleFile;
            submit.style.display = 'block';
            submit.style.marginTop = '35px';
            form.appendChild(submit);


            const list = document.createElement('li'),
                divList = document.createElement('div'),
                titleList = document.createElement('h2'),
                unsortedList = document.createElement('div');
            unsortedList.id = 'buttonsDiv';
            unsortedList.style.listStyle = 'none';
            titleList.innerText = 'Remove icon';
            titleList.style.marginTop = '25px';
            divList.classList.add('mod-indent-outer', 'contentwithoutlink', 'no-overflow');
            divList.appendChild(unsortedList);
            list.appendChild(titleList);
            list.appendChild(divList);
            regionMainBoxLi.appendChild(list);

            appendButtons(unsortedList);
        });

}

function fetcher(src) {
    return new Promise(resolve => {
        const value = GM_getValue(src),
            response = atob(value.split('base64,')[1]),
            byteNumbers = response.split('').map(e => e.charCodeAt(0)),
            byteArray = new Uint8Array(byteNumbers),
            type = value.split(';')[0].split(':')[1],
            blob = new Blob([byteArray], {
                type: type
            }),
            objectUrl = URL.createObjectURL(blob);

        resolve(objectUrl);
    });
}

function handleChange() {
    const fileInput = document.getElementById('fileInput'),
        urlInput = document.getElementById('urlInput'),
        fileReset = document.getElementById('resetButton');
    if (fileInput.files[0]) {
        if (/(\.jpe?g|\.png)$/i.test(fileInput.files[0].name)) {
            urlInput.disabled = true;
        } else resetFile();
    } else {
        urlInput.disabled = false;
    }

    if (urlInput.value) {
        fileInput.disabled = true;
        fileReset.disabled = true;
    } else {
        fileInput.disabled = false;
        fileReset.disabled = false;
    }
}

async function addCourse(e) {
    e.preventDefault();
    e.stopPropagation();

    e = e.target.closest('p');

    const selectedCourseDiv = document.getElementById('selectedCourseDiv'),
        img = e.getElementsByTagName('img')[0],
        anchor = e.getElementsByTagName('a')[0];

    selectedCourseDiv.lastChild.remove();
    if (img && new URL(img.src).protocol === 'blob:') {
        img.src = await fetcher(anchor.title);
        console.log(img);
        console.log(img.src);
        img.onload = () => {
            URL.revokeObjectURL(img.src);
        };
    }
    selectedCourseDiv.appendChild(e.cloneNode(true));
    selectedCourseDiv.dataset.selected = anchor.title;
}

function resetFile(e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    const form = document.createElement('form'),
        fileInput = document.getElementById('fileInput');
    fileInput.after(form);
    form.appendChild(fileInput);
    form.reset();
    form.before(fileInput);
    form.remove();
    handleChange();
}

async function handleFile(e) {
    if (e.key === 'Enter' || e.key === undefined) {
        e.preventDefault();
        e.stopPropagation();

        const fileInput = document.getElementById('fileInput'),
            urlInput = document.getElementById('urlInput'),
            resetButton = document.getElementById('resetButton'),
            selectedDiv = document.getElementById('selectedCourseDiv'),
            form = document.getElementById('form'),
            selectedCourseText = document.createTextNode('Select course on the left');

        if (!((fileInput.files[0] || urlInput.value) && selectedDiv.dataset.selected !== 'none')) {
            alert('Error: Empty or falsy input');
            return;
        }
        const blob = await new Promise(resolve => {
            if (fileInput.files[0]) {
                resolve(fileInput.files[0]);
            } else {
                try {
                    const url = new URL(urlInput.value);
                    fetch(url)
                        .then(e => e.blob())
                        .then(e => {
                            resolve(e);
                        });
                } catch (a) {
                    alert('Error: empty input');
                    console.error(a);
                    return;
                }
            }
        });
        const response = await new Promise(resolve => {
            const fr = new FileReader();
            fr.onload = () => {
                resolve(fr.result);
            };
            fr.readAsDataURL(blob);
        });

        GM_setValue(selectedDiv.dataset.selected, response);
        form.reset();
        selectedDiv.dataset.selected = 'none';
        selectedDiv.lastChild.remove();
        selectedDiv.appendChild(selectedCourseText);
        fileInput.disabled = false;
        urlInput.disabled = false;
        resetButton.disabled = false;
        dispatchEvent(new Event('customIcons'));
        GM_setValue('updatedAt', new Date());
        const div = document.getElementById('buttonsDiv');
        appendButtons(div);
    }
}
async function removeIcon(e) {
    const div = document.getElementById('buttonsDiv');
    GM_deleteValue(e.target.dataset.course);
    appendButtons(div);
    await fetch('/')
        .then(e => e.text())
        .then(e => {
            e = new DOMParser().parseFromString(e, 'text/html');
            document.getElementById('inst4').innerHTML = e.getElementById('inst4').innerHTML;
        });
    const anchors = document.getElementsByTagName('a');
    for (let i = 0; i < anchors.length; i++) {
        anchors[i].onclick = addCourse;
        anchors[i].removeAttribute('href');
    }
    dispatchEvent(new Event('cleanMoodle'));
    dispatchEvent(new Event('customIcons'));
    GM_setValue('updatedAt', new Date());
}

function appendButtons(e) {
    while (e.lastChild) e.lastChild.remove();
    const divArr = GM_listValues();
    divArr.sort((a, b) => {
        a = a.toLowerCase();
        b = b.toLowerCase();
        if (a < b) return -1;
        else if (a > b) return 1;
        else return 0;
    });
    for (let i = 0; i < divArr.length; i++) {
        if (divArr[i] === 'updatedAt') continue;
        const button = document.createElement('button');
        button.innerText = `Remove icon for "${divArr[i]}"`;
        button.dataset.course = divArr[i];
        button.style.margin = '3px 0';
        button.style.display = 'block';
        button.onclick = removeIcon;
        e.appendChild(button);
    }
}
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
};