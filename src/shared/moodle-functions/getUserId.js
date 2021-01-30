import { defaultLoginReturnState, logout, setLastValidatedToken, login } from './';

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
