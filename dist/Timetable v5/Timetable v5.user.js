// ==UserScript==
// @name         Moodle Timetable v5
// @version      2021.01.04a
// @author       lusc
// @updateURL    https://github.com/melusc/moodle_userscripts/raw/master/dist/Timetable%20v5/Timetable%20v5.user.js
// @include      *://moodle.ksasz.ch/
// @include      *://moodle.ksasz.ch/?*
// @include      *://moodle.ksasz.ch/timetable/v5*
// @grant        GM_addValueChangeListener
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @grant        GM_addStyle
// @grant        GM_notification
// @run-at       document-start
// _@require     https://cdn.jsdelivr.net/npm/htm@3.0.4/preact/standalone.umd.js
// @require      https://cdn.jsdelivr.net/npm/preact@10.5.7/dist/preact.min.js
// ==/UserScript==
// to switch forth and back between htmPreact and preact
// const { render, Component, html } = htmPreact;
// /* globals htmPreact: false */

/* globals preact: false, html: false */
const {
  render,
  Component,
  // eslint-disable-next-line no-unused-vars
  h
} = preact;
const MOODLE_ICON = 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2074%2051%22%3E%3Cpath%20fill%3D%22%23f98012%22%20d%3D%22M61.9%2050.3V27.4c0-4.8-2-7.2-5.9-7.2-4%200-5.9%202.4-5.9%207.2v22.9H38.4V27.4c0-4.8-1.9-7.2-5.8-7.2-4%200-5.9%202.4-5.9%207.2v22.9H15V26.1c0-5%201.7-8.8%205.2-11.3%203-2.3%207.2-3.4%2012.4-3.4%205.3%200%209.2%201.4%2011.6%204.1%202.2-2.7%206.1-4.1%2011.8-4.1%205.2%200%209.3%201.1%2012.4%203.4%203.5%202.6%205.2%206.3%205.2%2011.3v24.3H61.9z%22%2F%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M37.6%209.5L49.2%201%2049%20.6C28.1%203.1%2018.6%204.9.7%2015.4l.2.5h1.4c-.1%201.4-.4%205-.1%2010.4-2%205.8%200%209.7%201.8%2014%20.3-4.4.3-9.3-1.1-14.1-.3-5.3%200-8.8.1-10.2h11.9s-.1%203.6.4%207c10.7%203.7%2021.4%200%2027.1-9.2-1.7-1.9-4.8-4.3-4.8-4.3z%22%2F%3E%3C%2Fsvg%3E';
const NOTIFICATION_ICON = 'https://i.imgur.com/ZtPH8v7.png';

const initFrontpage = () => {
  GM_registerMenuCommand('Open settings', () => {
    open('/timetable/v5', '_blank');
  });
  GM_registerMenuCommand('Toggle holiday', () => {
    GM_setValue('isHoliday', !GM_getValue('isHoliday'));
  });
  GM_addStyle('.tt-title{font-weight:450;margin-bottom:10px}.tt-table,.tt-title{font-size:large}.tt-tr{display:flex}.tt-tr>*{flex:0 0 50%}.tt-th{font-weight:450}');
  const main = document.querySelector('#region-main-box ul.section');
  const li = document.createElement('li');
  li.id = 'module-timetable-v5';
  li.className = 'activity label modtype_label';
  main.prepend(li);
  render(h(FrontPage, null), li);
};

const initSettingsPage = () => {
  history.replaceState({}, '', '/timetable/v5');

  while (notNullOrUndef(document.head.lastChild)) {
    document.head.lastChild.remove();
  }

  while (notNullOrUndef(document.body.lastChild)) {
    document.body.lastChild.remove();
  }

  document.title = 'Moodle timetable v5';
  const icon = document.createElement('link');
  icon.rel = 'shortcut icon';
  icon.href = MOODLE_ICON;
  GM_addStyle('@keyframes save-failed{0%{border-color:#ff4126}to{border-color:#30363d}}@keyframes save-successful{0%{border-color:green}to{border-color:#30363d}}*,::after,::before{box-sizing:border-box}::after,::before{text-decoration:inherit;vertical-align:inherit}html{cursor:default;line-height:1.5;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word}body,button,input,ol ol,ol ul,select,ul ol,ul ul{margin:0}h1{font-size:2em;margin:.67em 0}hr{height:0;overflow:visible}a{background-color:transparent}img,svg{vertical-align:middle}img{border-style:none}svg:not([fill]){fill:currentColor}svg:not(:root){overflow:hidden}button{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}button,input{overflow:visible}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}[tabindex],a,button,input,label,select{-ms-touch-action:manipulation;touch-action:manipulation}[hidden]{display:none}body{padding-top:.3em;width:100%;min-height:100vh;font:20px sans-serif;background-color:#06090f}.container,.table-center{display:flex;flex-direction:column;align-items:center}.table-center{width:70%}.main-table{width:100%;margin-top:.5em}.table-cell.remove-row,body{color:#f0f6fcb3}.table-row{display:flex;width:100%;margin-bottom:.3em}.table-cell{width:50%;padding:.3em 1em;box-sizing:border-box;border:2px solid #30363d}.table-cell.entry,.table-cell.time{justify-content:center;align-items:center}.table-cell.time{display:grid;grid-template-columns:1fr auto 1fr;border-top-left-radius:2px;border-bottom-left-radius:2px}.table-cell.entry{border-top-right-radius:2px;border-bottom-right-radius:2px;display:flex;width:50%;flex-direction:column}.table-cell.entry>*{width:100%}.table-cell.entry [data-type=content]:empty::before{content:"Content";color:#8b949e}.table-cell.entry [data-type=id]:empty::before{content:"Course id";color:#8b949e}.table-cell.remove-row{width:1.5em;border:0;cursor:pointer;padding-left:0;padding-right:0;display:flex;align-items:center;justify-content:center}.time-input{margin-left:.5em;margin-right:.5em}.time-input.time-from{text-align:right}.time-input.time-to{text-align:left}[contenteditable]{cursor:text}.grid-buttons{display:grid;grid-template-columns:.3fr auto .3fr;justify-items:center;column-gap:5px;width:100%;margin-bottom:.3em;margin-top:.3em}.day-controls{display:flex;justify-content:space-evenly;align-items:center;grid-column-start:2;user-select:none;margin-right:1.5em}.caret-back,.caret-forward{width:1.5em;height:1.5em;cursor:pointer}.save-button{cursor:pointer;margin-left:auto;background:0 0;color:#f0f6fcb3;border:2px solid #30363d;border-radius:2px;padding:.2em 1.3em;font-size:90%}.icon-add-row,.row-icon-add-row{display:flex;justify-content:center;align-items:center}.icon-add-row{width:1.5em;height:1.5em;cursor:pointer;margin-right:1.5em}.row-icon-add-row{width:100%}.table-hidden{display:none}.invalid-input{color:#ff4126}.invalid-id{border-bottom-color:#ff4126}.suggestions{position:absolute;z-index:1;background-color:#0d1117;border:2px solid #30363d;border-radius:2px;padding:12px 20px;max-width:calc(35% - 2.7em)}.suggestions .emphasised{font-weight:700}.suggestions:empty{display:none}.suggestions .suggestion{display:flex;width:100%}.suggestions .suggestion:hover{text-decoration:underline}.suggestion-name{padding:2px 4px;border-radius:2px;cursor:pointer;flex:0 0 80%}.suggestion-id{flex:0 0 20%;text-align:end}.save-failed{animation:3s ease-in-out save-failed}.save-successful{animation:3s ease-in-out save-successful}');
  /* const style = document.createElement( 'link' );
    style.type = 'text/css';
  style.rel = 'stylesheet';
  style.href = 'http://localhost:5000/settingspage.css';
  document.head.append(style); */

  document.head.append(icon);
  const root = document.createElement('div');
  root.id = 'root';
  document.body.append(root);
  render(h(SettingsPage, null), root);
};

const SettingsPage = (() => {
  const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const createTable = () => {
    const defaultTimes = () => [{
      from: '08:00',
      parsedfrom: 480,
      parsedto: 525,
      to: '08:45'
    }, {
      from: '08:45',
      parsedfrom: 525,
      parsedto: 570,
      to: '09:30'
    }, {
      from: '09:50',
      parsedfrom: 590,
      parsedto: 635,
      to: '10:35'
    }, {
      from: '10:40',
      parsedfrom: 640,
      parsedto: 685,
      to: '11:25'
    }, {
      from: '11:30',
      parsedfrom: 690,
      parsedto: 735,
      to: '12:15'
    }, {
      from: '12:15',
      parsedfrom: 735,
      parsedto: 790,
      to: '13:10'
    }, {
      from: '13:10',
      parsedfrom: 790,
      parsedto: 835,
      to: '13:55'
    }, {
      from: '13:55',
      parsedfrom: 835,
      parsedto: 880,
      to: '14:40'
    }, {
      from: '14:50',
      parsedfrom: 890,
      parsedto: 935,
      to: '15:35'
    }, {
      from: '15:35',
      parsedfrom: 935,
      parsedto: 975,
      to: '16:15'
    }];

    const arr = [];

    for (let i = 0, l = DAYS.length; i < l; ++i) {
      const storedVal = GM_getValue('days')?.[i];

      if (notNullOrUndef(storedVal)) {
        arr[i] = storedVal.map(({
          from,
          to,
          content,
          id
        }) => ({
          from: parseTimeToString(from),
          parsedfrom: from,
          to: parseTimeToString(to),
          parsedto: to,
          id,
          content,
          uuid: generateUUIDv4()
        }));
      } else {
        arr[i] = defaultTimes();
      }
    }

    return arr;
  };

  let activeDay = new Date().getDay() - 1;

  if (activeDay === -1 || activeDay === 5) {
    activeDay = 0;
  }

  return class SettingsPage extends Component {
    state = {
      activeDay,
      tables: createTable(),
      focusedElement: {
        top: null,
        left: null,
        height: null,
        inputText: '',
        idInput: null,
        contentInput: null
      },
      courses: []
    };
    saveButtonRef = a => {
      this.saveButton = a;
    };

    render() {
      const {
        top,
        left,
        height,
        inputText // idInput,

      } = this.state.focusedElement;
      return [h("div", {
        "class": "container"
      }, h("div", {
        "class": "table-center"
      }, h("div", {
        "class": "grid-buttons"
      }, h(ButtonGrid, {
        day: DAYS[this.state.activeDay],
        handleSave: this.handleSave,
        saveButtonRef: this.saveButtonRef,
        handleClick: this.handleCaretClick
      })), h("div", {
        "class": "main-table",
        onKeyDown: this.handleTableKeyDown,
        onInput: this.handleTableInput,
        onClick: this.handleTableClick
      }, h(Table, {
        content: this.state.tables[this.state.activeDay],
        handleFocus: this.handleTableFocus
      }), h("div", {
        "class": "row-icon-add-row"
      }, h("div", {
        "class": "icon-add-row",
        onClick: this.createRow
      }, h(SvgIconAdd, null)))))), notNullOrUndef(top) // if top isn't null none are
      // && idInput.textContent.trim() === ''
      && h("div", {
        "class": "suggestions",
        style: {
          left,
          top: top + height
        },
        onClick: this.handleSuggestionsClick
      }, this.filterCourses(this.state.courses, inputText).map(({
        id,
        name
      }) => {
        const index = name.toLowerCase().indexOf(inputText);
        const before = name.slice(0, index);
        const after = name.slice(index + inputText.length);
        return h("div", {
          key: id,
          "class": "suggestion",
          "data-id": id
        }, h("div", {
          "class": "suggestion-name"
        }, before, h("span", {
          "class": "emphasised"
        }, name.slice(index, index + inputText.length)), after), h("div", {
          "class": "suggestion-id"
        }, id));
      }))];
    }

    handleSuggestionsClick = e => {
      const {
        target
      } = e;
      const suggestion = target.closest('.suggestion');

      if (suggestion) {
        const {
          idInput
        } = this.state.focusedElement;
        const {
          id
        } = suggestion.dataset;
        const inputRow = idInput.closest('.table-row');
        const table = inputRow.parentNode;
        const index = [...table.children].indexOf(inputRow);
        this.setState(state => {
          const {
            activeDay
          } = state;
          const obj = state.tables[activeDay];
          obj[index].id = id;
          return {};
        }, () => {
          focusTarget(this.state.focusedElement.contentInput);
        });
      }
    };
    componentDidMount = async () => {
      addEventListener('click', this.handleTableFocus);
      const userid = await getUserId();
      const token = await login();
      const bodyParams = new URLSearchParams();
      bodyParams.set('requests[0][function]', 'core_enrol_get_users_courses');
      bodyParams.set('requests[0][arguments]', `{"userid":"${userid}","returnusercount":false}`);
      bodyParams.set('wsfunction', 'tool_mobile_call_external_functions');
      bodyParams.set('wstoken', token);
      const responseJSON = await fetch('/webservice/rest/server.php?moodlewsrestformat=json', {
        method: 'POST',
        body: bodyParams.toString(),
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(e => e.json());

      if (responseJSON.hasOwnProperty('exception')) {
        return this.componentDidMount();
      }

      const data = JSON.parse(responseJSON.responses[0].data);
      const courses = [];

      for (let i = 0, l = data.length; i < l; ++i) {
        courses[i] = {
          id: data[i].id,
          name: data[i].fullname,
          uuid: generateUUIDv4()
        };
      }

      this.setState({
        courses
      });
      addEventListener('keydown', e => {
        if (e.ctrlKey && e.keyCode === 83) {
          e.preventDefault();
          e.stopImmediatePropagation();
          this.handleSave();
        }
      });
      return undefined;
    };
    filterCourses = (arr, inputText) => {
      const returnArr = [];
      const regex = new RegExp(inputText, 'i');

      for (let i = 0, l = arr.length; i < l; ++i) {
        if (regex.test(arr[i].name)) {
          returnArr.push({ ...arr[i],
            index: arr[i].name.toLowerCase().indexOf(inputText)
          });
        }
      }

      returnArr.sort(({
        index: indexA
      }, {
        index: indexB
      }) => indexA - indexB);
      return returnArr;
    };
    handleTableFocus = e => {
      const {
        target
      } = e;
      let idInput = null;
      let contentInput = null;
      let top = null;
      let left = null;
      let height = null;
      let inputText = '';

      if (target.dataset.type === 'id') {
        idInput = target;
        contentInput = target.parentNode.querySelector('[data-type="content"]');
      } else if (target.dataset.type === 'content') {
        idInput = target.parentNode.querySelector('[data-type="id"]');
        contentInput = target;
      }

      if (idInput) {
        // <from jquery>
        const rect = idInput.getBoundingClientRect();
        const win = idInput.ownerDocument.defaultView;
        top = rect.top + win.pageYOffset;
        left = rect.left + win.pageXOffset; // </from jquery>

        height = idInput.clientHeight;
        inputText = contentInput.textContent.trim().toLowerCase();
      }

      this.setState({
        focusedElement: {
          top,
          left,
          height,
          inputText,
          idInput,
          contentInput
        }
      });
    };
    handleSave = () => {
      let anyInvalid = false;
      let dayInvalid;
      const days = [];

      for (let i = 0, l = this.state.tables.length; i < l; ++i) {
        const table = this.state.tables[i];
        const day = [];
        days.push(day);

        for (let j = 0, l2 = table.length; j < l2; ++j) {
          const row = table[j];
          const {
            parsedfrom,
            parsedto,
            content,
            id
          } = row;
          const validRow = this.testRow(row);

          if (!validRow && !anyInvalid) {
            anyInvalid = true;
            dayInvalid = i;
          }

          const obj = {
            from: parsedfrom,
            to: parsedto
          };

          if (id) {
            obj.id = id;
          }

          if (content) {
            obj.content = content;
          }

          day.push(obj);
        }
      }

      const {
        saveButton
      } = this;
      saveButton.classList.remove('save-failed', 'save-successful');

      if (anyInvalid) {
        this.setState({
          activeDay: dayInvalid,
          notificationMsg: 'Found an invalid entry'
        });
        saveButton.classList.add('save-failed');
      } else {
        GM_setValue('days', { ...days
        });
        saveButton.classList.add('save-successful');
      }
    };
    testRow = ({
      from,
      to
    }) => {
      const fromValid = timeStringIsValid(from);
      const toValid = timeStringIsValid(to);
      return fromValid && toValid;
    };
    handleTableClick = e => {
      const {
        target
      } = e;
      const iconRemoveRow = target.closest('.remove-row');

      if (notNullOrUndef(iconRemoveRow)) {
        const curRow = target.closest('.table-row');
        const rowIndex = [...target.closest('.table').children].indexOf(curRow);
        this.setState(state => {
          const {
            activeDay
          } = state;
          state.tables[activeDay].splice(rowIndex, 1);
          return {
            tables: state.tables
          };
        });
      }
    };
    handleCaretClick = e => {
      const closestDiv = e.target.closest('div');

      if (isNullOrUndef(closestDiv)) {
        return;
      }

      const {
        classList
      } = closestDiv;

      if (classList.contains('caret-input')) {
        const type = classList.contains('caret-forward') ? 1 : -1;
        this.setState(state => {
          let activeDay = state.activeDay + type;

          if (activeDay < 0) {
            activeDay = 4;
          } else if (activeDay > 4) {
            activeDay = 0;
          }

          return {
            activeDay
          };
        });
      }
    };
    createRow = async () => {
      await new Promise(resolve => {
        this.setState(state => {
          const {
            tables
          } = state;
          tables[state.activeDay]?.push({
            uuid: generateUUIDv4()
          });
          return {
            tables
          };
        }, resolve);
      });
    };
    validateTimeOrder = arr => {
      for (let i = 0, l = arr.length; i < l; ++i) {
        const currentFrom = arr[i].parsedfrom;
        const currentTo = arr[i].parsedto;
        let curValid = true;

        if (Number.isInteger(currentFrom) && Number.isInteger(currentTo)) {
          if (currentFrom > currentTo) {
            arr[i].fromvalid = false;
            arr[i].tovalid = false;
            curValid = false;
          } else {
            delete arr[i].fromvalid;
            delete arr[i].tovalid;
          }
        }

        if (i !== 0) {
          const previousTo = arr[i - 1].parsedto;

          if (Number.isInteger(previousTo) && Number.isInteger(currentFrom)) {
            if (currentFrom < previousTo) {
              arr[i].fromvalid = false;
              arr[i - 1].tovalid = false;
            } else {
              if (curValid) {
                delete arr[i].fromvalid;
              }

              delete arr[i - 1].tovalid;
            }
          }
        }

        if (i < l - 1) {
          const nextFrom = arr[i + 1].parsedfrom;

          if (Number.isInteger(currentTo) && Number.isInteger(nextFrom)) {
            if (nextFrom < currentTo) {
              arr[i].tovalid = false;
              arr[i + 1].fromvalid = false;
            } else {
              if (curValid) {
                delete arr[i].tovalid;
              }

              delete arr[i + 1].fromvalid;
            }
          }
        }
      }
    };
    handleTableInput = e => {
      const {
        target
      } = e;
      const {
        classList
      } = target;
      const curRow = target.closest('.table-row');
      const parent = target.parentNode;

      if (isNullOrUndef(curRow)) {
        return;
      }

      const curIndex = [...curRow.parentNode.children].indexOf(curRow);
      const {
        anchorOffset
      } = getSelection();

      if (classList.contains('time-input')) {
        const time = target.textContent.trim();
        this.setState(state => {
          const {
            activeDay
          } = state;
          const obj = state.tables[activeDay][curIndex];
          obj[classList.contains('time-from') ? 'from' : 'to'] = time;
          obj[`parsed${classList.contains('time-from') ? 'from' : 'to'}`] = this.parseStringToTime(time);
          this.validateTimeOrder(state.tables[activeDay]);
          return {
            tables: state.tables
          };
        }, () => {
          focusTarget(target, anchorOffset);
        });
      } else if (parent.classList.contains('entry')) {
        this.handleTableFocus(e);
        this.setState(state => {
          const {
            activeDay
          } = state;
          const obj = state.tables[activeDay][curIndex];

          if (target.dataset.type === 'id') {
            obj.id = target.textContent;
          } else if (target.dataset.type === 'content') {
            obj.content = target.textContent;
          }

          return {
            tables: state.tables
          };
        }, () => {
          focusTarget(target, anchorOffset);
        });
      }
    };
    parseStringToTime = (() => {
      const input = document.createElement('input');
      input.type = 'time';
      return raw => {
        const str = raw.trim();

        if (/^\d{2}:\d{2}$/.test(str) === false) {
          return false;
        }

        input.value = str;

        if (input.value !== str) {
          return false;
        }

        const [hour, minute] = str.split(':');
        return +hour * 60 + +minute;
      };
    })();
    handleTableKeyDown = async e => {
      const {
        target
      } = e;

      if (e.keyCode === 13) {
        e.preventDefault();

        if (target.closest('.entry')) {
          const curRow = target.closest('.table-row');

          if (e.shiftKey) {
            if (target.dataset.type === 'content') {
              focusTarget(curRow.previousElementSibling?.querySelector('div.table-cell.entry > [data-type="id"]'));
            } else {
              focusTarget(target.parentNode.querySelector('[data-type="content"]'));
            }
          } else if (target.dataset.type === 'content') {
            focusTarget(target.parentNode.querySelector('[data-type="id"]'));
          } else {
            let nextRow = curRow.nextElementSibling;

            if (!nextRow) {
              await this.createRow();
              nextRow = curRow.nextElementSibling;
            }

            focusTarget(nextRow?.querySelector('div.table-cell.entry > [data-type="content"]'));
          }
        } else if (target.closest('.time')) {
          const curRow = target.closest('.table-row');

          if (e.shiftKey) {
            if (target.classList.contains('time-from')) {
              focusTarget(curRow.previousElementSibling?.querySelector('div.table-cell.time > .time-to'));
            } else {
              focusTarget(target.parentNode.querySelector('.time-from'));
            }
          } else if (target.classList.contains('time-from')) {
            focusTarget(target.parentNode.querySelector('.time-to'));
          } else {
            let nextRow = curRow.nextElementSibling;

            if (!nextRow) {
              await this.createRow();
              nextRow = curRow.nextElementSibling;
            }

            focusTarget(nextRow?.querySelector('div.table-cell.time > .time-from'));
          }
        }
      } else if (e.keyCode === 9) {
        if (target.classList.contains('entry')) {
          const curRow = target.closest('.table-row');

          if (isNullOrUndef(curRow.nextElementSibling)) {
            e.preventDefault();
            const table = curRow.parentNode;
            const firstRow = table.children[0];
            firstRow.querySelector('.time-from')?.focus();
          }
        }
      }
    };
  };
})();

const login = (() => {
  let cachedToken;
  return (noCache = false) => {
    if (cachedToken) {
      return cachedToken;
    }

    const storedToken = GM_getValue('token');
    const lastValidated = GM_getValue('lastValidatedToken');

    if (!cachedToken && storedToken && new Date().getTime() - lastValidated < 18000000) {
      // less than 5h
      cachedToken = Promise.resolve(storedToken); // to make it a Promise and as such "thenable"
    }

    if (noCache || !cachedToken) {
      const username = getVal('username', 'Username');
      const password = getVal('password', 'Password');
      const loginParams = new URLSearchParams();
      loginParams.set('username', username);
      loginParams.set('password', password);
      loginParams.set('service', 'moodle_mobile_app');
      cachedToken = fetch('/login/token.php', {
        method: 'POST',
        body: loginParams.toString(),
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      }).then(e => e.json()).then(response => {
        if (response.hasOwnProperty('errorcode')) {
          logout(true);
          return login(true);
        }

        GM_setValue('token', response.token);
        setLastValidatedToken();
        return response.token;
      });
    }

    return cachedToken;
  };
})();

const getUserId = async () => {
  const token = await login();
  const bodyParams = new URLSearchParams();
  bodyParams.set('wsfunction', 'core_webservice_get_site_info');
  bodyParams.set('wstoken', token);
  const responseJSON = await fetch('/webservice/rest/server.php?moodlewsrestformat=json', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: bodyParams.toString()
  }).then(res => res.json());

  if (responseJSON.hasOwnProperty('exception')) {
    logout();
    return getUserId();
  }

  return responseJSON.userid;
};

const logout = (removeCredentials = false) => {
  ['token', 'lastValidatedToken'].map(GM_deleteValue);

  if (removeCredentials) {
    ['username', 'password'].map(GM_deleteValue);
  }
};

const setLastValidatedToken = () => GM_setValue('lastValidatedToken', new Date().getTime());

class ButtonGrid extends Component {
  render() {
    return [h("div", {
      "class": "day-controls",
      onClick: this.props.handleClick
    }, h("div", {
      "class": "caret-input caret-back"
    }, h(SvgIconCaretBack, null)), h("div", null, this.props.day), h("div", {
      "class": "caret-input caret-forward"
    }, h(SvgIconCaretForward, null))), h("button", {
      "class": "save-button",
      onClick: this.props.handleSave,
      ref: this.props.saveButtonRef,
      onAnimationEnd: this.removeAnimation
    }, "Save")];
  }

  removeAnimation = ({
    target
  }) => {
    target?.classList?.remove('save-failed', 'save-successful');
  };
}

const SvgIconX = () => h("svg", {
  viewBox: "0 0 512 512"
}, h("path", {
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-width": "32",
  d: "M368 368L144 144m224 0L144 368"
}));

const SvgIconCaretBack = () => h("svg", {
  viewBox: "0 0 512 512"
}, h("path", {
  fill: "currentColor",
  d: "M321.94 98L158.82 237.78a24 24 0 000 36.44L321.94 414c15.57 13.34 39.62 2.28 39.62-18.22v-279.6c0-20.5-24.05-31.56-39.62-18.18z"
}));

const SvgIconCaretForward = () => h("svg", {
  viewBox: "0 0 512 512"
}, h("path", {
  fill: "currentColor",
  d: "M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z"
}));

const SvgIconAdd = () => h("svg", {
  viewBox: "0 0 512 512"
}, h("path", {
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-width": "32",
  d: "M256 112v288m144-144H112"
}));

class Table extends Component {
  render() {
    return h("div", {
      "class": "table",
      onFocus: this.props.handleFocus
    }, this.props.content?.map(({
      from,
      to,
      content,
      id,
      fromvalid,
      tovalid,
      uuid
    }) => [" ", h("div", {
      key: uuid,
      "class": "table-row"
    }, h("div", {
      "class": "table-cell time"
    }, h("span", {
      "class": `time-input time-from${timeStringIsValid(from) && fromvalid !== false ? '' : ' invalid-input'}`,
      suppressContentEditableWarning: true,
      contentEditable: true
    }, from), "-", h("span", {
      "class": `time-input time-to${timeStringIsValid(to) && tovalid !== false ? '' : ' invalid-input'}`,
      suppressContentEditableWarning: true,
      contentEditable: true
    }, to)), h("div", {
      "class": "table-cell entry"
    }, h("span", {
      suppressContentEditableWarning: true,
      contentEditable: true,
      "data-type": "content"
    }, content), h("hr", null), h("span", {
      suppressContentEditableWarning: true,
      contentEditable: true,
      "data-type": "id"
    }, id)), h("div", {
      "class": "table-cell remove-row"
    }, h(SvgIconX, null)))]));
  }

}

const generateUUIDv4 = a => a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, generateUUIDv4);

const FrontPage = (() => {
  const currentDay = new Date().getDay();
  let currentVals = (GM_getValue('days')?.[currentDay - 1] ?? []).map(e => ({ ...e,
    uuid: generateUUIDv4()
  })); // - 1 because monday is 0
  // but in javascript dates monday would be 1 with sunday as 0

  const BEFORELESSONS = 'BEFORELESSONS';
  const AFTERLESSONS = 'AFTERLESSONS';
  const DURINGLESSONS = 'DURINGLESSONS';
  return class FrontPage extends Component {
    state = {
      curCourse: 1,
      tableRows: [],
      isHoliday: GM_getValue('isHoliday') ?? (GM_setValue('isHoliday', false), false),
      isEmpty: false,
      type: null
    };
    timeout = null;
    componentDidMount = () => {
      GM_addValueChangeListener('days', () => {
        currentVals = GM_getValue('days')?.[currentDay - 1] ?? [];
        this.clearTimeout(); // it will set another timeout if necessary
        // and if not it would never be cleared so it gets
        // cleared here

        this.updateCourse();
      });
      GM_addValueChangeListener('isHoliday', () => {
        this.clearTimeout(); // see above

        this.setState({
          isHoliday: GM_getValue('isHoliday')
        });

        if (!GM_getValue('isHoliday')) {
          this.updateCourse();
        }
      });

      if (!this.state.isHoliday) {
        this.updateCourse();
      }
    };
    clearTimeout = () => {
      clearTimeout(this.timeout);
      this.timeout = null;
    };

    updateCourse(notify) {
      if (currentVals.length === 0) {
        this.setState({
          isEmpty: true
        });
        return;
      }

      const curTime = new Date();
      const curTimeInMinutes = curTime.getHours() * 60 + curTime.getMinutes() + curTime.getSeconds() / 60 + curTime.getMilliseconds() / 60 / 1000;
      const totalFrom = currentVals[0].from;
      const totalTo = currentVals[currentVals.length - 1].to;

      if (curTimeInMinutes < totalFrom) {
        this.setState({
          type: BEFORELESSONS,
          tableRows: [currentVals[0]]
        });
        const nextDate = new Date();
        const nextInMinutesSinceMidnight = currentVals[0].from;
        const nextMinutes = nextInMinutesSinceMidnight % 60;
        const nextHours = Math.floor(nextInMinutesSinceMidnight / 60);
        nextDate.setHours(nextHours, nextMinutes, 0, 0);
        this.clearTimeout();
        this.timeout = setTimeout(() => {
          this.updateCourse(true);
        }, nextDate.getTime() - curTime.getTime());
      } else if (curTimeInMinutes >= totalTo) {
        this.setState({
          type: AFTERLESSONS
        });
      } else {
        let curIndex = 0;

        while (currentVals[curIndex].to < curTimeInMinutes) {
          ++curIndex;
        }

        const curVal = currentVals[curIndex];
        const nextVal = currentVals[curIndex + 1];
        this.setState({
          type: DURINGLESSONS,
          tableRows: [curVal, nextVal]
        });

        if (!this.state.isHolidy && curVal && notify && curVal.hasOwnProperty('content')) {
          GM_notification({
            text: curVal.content,
            title: 'Now',
            image: NOTIFICATION_ICON,
            timeout: 4000,
            silent: true,

            onclick() {
              open(curVal.hasOwnProperty('id') ? `/course/view.php?id=${curVal.id}` : '/');
            }

          });
        }

        const nextInMinutesSinceMidnight = currentVals[curIndex].to;
        const nextDate = new Date();
        const nextHours = Math.floor(nextInMinutesSinceMidnight / 60);
        const nextMinutes = nextInMinutesSinceMidnight % 60;
        nextDate.setHours(nextHours, nextMinutes, 0, 0);
        this.clearTimeout();
        this.timeout = setTimeout(() => {
          this.updateCourse(true);
        }, nextDate.getTime() - curTime.getTime());
      }
    }

    render(_props, {
      isEmpty,
      isHoliday,
      type,
      tableRows
    }) {
      const isWeekend = currentDay === 0 || currentDay === 6;
      return h("div", null, h("div", {
        "class": "mod-indent-outer"
      }, h("div", {
        "class": "contentwithoutlink"
      }, h("div", {
        "class": "no-overflow"
      }, h("hr", null), h("div", null, h("div", {
        "class": "tt-title"
      }, "Timetable"), h("div", {
        "class": "tt-table"
      }, h("div", {
        "class": "tt-tbody"
      }, !isWeekend && isHoliday === false && type === BEFORELESSONS && h(TimetableRow, {
        values: {
          content: 'No lesson'
        }
      }), !isWeekend && isHoliday === false && type === AFTERLESSONS && h("div", {
        "class": "tt-title"
      }, "No school anymore"), isWeekend && isHoliday === false && h("div", {
        "class": "tt-title"
      }, "Weekend"), isHoliday && h("div", {
        "class": "tt-title"
      }, "Holiday"), !isWeekend && isEmpty === false && isHoliday === false && type === DURINGLESSONS && tableRows?.map((curVal, idx) => curVal && h(TimetableRow, {
        key: curVal.uuid,
        values: curVal,
        isNow: idx === 0
      })), isEmpty && !isWeekend && [" Todays timetable is empty, you can update it", h("a", {
        href: "/timetable/v5",
        rel: "noreferrer",
        target: "_blank"
      }, "here")]))), h("hr", null)))));
    }

  };
})();

class TimetableRow extends Component {
  render = ({
    values,
    isNow
  }) => notNullOrUndef(values) && h("div", {
    "class": "tt-tr"
  }, h("div", {
    "class": "tt-th"
  }, isNow ? 'Now ' : 'Next ', notNullOrUndef(values.from) && `(${parseTimeToString(values.from)} - ${parseTimeToString(values.to)})`, ":"), h("div", {
    "class": "tt-td"
  }, values.hasOwnProperty('id') && values.id !== '' ? h("a", {
    href: `/course/view.php?id=${values.id}`,
    target: "_blank",
    rel: "noreferrer"
  }, values.content) : values.content ?? 'Free lesson'));
}

const notNullOrUndef = val => val !== null && val !== undefined;

const isNullOrUndef = val => val === null || val === undefined;

const parseTimeToString = int => {
  if (isNaN(int)) {
    return false;
  }

  const minutes = +int % 60;
  const hours = Math.floor(+int / 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const timeStringIsValid = (() => {
  const input = document.createElement('input');
  input.type = 'time';
  return raw => {
    const str = `${raw}`.trim();

    if (/^\d{2}:\d{2}$/.test(str) === false) {
      return false;
    }

    input.value = str;
    return input.value === str;
  };
})();

const getVal = (name, promptMsg) => {
  const tmVal = GM_getValue(name);

  if (notNullOrUndef(tmVal)) {
    return tmVal;
  }

  const promptedVal = prompt(promptMsg);
  GM_setValue(name, promptedVal);
  return promptedVal;
};

const focusTarget = (target, offset) => {
  if (notNullOrUndef(target)) {
    const range = new Range();
    const sel = getSelection();
    const start = +(offset ?? target.textContent.length);
    target.focus();
    range.setStart(target.childNodes[0] ?? target, start);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
};

const functionToRun = /^\/timetable\/v5/iu.test(location.pathname) ? initSettingsPage : initFrontpage;
document.readyState === 'complete' ? functionToRun() : addEventListener('DOMContentLoaded', functionToRun, {
  once: true
});