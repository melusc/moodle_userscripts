// ==UserScript==
// @name         Moodle explore profiles - ajax 2.0
// @version      2020.08.26a
// @author       lusc
// @include      *://moodle.ksasz.ch/user/profile.php?*
// @include      *://moodle.ksasz.ch/exploreProfiles/index*
// @downloadURL  https://github.com/melusc/lusc/raw/master/Explore%20profiles.user.js
// @updateURL    https://github.com/melusc/lusc/raw/master/Explore%20profiles.user.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @run-at       document-end
// ==/UserScript==
/* jshint esversion: 10 */
'use strict';
if (GM_getValue('to') !== 1931) GM_setValue('to', 1931); // I've decided to hardcode the value to give me the option to update it via update
if (GM_getValue('from') !== 2) GM_setValue('from', 2); //   ^

let loadingNewPage = false;
if (!/^\/exploreprofiles\/index\/?$/i.test(location.pathname)) {
  GM_registerMenuCommand('Index all deleted profiles', () => {
    open('https://moodle.ksasz.ch/exploreProfiles/index', '_blank');
  });
  GM_addStyle(
    '.explore-btn{margin-left:4px;margin-right:4px;border-radius:2px;padding:3px}.explore-btn:active,.explore-btn:focus{outline:none}.centerNotification{position:fixed;width:256px;height:115px;top:50%;left:50%;margin-top:-52px;margin-left:-130px;z-index:10001;border:2px solid #444;background-color:#e5e5e5;border-radius:3px}.outerText{display:table;width:100%;height:100%}.middleText{display:table-cell;vertical-align:middle}.innerText{color:#444;text-align:center;font-size:1.5em}.small{font-size:16px}.loadingPeriods::after{content:"";animation-duration:4s;animation-timing-function:linear;animation-iteration-count:infinite;animation-direction:alternate;animation-name:loadingPeriods}@keyframes loadingPeriods{0%{content:"..."}33%{content:".."}66%{content:"."}100%{content:""}}'
  );

  createButton([
    {
      name: 'Previous profile',
      action: '-1',
    },
    {
      name: 'Next profile',
      action: '1',
    },
    {
      name: 'Random profile',
      action: 'rand',
    },
    {
      name: '-10 Profiles',
      action: '-10',
    },
    { name: '+10 Profiles', action: '10' },
  ]);
  addEventListener('popstate', () => {
    fetchPage(null, true);
  });
}

function createButton(arr) {
  const div = document.createElement('div');
  for (let i = 0; i < arr.length; i++) {
    const button = document.createElement('button');
    button.classList.add('explore-btn');
    button.textContent = arr[i].name;
    button.dataset.action = arr[i].action;
    div.appendChild(button);
  }
  document.querySelector('ul.navbar-nav.d-none.d-md-flex').after(div);
  div.addEventListener('click', handleClick);
}

function handleClick(e) {
  if (e.target.nodeName === 'BUTTON' && loadingNewPage === false) {
    const buttons = document.getElementsByClassName('explore-btn');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    createNotification('Loading');
    const action = e.target.dataset.action;
    fetchPage(action);
  } else if (loadingNewPage === true) {
    alert(
      'Searching next available profile, buttons are deactivated in the mean time.'
    );
  }
}

function fetchPage(action, popstate) {
  loadingNewPage = true;
  // prettier-ignore
  const num =
    popstate === true
      ? +new URLSearchParams(location.search).get('id')
      : isNaN(action)
        ? getRandNum()
        : getNum(action);

  if (document.getElementById('checking')) {
    document.getElementById('checking').textContent = 'Checking ' + num;
  }
  const url = 'https://moodle.ksasz.ch/user/profile.php?id=' + num;
  fetch(url)
    .then(e => e.text())
    .then(e => {
      const parsed = new DOMParser().parseFromString(e, 'text/html');
      const deleted = document.querySelector(
        'div.alert.alert-danger.alert-block.fade.in'
      );

      try {
        if (
          parsed.querySelector('div.alert.alert-danger.alert-block.fade.in')
        ) {
          throw new Error('Deleted Profile');
        }
        if (!popstate) {
          history.pushState({}, '', url);
        }
        if (deleted === null) {
          document
            .getElementById('page-header')
            .replaceWith(parsed.getElementById('page-header'));
          document
            .getElementById('region-main-box')
            .replaceWith(parsed.getElementById('region-main-box'));

          document
            .querySelector('meta[name="keywords"]')
            .replaceWith(parsed.querySelector('meta[name="keywords"]'));
          const users = document
            .querySelector('span[id^="label_2_3"]')
            ?.closest('li');
          if (users !== null && users !== undefined) {
            users.parentElement.removeChild(users);
          }

          const parsedUsers = parsed
            .querySelector('span[id^="label_2_3"]')
            ?.closest('li');
          if (parsedUsers !== null && parsedUsers !== undefined) {
            document
              .querySelector('li[aria-labelledby="label_2_4"]')
              .after(parsedUsers);
          }
        } else {
          document
            .getElementById('page')
            .replaceWith(parsed.getElementById('page'));
          dispatchEvent(new Event('cleanMoodleRewrite'));
          dispatchEvent(new Event('customIconsRewrite'));
          dispatchEvent(new Event('moreSidebarLinks'));
        }

        if (document.getElementById('notification') !== null) {
          document.body.removeChild(document.getElementById('notification'));
        }
        const buttons = document.getElementsByClassName('explore-btn');
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].disabled = false;
        }
        document.title = parsed.title;
        dispatchEvent(new Event('firstLastLogin'));
        dispatchEvent(new Event('sortProfiles'));
        loadingNewPage = false;
      } catch {
        GM_setValue(num, 1);
        fetchPage(action);
      }
    });
}

function getNum(action) {
  const url = new URLSearchParams(location.search).get('id');

  action = +action;
  let num = +url + action;

  const plusOrMinus = +action > 0 ? 1 : -1;
  while (GM_getValue(num) === 1) {
    if (num > GM_getValue('to')) {
      num = GM_getValue('from');
      break;
    }
    if (num < GM_getValue('from')) {
      num = GM_getValue('to');
      break;
    }
    num += plusOrMinus;
  }
  if (num > GM_getValue('to')) {
    num = GM_getValue('from');
  }
  if (num < GM_getValue('from')) {
    num = GM_getValue('to');
  }
  return num;
}

function getRandNum() {
  const genRandNum = () =>
    Math.floor(
      Math.random() * (GM_getValue('to') + 1 - GM_getValue('from')) +
        GM_getValue('from')
    );
  let randNum = genRandNum();
  while (GM_getValue(randNum) === 1) randNum = genRandNum();
  return randNum;
}

if (/^\/exploreprofiles\/index\/?$/i.test(location.pathname)) {
  while (document.body.lastChild)
    document.body.removeChild(document.body.lastChild);
  document.title = 'Index deleted profiles';
  history.replaceState({}, '', '/exploreProfiles/index/');

  const button = document.createElement('button');
  button.textContent = 'Start indexing';
  button.addEventListener('click', index);
  document.body.appendChild(button);

  const icon = document.createElement('link');
  icon.rel = 'shortcut icon';
  icon.href =
    'https://moodle.ksasz.ch/theme/image.php/classic/theme/1588340020/favicon';
  document.head.appendChild(icon);

  GM_addStyle(
    'button{margin-left:10px}.progressBar{width:1%;height:20px;background-color:#4caf50;margin-top:50px}.progressOuter{margin-left:10px;margin-right:10px;background-color:#ddd}.progressBar,.progressOuter{border-radius:2.5px}.progressCalc > *{display:inline}.progressCalc{margin-top:10px;margin-left:10px}.history{margin-left:10px;margin-top:50px}.history > *{position:relative}body{font-family:sans-serif}.animate{animation:fadeout 1.5s ease-in;opacity:0}@keyframes fadeout{from{opacity:1}to{opacity:0}}'
  );
}

async function index(e) {
  document.body.removeChild(e.target);
  e.preventDefault();
  e.stopPropagation();
  const values = GM_listValues();
  for (let i = 0; i < values.length; i++) {
    if (isNaN(values[i])) continue;
    else GM_deleteValue(values[i]);
  }

  const progress = document.createElement('div');
  progress.classList.add('progressBar');
  const progressOuter = document.createElement('div');
  progressOuter.classList.add('progressOuter');
  progressOuter.appendChild(progress);
  document.body.appendChild(progressOuter);

  const progressCalc = document.createElement('div');
  const progressCalcVal = document.createElement('div');
  const progressCalcPercent = document.createElement('div');
  progressCalc.classList.add('progressCalc');
  progressCalcVal.textContent = 0;
  progressCalc.appendChild(progressCalcVal);
  progressCalc.appendChild(
    document.createTextNode(' / ' + GM_getValue('to') + ' = ')
  );
  progressCalcPercent.textContent = '0%';
  progressCalc.appendChild(progressCalcPercent);
  document.body.appendChild(progressCalc);

  const historyNames = document.createElement('div');
  historyNames.classList.add('history');
  document.body.appendChild(historyNames);

  addEventListener('beforeunload', prevent);

  for (let i = GM_getValue('from'); i <= GM_getValue('to'); i++) {
    const url = 'https://moodle.ksasz.ch/user/profile.php?id=' + i;
    await fetch(url)
      .then(e => e.text())
      .then(e => {
        const parsed = new DOMParser().parseFromString(e, 'text/html');
        const deleted = [
          ...parsed.getElementsByClassName(
            'alert alert-danger alert-block fade in'
          ),
        ].some(e => e.nodeName === 'DIV');

        if (deleted) {
          GM_setValue(i, 1);
        } else {
          const div = document.createElement('div');
          div.textContent = parsed.getElementsByTagName('h1')[0].textContent;
          div.style.color = '#4caf50';
          GM_deleteValue(i);
          div.addEventListener(
            'animationend',
            () => {
              historyNames.removeChild(div);
            },
            {
              once: true,
            }
          );
          historyNames.appendChild(div);
          div.classList.add('animate');
        }

        progressCalcVal.textContent = i;
        progressCalcPercent.textContent =
          Math.floor((i / GM_getValue('to')) * 100) + '%';
        progress.style.width =
          ((i / GM_getValue('to')) * 99 + 1).toFixed(3) + '%';
      });
  }
  removeEventListener('beforeunload', prevent);
  location.href = 'https://moodle.ksasz.ch/';
}

function prevent(e) {
  e.preventDefault();
  e.returnValue = '';
}

function createNotification(text) {
  if (document.getElementById('notification') !== null) {
    document.body.removeChild(document.getElementById('notification'));
  }
  const notification = document.createElement('div');
  notification.id = 'notification';

  const centerNotification = document.createElement('div');
  centerNotification.classList.add('centerNotification');

  const outerText = document.createElement('div');
  outerText.classList.add('outerText');

  const middleText = document.createElement('div');
  middleText.classList.add('middleText');

  const firstText = document.createElement('div');
  firstText.classList.add('innerText');
  const icon = document.createElement('i');
  icon.classList.add('icon', 'fa', 'fa-circle-o-notch', 'fa-spin', 'fa-fw');
  firstText.appendChild(icon);
  firstText.append(text);

  const checking = document.createElement('div');
  checking.classList.add('innerText', 'small', 'loadingPeriods');
  checking.id = 'checking';

  middleText.appendChild(firstText);
  middleText.appendChild(checking);

  outerText.appendChild(middleText);
  centerNotification.appendChild(outerText);
  notification.appendChild(centerNotification);
  document.body.appendChild(notification);
}
