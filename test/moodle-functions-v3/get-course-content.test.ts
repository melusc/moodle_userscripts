import {describe, expect, test} from '@jest/globals';
import {violentMonkeyContext} from 'mock-violentmonkey';
import ow from 'ow';

import {getCourseContent} from '../../src/shared/moodle-functions-v3/get-course-content.js';
import {
	type Courses,
	getCourses,
} from '../../src/shared/moodle-functions-v3/get-courses.js';
import {Moodle} from '../../src/shared/moodle-functions-v3/moodle.js';

import {username, password} from './credentials.js';

Moodle.extend(getCourses).extend(getCourseContent);

const contentsInfo = ow.object.exactShape({
	filescount: ow.number,
	filessize: ow.number,
	lastmodified: ow.number,
	mimetypes: ow.array.ofType(ow.string),
	repositorytype: ow.optional.string,
});

const contentsBase = {
	type: ow.string,
	filename: ow.string,
	filesize: ow.number,
	fileurl: ow.string,
	timemodified: ow.number,
} as const;

const completionDataDetails = ow.object.exactShape({
	rulename: ow.string,
	rulevalue: ow.object.exactShape({
		status: ow.number,
		description: ow.string,
	}),
});

const completionData = {
	state: ow.number,
	timecompleted: ow.number,
	overrideby: ow.null,
	valueused: ow.boolean,
	hascompletion: ow.boolean,
	isautomatic: ow.boolean,
	istrackeduser: ow.boolean,
	uservisible: ow.boolean,
	details: ow.array.ofType(completionDataDetails),
} as const;

const moduleBase = {
	id: ow.number,
	name: ow.string,
	instance: ow.number,
	contextid: ow.number,
	visible: ow.number,
	uservisible: ow.boolean,
	visibleoncoursepage: ow.number,
	modicon: ow.string,
	modplural: ow.string,
	indent: ow.number,
	onclick: ow.string,
	afterlink: ow.null,
	customdata: ow.string,
	noviewlink: ow.boolean,
	completion: ow.number,
	dates: ow.array.ofType(
		ow.object.exactShape({
			label: ow.string.oneOf(['Opened:', 'Closed:', 'Due:']),
			timestamp: ow.number,
		}),
	),
};

const resourceModule = ow.object.exactShape({
	modname: ow.string.equals('resource'),
	...moduleBase,

	url: ow.string,
	contents: ow.array.ofType(
		ow.object.exactShape({
			...contentsBase,
			filepath: ow.string,
			timecreated: ow.number,
			sortorder: ow.number,
			mimetype: ow.string,
			isexternalfile: ow.boolean,
			userid: ow.number,
			author: ow.any(ow.null, ow.string),
			license: ow.any(ow.null, ow.string),
		}),
	),
	contentsinfo: contentsInfo,
	completiondata: ow.optional.object.exactShape(completionData),
	description: ow.optional.string,
});
const forumModule = ow.object.exactShape({
	modname: ow.string.equals('forum'),
	...moduleBase,

	url: ow.string,
	completiondata: ow.optional.object.exactShape(completionData),
});
const folderModule = ow.object.exactShape({
	modname: ow.string.equals('folder'),
	...moduleBase,

	url: ow.optional.string,

	contents: ow.array.ofType(
		ow.object.exactShape({
			...contentsBase,
			filepath: ow.string,
			timecreated: ow.number,
			sortorder: ow.number,
			mimetype: ow.string,
			isexternalfile: ow.boolean,
			userid: ow.number,
			author: ow.any(ow.null, ow.string),
			license: ow.any(ow.null, ow.string),
		}),
	),
	contentsinfo: contentsInfo,
	completiondata: ow.optional.object.exactShape(completionData),
	description: ow.optional.string,
});
const assignModule = ow.object.exactShape({
	modname: ow.string.equals('assign'),
	...moduleBase,

	url: ow.string,
	completiondata: ow.optional.object.exactShape(completionData),
	description: ow.optional.string,
});
const urlModule = ow.object.exactShape({
	modname: ow.string.equals('url'),
	...moduleBase,

	url: ow.string,

	contents: ow.array.ofType(
		ow.object.exactShape({
			...contentsBase,
			filepath: ow.null,
			timecreated: ow.null,
			sortorder: ow.null,
			userid: ow.null,
			author: ow.null,
			license: ow.null,
		}),
	),
	contentsinfo: contentsInfo,
	completiondata: ow.optional.object.exactShape(completionData),
	description: ow.optional.string,
});
const labelModule = ow.object.exactShape({
	modname: ow.string.equals('label'),
	...moduleBase,

	description: ow.string,
	completiondata: ow.optional.object.exactShape(completionData),
});
const pageModule = ow.object.exactShape({
	modname: ow.string.equals('page'),
	...moduleBase,

	url: ow.string,

	contents: ow.array.ofType(
		ow.object.exactShape({
			...contentsBase,
			filepath: ow.string,
			timecreated: ow.any(ow.null, ow.number),
			sortorder: ow.number,
			userid: ow.any(ow.null, ow.number),
			author: ow.null,
			license: ow.any(ow.null, ow.string),
			mimetype: ow.optional.string,
			isexternalfile: ow.optional.boolean,
		}),
	),
	contentsinfo: contentsInfo,
});
const feedbackModule = ow.object.exactShape({
	modname: ow.string.equals('feedback'),
	...moduleBase,

	url: ow.string,
	description: ow.optional.string,
	completiondata: ow.optional.object.exactShape(completionData),
});

const module = ow.any(
	resourceModule,
	forumModule,
	folderModule,
	assignModule,
	urlModule,
	labelModule,
	pageModule,
	feedbackModule,
);

const courseContent = ow.object.exactShape({
	id: ow.number,
	name: ow.string,
	visible: ow.number,
	summary: ow.string,
	summaryformat: ow.number,
	section: ow.number,
	hiddenbynumsections: ow.number,
	uservisible: ow.boolean,
	modules: ow.array.ofType(module),
});

const courses = await violentMonkeyContext(async () => {
	const moodle = new Moodle();
	await moodle.login({username, password});
	return moodle.getCourses();
})();

describe('#getCourseContent & #getCourses', () => {
	test.each(courses)(
		`Course %#/${courses.length}`,
		violentMonkeyContext(async (course: Courses[number]) => {
			const moodle = new Moodle();
			await moodle.login({username, password});
			const content = await moodle.getCourseContent(course.id);
			expect(() => {
				ow(content, ow.array.ofType(courseContent));
			}).not.toThrow();
		}),
	);
});
