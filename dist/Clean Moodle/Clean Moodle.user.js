// ==UserScript==
// @name         Clean Moodle with Preact
// @version      2021.01.12b
// @author       lusc
// @include      *://moodle.ksasz.ch/*
// @updateURL    https://github.com/melusc/moodle_userscripts/raw/master/dist/Clean%20Moodle/Clean%20Moodle.user.js
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_addValueChangeListener
// @run-at       document-start
// _@require     https://cdn.jsdelivr.net/npm/htm@3.0.4/preact/standalone.umd.js
// @require      https://cdn.jsdelivr.net/npm/preact@10.5.9/dist/preact.min.js
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

if (location.protocol !== 'https:') {
  location.protocol = 'https:';
}

const runOnlyOnceOnFrontpage = () => {
  const sidebar = getSidebar(document);
  GM_registerMenuCommand('Open settings', () => {
    open('https://moodle.ksasz.ch/cleanMoodlePreact/');
  });
  initFrontPage();

  if (isNullOrUndef(sidebar)) {
    return;
  }

  GM_addValueChangeListener('replace', refresh);
  GM_addValueChangeListener('remove', refresh);
  addEventListener('cleanMoodleReact', initFrontPage);
  const p = sidebar.previousSibling;
  const span = document.createElement('span');
  p.append(span);
  render(h(SvgSettingsGear, null), span);
};

const initFrontPage = () => {
  const sidebar = getSidebar(document);

  if (isNullOrUndef(sidebar)) {
    return;
  }

  const replaceObj = GM_getValue('replace');

  if (typeof replaceObj === 'object') {
    const replaceEntries = Object.entries(replaceObj);

    for (const item of replaceEntries) {
      replace(...item, sidebar);
    }
  } else {
    GM_setValue('replace', {});
  }

  const removeArr = GM_getValue('remove');

  if (Array.isArray(removeArr)) {
    for (const id of removeArr) {
      remove(id, sidebar);
    }
  } else {
    GM_setValue('remove', []);
  }

  sort(sidebar);
};

const SvgSettingsGear = () => h("a", {
  href: "/cleanMoodlePreact/",
  target: "_blank",
  rel: "noreferrer noopener",
  onClick: e => {
    e.stopPropagation();
  }
}, h("svg", {
  style: {
    marginLeft: '0.2em'
  },
  fill: "currentColor",
  "class": "icon svg-icon-gear",
  viewBox: "0 0 16 16"
}, h("path", {
  d: "M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319zM8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z"
})));

const replace = (id, newVal, sidebar) => {
  const anchor = getElem(id, sidebar);

  if (isNullOrUndef(anchor)) {
    testForInexistantCourse(id);
  } else if (anchor.childElementCount === 0) {
    anchor.textContent = newVal;
  } else {
    // because custom icons can use a span with an svg in it
    // so we need to be more specific about which span
    anchor.querySelector('span.item-content-wrap').textContent = newVal;
  }
};

const resetReplaced = (id, sidebar) => {
  const anchor = getElem(id, sidebar);

  if (isNullOrUndef(anchor)) {
    testForInexistantCourse(id);
  } else {
    const text = anchor.title;

    if (anchor.childElementCount === 0) {
      anchor.textContent = text;
    } else {
      // because custom icons can use a span with an svg in it
      // so we need to be more specific about which span
      anchor.querySelector('span.item-content-wrap').textContent = text;
    }
  }
};

const remove = (id, sidebar) => {
  const anchor = getElem(id, sidebar);

  if (isNullOrUndef(anchor)) {
    testForInexistantCourse(id);
  } else {
    const li = anchor.closest('li.type_course');

    if (!li.classList.contains('contains_branch')) {
      li.remove();
    }
  }
};

const sort = sidebar => {
  const children = [...sidebar.querySelectorAll(':scope > li.type_course')];
  quickSort(children, (a, b) => {
    const aText = a.firstElementChild.textContent.toLowerCase();
    const bText = b.firstElementChild.textContent.toLowerCase();
    return aText < bText ? -1 : aText > bText ? 1 : 0;
  });
  sidebar.prepend(...children);
};

const quickSort = (() => {
  const sortingUsingPivot = (arr, fn, left, right) => {
    const pivot = arr[right + left >>> 1];
    let l = left;
    let r = right;

    while (l <= r) {
      while (fn(arr[l], pivot) === -1) {
        l++;
      }

      while (fn(arr[r], pivot) === 1) {
        r--;
      }

      if (l <= r) {
        swap(arr, l, r);
        l++;
        r--;
      }
    }

    return l;
  };

  const swap = (arr, l, r) => {
    [arr[l], arr[r]] = [arr[r], arr[l]];
  };

  return (arr, fn, left = 0, right = arr.length - 1) => {
    let index;

    if (arr.length > 1) {
      index = sortingUsingPivot(arr, fn, left, right);

      if (left < index - 1) {
        quickSort(arr, fn, left, index - 1);
      }

      if (index < right) {
        quickSort(arr, fn, index, right);
      }
    }

    return arr;
  };
})();

const testDiff = (oldVal, newVal) => {
  if (Array.isArray(oldVal)) {
    if (Array.isArray(newVal)) {
      const addedOrChanged = newVal.filter(cur => oldVal.includes(cur) === false);
      const removed = oldVal.filter(cur => newVal.includes(cur) === false);
      return {
        addedOrChanged,
        removed
      };
    }

    location.reload();
  }

  const oldArr = Object.keys(oldVal);
  const newArr = Object.keys(newVal);
  const addedOrChanged = newArr.filter(id => oldArr.includes(id) === false || oldVal[id] !== newVal[id]);
  const removed = oldArr.filter(id => newArr.includes(id) === false);
  return {
    addedOrChanged,
    removed
  };
};

const refresh = (() => {
  let sidebar;
  return (name, oldValue, newValue, remote) => {
    if (remote === true) {
      if (!sidebar && !(sidebar = getSidebar(document))) {
        return;
      }

      const {
        removed: removedVals,
        addedOrChanged
      } = testDiff(oldValue, newValue);

      if (name === 'replace') {
        for (const item of removedVals) {
          resetReplaced(item, sidebar);
        }

        for (const item of addedOrChanged) {
          replace(item, newValue[item], sidebar);
        }

        sort(sidebar); // adding anchors leavers the sidebar potentially (slightly) unsorted
      } else if (name === 'remove') {
        for (const item of addedOrChanged) {
          remove(item, sidebar);
        } // removing anchors leaves the sidebar still sorted


        if (removedVals.length > 0) {
          getCourses().then(coursesObj => {
            for (const id of removedVals) {
              const fullname = coursesObj[id];

              if (!getElem(id, sidebar)) {
                const li = document.createElement('li');
                li.className = 'type_course depth_3 item_with_icon';
                li.tabIndex = -1;
                sidebar.prepend(li);
                render(h("p", {
                  "class": "tree_item hasicon",
                  role: "treeitem",
                  id: `expandable_branch_20_${id}`,
                  tabindex: "-1",
                  "aria-selected": "false"
                }, h("a", {
                  tabindex: "-1",
                  title: fullname,
                  href: `https://moodle.ksasz.ch/course/view.php?id=${id}`
                }, h("i", {
                  "class": "icon fa fa-graduation-cap fa-fw navicon",
                  "aria-hidden": "true",
                  tabindex: "-1"
                }), h("span", {
                  "class": "item-content-wrap",
                  tabindex: "-1"
                }, fullname))), li);
              }
            }

            sort(sidebar);
            dispatchEvent(new Event('customIconsPreact'));
          });
        }
      }
    }
  };
})();

const getCourses = (() => {
  let courses;
  return (noCache = false) => {
    if (noCache || !courses) {
      courses = Promise.all([login(), getUserId()]).then(([token, userid]) => {
        const bodyParams = new URLSearchParams();
        bodyParams.set('requests[0][function]', 'core_enrol_get_users_courses');
        bodyParams.set('requests[0][arguments]', JSON.stringify({
          userid,
          returnusercount: false
        }));
        bodyParams.set('wsfunction', 'tool_mobile_call_external_functions');
        bodyParams.set('wstoken', token);
        return fetch('/webservice/rest/server.php?moodlewsrestformat=json', {
          method: 'POST',
          body: bodyParams.toString(),
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then(e => e.json());
      }).then(responseJSON => {
        if (responseJSON.hasOwnProperty('exception')) {
          logout();
          return getCourses(true);
        }

        const data = JSON.parse(responseJSON.responses[0].data);
        const coursesObj = {};

        for (const {
          id,
          fullname
        } of data) {
          coursesObj[id] = fullname;
        }

        setLastValidatedToken();
        return coursesObj;
      });
    }

    return courses;
  };
})();

const getUserId = () => login() // because it can return a string or a promise and strings are not thenable
.then(token => {
  const bodyParams = new URLSearchParams();
  bodyParams.set('wsfunction', 'core_webservice_get_site_info');
  bodyParams.set('wstoken', token);
  return fetch('/webservice/rest/server.php?moodlewsrestformat=json', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    body: bodyParams.toString()
  });
}).then(res => res.json()).then(responseJSON => {
  if (responseJSON.hasOwnProperty('exception')) {
    logout();
    return getUserId();
  }

  setLastValidatedToken();
  return responseJSON.userid;
});

const setLastValidatedToken = () => GM_setValue('lastValidatedToken', new Date().getTime());

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
      cachedToken = getCredentials().then(({
        username,
        password
      }) => {
        const loginParams = new URLSearchParams();
        loginParams.set('username', username);
        loginParams.set('password', password);
        loginParams.set('service', 'moodle_mobile_app');
        return fetch('/login/token.php', {
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
      });
    }

    return cachedToken;
  };
})();

const getCredentials = () => new Promise(resolve => {
  const state = {
    active: true,
    callback: resolve
  };
  console.log('getCredentials', isFrontpage);
  const login = GM_getValue('login');
  const password = GM_getValue('password');

  if (login && password) {
    resolve({
      username: login,
      password
    });
  }

  if (isFrontpage) {
    if (typeof frontPageLoginSetState === 'function') {
      frontPageLoginSetState(state);
    } else {
      frontPageDefaultLoginState = state;
      const div = document.createElement('div');
      div.className = 'clean-moodle';
      document.body.append(div);
      render(h(FrontPageLogin, null), div);
      GM_addStyle('.clean-moodle .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.clean-moodle .card{pointer-events:auto}');
    }
  } else {
    settingsPageSetState({
      loggedOut: true,
      loggedOutCallback: resolve
    });
  }
});

let frontPageLoginSetState;
let frontPageDefaultLoginState = {};

class FrontPageLogin extends Component {
  state = frontPageDefaultLoginState;
  inputs = {};
  render = (_props, {
    active
  }) => active && h("div", {
    "class": "vertical-horizontal-center"
  }, h("div", {
    "class": "card"
  }, h("div", {
    "class": "card-body"
  }, h("h5", {
    "class": "card-title"
  }, "Clean Moodle Login"), h("input", {
    placeholder: "Username",
    required: true,
    "class": "input-group-text",
    ref: e => {
      this.inputs.login = e;
    }
  }), h("input", {
    placeholder: "Password",
    required: true,
    "class": "input-group-text",
    ref: e => {
      this.inputs.password = e;
    },
    type: "password"
  })), h("button", {
    "class": "btn btn-primary",
    onClick: this.handleClick
  }, "Login")));
  handleClick = () => {
    const login = this.inputs.login.value.trim();
    const password = this.inputs.password.value;

    if (login && password) {
      this.setState({
        active: false
      });
      this.state.callback({
        username: login,
        password
      });
    }
  };
  componentDidMount = () => {
    this.frontPageLoginState = state => {
      this.setState(state);
    };
  };
}

const logout = (removeCredentials = false) => {
  ['token', 'lastValidatedToken'].map(GM_deleteValue);

  if (removeCredentials) {
    ['username', 'password'].map(GM_deleteValue);
  }
};

const getElem = (id, sidebar) => sidebar.querySelector(`a[href="https://moodle.ksasz.ch/course/view.php?id=${id}"]`);

const testForInexistantCourse = id => {
  getCourses().then(courses => {
    if (!courses.hasOwnProperty(id)) {
      removeElementFromStorage(id);
      alert(`You appear to not be in the course with the id "${id}" anymore.\nThe course will not be checked for anymore`);
    }
  });
};

const initSettingsPage = () => {
  while (notNullOrUndef(document.body.lastChild)) {
    document.body.lastChild.remove();
  }

  history.replaceState({}, '', '/cleanMoodlePreact/');
  render(h(SettingsPage, null), document.body);

  while (notNullOrUndef(document.head.lastChild)) {
    document.head.lastChild.remove();
  }

  document.title = 'Clean Moodle Preact Setup';
  const link = document.createElement('link');
  link.rel = 'shortcut icon';
  link.href = '/theme/image.php/classic/theme/1588340020/favicon';
  document.head.append(link);
  GM_addStyle('html{cursor:default;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;word-break:break-word;background:#202020;color:#ccc;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";font-size:.9375rem;font-weight:400;line-height:1.5;user-select:none}img{border-style:none}button{overflow:visible}button,input{font-family:inherit;font-size:100%}button::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}*,::after,::before{box-sizing:border-box}::after,::before{text-decoration:inherit;vertical-align:inherit}body,button,input{margin:0}svg{vertical-align:middle}svg:not([fill]){fill:currentColor}svg:not(:root){overflow:hidden}button{-webkit-appearance:button;text-transform:none}input{overflow:visible}::-webkit-input-placeholder{color:inherit;opacity:.54}::-moz-focus-inner{border-style:none;padding:0}button,input{-ms-touch-action:manipulation;touch-action:manipulation}body{padding:1%}@media (min-width:0px){:root{--sidebar-flex:0 0 100%;--main-flex:0 0 100%;--padding-horizontal:0;--padding-vertical:0.5%}}@media (min-width:768px){:root{--sidebar-flex:0 0 32%;--main-flex:0 0 68%;--padding-horizontal:0.5%;--padding-vertical:0}}@media (min-width:992px){:root{--sidebar-flex:0 0 25%;--main-flex:0 0 75%}}@media (min-width:1200px){:root{--sidebar-flex:0 0 20%;--main-flex:0 0 80%}}.outerSidebar{flex:var(--sidebar-flex);padding-right:var(--padding-horizontal);padding-bottom:var(--padding-vertical)}.outerSidebar .sidebar{display:flex;flex-direction:column;padding:10px 15px;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.outerSidebar .row{cursor:pointer;display:flex;align-items:center;color:#198754}.outerSidebar .row:hover{text-decoration:underline}.outerSidebar .row.removed{color:#dc3545}.btn-save:not([disabled]){cursor:pointer}h5{font-size:18.75px;font-weight:300;margin:0 0 12px}.icon{height:1.5em;width:1.5em}.section-title{font-size:30px;font-weight:300;-webkit-font-smoothing:antialiased}.svg-icon-check{color:#198754}.svg-icon-x{color:#dc3545}.outerMain{flex:var(--main-flex);padding-left:var(--padding-horizontal);padding-top:var(--padding-vertical)}.main{padding:3% 2% 5%;border:1.5px solid #343434;border-radius:4px;background-color:#141414}.replace-flex-inputs{display:flex;flex-direction:column;margin-top:10px}.replace-flex-inputs *{align-self:flex-start;margin-bottom:10px}button,input{display:flex;align-items:center;padding:.375rem .75rem;font-size:.9375rem;font-weight:400;line-height:1.5;color:#495057;text-align:center;white-space:nowrap;background-color:#e9ecef;border:1px solid #8f959e;border-radius:.25rem}button{background-color:#1177d1;color:#ccc;margin-top:10px}.container{display:flex;flex-direction:row;flex-wrap:wrap;width:100%;height:max-content}');
  /* const style = document.createElement( 'link' );
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = 'http://localhost:5000/Clean%20Moodle/settingspage.css';
  document.head.append( style ); */
};

const SvgCheck = () => h("svg", {
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  "class": "icon svg-icon-check",
  viewBox: "0 0 24 24"
}, h("path", {
  d: "M5 12l5 5L20 7"
}));

const SvgX = () => h("svg", {
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  "class": "icon svg-icon-x",
  viewBox: "0 0 24 24"
}, h("path", {
  d: "M18 6L6 18M6 6l12 12"
}));

const SvgArrowBack = () => h("svg", {
  fill: "none",
  stroke: "currentColor",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "stroke-width": "2",
  "class": "icon svg-icon-arrow-back",
  viewBox: "0 0 24 24"
}, h("path", {
  d: "M9 11l-4 4 4 4m-4-4h11a4 4 0 000-8h-1"
}));

const Sidebar = ({
  handleClick,
  courses
}) => h("div", {
  "class": "outerSidebar"
}, h("div", {
  "class": "sidebar"
}, courses.map(({
  id,
  name,
  isReplaced,
  isRemoved
}) => h("div", {
  key: id,
  "class": `row${isRemoved ? ' removed' : ''}`,
  onClick: e => {
    handleClick(e, id);
  }
}, h("span", null, isRemoved ? h(SvgX, null) : h(SvgCheck, null), isReplaced === false ? name : isReplaced, isReplaced !== false && h(SvgArrowBack, null))))));

class Main extends Component {
  inputs = {};
  render = ({
    selected,
    handleInput,
    handleKeyDown,
    handleBtnClick,
    inputRef,
    loggedOut
  }) => {
    const {
      replacedText
    } = selected;
    return h("div", {
      "class": "outerMain"
    }, h("div", {
      "class": "main"
    }, !loggedOut && [h("div", {
      "class": "section-title"
    }, "Rename course"), h("div", {
      "class": "replace-flex-inputs"
    }, h("div", null, typeof selected.text === 'string' ? `Selected: ${selected.text}` : 'Select course to the left'), h("input", {
      placeholder: isNullOrUndef(replacedText) ? 'Select course to the left' : `Reset text to ${selected.text}`,
      "class": "replace-input",
      onInput: handleInput,
      onKeyDown: handleKeyDown,
      value: replacedText,
      disabled: isNullOrUndef(selected.id),
      ref: inputRef
    }), h("button", {
      disabled: isNullOrUndef(selected.id),
      onClick: handleBtnClick,
      "class": "btn-save"
    }, "Save"))], loggedOut && h("div", {
      "class": "replace-flex-input"
    }, h("h5", null, "Login"), h("input", {
      placeholder: "Username",
      ref: e => {
        this.inputs.login = e;
      }
    }), h("input", {
      placeholder: "Password",
      ref: e => {
        this.inputs.password = e;
      },
      type: "password"
    }), h("button", {
      "class": "btn-save",
      onClick: this.handleLoggedOutBtnClick
    }, "Login"))));
  };
  handleLoggedOutBtnClick = () => {
    const login = this.inputs.login.value.trim();
    const password = this.inputs.password.value;

    if (login && password) {
      this.props.loggedOutCallback({
        username: login,
        password
      });
    }
  };
}

let settingsPageSetState;

class SettingsPage extends Component {
  state = {
    courses: [],
    selected: {},
    loggedOut: false,
    loggedOutCallback: null
  };
  inputRef = a => {
    this.input = a;
  };
  render = (_props, {
    selected,
    courses,
    loggedOut
  }) => h("div", {
    "class": "container"
  }, h(Sidebar, {
    handleClick: this.handleSidebarClick,
    courses: courses
  }), h(Main, {
    inputRef: this.inputRef,
    selected: selected,
    handleBtnClick: this.handleBtnClick,
    handleInput: this.handleInput,
    handleKeyDown: this.handleKeyDown,
    loggedOut: loggedOut,
    loggedOutCallback: this.loggedOutCallbackHandler
  }));
  loggedOutCallbackHandler = vals => {
    this.setState({
      loggedOut: false,
      loggedOutCallback: null
    });
    this.state.loggedOutCallback(vals);
  };
  handleInput = e => {
    const {
      target
    } = e;

    if (notNullOrUndef(this.state.selected.id)) {
      this.setState(state => {
        const {
          selected
        } = state;
        selected.replacedText = target.value;
        return {
          selected
        };
      });
    }
  };
  handleKeyDown = e => {
    if (e.key === 'Enter') {
      this.handleBtnClick();
    }
  };
  handleBtnClick = () => {
    const {
      replacedText,
      id,
      text
    } = this.state.selected;
    setReplace(id, replacedText, text);
    this.updateCourses(id);
    this.input.value = '';
    this.setState({
      selected: {}
    });
  };
  updateCourses = id => {
    const {
      courses
    } = this.state;

    for (let i = 0; i < courses.length; ++i) {
      if (courses[i].id === id) {
        courses[i].isRemoved = checkIsRemoved(id);
        courses[i].isReplaced = checkIsReplaced(id);
        break;
      }
    }

    sortCoursesArr(courses);
    this.setState({
      courses
    });
  };
  handleSidebarClick = (e, id) => {
    const {
      target
    } = e;
    const svg = target.closest('svg');
    const row = target.closest('.row');

    if (notNullOrUndef(row)) {
      if (isNullOrUndef(svg)) {
        const {
          courses
        } = this.state;
        let text;

        for (let i = 0; i < courses.length; ++i) {
          if (courses[i].id === id) {
            text = courses[i].name;
            break;
          }
        }

        const replacedText = checkIsReplaced(id) || text;
        this.setState({
          selected: {
            text,
            id,
            replacedText
          }
        }, () => {
          const {
            input
          } = this;

          if (input) {
            input.focus();
            input.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
              inline: 'center'
            });
          }
        });
        removeElementFromStorage(id, {
          replace: false
        });
        this.updateCourses(id);
      } else {
        const svgCl = svg.classList;

        if (svgCl.contains('svg-icon-check') || svgCl.contains('svg-icon-x')) {
          const isRemoved = checkIsRemoved(id);
          setRemove(id, !isRemoved // toggle between removed and not
          );
          this.setState(state => {
            const selectedId = state.selected.id;

            if (selectedId === id) {
              this.input.value = '';
              return {
                selected: {}
              };
            }

            return {};
          });
        } else if (svgCl.contains('svg-icon-arrow-back')) {
          setReplace(id);
        }

        this.updateCourses(id);
      }
    }
  };
  componentDidMount = () => {
    settingsPageSetState = state => {
      this.setState(state);
    };

    getCourses().then(coursesObj => {
      const courses = Object.entries(coursesObj).map(([id, fullname]) => ({
        id,
        name: fullname,
        isReplaced: checkIsReplaced(id),
        isRemoved: checkIsRemoved(id)
      }));
      sortCoursesArr(courses);
      this.setState({
        courses
      });
    });
  };
}

const checkIsRemoved = id => GM_getValue('remove').includes(id);

const checkIsReplaced = id => {
  const replaceObj = GM_getValue('replace') ?? {};
  return typeof replaceObj[id] === 'string' && replaceObj[id];
};

const removeElementFromStorage = (id, {
  replace: updateReplaceStorage = true,
  remove: updateRemoveStorage = true
} = {}) => {
  const replaceObj = GM_getValue('replace') ?? {};
  const removeArr = (GM_getValue('remove') ?? []).filter(e => e !== id);
  delete replaceObj[id];

  if (updateReplaceStorage) {
    GM_setValue('replace', replaceObj);
  }

  if (updateRemoveStorage) {
    GM_setValue('remove', removeArr);
  }

  return {
    remove: removeArr,
    replace: replaceObj
  };
};

const setRemove = (id, addToRemovers) => {
  const removeArr = removeElementFromStorage(id, {
    remove: !addToRemovers
  }
  /* if it should be added to the removers
    and for whatever reason already in the removers
    removeElementFromStorage will remove it from that array
    but not update the storage, which this function will,
    avoids unnecessary updates to refresh() */
  ).remove;

  if (addToRemovers) {
    removeArr.push(id);
    sortRemoveArr(removeArr);
    GM_setValue('remove', removeArr);
  }
};

const sortRemoveArr = arr => arr.sort((a, b) => a - b);

const sortCoursesArr = courses => void quickSort(courses, (a, b) => {
  const aText = (typeof a.isReplaced === 'string' ? a.isReplaced : a.name).toLowerCase();
  const bText = (typeof b.isReplaced === 'string' ? b.isReplaced : b.name).toLowerCase();
  return aText < bText ? -1 : aText > bText ? 1 : 0;
});

const setReplace = (id, newVal, defaultVal) => {
  const replaceObj = removeElementFromStorage(id, {
    replace: false
  }).replace;

  if (typeof newVal === 'string' && typeof defaultVal === 'string') {
    const trimNewVal = newVal.trim();
    const trimDefaultVal = defaultVal.trim();

    if (trimNewVal !== '' && trimNewVal !== trimDefaultVal) {
      replaceObj[id] = trimNewVal;
    }
  }

  GM_setValue('replace', replaceObj);
};

const isNullOrUndef = val => val === undefined || val === null;

const notNullOrUndef = val => val !== undefined && val !== null;

const getSidebar = context => context.querySelector('li[aria-labelledby="label_2_4"] ul[role="group"]') ?? context.getElementById('label_3_21')?.closest('ul[role="group"]');

{
  // Because I changed the removers from an object to an array
  const removeVals = GM_getValue('remove');

  if (typeof removeVals === 'object' && !Array.isArray(removeVals)) {
    GM_setValue('remove', sortRemoveArr(Object.keys(removeVals)));
  }
}
let isFrontpage = true;

if (!/^\/customicons/iu.test(location.pathname)) {
  const functionToRun = /^\/cleanmoodlepreact/iu.test(location.pathname) ? (isFrontpage = false, initSettingsPage) : runOnlyOnceOnFrontpage;
  document.readyState === 'complete' ? functionToRun() : addEventListener('DOMContentLoaded', functionToRun, {
    once: true
  });
}