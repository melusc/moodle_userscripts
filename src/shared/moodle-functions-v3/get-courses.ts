import {getUserId} from './get-user-id.js';
import {memoise} from './memoise.js';
import type {Moodle, RegisterFunction} from './moodle.js';

export type Courses = Array<{id: number; name: string}>;

type GetUserCoursesResponse = Array<{
	id: number;
	fullname: string;
}>;

async function getCourses(this: Moodle): Promise<Courses> {
	const userId = await this.getUserId(true);

	const json = await this.fetch<GetUserCoursesResponse>(
		'core_enrol_get_users_courses',
		{
			userid: String(userId),
			returnusercount: '0',
		},
	);

	const result: Courses = [];

	for (const {id, fullname} of json) {
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
