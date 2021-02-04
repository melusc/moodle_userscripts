export const logout = ( removeCredentials = false ) => {
  [
    'token',
    'lastValidatedToken',
  ].forEach( key => { GM_deleteValue( key ); } );
  if ( removeCredentials ) {
    [
      'username',
      'password',
    ].forEach( key => { GM_deleteValue( key ); } );
  }
};
