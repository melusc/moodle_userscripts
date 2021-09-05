export const getCredentials = async (): Promise<
	| {
			username: string;
			password: string;
	  }
	| undefined
> => {
	const [username, password] = await Promise.all([
		GM.getValue<string | undefined>('username'),
		GM.getValue<string | undefined>('password'),
	]);

	if (username && password) {
		return {
			username,
			password,
		};
	}

	return undefined;
};

export const getToken = async () => GM.getValue<string | undefined>('token');
