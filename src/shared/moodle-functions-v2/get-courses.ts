import {getUserId_throwable} from './get-user-id';

type GetCoursesReturnValue = Record<string, string>;

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
				  },
			];
	  };

let cachedCourses: undefined | GetCoursesReturnValue;

export const getCourses_throwable = async (
	wstoken: string,
): Promise<GetCoursesReturnValue> => {
	if (cachedCourses !== undefined) {
		return cachedCourses;
	}

	// Let it throw
	const userId = await getUserId_throwable(wstoken);

	if (!userId) {
		throw new Error('UserId was undefined');
	}

	const bodyParameters = new URLSearchParams({
		'requests[0][function]': 'core_enrol_get_users_courses',
		'requests[0][arguments]': JSON.stringify({
			// IMPORTANT: "userid" all lowercase
			userid: userId,
			returnusercount: false,
		}),
		wstoken,
		wsfunction: 'tool_mobile_call_external_functions',
		moodlewsrestformat: 'json',
	});

	const response = await fetch('/webservice/rest/server.php', {
		method: 'POST',
		body: bodyParameters.toString(),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	});

	if (!response.ok) {
		throw new Error('Response was not ok');
	}

	const responseJSON = (await response.json()) as GetUserCoursesResponse;

	if ('exception' in responseJSON || responseJSON.responses[0].error) {
		throw new Error('Token was invalid');
	}

	// Let it throw if it does
	const data = JSON.parse(responseJSON.responses[0].data) as Array<{
		id: number;
		fullname: string;
	}>;

	const result: GetCoursesReturnValue = {};

	for (const {id, fullname} of data) {
		result[id] = fullname;
	}

	return result;
};
