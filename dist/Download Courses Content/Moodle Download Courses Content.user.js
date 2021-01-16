// ==UserScript==
// @name         Moodle Download Course's Content
// @version      2021.01.16b
// @author       lusc
// @include      https://moodle.ksasz.ch/course/view.php?id=*
// @updateURL    https://github.com/melusc/moodle_userscripts/raw/master/dist/Download%20Courses%20Content/Moodle%20Download%20Courses%20Content.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @run-at       document-start
// @require      https://cdn.jsdelivr.net/npm/preact@10.5.10/dist/preact.min.js
// @require      https://cdn.jsdelivr.net/npm/jszip@3.5.0/dist/jszip.min.js
// @require      https://cdn.jsdelivr.net/npm/filesaver.js@1.3.4/FileSaver.min.js
// ==/UserScript==

/* globals preact: false, JSZip: false, saveAs: false */
const {
  render,
  h,
  Component
} = preact;

const init = () => {
  if (!document.querySelector('#region-main div.errorbox.alert.alert-danger')) {
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save contents to zip';
    saveButton.className = 'btn btn-secondary';
    document.querySelector('#page-header div.card > div.card-body > div.d-flex')?.append(saveButton);
    saveButton.addEventListener('click', initDownload);
  }
};

const initDownload = (event, noChache = false) => {
  event.preventDefault();
  event.stopImmediatePropagation();
  const {
    target
  } = event;

  if (target.disabled) {
    return;
  }

  target.disabled = true;
  target.textContent = '0.00%';
  login(noChache).then(token => {
    const courseId = new URLSearchParams(location.search).get('id');
    const requestParams = new URLSearchParams();
    requestParams.set('courseid', courseId);
    requestParams.set('options[0][name]', 'includestealthmodules');
    requestParams.set('options[0][value]', 1);
    requestParams.set('wstoken', token);
    fetch('/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_course_get_contents', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      body: requestParams.toString()
    }).then(e => e.json()).then(jsonPageContent => {
      if (jsonPageContent.hasOwnProperty('exception')) {
        logout();
        return initDownload(event, true);
      }

      setLastValidatedToken();
      const body = `wstoken=${token}`;
      const zipFile = new JSZip();

      for (let i = 0; i < jsonPageContent.length; ++i) {
        const section = jsonPageContent[i];
        const {
          modules,
          name: sectionName
        } = section;

        for (let j = 0; j < modules.length; ++j) {
          const module = modules[j];
          const {
            modname
          } = module;

          if (modname === 'resource' || modname === 'folder') {
            const {
              contents
            } = module;
            const folderName = module.name;

            for (let k = 0; k < contents.length; ++k) {
              const content = contents[k];
              const {
                fileurl,
                filename,
                filepath
              } = content;
              const date = new Date(content.timemodified * 1000);
              let zipFileName;

              if (modname === 'resource') {
                zipFileName = `${sectionName}/${filename}`;
              } else {
                zipFileName = `${sectionName}/${folderName}${filepath}${filename}`;
              }

              zipFile.file(zipFileName, fetch(fileurl, {
                body,
                method: 'POST',
                headers: {
                  'content-type': 'application/x-www-form-urlencoded'
                }
              }).then(e => e.blob()), {
                date
              });
            }
          } else if (modname === 'url') {
            const {
              url
            } = module;
            zipFile.file(`${sectionName}/${module.name}.url`, `[InternetShortcut]\nURL=${url}`);
          }
        }
      }

      zipFile.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {
          level: 9
        },
        comment: 'https://github.com/melusc/moodle_userscripts'
      }, ({
        percent
      }) => {
        target.textContent = `${percent.toFixed(2)}%`;
      }).then(blob => {
        saveAs(blob, `course-content-${courseId}.zip`);
        target.disabled = false;
        target.textContent = 'Save contents to zip';
      });
      return undefined;
    });
  });
};

const setLastValidatedToken = () => GM_setValue('lastValidatedToken', new Date().getTime());

const logout = (removeCredentials = false) => {
  ['token', 'lastValidatedToken'].forEach(GM_deleteValue);

  if (removeCredentials) {
    ['username', 'password'].forEach(GM_deleteValue);
  }
};

const login = (() => {
  let cachedToken;
  return (noCache = false) => {
    if (cachedToken && !noCache) {
      return cachedToken;
    }

    const storedToken = GM_getValue('token');
    const lastValidated = GM_getValue('lastValidatedToken');

    if (!cachedToken && storedToken && new Date().getTime() - lastValidated < 18000000) {
      // less than 5h
      cachedToken = Promise.resolve(storedToken); // to make it thenable
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
  const username = GM_getValue('username');
  const password = GM_getValue('password');

  if (username && password) {
    resolve({
      username,
      password
    });
  } else {
    const callback = ({
      username,
      password
    }) => {
      GM_setValue('username', username);
      GM_setValue('password', password);
      loginPopupSetState({
        isLoggedOut: false,
        loggedOutCallback: null
      });
      resolve({
        username,
        password
      });
    };

    const state = {
      isLoggedOut: true,
      loggedOutCallback: callback,
      usernameIsInvalid: false,
      passwordIsInvalid: false
    };

    if (typeof loginPopupSetState === 'function') {
      loginPopupSetState(state);
    } else {
      loginPopupDefaultState = state;
      const div = document.createElement('div');
      div.className = 'dcc';
      document.body.append(div);
      render(h(LoginPopup, null), div);
      GM_addStyle(`.dcc .vertical-horizontal-center{width:100%;height:100%;position:fixed;z-index:100000000;top:0;left:0;display:flex;align-items:center;justify-content:center;pointer-events:none}.dcc .card{pointer-events:auto}`);
    }
  }
});

let loginPopupDefaultState;
let loginPopupSetState;

class LoginPopup extends Component {
  state = loginPopupDefaultState;

  componentDidMount() {
    loginPopupSetState = state => {
      this.setState(state);
    };
  }

  inputs = {};
  render = (_props, {
    isLoggedOut,
    usernameIsInvalid,
    passwordIsInvalid
  }) => isLoggedOut && h("div", {
    class: "vertical-horizontal-center"
  }, h("div", {
    class: "card"
  }, h("div", {
    class: "card-body"
  }, h("h5", {
    class: "card-title"
  }, "Clean Moodle Login"), h("div", null, h("label", {
    for: "dcc-password",
    class: "form-label"
  }, "Username"), h("input", {
    onInput: this.handleInput,
    placeholder: "Username",
    required: true,
    id: "dcc-username",
    class: `input-group-text ${usernameIsInvalid ? 'is-invalid' : 'is-valid'}`,
    ref: e => {
      this.inputs.username = e;
    }
  }), h("div", {
    class: "invalid-feedback"
  }, "Please provide a username.")), h("div", null, h("label", {
    for: "dcc-password",
    class: "form-label"
  }, "Password"), h("input", {
    onInput: this.handleInput,
    placeholder: "Password",
    required: true,
    id: "dcc-password",
    class: `input-group-text ${passwordIsInvalid ? 'is-invalid' : 'is-valid'}`,
    ref: e => {
      this.inputs.password = e;
    },
    type: "password"
  }), h("div", {
    class: "invalid-feedback"
  }, "Please provide a password."))), h("button", {
    class: "btn btn-primary",
    onClick: this.handleClick
  }, "Login")));
  handleInput = ({
    target
  }) => {
    const {
      inputs
    } = this;

    if (target === inputs.username) {
      const username = inputs.username.value.trim();
      this.setState({
        usernameIsInvalid: !username
      });
    } else {
      const password = inputs.password.value;
      this.setState({
        passwordIsInvalid: !password
      });
    }
  };
  handleClick = () => {
    const username = this.inputs.username.value.trim();
    const password = this.inputs.password.value;

    if (username && password) {
      this.setState({
        loggedOut: false,
        loggedOutCallback: null
      });
      this.state.loggedOutCallback({
        username,
        password
      });
    } else {
      if (!username) {
        this.setState({
          usernameIsInvalid: true
        });
      }

      if (!password) {
        this.setState({
          passwordIsInvalid: true
        });
      }
    }
  };
}

document.readyState === 'complete' ? init() : addEventListener('DOMContentLoaded', init, {
  once: true
});