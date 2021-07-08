export const logout = (removeCredentials = false): void => {
	GM_deleteValue('token');

	if (removeCredentials) {
		for (const key of ['username', 'password']) {
			GM_deleteValue(key);
		}
	}
};
