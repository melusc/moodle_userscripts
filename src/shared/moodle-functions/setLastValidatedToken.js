export const setLastValidatedToken = () => GM_setValue(
  'lastValidatedToken',
  new Date().getTime()
);
