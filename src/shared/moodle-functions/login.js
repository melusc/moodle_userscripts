import { defaultLoginReturnState, getCredentials, logout, setLastValidatedToken } from './';

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
