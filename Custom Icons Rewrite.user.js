// ==UserScript==
// @name         Moodle Custom Icons Rewrite
// @version      2020.08.23a
// @author       lusc
// @include      *://moodle.ksasz.ch/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @downloadURL  https://github.com/melusc/lusc/raw/master/Custom%20Icons%20Rewrite.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/Custom%20Icons%20Rewrite.user.js
// ==/UserScript==
/* jshint esversion: 10 */
'use strict';
const getSidebar = (ctx = required('Context')) =>
  ctx.querySelector('li[aria-labelledby="label_2_4"] ul[role="group"]');

const required = (name = 'Variable') => new Error(name + ' is not defined');

const run = (addRemoveIcon = false) => {
  const sidebar = getSidebar(document);
  const references = GM_getValue('references');
  if (Array.isArray(references)) {
    if (sidebar !== null) {
      for (let i = 0; i < references.length; i++) {
        modIcon(references[i], sidebar, addRemoveIcon);
      }
    }
  } else GM_setValue('references', []);
};

const modIcon = (
  vals = required('vals'),
  sidebar = required('Sidebar'),
  addRemoveIcon = false
) => {
  const element = sidebar.querySelector(`a[title="${vals[0]}"]`);
  if (element !== null && element.children.length > 0) {
    const dataURI = GM_getValue('values')[vals[1]];
    const blobURI = getBlob(dataURI);
    blobURI.then(src => {
      try {
        const icon = new CustomElement('img', {
          class: 'icon navicon customIcon',
          'aria-hidden': true,
          src,
          'tab-index': -1,
        });
        element.firstChild.replaceWith(icon);
        if (addRemoveIcon === true) {
          element.firstChild.after(
            new CustomElement('i', {
              class: 'icon fa fa-times fa-fw navicon remove',
              'aria-hidden': true,
              style: 'color: red;',
              title: 'Remove icon for current element',
            })
          );
        }
        icon.onload = () => {
          URL.revokeObjectURL(icon.src);
        };
      } catch {}
    });
  }
};

const getBlob = (dataURI = required('dataURI')) =>
  new Promise(resolve => {
    const byteString = atob(dataURI.split('base64,')[1]);
    const array = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(array);
    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }
    const mime = dataURI.match(/(?<=data:)\w+\/[\w.]+(?=;)/)[0];
    const blob = new Blob([uintArray], {
      type: mime,
    });
    const objectUrl = URL.createObjectURL(blob);
    resolve(objectUrl);
  });

const range = (end, start = 0, step = 1) => {
  function* generateRange() {
    let x = start - step;
    while (x < end - step) yield (x += step);
  }
  return {
    [Symbol.iterator]: generateRange,
  };
};

const randomId = (length = 10) => {
  const str = String.fromCharCode(
    ...range(58, 48), // 0-9
    ...range(91, 65), // A-Z
    ...range(123, 97), // a-z
    45, // '-'
    95 // '_'
  );

  if (!Array.isArray(GM_getValue('references'))) {
    GM_setValue('references', []);
  }
  const allIDs = GM_getValue('references').map(e => e[1]);

  const returnVal = [];

  while (returnVal.length < length) {
    returnVal.push(str.charAt(Math.random() * (str.length + 1)));
  }
  return allIDs.indexOf(returnVal.join('')) === -1
    ? returnVal.join('')
    : randomId(length);
};

const setup = () => {
  document.title = 'Custom Icons Rewrite Setup';

  history.replaceState({}, '', '/customIconsRewrite/');

  document.body.clear();

  document.head.append(
    new CustomElement('link', {
      rel: 'stylesheet',
      type: 'text/css',
      href: '/theme/styles.php/classic/1588340020_1588339031/all',
    }), // default stylesheet of Moodle
    new CustomElement('link', {
      rel: 'shortcut icon',
      href: '/theme/image.php/classic/theme/1588340020/favicon',
    })
  );

  GM_addStyle(`
#page {
  margin-top: auto;
}
#page-content.blocks-pre.blocks-post .region-main {
  flex: 0 0 80%;
  max-width: 80%;
  padding-right: 1rem;
}
ul.section {
  list-style: none;
}
.margin-top {
  margin-top: 25px;
}
.margin-bottom {
  margin-bottom: 25px;
}
.padding {
  padding: 5px;
}
.input {
  display: block;
  margin-top: 10px;
}`);

  fetch('/')
    .then(e => e.text())
    .then(e => {
      const parsed = new DOMParser().parseFromString(e, 'text/html');

      let cur = parsed.getElementById('inst4');
      let tree = cur.cloneNode(true);

      /* doing this because otherwise calendar and more will also be there */
      while (cur.parentNode.nodeName !== 'BODY') {
        const temp = tree;
        cur = cur.parentNode;
        tree = cur.cloneNode(false);
        tree.append(temp);
      }
      document.body.append(tree);

      document
        .getElementById('page-content')
        .prepend(parsed.getElementById('region-main-box'));

      const sidebar = getSidebar(document);
      const sidebarChildren = [...sidebar.children].sort((a, b) => {
        const getText = e =>
          e.getElementsByTagName('a')[0].textContent.toLowerCase();

        a = getText(a);
        b = getText(b);
        return a < b ? -1 : a > b ? 1 : 0;
      });
      for (let i = 0; i < sidebarChildren.length; i++) {
        sidebar.append(sidebarChildren[i]);
      }

      const dashboard = [...document.getElementsByTagName('i')].filter(e =>
        e.classList.contains('icon', 'fa', 'fa-tachometer', 'fa-fw', 'navicon')
      )[0];
      if (dashboard !== undefined) {
        dashboard.closest('li').remove();
      }

      const anchors = sidebar.getElementsByTagName('a');
      for (let i = 0; i < anchors.length; i++) {
        anchors[i].removeAttribute('href');
      }
      document.querySelector('div.box.py-3.generalbox.sitetopic ~ br').remove();
      document.getElementById('maincontent').remove();

      run(true);

      sidebar.addEventListener('click', handleSidebarClick);
    })
    .then(() => {
      const mainRegion = document.querySelector(
        'div.box.py-3.generalbox.sitetopic > ul.section.img-text'
      );

      mainRegion.clear();

      const li = new CustomElement('li');

      li.append(
        new CustomElement(
          'h2',
          {},
          { textContent: 'Change, add or remove icons' }
        ),
        new CustomElement(
          'div',
          {
            id: 'selectedCourseDiv',
            class: 'margin-top margin-bottom',
            'data-selected-course': null,
          },
          { textContent: 'Select course on left' }
        )
      );

      const form = new CustomElement('form', {
        id: 'form',
      });

      const urlDiv = new CustomElement('div', { class: 'margin-top' });
      const urlInput = new CustomElement('input', {
        type: 'url',
        id: 'urlInput',
        placeholder: 'URL to image',
        class: 'padding inout',
      });
      urlDiv.append(
        new CustomElement('h3', {}, { textContent: 'Upload image from url' }),
        urlInput
      );

      const fileDiv = new CustomElement('div', { class: 'margin-top' });
      fileDiv.append(
        new CustomElement('h3', {}, { textContent: 'Upload image' })
      );
      const fileInput = new CustomElement('input', {
        type: 'file',
        id: 'fileInput',
        class: 'input',
      });
      const resetFileButton = new CustomElement(
        'button',
        { class: 'input' },
        { textContent: 'Reset file' }
      );
      resetFileButton.addEventListener('click', resetFile);
      fileDiv.append(fileInput, resetFileButton);

      const selectCopyDiv = new CustomElement('div', { class: 'margin-top' });
      const selectCopy = new CustomElement('select', { id: 'selectCopy' });
      selectCopy.add(new CustomElement('option', { value: null }));

      const references = GM_getValue('references');
      for (let i = 0; i < references.length; i++) {
        selectCopy.add(
          new CustomElement(
            'option',
            { value: references[i][1] },
            { textContent: references[i][0] }
          )
        );
      }
      selectCopyDiv.append(
        new CustomElement(
          'h3',
          {},
          { textContent: 'Copy image from other element' }
        ),
        selectCopy
      );

      const saveDiv = new CustomElement('div', { class: 'margin-top' });
      const saveButton = new CustomElement(
        'button',
        {},
        { textContent: 'Save' }
      );
      saveButton.addEventListener('click', saveValues);
      saveDiv.append(saveButton);

      form.append(urlDiv, fileDiv, selectCopyDiv, saveDiv);
      form.addEventListener('input', handleInput);

      li.append(form);

      mainRegion.append(li);

      return mainRegion;
    })
    .then(mainRegion => {
      const li = new CustomElement('li');

      li.append(
        new CustomElement('hr'),
        new CustomElement(
          'h2',
          {},
          { textContent: "Remove icons for courses you've left" }
        )
      );

      const buttonsDiv = new CustomElement('div', { id: 'buttonsDiv' });
      buttonsDiv.addEventListener('click', handleRemove);

      const sidebar = getSidebar(document);
      if (!Array.isArray(GM_getValue('references'))) {
        GM_setValue('references', []);
      }
      const references = GM_getValue('references');
      for (let i = 0; i < references.length; i++) {
        const cur = references[i];

        if (sidebar.querySelector(`a[title="${cur[0]}"]`) === null) {
          buttonsDiv.append(
            new CustomElement(
              'button',
              { 'data-name': cur[0], class: 'courses-left-btn' },
              { textContent: 'Remove icon for ' + cur[0] }
            )
          );
        }
      }
      li.hidden = buttonsDiv.childNodes.length === 0;

      li.append(buttonsDiv);

      mainRegion.append(li);

      return mainRegion;
    })
    .then(mainRegion => {
      const li = new CustomElement('li');
      li.append(
        new CustomElement('hr'),
        new CustomElement('h2', {}, { textContent: 'Clear all icons' })
      );
      const clearButton = new CustomElement(
        'button',
        { id: 'clearButton' },
        { textContent: 'Clear all icons' }
      );
      clearButton.addEventListener('click', () => {
        if (confirm('Are you sure?\nThis action is irreversible')) {
          GM_setValue('values', {});
          GM_setValue('references', []);
          reset();
        }
      });

      li.hidden = GM_getValue('references').length === 0;

      li.append(clearButton);
      mainRegion.append(li);
    });
};

const resetFile = e => {
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  const fileInput = document.getElementById('fileInput');
  const tempForm = new CustomElement('form');
  fileInput.after(tempForm);
  tempForm.append(fileInput);
  tempForm.reset();
  tempForm.after(fileInput);
  tempForm.remove();
  handleInput();
};

const saveValues = e => {
  if (e !== undefined) {
    e.preventDefault();
    e.stopPropagation();
  }
  const name = document.getElementById('selectedCourseDiv').dataset
    .selectedCourse;
  if (name !== 'null') {
    const fileInput = document.getElementById('fileInput');
    const urlInput = document.getElementById('urlInput');
    const selectCopy = document.getElementById('selectCopy');
    if (selectCopy.value !== 'null') {
      if (
        Object.fromEntries(GM_getValue('references'))[name] !== selectCopy.value
      ) {
        addToStorage(name, selectCopy.value);
      }
    } else if (fileInput.files[0]) {
      const file = fileInput.files[0];
      addToStorage(name, file);
    } else {
      try {
        const url = new URL(urlInput.value);
        GM_xmlhttpRequest({
          method: 'GET',
          url: url,
          responseType: 'blob',
          anonymous: true,
          onload: e => {
            addToStorage(name, e.response);
          },
          onerror: e => {
            alert(e.message);
          },
        });
      } catch (a) {
        alert(a.message);
      }
    }
  }
};
const addToStorage = (name = required(), data = required()) => {
  const arrs = removeElement(name, {
    references: false,
    reset: false,
  });
  if (typeof data === 'string') {
    const references = arrs.references.reduce(
      (acc, cur) => (acc.every(e => e[0] !== cur[0]) ? acc.concat([cur]) : acc),
      []
    );
    references.push([name, data]);
    references.sort((a, b) => {
      a = a[0].toLowerCase();
      b = b[0].toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
    });
    GM_setValue(
      'references',
      references.reduce(
        (acc, cur) =>
          acc.every(e => e[0] !== cur[0]) ? acc.concat([cur]) : acc,
        []
      )
    );
    reset();
  } else if (/image\/(png|jpe?g)/i.test(data.type)) {
    const fr = new FileReader();
    fr.addEventListener('load', () => {
      const id = randomId(10);
      const references = arrs.references;
      references.push([name, id]);
      references.sort((a, b) => {
        a = a[0].toLowerCase();
        b = b[0].toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
      });
      const values = Object.fromEntries(arrs.values);
      values[id] = fr.result;

      GM_setValue('values', values);
      GM_setValue('references', references);

      reset();
    });
    fr.readAsDataURL(data);
  } else {
    alert('Invalid file type');
  }
};

const handleInput = () => {
  const fileInput = document.getElementById('fileInput');
  const urlInput = document.getElementById('urlInput');
  const copyInput = document.getElementById('selectCopy');

  fileInput.nextSibling.disabled = fileInput.disabled =
    urlInput.value !== '' || copyInput.value !== 'null';
  urlInput.disabled = Boolean(fileInput.files[0]) || copyInput.value !== 'null';
  copyInput.disabled = Boolean(fileInput.files[0]) || urlInput.value !== '';
};

const handleSidebarClick = e => {
  e.preventDefault();
  e.stopPropagation();
  if (e.target.nodeName === 'I' && e.target.classList.contains('remove')) {
    removeElement(e.target.closest('a').title);
  } else if (
    e.target.closest('li.type_course.depth_3.item_with_icon') !== null
  ) {
    addSelectedCourse(
      e.target.closest('li.type_course.depth_3.item_with_icon')
    );
  }
};
const addSelectedCourse = e => {
  const selectedCourseDiv = document
    .getElementById('selectedCourseDiv')
    .clear();

  const element = e.firstChild.cloneNode(true);
  if (element.getElementsByClassName('customIcon')[0] !== undefined) {
    element.getElementsByClassName('customIcon')[0].replaceWith(
      new CustomElement('i', {
        class: 'icon fa fa-graduation-cap fa-fw navicon',
        'aria-hidden': true,
      })
    );
  }
  element.getElementsByClassName('remove').remove();
  selectedCourseDiv.append(element);

  selectedCourseDiv.dataset.selectedCourse = element.getElementsByTagName(
    'a'
  )[0].title;

  const selectCopy = document.getElementById('selectCopy');
  const selectCopyChildren = selectCopy.childNodes;
  const references = Object.fromEntries(GM_getValue('references'));
  for (let i = 0; i < selectCopyChildren.length; i++) {
    selectCopyChildren[i].disabled =
      references[selectCopyChildren[i].textContent] ===
      references[selectedCourseDiv.dataset.selectedCourse];
  }

  scroll({
    top: 0,
    behavior: 'smooth',
  });
};

const removeElement = (name = required('Name'), options = {}) => {
  if (!Array.isArray(GM_getValue('references'))) {
    GM_setValue('references', []);
  }
  const references = GM_getValue('references');
  for (let i = 0; i < references.length; i++) {
    if (references[i][0] === name) {
      references.splice(i--, 1);
    }
  }
  if (typeof GM_getValue('values') !== 'object') {
    GM_setValue('values', {});
  }
  const values = Object.entries(GM_getValue('values'));
  for (let i = 0; i < values.length; i++) {
    if (references.every(reference => values[i][0] !== reference[1])) {
      values.splice(i--, 1);
    }
  }

  if (options.values !== false) {
    GM_setValue('values', Object.fromEntries(values));
  }
  if (options.references !== false) {
    GM_setValue('references', references);
  }

  if (options.reset !== false) {
    reset();
  }
  return { values, references };
};

const handleRemove = e => {
  if (e.target.nodeName === 'BUTTON') {
    removeElement(e.target.dataset.name);
  }
};

const reset = () => {
  console.log('Resetting...');
  const sidebar = getSidebar(document);
  const sidebarChildren = sidebar.children;

  for (let i = 0; i < sidebarChildren.length; i++) {
    const img = sidebarChildren[i].getElementsByTagName('img')[0];

    if (img !== undefined) {
      if (img.nextSibling !== null && img.nextSibling.nodeName === 'I') {
        img.nextSibling.remove();
      }
      img.replaceWith(
        new CustomElement('i', {
          class: 'icon fa fa-graduation-cap fa-fw navicon',
          'aria-hidden': true,
        })
      );
    }
  }

  run(true);
  document.getElementById('fileInput').value = '';
  document.getElementById('selectedCourseDiv').dataset.selectedCourse = null;
  resetFile();

  document.getElementById('form').reset();
  document
    .getElementById('selectedCourseDiv')
    .clear()
    .append('Select course on left');

  const selectCopy = document.getElementById('selectCopy');
  selectCopy.clear();
  selectCopy.add(new CustomElement('option', { value: null }));

  if (!Array.isArray(GM_getValue('references'))) {
    GM_setValue('references', []);
  }
  const references = GM_getValue('references');
  for (let i = 0; i < references.length; i++) {
    selectCopy.add(
      new CustomElement(
        'option',
        { value: references[i][1] },
        { textContent: references[i][0] }
      )
    );
  }

  handleInput();

  const buttonsDiv = document.getElementById('buttonsDiv').clear();

  for (let i = 0; i < references.length; i++) {
    const cur = references[i];

    if (sidebar.querySelector(`a[title="${cur[0]}"]`) === null) {
      buttonsDiv.append(
        new CustomElement(
          'button',
          { 'data-name': cur[0], class: 'courses-left-btn' },
          { textContent: 'Remove icon for ' + cur[0] }
        )
      );
    }
  }
  buttonsDiv.closest('li').hidden = buttonsDiv.childNodes.length === 0;

  document.getElementById('clearButton').closest('li').hidden =
    references.length === 0;
};

const refresh = (...args) => {
  if (
    args[3] && // remote
    !/^\/cleanmoodle/i.test(location.pathname) &&
    !/^\/customicons/i.test(location.pathname)
  ) {
    fetch(location.pathname)
      .then(e => e.text())
      .then(e => {
        const parsed = new DOMParser().parseFromString(e, 'text/html');

        getSidebar(document).replaceWith(getSidebar(parsed));

        dispatchEvent(new Event('cleanMoodleRewrite'));
        dispatchEvent(new Event('customIconsRewrite'));
        dispatchEvent(new Event('moreSidebarLinks'));
      });
  }
};

class CustomElement {
  constructor(type = required(), attributes = {}, text = {}) {
    const element = document.createElement(type);

    const attrKeys = Object.entries(attributes);

    for (let i = 0; i < attrKeys.length; i++) {
      const [attr, val] = attrKeys[i];
      element.setAttribute(attr, val);
    }

    if (text.textContent) {
      element.textContent = text.textContent;
    } else if (text.innerText) {
      element.innerText = text.innerText;
    } else if (text.innerHTML) {
      element.innerHTML = text.innerHTML;
    }

    return element;
  }
}

Element.prototype.remove = function () {
  if (this !== null) {
    this.parentNode.removeChild(this);
  }
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (let i = this.length - 1; i >= 0; i--) {
    this[i].remove();
  }
};
Element.prototype.clear = function () {
  this.childNodes.remove();
  return this;
};

if (/^\/customiconsrewrite/i.test(location.pathname)) {
  addEventListener('DOMContentLoaded', setup);
} else if (!/^\/cleanmooddle/i.test(location.pathname)) {
  addEventListener('DOMContentLoaded', run);
  addEventListener('customIconsRewrite', run);

  GM_registerMenuCommand('Open settings', () => {
    open('https://moodle.ksasz.ch/customIconsRewrite/', '_blank');
  });

  GM_addValueChangeListener('references', refresh);
}
