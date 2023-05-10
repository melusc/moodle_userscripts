import type {CourseContent} from './course-content.d.js';
import {memoise} from './memoise.js';
import type {Moodle, RegisterFunction} from './moodle.js';

type ResponseFailed = {
	errorcode: string;
	exception: string;
	message: string;
};

async function getCourseContent(
	this: Moodle,
	id: string | number,
): Promise<CourseContent[]> {
	id = String(id);

	const token = await this.login();

	const requestParameters = new URLSearchParams({
		courseid: id,
		'options[0][name]': 'includestealthmodules',
		'options[0][value]': '1',
		moodlewsrestformat: 'json',
		wsfunction: 'core_course_get_contents',
		wstoken: token,
	});

	const response = await fetch(this.resolveUrl('/webservice/rest/server.php'), {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		body: requestParameters.toString(),
	});

	if (!response.ok) {
		throw new Error(`Response was not ok: ${response.status}`);
	}

	const responseJSON = (await response.json()) as
		| CourseContent[]
		| ResponseFailed;

	if ('exception' in responseJSON) {
		this.logout();
		throw new Error('Invalid token');
	}

	return responseJSON;
}

const register: RegisterFunction = Moodle => {
	Moodle.prototype.getCourseContent = memoise(getCourseContent);
};

export {register as getCourseContent};
