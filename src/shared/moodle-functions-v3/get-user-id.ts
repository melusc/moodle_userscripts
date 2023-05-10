import {memoise} from './memoise.js';
import type {Moodle, RegisterFunction} from './moodle.js';

type GetUserIdResponse = {
	userid: number;
	// Omitted for brevity
};

async function getUserId(this: Moodle): Promise<number> {
	const json = await this.fetch<GetUserIdResponse>(
		'core_webservice_get_site_info',
		{},
	);

	return json.userid;
}

const register: RegisterFunction = Moodle => {
	Moodle.prototype.getUserId = memoise(getUserId);
};

export {register as getUserId};
