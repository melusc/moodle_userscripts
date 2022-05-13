const enum StorageKeys {
	username = 'username',
	token = 'token',
}

const make = (
	key: StorageKeys,
): [
	get: () => string | undefined,
	set: (value: string) => void,
	delete_: () => void,
] => [
	() => GM_getValue<string | undefined>(key),
	(value: string) => {
		GM_setValue(key, value);
	},
	() => {
		GM_deleteValue(key);
	},
];

export const [getToken, setToken, deleteToken] = make(StorageKeys.token);
export const [getUsername, setUsername, deleteUsername] = make(
	StorageKeys.username,
);
