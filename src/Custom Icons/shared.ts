import {Pointers, Values} from './custom-icons.d';

export const enum StorageKeys {
	values = 'values',
	pointers = 'pointers',
	changed = 'changed',
}

export const deleteIconFromStorage = (id: string) => {
	const pointers = getPointers();
	const values = getValues();

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

	GM_setValue(StorageKeys.values, values);
	GM_setValue(StorageKeys.pointers, pointers);

	dispatchUpdate(id);
};

/* Do not try reducing calls to GM_getValue
 * because this will break as soon as the value updates on
 * a different page and GM_addValueChangeListener fires
 */

export const getPointers = (): Pointers => {
	let pointers = GM_getValue<Pointers | undefined>(StorageKeys.pointers);
	if (pointers === undefined) {
		pointers = {};
		GM_setValue(StorageKeys.pointers, pointers);
	}

	return pointers;
};

export const setPointer = (courseId: string, uuid: string): Pointers => {
	const pointers = getPointers();

	pointers[courseId] = uuid;
	GM_setValue(StorageKeys.pointers, pointers);

	dispatchUpdate(courseId);

	return pointers;
};

export const getValues = (): Values => {
	let values = GM_getValue<Values | undefined>(StorageKeys.values);

	if (values === undefined) {
		values = {};
		GM_setValue(StorageKeys.values, values);
	}

	return values;
};

export const setValue = (uuid: string, object: Values[string]): Values => {
	const values = getValues();

	values[uuid] = object;
	GM_setValue(StorageKeys.values, values);

	return values;
};

const batchedUpdatedIds = new Set<string>();
let lastTimeout: NodeJS.Timeout | undefined;

const dispatchUpdate = (id: string) => {
	batchedUpdatedIds.add(id);

	if (lastTimeout) {
		clearTimeout(lastTimeout);
	}

	// Batch requests
	lastTimeout = setTimeout(() => {
		/* Math.random is the "cacheBuster"
		 * Violentmonkey won't dispatch an update if the previous value
		 * is equal when stringified (I assume)
		 */
		GM_setValue(StorageKeys.changed, [Math.random(), [...batchedUpdatedIds]]);
		batchedUpdatedIds.clear();
	});
};

export const updateDeprecatedSplitDataURI = (
	uuid: string,
	values: {
		rawByteString: string;
		mediaType: string;
	},
): string => {
	const {mediaType, rawByteString} = values;

	const dataURI = `data:${mediaType};base64,${rawByteString}`;
	setValue(uuid, {
		dataURI,
	});

	return dataURI;
};
