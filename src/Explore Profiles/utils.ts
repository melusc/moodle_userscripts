import {moodle, title} from './consts.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isReadonlyArray: (arg0: any) => arg0 is readonly any[]
	= Array.isArray;

let contacts: number[] | undefined;
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
	if (contacts !== undefined) {
		return contacts;
	}

	let wstoken: string;
	try {
		wstoken = await moodle.login();
	} catch {
		wstoken = await moodle.popupLogin(title, true);
	}

	const body = new URLSearchParams({
		userid: `${userId}`,
		wsfunction: 'core_message_get_user_contacts',
		wstoken,
		moodlewsrestformat: 'json',
	});

	const response = await fetch(
		moodle.resolveUrl('/webservice/rest/server.php'),
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

	contacts = responseJSON.map(({id}) => id);
	return contacts;
};

export const getUserId = async (): Promise<number> => {
	try {
		return await moodle.getUserId(true);
	} catch {
		await moodle.popupLogin(title, true);
		return getUserId();
	}
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const clearNode = (node?: Element | null) => {
	if (!node) {
		return;
	}

	while (node.lastChild !== null) {
		node.lastChild.remove();
	}
};
