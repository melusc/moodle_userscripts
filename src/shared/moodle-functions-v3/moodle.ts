/* eslint-disable n/prefer-global/process */
import type {CourseContent} from './course-content.d.js';
import {
	deleteToken,
	getToken,
	getUsername,
	setToken,
	setUsername,
} from './credentials.js';
import type {Courses} from './get-courses.js';

export type Credentials = {
	token?: string;
	username?: string;
	password?: string;
};

type LoginResponse =
	| {
			token: string;
			privatetoken: string;
	  }
	| {
			error: string;
			errorcode: string;
	  };

export class ERR_NO_CREDENTIALS extends Error {
	constructor() {
		super('No credentials provided.');
	}
}

export class ERR_INVALID_CREDENTIALS extends Error {
	constructor() {
		super('Invalid credentials.');
	}
}

class ERR_NOT_INCLUDED extends Error {
	constructor(name: string) {
		super(`${name} not included`);
	}
}

type ApiExpection = {
	exception: string;
	errorcode: string;
	message: string;
};

type MoodleConstructor = typeof Moodle;
export type RegisterFunction = (moodle: MoodleConstructor) => void;

let defaultBaseUrl = new URL('http://localhost/');
if (typeof location !== 'undefined') {
	defaultBaseUrl = new URL('/', location.href);
} else if (
	typeof process !== 'undefined' &&
	typeof process.env['MOODLE_BASE_URL'] === 'string'
) {
	defaultBaseUrl = new URL(process.env['MOODLE_BASE_URL']);
}

export class Moodle {
	static extend(register: RegisterFunction): MoodleConstructor {
		register(Moodle);

		return Moodle;
	}

	baseUrl: URL = defaultBaseUrl;

	readonly credentials: Credentials = {
		token: getToken(),
		username: getUsername(),
	};

	resolveUrl = (path: string): URL => new URL(path, this.baseUrl);

	async login(creds?: {username: string; password: string}): Promise<string> {
		const {credentials} = this;
		if (creds) {
			credentials.username = creds.username;
			credentials.password = creds.password;
			setUsername(creds.username);
		}

		if (credentials.token) {
			return credentials.token;
		}

		const {username, password} = credentials;
		if (!username || !password) {
			throw new ERR_NO_CREDENTIALS();
		}

		const loginParameters = new URLSearchParams({
			username,
			password,
			service: 'moodle_mobile_app',
		});

		const response = await fetch(this.resolveUrl('/login/token.php'), {
			method: 'POST',
			body: loginParameters.toString(),
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
		});

		if (!response.ok) {
			throw new Error(`Response was not ok: ${response.status}`);
		}

		const responseJSON = (await response.json()) as LoginResponse;

		if ('errorcode' in responseJSON) {
			this.logout();
			throw new ERR_INVALID_CREDENTIALS();
		}

		const {token} = responseJSON;
		setToken(token);
		credentials.token = token;
		return token;
	}

	async fetch<T>(
		wsfunction: string,
		parametersObject: Record<string, string>,
	): Promise<T> {
		const parameters = new URLSearchParams(parametersObject);
		parameters.set('wstoken', await this.login());
		parameters.set('wsfunction', wsfunction);
		parameters.set('moodlewsrestformat', 'json');

		const response = await fetch(
			this.resolveUrl('/webservice/rest/server.php'),
			{
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded',
				},
				body: parameters.toString(),
			},
		);

		if (!response.ok) {
			throw new Error(`Response was not ok: ${response.status}`);
		}

		// Having two variables works better
		// because T is generic and checking `'exception' in json`
		// does not work for generics
		// It also won't narrow to `ApiException` with `T | ApiException`
		const json = (await response.json()) as T;
		const error = json as ApiExpection;

		if ('exception' in error) {
			this.logout();
			throw new Error(`Error(${error.exception}): ${error.message}`);
		}

		return json;
	}

	logout(): void {
		delete this.credentials.token;
		deleteToken();

		delete this.credentials.password;
	}

	// @ts-expect-error Parameters are necessary for typing
	// and the vscode type-hints look nicer without the leading underscore
	// eslint-disable-next-line @typescript-eslint/require-await
	async getCourses(useCache: boolean): Promise<Courses> {
		throw new ERR_NOT_INCLUDED('getCourses');
	}

	// @ts-expect-error See above
	// eslint-disable-next-line @typescript-eslint/require-await
	async getUserId(useCache: boolean): Promise<number> {
		throw new ERR_NOT_INCLUDED('getUserId');
	}

	// @ts-expect-error See above
	// eslint-disable-next-line @typescript-eslint/require-await
	async popupLogin(title: string, useCache: boolean): Promise<string> {
		throw new ERR_NOT_INCLUDED('popupLogin');
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async getCourseContent(
		// @ts-expect-error See above
		id: string | number,
		// @ts-expect-error See above
		useCache: boolean,
	): Promise<CourseContent[]> {
		throw new ERR_NOT_INCLUDED('getCourseContent');
	}
}
