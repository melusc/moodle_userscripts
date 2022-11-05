import {getUserId} from './get-user-id.js';
import type {Moodle, RegisterFunction} from './moodle.js';

export type Courses = Array<{id: number; name: string}>;

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

const cacheKey = Symbol('getCourses');
async function getCourses(this: Moodle, noCache = false): Promise<Courses> {
	const cache = this._readCache<Courses>(cacheKey);
	if (cache && !noCache) {
		return cache;
	}

	const userId = await this.getUserId();
	const token = await this.login();

	const bodyParameters = new URLSearchParams({
		'requests[0][function]': 'core_enrol_get_users_courses',
		'requests[0][arguments]': JSON.stringify({
			userid: userId,
			returnusercount: false,
		}),
		wstoken: token,
		wsfunction: 'tool_mobile_call_external_functions',
		moodlewsrestformat: 'json',
	});

	const response = await fetch(this.resolveUrl('/webservice/rest/server.php'), {
		method: 'POST',
		body: bodyParameters.toString(),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	});

	if (!response.ok) {
		throw new Error(`Response was not ok: ${response.status}`);
	}

	const responseJSON = (await response.json()) as GetUserCoursesResponse;

	if ('exception' in responseJSON || responseJSON.responses[0].error) {
		this.logout();
		throw new Error('Token was invalid');
	}

	// Let it throw if it does
	const data = JSON.parse(responseJSON.responses[0].data) as Array<{
		id: number;
		fullname: string;
	}>;

	const result: Courses = [];

	for (const {id, fullname} of data) {
		result.push({
			id,
			name: fullname,
		});
	}

	return this._writeCache(cacheKey, result);
}

const register: RegisterFunction = Moodle => {
	Moodle.prototype.getCourses = getCourses;
	Moodle.extend(getUserId);
};

export {register as getCourses};
