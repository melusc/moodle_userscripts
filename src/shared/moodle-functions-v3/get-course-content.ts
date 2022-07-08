import type {CourseContent} from './course-content.d.js';
import type {Moodle, RegisterFunction} from './moodle.js';

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
