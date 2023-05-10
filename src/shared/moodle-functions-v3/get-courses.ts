import {getUserId} from './get-user-id.js';
import {memoise} from './memoise.js';
import type {Moodle, RegisterFunction} from './moodle.js';

export type Courses = Array<{id: number; name: string}>;

type GetUserCoursesResponse =
	| {
			exception: string;
			errorcode: string;
			message: string;
	  }
	| Array<{
			id: number;
			fullname: string;
	  }>;

async function getCourses(this: Moodle): Promise<Courses> {
	const userId = await this.getUserId(true);
	const token = await this.login();

	const bodyParameters = new URLSearchParams({
		wstoken: token,
		moodlewsrestformat: 'json',
		wsfunction: 'core_enrol_get_users_courses',
		userid: String(userId),
		returnusercount: '0',
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

	if ('exception' in responseJSON) {
		this.logout();
		throw new Error('Token was invalid');
	}

	const result: Courses = [];

	for (const {id, fullname} of responseJSON) {
		result.push({
			id,
			name: fullname,
		});
	}

	return result;
}

const register: RegisterFunction = Moodle => {
	Moodle.prototype.getCourses = memoise(getCourses);
	Moodle.extend(getUserId);
};

export {register as getCourses};
