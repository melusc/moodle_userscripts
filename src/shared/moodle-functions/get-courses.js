import {
  defaultLoginReturnState,
  login,
  getUserId,
  logout,
  setLastValidatedToken
} from './index.js';

let courses;

export const getCourses = (
  noCache = false,
  loginReturnState = defaultLoginReturnState
) => {
  if ( noCache || !courses ) {
    courses = Promise.all( [
      login(
        noCache,
        loginReturnState
      ),
      getUserId( loginReturnState ),
    ] )
      .then( ( [ wstoken, userid ] ) => {
        const bodyParameters = new URLSearchParams( {
          'requests[0][function]': 'core_enrol_get_users_courses',
          'requests[0][arguments]': JSON.stringify( {
            userid,
            returnusercount: false,
          } ),
          wstoken,
        } );

        return fetch(
          '/webservice/rest/server.php?moodlewsrestformat=json&wsfunction=tool_mobile_call_external_functions',
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
