import { defaultLoginReturnState, getCredentials, logout, setLastValidatedToken } from './index.js';

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
  if ( !cachedToken && storedToken && Date.now() - lastValidated < 18000000 ) {
    // Less than 5h
    cachedToken = Promise.resolve( storedToken ); // To make it a Promise and as such "thenable"
  }

  if ( noCache || !cachedToken ) {
    cachedToken = getCredentials( loginReturnState ).then( ( { username, password } ) => {
      const loginParameters = new URLSearchParams( {
        username,
        password,
        service: 'moodle_mobile_app',
      } );

      return fetch(
        '/login/token.php',
        {
          method: 'POST',
          body: loginParameters.toString(),
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
        .then( response => response.json() )
        .then( responseJSON => {
          if ( 'errorcode' in responseJSON ) {
            logout( true );
            return login(
              true,
              loginReturnState
            );
          }

          GM_setValue(
            'token',
            responseJSON.token
          );
          setLastValidatedToken();

          return responseJSON.token;
        } );
    } );
  }

  return cachedToken;
};
