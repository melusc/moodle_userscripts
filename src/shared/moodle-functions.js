import frontPageCss from './login-popup.scss';
import { render, h, Component } from 'preact';

export const setLastValidatedToken = () => GM_setValue(
  'lastValidatedToken',
  new Date().getTime()
);

export const logout = ( removeCredentials = false ) => {
  [ 'token', 'lastValidatedToken' ].forEach( GM_deleteValue );
  if ( removeCredentials ) {
    [ 'username', 'password' ].forEach( GM_deleteValue );
  }
};

let cachedToken;

export const login = (
  noCache = false,
  loginReturnState = defaultLoginReturnState
) => {
  if ( !noCache && cachedToken ) {
    return cachedToken;
  }

  const storedToken = GM_getValue( 'token' );
  const lastValidated = GM_getValue( 'lastValidatedToken' );
  if ( !cachedToken && storedToken && +new Date() - lastValidated < 18000000 ) {
    // less than 5h
    cachedToken = Promise.resolve( storedToken ); // to make it a Promise and as such "thenable"
  }

  if ( noCache || !cachedToken ) {
    cachedToken = getCredentials( loginReturnState ).then( ( { username, password } ) => {
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
            return login(
              true,
              loginReturnState
            );
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

export const getUserId = ( loginReturnState = defaultLoginReturnState ) => login(
  false,
  loginReturnState
)
  .then( token => {
    const bodyParams = new URLSearchParams();

    bodyParams.set(
      'wsfunction',
      'core_webservice_get_site_info'
    );
    bodyParams.set(
      'wstoken',
      token
    );

    return fetch(
      '/webservice/rest/server.php?moodlewsrestformat=json',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        body: bodyParams.toString(),
      }
    );
  } )
  .then( res => res.json() )
  .then( responseJSON => {
    if ( responseJSON.hasOwnProperty( 'exception' ) ) {
      logout();
      return getUserId( loginReturnState );
    }

    setLastValidatedToken();

    return responseJSON.userid;
  } );

export const getCredentials = ( loginReturnState = defaultLoginReturnState ) => new Promise( resolve => {
  const callback = ( { username, password } ) => {
    GM_setValue(
      'username',
      username
    );
    GM_setValue(
      'password',
      password
    );
    resolve( { username, password } );
  };

  const username = GM_getValue( 'username' );
  const password = GM_getValue( 'password' );
  if ( username && password ) {
    resolve( { username, password } );
  }
  else {
    const state = {
      loggedOut: true,
      loggedOutCallback: callback,
    };

    loginReturnState( state );
  }
} );

let frontPageLoginSetState;
let frontPageDefaultLoginState = {};

class FrontPageLogin extends Component {
  state = frontPageDefaultLoginState;

  inputs = {};

  render = (
    _props, { loggedOut }
  ) => loggedOut
      && <div class="vertical-horizontal-center">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Login</h5>
            <input
              placeholder="Username"
              required
              class="input-group-text"
              ref={e => {
                this.inputs.username = e;
              }}
            />
            <input
              placeholder="Password"
              required
              class="input-group-text"
              ref={e => {
                this.inputs.password = e;
              }}
              type="password"
            />
          </div>
          <button class="btn btn-primary" onClick={this.handleClick}>
            Login
          </button>
        </div>
      </div>
    ;

  handleClick = () => {
    const username = this.inputs.username.value.trim();
    const password = this.inputs.password.value;

    if ( username && password ) {
      this.setState( { loggedOut: false } );
      this.state.loggedOutCallback( {
        username,
        password,
      } );
    }
  };

  componentDidMount = () => {
    frontPageLoginSetState = state => {
      this.setState( state );
    };
  };
}

const defaultLoginReturnState = state => {
  if ( typeof frontPageLoginSetState === 'function' ) {
    frontPageLoginSetState( state );
  }
  else {
    frontPageDefaultLoginState = state;
    const div = document.createElement( 'div' );
    div.className = 'shared-login-popup';
    document.body.append( div );
    GM_addStyle( frontPageCss );
    render(
      <FrontPageLogin />,
      div
    );
  }
};

let courses;

export const getCourses = (
  noCache = false,
  loginReturnState = defaultLoginReturnState
) => {
  if ( noCache || !courses ) {
    courses = Promise.all( [
      login(
        false,
        loginReturnState
      ),
      getUserId( loginReturnState ),
    ] )
      .then( ( [ token, userid ] ) => {
        const bodyParams = new URLSearchParams();

        bodyParams.set(
          'requests[0][function]',
          'core_enrol_get_users_courses'
        );
        bodyParams.set(
          'requests[0][arguments]',
          JSON.stringify( {
            userid,
            returnusercount: false,
          } )
        );
        bodyParams.set(
          'wsfunction',
          'tool_mobile_call_external_functions'
        );
        bodyParams.set(
          'wstoken',
          token
        );

        return fetch(
          '/webservice/rest/server.php?moodlewsrestformat=json',
          {
            method: 'POST',
            body: bodyParams.toString(),
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
          }
        ).then( e => e.json() );
      } )
      .then( responseJSON => {
        if ( responseJSON.hasOwnProperty( 'exception' ) ) {
          logout();
          return getCourses(
            true,
            loginReturnState
          );
        }

        const data = JSON.parse( responseJSON.responses[ 0 ].data );

        const coursesObj = {};

        for ( const { id, fullname } of data ) {
          coursesObj[ id ] = fullname;
        }

        setLastValidatedToken();

        return coursesObj;
      } );
  }

  return courses;
};
