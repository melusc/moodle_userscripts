import {Pointers, Values} from './custom-icons.d';

export const deleteIconFromStorage = (id: string) => {
	const pointers = GM_getValue<Pointers | undefined>('pointers');
	const values = GM_getValue<Values | undefined>('values');

	if (pointers && values) {
		const uuid = pointers[id];

		if (uuid) {
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete pointers[id];

			if (!Object.values(pointers).includes(uuid)) {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete values[uuid];
				GM_setValue('values', values);
			}

			GM_setValue('pointers', pointers);
		}
	}
};
