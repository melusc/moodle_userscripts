type LoginResponse =
	| {
			token: string;
			privatetoken: string;
	  }
	| {
			error: string;
			errorcode: string;
	  };

let cachedToken: undefined | string;

export const login_throwable = async ({
	username,
	password,
}: {
	username: string;
	password: string;
}): Promise<string> => {
	if (cachedToken !== undefined) {
		return cachedToken;
	}

	const loginParameters = new URLSearchParams({
		username,
		password,
		service: 'moodle_mobile_app',
	});

	const response = await fetch('/login/token.php', {
		method: 'POST',
		body: loginParameters.toString(),
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	});

	const responseJSON = (await response.json()) as LoginResponse;

	if ('errorcode' in responseJSON) {
		throw new Error('Token was invalid');
	}

	await Promise.all([
		GM.setValue('token', responseJSON.token),
		GM.setValue('username', username),
		GM.setValue('password', password),
	]);

	return responseJSON.token;
};
