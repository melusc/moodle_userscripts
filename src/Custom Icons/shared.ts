import {Pointers, Values} from './custom-icons.d';

export const deleteIconFromStorage = (id: string) => {
	const pointers = GM_getValue<Pointers | undefined>('pointers');
	const values = GM_getValue<Values | undefined>('values');

	if (pointers && values) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete pointers[id];

		/* Remove all entries from values that don't have a pointer */
		const pointerValues = new Set(Object.values(pointers));
		for (const key of Object.keys(values)) {
			if (!pointerValues.has(key)) {
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete values[key];
			}
		}

		GM_setValue('values', values);
		GM_setValue('pointers', pointers);
	} else {
		GM_setValue('pointers', {});
		GM_setValue('values', {});
	}
};
