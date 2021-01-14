// ==UserScript==
// @name         Unconfirmed Marks Preact
// @version      2021.01.14a
// @author       lusc
// @include      *://moodle.ksasz.ch/
// @include      *://moodle.ksasz.ch/?*
// @updateURL    https://github.com/melusc/moodle_userscripts/raw/master/dist/Unconfirmed%20Marks/Unconfirmed%20Marks%20Preact.user.js
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @grant        GM_deleteValue
// @run-at       document-start
// @connect      www.schul-netz.com
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

const init = () => {
  const main = document.querySelector('#region-main ul.section');
  const li = document.createElement('li');
  li.id = 'module-marks';
  li.className = 'activity label modtype_label';
  const timetablev5 = document.getElementById('module-timetable-v5');
  timetablev5 ? timetablev5.after(li) : main.prepend(li);
  render(h(SchulNetzMarks, null), li);
  GM_addStyle(`@-webkit-keyframes ucmr-spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg)}}@-moz-keyframes ucmr-spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg)}}@-o-keyframes ucmr-spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg)}}@keyframes ucmr-spin{0%{-webkit-transform:rotate(0deg);-moz-transform:rotate(0deg);-ms-transform:rotate(0deg);-o-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(360deg);-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-o-transform:rotate(360deg)}}#module-marks{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%;cursor:default;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent;word-break:break-word}#module-marks *{box-sizing:border-box}#module-marks .login{display:flex;flex-direction:column;justify-content:center;width:max-content}#module-marks .login button,#module-marks .login input{flex:0 0 100%;margin:3px 0;padding:.2em .5em}#module-marks .ucmr-error,#module-marks .ucmr-title{font-size:large;font-weight:450}#module-marks .ucmr-title{margin-bottom:10px}#module-marks .ucmr-error{color:#ff4136}#module-marks .ucmr-circle-notch{width:1em;height:1em;animation:ucmr-spin 2s infinite linear}#module-marks .ucmr-row{display:flex;flex-direction:row}#module-marks .ucmr-course{flex-basis:30%}#module-marks .ucmr-name{flex-basis:45%}#module-marks .ucmr-date{flex-basis:15%}#module-marks .ucmr-mark{flex-basis:10%}`);
};

const SvgCircleNotch = () => h("svg", {
  "aria-hidden": "true",
  "class": "ucmr-circle-notch ucmr-spin",
  viewBox: "0 0 512 512"
}, h("path", {
  fill: "currentColor",
  d: "M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"
}));

class SchulNetzMarks extends Component {
  state = {
    marks: [],
    loading: true,
    error: false,
    errorMsg: '',
    loggedOut: false
  };
  inputs = {
    login: null,
    password: null,
    page: null
  };
  render = (_props, {
    marks,
    loading,
    error,
    errorMsg,
    loggedOut
  }) => h("div", {
    "class": "mod-indent-outer"
  }, h("div", {
    "class": "contentwithoutlink"
  }, h("div", {
    "class": "ucmr-title"
  }, "Unconfirmed Marks"), loading && !error && h(SvgCircleNotch, null), !loggedOut && !error && Array.isArray(marks) && h("div", null, Array.isArray(marks) && marks.map(({
    key,
    course,
    name,
    date,
    mark
  }) => h("div", {
    key: key,
    "class": "ucmr-row"
  }, h("div", {
    "class": "ucmr-course"
  }, course), h("div", {
    "class": "ucmr-name"
  }, name), h("div", {
    "class": "ucmr-date"
  }, date), h("div", {
    "class": "ucmr-mark"
  }, mark)))), loggedOut && h("div", {
    "class": "login"
  }, h("input", {
    "class": "form-control",
    required: true,
    ref: e => {
      this.inputs.login = e;
    },
    placeholder: "Username",
    type: "text"
  }), h("input", {
    "class": "form-control",
    required: true,
    ref: e => {
      this.inputs.password = e;
    },
    placeholder: "Password",
    type: "password"
  }), h("input", {
    "class": "form-control",
    required: true,
    ref: e => {
      this.inputs.page = e;
    },
    placeholder: "Page (ausserschwyz, einsiedeln...)",
    type: "text"
  }), h("button", {
    "class": "btn btn-primary",
    onclick: this.handleLogin
  }, "Save")), !loggedOut && marks === false && h("div", null, "Sie haben alle Noten best\xE4tigt."), error && h("div", {
    "class": "ucmr-error"
  }, errorMsg ?? 'Something went wrong')));
  handleLogin = () => {
    const login = this.inputs.login.value;
    const password = this.inputs.password.value;
    const page = this.inputs.page.value;

    if (login && password && page) {
      GM_setValue('login', login);
      GM_setValue('password', password);
      GM_setValue('page', page);
      this.setState({
        loggedOut: false,
        loading: true
      });
      this.getMarks();
    }
  };

  componentDidMount() {
    const login = GM_getValue('login');
    const password = GM_getValue('password');
    const page = GM_getValue('page');

    if (!login || !password || !page) {
      this.setState({
        loggedOut: true,
        loading: false
      });
    } else {
      this.getMarks();
    }
  }

  getMarks() {
    const login = GM_getValue('login');
    const password = GM_getValue('password');
    const page = GM_getValue('page');
    const loginPage = new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: 'GET',
        url: `https://www.schul-netz.com/${page}/loginto.php`,
        onload: resolve,
        anonymous: true,
        timeout: 10000,
        onerror: reject,
        onabort: reject,
        ontimeout: reject
      });
    });
    const frontPage = loginPage.then(res => {
      const parsed = new DOMParser().parseFromString(res.responseText, 'text/html');
      const data = new URLSearchParams();
      data.set('loginhash', parsed.querySelector('input[name="loginhash"]').value);
      data.set('login', login);
      data.set('passwort', password);
      const cookie = res.responseHeaders.match(/phpsessid=\w{26}(?=;)/giu).pop();
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: 'POST',
          url: `https://www.schul-netz.com/${page}/index.php?pageid=`,
          cookie,
          data: data.toString(),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          anonymous: true,
          timeout: 10000,
          onload: resolve,
          nocache: true,
          revalidate: true,
          onerror: reject,
          onabort: reject,
          ontimeout: reject
        });
      });
    }).catch(err => {
      console.error(err);
      this.setState({
        loggedOut: true,
        loading: false
      });
      ['login', 'password', 'page'].forEach(GM_deleteValue);
    });
    frontPage.then(res => {
      if (typeof res !== 'object' || res.cancelled) {
        return;
      }

      if (new URL(res.finalUrl).pathname.endsWith('loginto.php')) {
        ['login', 'password', 'page'].forEach(GM_deleteValue);
        this.setState({
          loggedOut: true,
          loading: false
        });
        return;
      }

      const parsed = new DOMParser().parseFromString(res.responseText, 'text/html');
      const h3 = [...parsed.querySelectorAll('h3.tabletitle')].find(e => e.textContent.toLowerCase().trim() === 'ihre letzten noten');
      const table = h3.nextElementSibling;
      const {
        rows
      } = table;
      const marks = [];
      let allConfirmed = false;

      for (let i = 0; i < rows.length; i++) {
        const [course, name, date, mark] = [...rows[i].children].map(e => e.textContent.trim());

        if (/sie haben alle noten bestätigt./i.test(course)) {
          this.setState({
            marks: false
          });
          allConfirmed = true;
          break;
        }

        marks.push({
          course,
          name,
          date,
          mark,
          key: uuidv4()
        });
      }

      if (!allConfirmed) {
        this.setState({
          marks
        });
      }

      this.setState({
        loading: false
      });
      const anchor = [...parsed.querySelectorAll('a.mdl-menu__item')].find(e => e.textContent.toLowerCase().trim() === 'abmelden');

      if (anchor) {
        GM_xmlhttpRequest({
          method: 'GET',
          url: `https://www.schul-netz.com/${page}/${anchor.getAttribute('href')}`,
          anonymous: true
        });
      }
    }).catch(err => {
      console.error(err);
      this.setState({
        error: true
      });
    });
  }

} // https://stackoverflow.com/a/2117523


const uuidv4 = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));

document.readyState === 'complete' ? init() : addEventListener('DOMContentLoaded', init, {
  once: true
});