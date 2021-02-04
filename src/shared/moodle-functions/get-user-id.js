import { defaultLoginReturnState, logout, setLastValidatedToken, login } from './index.js';

export const getUserId = ( loginReturnState = defaultLoginReturnState ) => login(
  false,
  loginReturnState
)
  .then( token => {
    const bodyParameters = new URLSearchParams();

    bodyParameters.set(
      'wsfunction',
      'core_webservice_get_site_info'
    );
    bodyParameters.set(
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
        body: bodyParameters.toString(),
      }
    );
  } )
  .then( response => response.json() )
  .then( responseJSON => {
    if ( 'exception' in responseJSON ) {
      logout();
      return getUserId( loginReturnState );
    }

    setLastValidatedToken();

    return responseJSON.userid;
  } );
