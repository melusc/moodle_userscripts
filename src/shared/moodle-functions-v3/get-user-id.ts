import {memoise} from './memoise.js';
import type {Moodle, RegisterFunction} from './moodle.js';

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

async function getUserId(this: Moodle): Promise<number> {
	const token = await this.login();

	const bodyParameters = new URLSearchParams({
		wsfunction: 'core_webservice_get_site_info',
		wstoken: token,
	});

	const response = await fetch(
		this.resolveUrl('/webservice/rest/server.php?moodlewsrestformat=json'),
		{
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			body: bodyParameters.toString(),
		},
	);

	if (!response.ok) {
		throw new Error(`Response was not ok: ${response.status}`);
	}

	const responseJSON = (await response.json()) as GetUserIdResponse;

	if ('exception' in responseJSON) {
		this.logout();
		throw new Error('token was undefined');
	}

	return responseJSON.userid;
}

const register: RegisterFunction = Moodle => {
	Moodle.prototype.getUserId = memoise(getUserId);
};

export {register as getUserId};
