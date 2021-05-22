import {defaultLoginReturnState, getCredentials} from './get-credentials';
import {logout} from './logout';
import {setLastValidatedToken} from './set-last-validated-token';

let cachedToken: Promise<string> | undefined;

type LoginResponse =
	| {
		token: string;
		privatetoken: string;
	  }
	| {
		error: string;
		errorcode: string;
	  };

export const login = async (
	noCache = false,
	loginReturnState = defaultLoginReturnState
): Promise<string> => {
	if (!noCache && cachedToken) {
		return cachedToken;
	}

	const storedToken = GM_getValue<string | undefined>('token');
	const lastValidated = GM_getValue<number | undefined>('lastValidatedToken');
	if (
		!cachedToken &&
		storedToken &&
		lastValidated &&
		Date.now() - lastValidated < 18_000_000
		// Less than 5h
	) {
		// To make it a Promise and as such "thenable"
		cachedToken = Promise.resolve(storedToken);
	}

	if (noCache || !cachedToken) {
		cachedToken = getCredentials(loginReturnState).then(
			async ({username, password}) => {
				const loginParameters = new URLSearchParams({
					username,
					password,
					service: 'moodle_mobile_app'
				});

				return fetch('/login/token.php', {
					method: 'POST',
					body: loginParameters.toString(),
					headers: {
						'content-type': 'application/x-www-form-urlencoded'
					}
				})
					.then(async response => response.json())
					.then((responseJSON: LoginResponse) => {
						if ('errorcode' in responseJSON) {
							logout(true);
							return login(true, loginReturnState);
						}

						GM_setValue('token', responseJSON.token);
						setLastValidatedToken();

						return responseJSON.token;
					});
			}
		);
	}

	return cachedToken;
};
