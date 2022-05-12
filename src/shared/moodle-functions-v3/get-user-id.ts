import type {Moodle, RegisterFunction} from './moodle';

type GetUserIdResponse =
	| {
			exception: string;
			errorcode: string;
			message: string;
	  }
	| {
			userid: number;
			// Omitted for brevity
	  };

const cacheKey = Symbol('getUserId');
async function getUserId(this: Moodle): Promise<number> {
	const cache = this._readCache<number>(cacheKey);
	if (cache !== undefined) {
		return cache;
	}

	const token = await this.login();

	const bodyParameters = new URLSearchParams({
		wsfunction: 'core_webservice_get_site_info',
		wstoken: token,
	});

	const response = await fetch(
		`${this.baseUrl}/webservice/rest/server.php?moodlewsrestformat=json`,
		{
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			body: bodyParameters.toString(),
		},
	);

	const responseJSON = (await response.json()) as GetUserIdResponse;

	if ('exception' in responseJSON) {
		throw new Error('token was undefined');
	}

	return this._writeCache(cacheKey, responseJSON.userid);
}

const register: RegisterFunction = Moodle => {
	Moodle.prototype.getUserId = getUserId;
};

export {register as getUserId};
