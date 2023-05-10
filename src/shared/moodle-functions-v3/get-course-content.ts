import type {CourseContent} from './course-content.d.js';
import {memoise} from './memoise.js';
import type {Moodle, RegisterFunction} from './moodle.js';

async function getCourseContent(
	this: Moodle,
	id: string | number,
): Promise<CourseContent[]> {
	const json = await this.fetch<CourseContent[]>('core_course_get_contents', {
		courseid: String(id),
		'options[0][name]': 'includestealthmodules',
		'options[0][value]': '1',
	});

	return json;
}

const register: RegisterFunction = Moodle => {
	Moodle.prototype.getCourseContent = memoise(getCourseContent);
};

export {register as getCourseContent};
