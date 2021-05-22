export const logout = (removeCredentials = false): void => {
	for (const key of ['token', 'lastValidatedToken']) {
		GM_deleteValue(key);
	}

	if (removeCredentials) {
		for (const key of ['username', 'password']) {
			GM_deleteValue(key);
		}
	}
};
