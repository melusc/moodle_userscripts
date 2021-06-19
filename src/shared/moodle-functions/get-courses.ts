import {logout} from './logout';
import {login} from './login';
import {defaultLoginReturnState} from './get-credentials';
import {setLastValidatedToken} from './set-last-validated-token';
import {getUserId} from './get-user-id';

type CoursesObject = Record<string, string>;
type Courses = Promise<CoursesObject>;

type GetUserCoursesResponse =
	| {
			exception: string;
			errorcode: string;
			message: string;
	  }
	| {
			responses: [
				| {
						error: false;
						data: string;
				  }
				| {
						error: true;
						exception: string;
				  }
			];
	  };

let courses: Courses | undefined;

export const getCourses = async (
	noCache = false,
	loginReturnState = defaultLoginReturnState
): Promise<CoursesObject> => {
	if (noCache || !courses) {
		courses = Promise.all([
			login(noCache, loginReturnState),
			getUserId(loginReturnState)
		])
			.then(async ([wstoken, userid]) => {
				const bodyParameters = new URLSearchParams({
					'requests[0][function]': 'core_enrol_get_users_courses',
					'requests[0][arguments]': JSON.stringify({
						userid,
						returnusercount: false
					}),
					wstoken
				});

				return fetch(
					'/webservice/rest/server.php' +
						'?moodlewsrestformat=json' +
						'&wsfunction=tool_mobile_call_external_functions',
					{
						method: 'POST',
						body: bodyParameters.toString(),
						headers: {
							'content-type': 'application/x-www-form-urlencoded'
						}
					}
				).then(async response => response.json());
			})
			.then((responseJSON: GetUserCoursesResponse) => {
				if ('exception' in responseJSON || responseJSON.responses[0].error) {
					logout();
					return getCourses(true, loginReturnState);
				}

				const data = JSON.parse(responseJSON.responses[0].data) as Array<{
					id: number;
					fullname: string;
				}>;

				const coursesObject: CoursesObject = {};

				for (const {id, fullname} of data) {
					coursesObject[id] = fullname;
				}

				setLastValidatedToken();

				return coursesObject;
			});
	}

	return courses;
};
