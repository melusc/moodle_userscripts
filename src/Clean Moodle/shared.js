/**
 * @param {string|number} id The courseid
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
  id,
  { updateReplacers = true, updateRemovers = true } = {}
) => {
  const removersSet = new Set( GM_getValue( 'remove' ) );
  removersSet.delete( id );
  const removers = [ ...removersSet ];

  const replacers = GM_getValue( 'replace' ) ?? {};
  delete replacers[ id ];

  if ( updateRemovers ) {
    GM_setValue(
      'remove',
      removers
    );
  }

  if ( updateReplacers ) {
    GM_setValue(
      'replace',
      replacers
    );
  }

  return { replacers, removers };
};
