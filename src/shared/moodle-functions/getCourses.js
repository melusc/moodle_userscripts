import { defaultLoginReturnState, login, getUserId, logout, setLastValidatedToken } from './';

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
