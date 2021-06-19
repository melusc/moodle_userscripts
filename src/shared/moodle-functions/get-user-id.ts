import {defaultLoginReturnState} from './get-credentials';
import {login} from './login';
import {logout} from './logout';
import {setLastValidatedToken} from './set-last-validated-token';

type GetUserIdResponse =
	| {
			exception: string;
			errorcode: string;
			message: string;
	  }
	| {
			userid: number;

			// There's more, but that's not useful here
	  };

let userId: number | undefined; // Cache userId

export const getUserId = async (
	loginReturnState = defaultLoginReturnState
): Promise<number> => {
	if (userId !== undefined) {
		return userId;
	}

	return login(false, loginReturnState)
		.then(async (wstoken: string): Promise<GetUserIdResponse> => {
			const bodyParameters = new URLSearchParams({
				wsfunction: 'core_webservice_get_site_info',
				wstoken
			});

			return fetch('/webservice/rest/server.php?moodlewsrestformat=json', {
				method: 'POST',
				headers: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				body: bodyParameters.toString()
			}).then(async (response): Promise<GetUserIdResponse> => response.json());
		})
		.then((responseJSON: GetUserIdResponse) => {
			if ('exception' in responseJSON) {
				logout();
				return getUserId(loginReturnState);
			}

			setLastValidatedToken();

			userId = responseJSON.userid;

			return userId;
		});
};
