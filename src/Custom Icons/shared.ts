import {nanoid} from 'nanoid';

import {Icons, ValidIconObject} from './custom-icons.d';

export const iconsKey = 'icons';

/**
 * Removes a course and its icon from storage.
 * @param id The id of the course
 */
export const deleteIconFromStorage = (id: string) => {
	const {pointers, values} = getIcons();

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

	setIcons({pointers, values});
};

export const getPointers = () => getIcons().pointers;

/**
 * Adds a pointer to the storage
 */
const setPointer = (courseId: string, uuid: string) => {
	const pointers = getPointers();

	pointers[courseId] = uuid;
	setIcons({pointers});
};

/**
 * Get the values from storage
 * @returns Always returns an object event if the value in storage was undefined
 */
export const getValues = () => getIcons().values;

/**
 * Add a value to storage
 */
const setValue = (uuid: string, object: ValidIconObject) => {
	const values = getValues();

	values[uuid] = object;
	setIcons({values});
};

/**
 * Takes a course id and returns the icon value.
 *
 * If the value could not be found it returns undefined.
 */
export const getValueFromId = (id: string): ValidIconObject | undefined => {
	const pointers = getPointers();
	const uuid = pointers[id];

	if (!uuid) {
		return undefined;
	}

	const values = getValues();
	const value = values[uuid];
	if (!value) {
		deleteIconFromStorage(id);
		return undefined;
	}

	return value;
};

export const getIcons = (): Icons =>
	GM_getValue<Icons | undefined>(iconsKey) ?? {
		pointers: {},
		values: {},
	};
export const setIcons = (icons: Partial<Icons>) => {
	const fullIcons: Icons = {...getIcons(), ...icons};
	GM_setValue(iconsKey, fullIcons);
};

/**
 * Adds a new entry to the storage with the id and object.
 * It avoids collisions automatically.
 */
export const addEntry = (id: string, object: ValidIconObject) => {
	deleteIconFromStorage(id);

	let uuid = '';

	const values = getValues();
	// Avoid collisions
	do {
		uuid = nanoid(5);
	} while (uuid in values);

	setValue(uuid, object);
	setPointer(id, uuid);
};

/**
 * Copies an already existant value to the passed id
 */
export const copyEntry = (id: string, copyFrom: string) => {
	deleteIconFromStorage(id);

	const pointers = getPointers();
	const pointerUUID = pointers[copyFrom];

	if (pointerUUID !== undefined) {
		setPointer(id, pointerUUID);
	}
};

export const enum DispatchType {
	added,
	copied,
	deleted,
}
