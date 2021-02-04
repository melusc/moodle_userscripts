import { defaultLoginReturnState, login, getUserId, logout, setLastValidatedToken } from './index.js';

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
        const bodyParameters = new URLSearchParams();

        bodyParameters.set(
          'requests[0][function]',
          'core_enrol_get_users_courses'
        );
        bodyParameters.set(
          'requests[0][arguments]',
          JSON.stringify( {
            userid,
            returnusercount: false,
          } )
        );
        bodyParameters.set(
          'wsfunction',
          'tool_mobile_call_external_functions'
        );
        bodyParameters.set(
          'wstoken',
          token
        );

        return fetch(
          '/webservice/rest/server.php?moodlewsrestformat=json',
          {
            method: 'POST',
            body: bodyParameters.toString(),
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
          }
        ).then( response => response.json() );
      } )
      .then( responseJSON => {
        if ( 'exception' in responseJSON ) {
          logout();
          return getCourses(
            true,
            loginReturnState
          );
        }

        const data = JSON.parse( responseJSON.responses[ 0 ].data );

        const coursesObject = {};

        for ( const { id, fullname } of data ) {
          coursesObject[ id ] = fullname;
        }

        setLastValidatedToken();

        return coursesObject;
      } );
  }

  return courses;
};
