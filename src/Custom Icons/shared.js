export const deleteVal = id => {
  const pointers = GM_getValue( 'pointers' );
  const values = GM_getValue( 'values' );
  const uuid = pointers[ id ];

  if ( uuid ) {
    delete pointers[ id ];

    if ( !Object.values( pointers ).includes( uuid ) ) {
      delete values[ uuid ];
      GM_setValue(
        'values',
        values
      );
    }

    GM_setValue(
      'pointers',
      pointers
    );
  }
};
