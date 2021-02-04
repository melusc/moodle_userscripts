export const setLastValidatedToken = () => GM_setValue(
  'lastValidatedToken',
  Date.now()
);
