// ==UserScript==
// @name         Clean Moodle Rewrite
// @version      2020.08.05a
// @author       lusc
// @include      *://moodle.ksasz.ch/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_addValueChangeListener
// @run-at       document-start
// @downloadURL  https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20Rewrite.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/Clean%20Moodle%20Rewrite.user.js
// ==/UserScript==
/* jshint esversion: 10 */
'use strict';

const lang = {
  nonExistant: name => {
    alert(
      `You appear to not be in "${name}" anymore. ${name} has been removed from your list.`
    );
  },
  selectCourse: 'Select course on left',
  renameTitle: 'Rename course',
  sortTitle: 'Sort sidebar',
  saveButton: 'Save',
  sorting: {
    sorting: 'Sorting',
    not: 'Not sorting',
  },
  title: 'Clean Moodle Rewrite Setup',
  openSettings: 'Open settings',
  toggleSorting: 'Toggle sorting',
  spanAfter: 'Reset to "{{{s}}}"',
};

const required = (e = 'Variable') => {
  throw new Error(e + ' not defined');
};

const replace = (
  name = required('name'),
  newName = required('newName'),
  sidebar = required('sidebar'),
  setupPage = false
) => {
  const element = sidebar.querySelector(`a[title="${name}"]`);
  if (element !== null) {
    const liClassList = element.closest('li').classList;
    if (liClassList.contains('item_with_icon')) {
      element.getElementsByTagName('span')[0].textContent = newName;
      if (setupPage) {
        const icon = document.createElement('i');
        icon.classList.add('icon', 'fa', 'fa-fw', 'navicon', 'fa-undo');
        element.getElementsByTagName('span')[0].after(icon);
      }
    } else if (
      liClassList.contains('contains_branch') ||
      liClassList.contains('current_branch')
    ) {
      element.textContent = newName;
      if (setupPage) {
        const icon = document.createElement('i');
        icon.classList.add('icon', 'fa', 'fa-fw', 'navicon', 'fa-undo');
        element.after(icon);
      }
    }
  } else {
    removeElement(name, true);
    lang.nonExistant(name);
  }
};

const remove = (name = required('name'), sidebar = required('sidebar')) => {
  const element = sidebar.querySelector(`a[title="${name}"]`);
  if (element !== null) {
    const liClassList = element.closest('li').classList;
    if (
      !liClassList.contains('contains_branch') ||
      !liClassList.contains('current_branch')
    ) {
      sidebar.removeChild(element.closest('li'));
    }
  } else {
    removeElement(name, true);
    lang.nonExistant(name);
  }
};

const sort = (sidebar = required()) => {
  if (/^\/cleanmoodle/i.test(location.pathname)) {
    if (GM_getValue('sort') === true) {
      sidebar.dataset.isSorted = true;
    } else {
      sidebar.dataset.isSorted = false;
    }
  }
  if (GM_getValue('sort') === true) {
    const children = [...sidebar.children].filter(
      e =>
        e.nodeName === 'LI' &&
        e.classList.contains('type_course', 'depth_3', 'item_with_icon')
    );
    children.sort((a, b) => {
      const aText = a.textContent.toLowerCase();
      const bText = b.textContent.toLowerCase();
      return aText < bText ? -1 : aText > bText ? 1 : 0;
    });
    children.reverse();
    for (let i = 0; i < children.length; i++) {
      sidebar.prepend(children[i]);
    }
  } else if (GM_getValue('sort') !== false) GM_setValue('sort', true);
};

const removeElement = (
  name = required(),
  setRemove = true,
  setReplace = true
) => {
  const replacers = GM_getValue('replace');
  const removers = GM_getValue('remove');
  for (let i = 0; i < replacers.length; i++) {
    if (replacers[i][0] === name) replacers.splice(i--, 1);
  }
  for (let i = 0; i < removers.length; i++) {
    if (removers[i] === name) removers.splice(i--, 1);
  }

  if (setRemove === true) {
    GM_setValue('remove', removers);
  }
  if (setReplace === true) {
    GM_setValue('replace', replacers);
  }

  return {
    replace: replacers,
    remove: removers,
  };
};

const addReplacer = (name = required(), replaceWith = required()) => {
  replaceWith = replaceWith.trim();
  if (replaceWith === '' || replaceWith === name) {
    removeElement(name);
  } else {
    const replacers = removeElement(name, true, false).replace;
    replacers.push([name, replaceWith]);
    replacers.sort((a, b) => {
      const aText = a[0].toLowerCase();
      const bText = b[0].toLowerCase();
      return aText < bText ? -1 : aText > bText ? 1 : 0;
    });
    GM_setValue('replace', replacers);
  }
};

const addRemover = (name = required()) => {
  const removers = removeElement(name, false, true).remove.concat(name);
  removers.sort((a, b) => {
    const aText = a.toLowerCase();
    const bText = b.toLowerCase();
    return aText < bText ? -1 : aText > bText ? 1 : 0;
  });
  GM_setValue('remove', removers);
};

const refresh = (name, oldVal, newVal, remote) => {
  if (remote && !/^\/cleanmoodle/i.test(location.pathname)) {
    fetch(location.href)
      .then(e => e.text())
      .then(e => {
        const parsed = new DOMParser().parseFromString(e, 'text/html');
        document
          .querySelector('li[aria-labelledby="label_2_4"]')
          .querySelector('ul[role="group"]')
          .replaceWith(
            parsed
              .querySelector('li[aria-labelledby="label_2_4"]')
              .querySelector('ul[role="group"]')
          );
        dispatchEvent(new Event('cleanMoodleRewrite'));
        dispatchEvent(new Event('customIcons'));
        if (!/^\/customicons/i.test(location.pathname)) {
          dispatchEvent(new Event('moreSidebarLinks'));
        }
      });
  }
};

const setupCustomRemove = (name = required(), sidebar = required()) => {
  const element = sidebar.querySelector(`a[title="${name}"]`);
  if (element !== null) {
    element
      .getElementsByTagName('i')[0]
      .classList.replace('fa-check', 'fa-times');
    element.style.color = 'red';
  } else {
    removeElement(name);
    lang.nonExistant(name);
  }
};

const sidebarClick = e => {
  e.preventDefault();
  e.stopPropagation();

  if (e.target.nodeName === 'I') {
    const classList = e.target.classList;
    if (classList.contains('fa-times') || classList.contains('fa-undo')) {
      removeElement(e.target.closest('a').title);
    } else if (classList.contains('fa-check')) {
      addRemover(e.target.closest('a').title);

      const selectedCourseDiv = document.getElementById('selectedCourseDiv');
      selectedCourseDiv.dataset.selectedCourse = null;
      while (selectedCourseDiv.lastChild) {
        selectedCourseDiv.removeChild(selectedCourseDiv.lastChild);
      }
      selectedCourseDiv.textContent = lang.selectCourse;
    }
    cleanSetup(false);
  } else if (
    e.target.nodeName !== 'UL' ||
    e.target.getAttribute('role') !== 'group'
  ) {
    selectCourse(e);
  }
};

const selectCourse = e => {
  const p = (e.target.nodeName === 'LI'
    ? e.target.getElementsByTagName('p')[0]
    : e.target.closest('p')
  ).cloneNode(true);
  if (p) {
    const selectedCourseDiv = document.getElementById('selectedCourseDiv');
    const span = p.getElementsByTagName('span')[0];
    const anchor = p.getElementsByTagName('a')[0];
    const icon = p.getElementsByTagName('i')[0];

    if (anchor.getElementsByClassName('fa-undo')[0]) {
      anchor.removeChild(anchor.getElementsByClassName('fa-undo')[0]);
    }

    const origAnchor = e.target.closest('li').getElementsByTagName('a')[0];
    if (origAnchor.style.color === 'red') {
      removeElement(anchor.title);
      const origIcon = origAnchor.getElementsByTagName('i')[0];
      origAnchor.style.color = 'green';
      origIcon.classList.remove('fa-times');
      origIcon.classList.add('fa-check');
    }

    while (selectedCourseDiv.lastChild) {
      selectedCourseDiv.removeChild(selectedCourseDiv.lastChild);
    }
    selectedCourseDiv.appendChild(p);
    span.contentEditable = true;
    span.id = 'spanEditable';
    selectedCourseDiv.dataset.selectedCourse = p.getElementsByTagName(
      'a'
    )[0].title;

    p.addEventListener('keydown', updateSelectedCourse);

    anchor.style.color = '';
    icon.classList.remove('fa-check', 'fa-times');
    icon.classList.add('fa-graduation-cap');

    selectSpan();

    const style = document.getElementById('spanEditableStyle');
    style.textContent = `#spanEditable:empty::after{
        content: '${lang.spanAfter.replace('{{{s}}}', anchor.title)}';
    }`;
  }
};

const updateSelectedCourse = e => {
  if (e.type === 'click' || (e.type === 'keydown' && e.key === 'Enter')) {
    e.preventDefault();
    e.stopPropagation();

    const selectedCourse = document.getElementById('selectedCourseDiv');

    if (selectedCourse.dataset.selectedCourse !== 'null') {
      const replaceWith = document.getElementById('spanEditable').textContent;
      const name = selectedCourse.dataset.selectedCourse;

      addReplacer(name, replaceWith);
      selectedCourse.dataset.selectedCourse = null;
      while (selectedCourse.lastChild) {
        selectedCourse.removeChild(selectedCourse.lastChild);
      }
      selectedCourse.textContent = lang.selectCourse;

      cleanSetup(false);
    }
  }
};

const updateSort = () => {
  const checkbox = document.getElementById('sortCheckbox');
  GM_setValue('sort', checkbox.checked);

  document.querySelector('label[for="sortCheckbox"]').textContent =
    lang.sorting[checkbox.checked ? 'sorting' : 'not'];

  if (checkbox.checked === false) {
    const sidebar = document.querySelector(
      'li[aria-labelledby="label_2_4"] ul[role="group"]'
    );
    sidebar.replaceWith(
      document.getElementById('unmodifiedSidebar').cloneNode('true')
    );
    const newSidebar = document.querySelector(
      'li[aria-labelledby="label_2_4"] ul[role="group"]'
    );
    newSidebar.removeAttribute('id');
    newSidebar.hidden = false;
    cleanSetup(true);
  } else {
    cleanSetup(false);
  }
};

const cleanSetup = (isNewPage = true) => {
  /* Remove "Dashboard" */
  const dashboard = document.querySelector('li[aria-labelledby="label_2_2"]');
  if (dashboard) {
    dashboard.parentNode.removeChild(dashboard);
  }

  /* Clean sidebar */
  const sidebar = document.querySelector(
    'li[aria-labelledby="label_2_4"] ul[role="group"]'
  );

  /* Turn all icons into ticks ✓ and make text green*/
  const icons = sidebar.getElementsByTagName('i');
  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.remove('fa-graduation-cap', 'fa-times');
    icons[i].classList.add('fa-check');
    icons[i].closest('a').style.color = 'green';
  }

  /* Reset all text and remove undo icons */
  const span = sidebar.querySelectorAll('li span');
  for (let i = 0; i < span.length; i++) {
    span[i].textContent = span[i].closest('a').title.trim();

    const icon = span[i].nextSibling;
    if (icon !== null) {
      icon.parentNode.removeChild(icon);
    }
  }

  const replacers = GM_getValue('replace');
  if (Array.isArray(replacers)) {
    for (let i = 0; i < replacers.length; i++) {
      replace(...replacers[i], sidebar, true);
    }
  } else GM_setValue('replace', []);

  const removers = GM_getValue('remove');
  if (Array.isArray(removers)) {
    for (let i = 0; i < removers.length; i++) {
      setupCustomRemove(removers[i], sidebar);
    }
  } else GM_setValue('remove', []);

  sort(sidebar);

  if (isNewPage) {
    sidebar.addEventListener('click', sidebarClick);
  }

  /* remove links */
  const anchors = sidebar.getElementsByTagName('a');
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].removeAttribute('href');
  }
};

const setup = () => {
  const icon = document.createElement('link');
  icon.rel = 'shortcut icon';
  icon.href = '/theme/image.php/classic/theme/1588340020/favicon';
  document.head.appendChild(icon);

  const style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = '/theme/styles.php/classic/1588340020_1588339031/all';
  document.head.appendChild(style);

  GM_addStyle(`
    #page {
        margin-top: auto!important;
    }
    #page-content.blocks-pre.blocks-post .region-main {
        flex: 0 0 80%!important;
        max-width: 80%!important;
        padding-right: 1rem;
    }
    ul.section {
        list-style: none;
    }
    button {
        margin-top: 10px;
    }
    i.fa-undo {
        margin-left: 3px !important;
    }`);

  GM_addStyle('#spanEditable:empty::after{content:"Reset to null"}').id =
    'spanEditableStyle';

  history.replaceState({}, '', '/cleanMoodleRewrite/');

  document.title = lang.title;

  while (document.body.lastChild) {
    document.body.removeChild(document.body.lastChild);
  }

  fetch('/')
    .then(e => e.text())
    .then(e => {
      const parsed = new DOMParser().parseFromString(e, 'text/html');

      const sidebar = parsed.getElementById('inst4');
      const mainRegion = parsed.getElementById('region-main-box');

      /* Only direct path to elements */
      let tempElement = sidebar.cloneNode(true);
      let current = sidebar;
      while (current.parentNode.nodeName !== 'BODY') {
        current = current.parentNode;

        const temp = tempElement;
        tempElement = current.cloneNode(false);
        tempElement.appendChild(temp);
      }
      document.body.appendChild(tempElement);
      document.getElementById('page-content').appendChild(mainRegion);
    })
    .then(() => {
      /* Clear main region */
      const mainRegion = document
        .getElementById('maincontent')
        .parentNode.querySelector('ul.section.img-text');
      while (mainRegion.lastChild) {
        mainRegion.removeChild(mainRegion.lastChild);
      }
      const clonedSidebar = document
        .querySelector('li[aria-labelledby="label_2_4"] ul[role="group"]')
        .cloneNode(true);
      clonedSidebar.id = 'unmodifiedSidebar';
      clonedSidebar.hidden = true;
      document.body.appendChild(clonedSidebar);

      cleanSetup(true);

      const replaceLi = document.createElement('li');

      const replaceTitle = document.createElement('h2');
      replaceTitle.textContent = lang.renameTitle;
      replaceTitle.style.userSelect = 'none';
      replaceLi.appendChild(replaceTitle);

      const course = document.createElement('div');
      course.textContent = lang.selectCourse;
      course.style.userSelect = 'none';
      course.dataset.selectedCourse = null;
      course.id = 'selectedCourseDiv';
      replaceLi.appendChild(course);

      const saveButton = document.createElement('button');
      saveButton.textContent = lang.saveButton;
      saveButton.style.userSelect = 'none';
      saveButton.addEventListener('click', updateSelectedCourse);
      replaceLi.appendChild(saveButton);

      mainRegion.appendChild(replaceLi);

      const sortLi = document.createElement('li');

      sortLi.appendChild(document.createElement('hr'));

      const sortTitle = document.createElement('h2');
      sortTitle.textContent = lang.sortTitle;
      sortLi.appendChild(sortTitle);

      const inputDiv = document.createElement('div');

      const sortCheckbox = document.createElement('input');
      sortCheckbox.type = 'checkbox';
      sortCheckbox.id = 'sortCheckbox';
      sortCheckbox.checked = GM_getValue('sort');
      sortCheckbox.addEventListener('change', updateSort);
      inputDiv.appendChild(sortCheckbox);

      const label = document.createElement('label');
      label.textContent = lang.sorting[GM_getValue('sort') ? 'sorting' : 'not'];
      label.setAttribute('for', 'sortCheckbox');
      label.style.marginLeft = '5px';
      inputDiv.appendChild(label);

      sortLi.appendChild(inputDiv);

      mainRegion.appendChild(sortLi);
    });
};
const settingsGear = (sidebar = required()) => {
  const p = sidebar.previousSibling;

  if (p.lastChild.getAttribute('href') !== '/cleanMoodleRewrite/') {
    const anchor = document.createElement('a');
    anchor.target = '_blank';
    anchor.href = '/cleanMoodleRewrite/';
    anchor.addEventListener('click', e => {
      e.stopPropagation();
      e.preventDefault();
      open('/cleanMoodleRewrite/', '_blank');
    });

    const icon = document.createElement('i');
    icon.classList.add('icon', 'fa', 'fa-fw', 'navicon', 'fa-cogs');
    icon.style.marginLeft = '5px';
    anchor.appendChild(icon);
    p.appendChild(anchor);
  }
};

const selectSpan = e => {
  const span = document.getElementById('spanEditable');
  const range = new Range();
  const sel = getSelection();
  const start = typeof e === 'number' ? e : span.textContent.length;

  span.focus();
  range.setStart(span.childNodes[0], start);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
};

addEventListener('cleanMoodleRewrite', () => {
  const sidebar = document.querySelector(
    'li[aria-labelledby="label_2_4"] ul[role="group"]'
  );

  if (sidebar !== null) {
    const replacers = GM_getValue('replace');
    if (Array.isArray(replacers)) {
      for (let i = 0; i < replacers.length; i++) {
        replace(...replacers[i], sidebar);
      }
    } else GM_setValue('replace', []);

    const removers = GM_getValue('remove');
    if (Array.isArray(removers)) {
      for (let i = 0; i < removers.length; i++) {
        remove(removers[i], sidebar);
      }
    } else GM_setValue('remove', []);

    sort(sidebar);

    settingsGear(sidebar);
  }
});

if (/^\/cleanmoodlerewrite/i.test(location.pathname)) {
  setup();
} else {
  GM_registerMenuCommand(lang.openSettings, () => {
    open('https://moodle.ksasz.ch/cleanMoodleRewrite/');
  });
  GM_registerMenuCommand(lang.toggleSorting, () => {
    const val = GM_getValue('sort');
    GM_setValue('sort', !val);
    refresh('sort', val, !val, true);
  });
  addEventListener('DOMContentLoaded', () => {
    dispatchEvent(new Event('cleanMoodleRewrite'));
  });
}

GM_addValueChangeListener('replace', refresh);
GM_addValueChangeListener('remove', refresh);
GM_addValueChangeListener('sort', refresh);
