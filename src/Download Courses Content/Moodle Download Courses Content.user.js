// ==UserScript==
// @name         Moodle Download Course's Content
// @version      2021.01.16a
// @author       lusc
// @include      https://moodle.ksasz.ch/course/view.php?id=*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_addStyle
// @run-at       document-start
// @require      __preact_jsd
// @require      __JSZip_jsd
// @require      __FileSaver_jsd
// ==/UserScript==

/* globals preact: false, JSZip: false, saveAs: false */

const { render, h, Component } = preact;

const init = () => {
  if ( !document.querySelector( '#region-main div.errorbox.alert.alert-danger' ) ) {
    const saveButton = document.createElement( 'button' );
    saveButton.textContent = 'Save contents to zip';
    saveButton.className = 'dcc-button';
    document
      .querySelector( '#page-header div.card > div.card-body > div.d-flex' )
      ?.append( saveButton );

    saveButton.addEventListener(
      'click',
      initDownload
    );
  }
};

const initDownload = ( noChache = false ) => {
  login( noChache ).then( token => {
    const courseId = new URLSearchParams( location.search ).get( 'id' );
    const requestParams = new URLSearchParams();
    requestParams.set(
      'courseid',
      courseId
    );
    requestParams.set(
      'options[0][name]',
      'includestealthmodules'
    );
    requestParams.set(
      'options[0][value]',
      1
    );
    requestParams.set(
      'wstoken',
      token
    );

    fetch(
      '/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=core_course_get_contents',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: requestParams.toString(),
      }
    )
      .then( e => e.json() )
      .then( jsonPageContent => {
        if ( jsonPageContent.hasOwnProperty( 'exception' ) ) {
          logout();
          return initDownload( true );
        }
        setLastValidatedToken();
        console.log( jsonPageContent );

        const body = `wstoken=${ token }`;

        const zipFile = new JSZip();

        for ( let i = 0; i < jsonPageContent.length; ++i ) {
          const section = jsonPageContent[ i ];
          const { modules, name: sectionName } = section;

          for ( let j = 0; j < modules.length; ++j ) {
            const module = modules[ j ];
            const { modname } = module;
            if ( modname === 'resource' || modname === 'folder' ) {
              const { contents } = module;

              for ( let k = 0; k < contents.length; ++k ) {
                const content = contents[ k ];
                const { fileurl, filename, filepath } = content;
                const date = new Date( content.timemodified * 1000 );

                zipFile.file(
                  `${ sectionName }${ filepath }${ filename }`,
                  fetch(
                    fileurl,
                    {
                      body,
                      method: 'POST',
                      headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                      },
                    }
                  ).then( e => e.blob() ),
                  { date }
                );
              }

              /* const { url } = module;
              const resourceName = module.contents[ 0 ].filename;
              const date = new Date( module.contentsinfo.lastmodified * 1000 );
              console.log( module );

              zipFile.file(
                `${ sectionName }/${ resourceName }`,
                fetch(
                  url,
                  {
                    body: body.toString(),
                    method: 'POST',
                    headers: {
                      'content-type': 'application/x-www-form-urlencoded',
                    },
                  }
                ).then( e => e.blob() ),
                { date }
              ); */
            }
          }
        }

        zipFile.generateAsync( {
          type: 'blob',
          compression: 'DEFLATE',
          compressionOptions: {
            level: 9,
          },
          comment: 'https://github.com/melusc/moodle_userscripts',
        } ).then( blob => {
          saveAs(
            blob,
            `course-content-${ courseId }.zip`
          );
        } );

        return undefined;
      } );
  } );
};

const setLastValidatedToken = () => GM_setValue(
  'lastValidatedToken',
  new Date().getTime()
);

const logout = ( removeCredentials = false ) => {
  [ 'token', 'lastValidatedToken' ].forEach( GM_deleteValue );
  if ( removeCredentials ) {
    [ 'username', 'password' ].forEach( GM_deleteValue );
  }
};

const login = ( () => {
  let cachedToken;

  return ( noCache = false ) => {
    if ( cachedToken && !noCache ) {
      return cachedToken;
    }

    const storedToken = GM_getValue( 'token' );
    const lastValidated = GM_getValue( 'lastValidatedToken' );
    if (
      !cachedToken
      && storedToken
      && new Date().getTime() - lastValidated < 18000000
    ) {
      // less than 5h
      cachedToken = Promise.resolve( storedToken ); // to make it thenable
    }

    if ( noCache || !cachedToken ) {
      cachedToken = getCredentials().then( ( { username, password } ) => {
        const loginParams = new URLSearchParams();

        loginParams.set(
          'username',
          username
        );
        loginParams.set(
          'password',
          password
        );
        loginParams.set(
          'service',
          'moodle_mobile_app'
        );
        return fetch(
          '/login/token.php',
          {
            method: 'POST',
            body: loginParams.toString(),
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
          }
        )
          .then( e => e.json() )
          .then( response => {
            if ( response.hasOwnProperty( 'errorcode' ) ) {
              logout( true );
              return login( true );
            }

            GM_setValue(
              'token',
              response.token
            );
            setLastValidatedToken();

            return response.token;
          } );
      } );
    }

    return cachedToken;
  };
} )();

const getCredentials = () => new Promise( resolve => {
  const username = GM_getValue( 'username' );
  const password = GM_getValue( 'password' );
  if ( username && password ) {
    resolve( { username, password } );
  }
  else {
    const callback = ( { username, password } ) => {
      GM_setValue(
        'username',
        username
      );
      GM_setValue(
        'password',
        password
      );
      loginPopupSetState( { isLoggedOut: false, loggedOutCallback: null } );
      resolve( { username, password } );
    };

    const state = {
      isLoggedOut: true,
      loggedOutCallback: callback,
      usernameIsInvalid: false,
      passwordIsInvalid: false,
    };
    if ( typeof loginPopupSetState === 'function' ) {
      loginPopupSetState( state );
    }
    else {
      loginPopupDefaultState = state;
      const div = document.createElement( 'div' );
      div.className = 'dcc';
      document.body.append( div );
      render(
        <LoginPopup />,
        div
      );

      GM_addStyle( '<INJECT_FILE {"path": "dist/Download Courses Content/style.css", "quotes": true} />' );
    }
  }
} );

let loginPopupDefaultState;
let loginPopupSetState;

class LoginPopup extends Component {
  state = loginPopupDefaultState;

  componentDidMount() {
    loginPopupSetState = state => {
      this.setState( state );
    };
  }

  inputs = {};

  render = (
    _props, { isLoggedOut, usernameIsInvalid, passwordIsInvalid }
  ) => isLoggedOut
      && <div class="vertical-horizontal-center">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Clean Moodle Login</h5>

            <div>
              <label for="dcc-password" class="form-label">
                Username
              </label>
              <input
                onInput={this.handleInput}
                placeholder="Username"
                required
                id="dcc-username"
                class={`input-group-text ${
                  usernameIsInvalid
                    ? 'is-invalid'
                    : 'is-valid'
                }`}
                ref={e => {
                  this.inputs.username = e;
                }}
              />
              <div class="invalid-feedback">Please provide a username.</div>
            </div>

            <div>
              <label for="dcc-password" class="form-label">
                Password
              </label>
              <input
                onInput={this.handleInput}
                placeholder="Password"
                required
                id="dcc-password"
                class={`input-group-text ${
                  passwordIsInvalid
                    ? 'is-invalid'
                    : 'is-valid'
                }`}
                ref={e => {
                  this.inputs.password = e;
                }}
                type="password"
              />
              <div class="invalid-feedback">Please provide a password.</div>
            </div>
          </div>
          <button class="btn btn-primary" onClick={this.handleClick}>
            Login
          </button>
        </div>
      </div>
    ;

  handleInput = ( { target } ) => {
    const { inputs } = this;
    if ( target === inputs.username ) {
      const username = inputs.username.value.trim();
      this.setState( { usernameIsInvalid: !username } );
    }
    else {
      const password = inputs.password.value;
      this.setState( {
        passwordIsInvalid: !password,
      } );
    }
  };

  handleClick = () => {
    const username = this.inputs.username.value.trim();
    const password = this.inputs.password.value;

    if ( username && password ) {
      this.setState( { loggedOut: false, loggedOutCallback: null } );
      this.state.loggedOutCallback( {
        username,
        password,
      } );
    }
    else {
      if ( !username ) {
        this.setState( { usernameIsInvalid: true } );
      }
      if ( !password ) {
        this.setState( { passwordIsInvalid: true } );
      }
    }
  };
}

document.readyState === 'complete'
  ? init()
  : addEventListener(
    'DOMContentLoaded',
    init,
    { once: true }
  );
