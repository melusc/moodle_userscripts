export type Overrides = Record<string, string | false>;

export const getOverrides = (): Overrides => GM_getValue('overrides') ?? {};
export const setOverrides = (overrides: Overrides) => {
	GM_setValue('overrides', overrides);
};

export const getValue = (id: string | number) => getOverrides()[id];
export const setValue = (id: string | number, value: string | false) => {
	const overrides = getOverrides();
	overrides[id] = value;
	setOverrides(overrides);
};

/**
 * @param {string} id The courseid
 * @param {object} param1 The object
 *
 * param {boolean} param1.updateReplacers Update the replacers in storage
 *
 * param {boolean} param1.updateReplacers Update the removers in storage
 *
 * @returns {object} overrides
 */
export const removeElementFromStorage = (id: string | number): Overrides => {
	const overrides = getOverrides();
	// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
	delete overrides[id];
	GM_setValue('overrides', overrides);
	return overrides;
};
