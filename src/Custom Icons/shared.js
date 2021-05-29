export const deleteIconFromStorage = id => {
	const pointers = GM_getValue('pointers');
	const values = GM_getValue('values');

	if (pointers && values) {
		const uuid = pointers?.[id];

		if (uuid) {
			if (!Object.values(pointers).includes(uuid)) {
				delete values[uuid];
				GM_setValue('values', values);
			}

			delete pointers[id];

			GM_setValue('pointers', pointers);
		}
	}
};
