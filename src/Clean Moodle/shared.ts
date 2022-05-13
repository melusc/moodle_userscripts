/**
 * @param {string} id The courseid
 * @param {object} param1 The object
 *
 * param {boolean} param1.updateReplacers Update the replacers in storage
 *
 * param {boolean} param1.updateReplacers Update the removers in storage
 *
 * @returns {object} returnObj
 * @returns {object} returnObj.replacers The updated replacers
 * @returns {array} returnObj.removers The updated removers
 */
export const removeElementFromStorage = (
	id: string,
	{updateReplacers = true, updateRemovers = true} = {},
) => {
	const removersSet = new Set(GM_getValue<string[] | undefined>('remove'));
	removersSet.delete(id);
	const removers = [...removersSet];

	const replacers
		= GM_getValue<Record<string, string> | undefined>('replace') ?? {};

	// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
	delete replacers[id];

	if (updateRemovers) {
		GM_setValue('remove', removers);
	}

	if (updateReplacers) {
		GM_setValue('replace', replacers);
	}

	return {replacers, removers};
};
