export const setLastValidatedToken = (): void => {
  GM_setValue(
      'lastValidatedToken',
      Date.now(),
  );
};
