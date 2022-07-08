import {
	deleteToken,
	getToken,
	getUsername,
	setToken,
	setUsername,
} from './credentials.js';
import type {CourseContent} from './course-content.d.js';
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

type MoodleConstructor = typeof Moodle;
export type RegisterFunction = (moodle: MoodleConstructor) => void;

export class Moodle {
	static extend(register: RegisterFunction): MoodleConstructor {
		register(Moodle);

		return Moodle;
	}

	baseUrl = 'https://moodle.ksasz.ch';

	readonly credentials: Credentials = {
		token: getToken(),
		username: getUsername(),
	};

	readonly #cache = new Map<symbol, unknown>();

	_readCache<T>(key: symbol): T | undefined {
		return this.#cache.get(key) as T | undefined;
	}

	_writeCache<T>(key: symbol, value: T): T {
		this.#cache.set(key, value);
		return value;
	}

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

		const response = await fetch(`${this.baseUrl}/login/token.php`, {
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

	logout(): void {
		delete this.credentials.token;
		deleteToken();

		delete this.credentials.password;
	}

	// @ts-expect-error Parameters are necessary for typing
	// and the vscode type-hints look nicer without the leading underscore
	// eslint-disable-next-line @typescript-eslint/require-await
	async getCourses(noCache?: boolean): Promise<Courses> {
		throw new ERR_NOT_INCLUDED('getCourses');
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async getUserId(): Promise<number> {
		throw new ERR_NOT_INCLUDED('getUserId');
	}

	// @ts-expect-error See above
	// eslint-disable-next-line @typescript-eslint/require-await
	async popupLogin(title: string): Promise<string> {
		throw new ERR_NOT_INCLUDED('popupLogin');
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async getCourseContent(
		// @ts-expect-error See above
		id: string | number,
		// @ts-expect-error See above
		noCache?: boolean,
	): Promise<CourseContent[]> {
		throw new ERR_NOT_INCLUDED('getCourseContent');
	}
}
