import {nanoid} from 'nanoid';

import {
	DeprecatedValue,
	Pointers,
	ValidIconObject,
	Values,
} from './custom-icons.d';

export const enum StorageKeys {
	values = 'values',
	pointers = 'pointers',
	changed = 'changed',
}

/**
 * Removes a course and its icon from storage.
 * @param id The id of the course
 */
export const deleteIconFromStorage = async (id: string) => {
	const [pointers, values] = await Promise.all([getPointers(), getValues()]);

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

	await GM.setValue(StorageKeys.values, values);
	await GM.setValue(StorageKeys.pointers, pointers);

	await dispatchUpdate(DispatchType.deleted, id);
};

/**
 * Get the pointers from storage.
 * @returns Always returns an object even if the value in storage was undefined
 */
export const getPointers = async (): Promise<Pointers> => {
	let pointers = await GM.getValue<Pointers | undefined>(StorageKeys.pointers);
	if (pointers === undefined) {
		pointers = {};
		await GM.setValue(StorageKeys.pointers, pointers);
	}

	return {...pointers};
};

/**
 * Adds a pointer to the storage
 */
const setPointer = async (courseId: string, uuid: string) => {
	const pointers = await getPointers();

	pointers[courseId] = uuid;
	await GM.setValue(StorageKeys.pointers, pointers);
};

/**
 * Get the values from storage
 * @returns Always returns an object event if the value in storage was undefined
 */
export const getValues = async (): Promise<Values> => {
	let values = await GM.getValue<Values | undefined>(StorageKeys.values);

	if (values === undefined) {
		values = {};
		await GM.setValue(StorageKeys.values, values);
	}

	return {...values};
};

/**
 * Add a value to storage
 */
const setValue = async (uuid: string, object: ValidIconObject) => {
	const values = await getValues();

	values[uuid] = object;
	await GM.setValue(StorageKeys.values, values);
};

/**
 * Takes a course id and returns the icon value.
 *
 * If the value could not be found it returns false.
 */
export const getValueFromId = async (
	id: string,
): Promise<ValidIconObject | false> => {
	const pointers = await getPointers();
	const uuid = pointers[id];

	if (!uuid) {
		return false;
	}

	const values = await getValues();
	const value = values[uuid];
	if (!value) {
		return false;
	}

	if ('rawByteString' in value) {
		const dataURI = await updateDeprecatedSplitDataURI(uuid, value);
		return {
			dataURI,
		};
	}

	return value;
};

/**
 * Adds a new entry to the storage with the id and object.
 * It avoids collisions automatically.
 */
export const addEntry = async (id: string, object: ValidIconObject) => {
	await deleteIconFromStorage(id);

	let uuid = '';

	const values = await getValues();
	// Avoid collisions
	do {
		uuid = nanoid(5);
	} while (uuid in values);

	await setValue(uuid, object);
	await setPointer(id, uuid);

	await dispatchUpdate(DispatchType.added, id, object);
};

/**
 * Copies an already existant value to the passed id
 */
export const copyEntry = async (id: string, copyFrom: string) => {
	await deleteIconFromStorage(id);

	const pointers = await getPointers();
	const pointerUUID = pointers[copyFrom];

	if (pointerUUID !== undefined) {
		await setPointer(id, pointerUUID);
	}

	await dispatchUpdate(DispatchType.copied, id, copyFrom);
};

export const enum DispatchType {
	added,
	copied,
	deleted,
}

type DispatchUpdateSignatures = {
	(type: DispatchType.copied, id: string, copiedFromId: string): Promise<void>;
	(
		type: DispatchType.added,
		id: string,
		object: ValidIconObject,
	): Promise<void>;
	(type: DispatchType.deleted, id: string): Promise<void>;
};

/**
 * Dispatch an update by updating the value in storage for other tabs
 * to listen for and react accordingly.
 */
const dispatchUpdate: DispatchUpdateSignatures = async (
	type,
	id,
	lastArg?: string | ValidIconObject,
): Promise<void> => {
	const changedInfo: [
		DispatchType,
		string,
		ValidIconObject | string | undefined,
	] = [type, id, undefined];

	/* Leave "ValidIconObject" in the tuple as undefined
		if `type === DispatchType.deleted` */

	if (type === DispatchType.added) {
		// Copied or added
		changedInfo[2] = lastArg;
	} else {
		const object = await getValueFromId(lastArg as string);
		if (!object) {
			return;
		}

		changedInfo[2] = object;
	}

	await GM.setValue(StorageKeys.changed, [...changedInfo, Math.random()]);
};

/**
 * Takes the deprecated format of icon objects (with mediaString and rawByteString),
 * converts it the current format, updates the storage, and returns the new format.
 */
export const updateDeprecatedSplitDataURI = async (
	uuid: string,
	values: DeprecatedValue,
): Promise<string> => {
	const {mediaType, rawByteString} = values;

	const dataURI = `data:${mediaType};base64,${rawByteString}`;
	await setValue(uuid, {
		dataURI,
	});

	return dataURI;
};
