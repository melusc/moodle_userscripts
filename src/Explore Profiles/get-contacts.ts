import {title, moodle} from './consts';

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
	let wstoken: string;
	try {
		wstoken = await moodle.login();
	} catch {
		wstoken = await moodle.popupLogin(title);
	}

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
		moodle.logout();
		return getContacts(userId);
	}

	return responseJSON.map(({id}) => id);
};
