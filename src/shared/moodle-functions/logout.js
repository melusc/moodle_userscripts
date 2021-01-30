export const logout = ( removeCredentials = false ) => {
  [ 'token', 'lastValidatedToken' ].forEach( GM_deleteValue );
  if ( removeCredentials ) {
    [ 'username', 'password' ].forEach( GM_deleteValue );
  }
};
