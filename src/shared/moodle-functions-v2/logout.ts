export const logout = async (removeCredentials = false): Promise<void> => {
	await GM.deleteValue('token');

	if (removeCredentials) {
		for (const key of ['username', 'password']) {
			await GM.deleteValue(key);
		}
	}
};
