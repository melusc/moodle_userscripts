export const getCredentials = ():
	| {
			username: string;
			password: string;
	  }
	| undefined => {
	const username = GM_getValue<string | undefined>('username');
	const password = GM_getValue<string | undefined>('password');

	if (username && password) {
		return {
			username,
			password,
		};
	}

	return undefined;
};

export const getToken = () => GM_getValue<string | undefined>('token');
