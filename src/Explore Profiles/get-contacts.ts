import {popupGetToken, logout} from '../shared/moodle-functions-v2';
import {title} from './consts';

type CoreMessageGetUserContactsResponse =
	| {
			exception: string;
			errorcode: string;
			message: string;
	  }
	| Array<{
			id: number;
			// ...
	  }>;

export const getContacts = async (userId: number): Promise<number[]> => {
	const wstoken = await popupGetToken(title);
	const body = new URLSearchParams({
		userid: `${userId}`,
		wsfunction: 'core_message_get_user_contacts',
		wstoken,
		moodlewsrestformat: 'json',
	});

	const response = await fetch(
		'https://moodle.ksasz.ch/webservice/rest/server.php',
		{
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			body,
			method: 'POST',
		},
	);

	const responseJSON
		= (await response.json()) as CoreMessageGetUserContactsResponse;

	if ('exception' in responseJSON) {
		logout();
		return getContacts(userId);
	}

	return responseJSON.map(({id}) => id);
};
