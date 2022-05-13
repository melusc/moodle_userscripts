/* eslint-disable @typescript-eslint/ban-types */

import type {Moodle, RegisterFunction} from './moodle';

type ModuleContentBase = {
	filename: string;
	filesize: number;
	fileurl: string;
	timemodified: number;
};

export type ModuleUrlContent = ModuleContentBase & {
	type: 'url';
	filepath: null;
	timecreated: null;
	sortorder: null;
	userid: null;
	author: null;
	license: null;
};

export type ModuleFileContent = ModuleContentBase & {
	type: 'file';
	filepath: string;
	sortorder: number;
	timecreated: number | null;
	userid: number | null;
	author: string | null;
	license: string | null;

	mimetype?: string;
	isexternalfile?: boolean;
};

export type ModuleContent = ModuleUrlContent | ModuleFileContent;

export type Module = (
	| {
			modname: 'url' | 'folder' | 'resource' | 'page';
			url: string;
			contents: ModuleContent[];
			contentsinfo: {};
			description?: string;
	  }
	| {
			modname: 'label';
			description: string;
	  }
) & {
	id: number;
	name: string;
	instance: number;
	contextid: number;
	visible: number;
	uservisible: boolean;
	visibleoncoursepage: number;
	modicon: string;
	modplural: string;
	indent: number;
	onclick: string;
	afterlink: null;
	customdata: string;
	noviewlink: boolean;
	completion: number;

	// They are all empty
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	dates: any[];
};

export type CourseContent = {
	id: number;
	name: string;
	visible: number;
	summary: string;
	summaryformat: number;
	section: number;
	hiddenbynumsections: number;
	uservisible: boolean;
	modules: Module[];
};

type ResponseFailed = {
	errorcode: string;
	exception: string;
	message: string;
};

const cacheKey = Symbol('getCourseContent');
async function getCourseContent(
	this: Moodle,
	id: string | number,
	noCache = false,
): Promise<CourseContent[]> {
	id = String(id);

	const cache
		= this._readCache<Record<string, CourseContent[]>>(cacheKey) ?? {};
	const cachedResult = cache[id];
	if (cachedResult && !noCache) {
		return cachedResult;
	}

	const token = await this.login();

	const requestParameters = new URLSearchParams({
		courseid: id,
		'options[0][name]': 'includestealthmodules',
		'options[0][value]': '1',
		moodlewsrestformat: 'json',
		wsfunction: 'core_course_get_contents',
		wstoken: token,
	});

	const response = await fetch(`${this.baseUrl}/webservice/rest/server.php`, {
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

	cache[id] = responseJSON;
	this._writeCache(cacheKey, cache);
	return responseJSON;
}

const register: RegisterFunction = Moodle => {
	Moodle.prototype.getCourseContent = getCourseContent;
};

export {register as getCourseContent};
