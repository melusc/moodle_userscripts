import {login, logout, setLastValidatedToken} from '../shared/moodle-functions';

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

export const getContacts = async (
	noCache: boolean,
	userId: number
): Promise<number[]> => {
	return login(noCache)
		.then(async token =>
			fetch(
				'https://moodle.ksasz.ch/webservice/rest/server.php?moodlewsrestformat=json',
				{
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					body: `userid=${userId}&wsfunction=core_message_get_user_contacts&wstoken=${token}`,
					method: 'POST'
				}
			).then(async response => response.json())
		)
		.then((response: CoreMessageGetUserContactsResponse) => {
			if ('exception' in response) {
				logout();
				return getContacts(true, userId);
			}

			setLastValidatedToken();

			return response.map(({id}) => id);
		});
};
