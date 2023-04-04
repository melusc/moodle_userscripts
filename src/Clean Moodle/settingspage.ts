import style from './settingspage/settingspage.scss';

import SettingsPage from './settingspage/settingspage.svelte';

export const setupSettingsPage = () => {
	const {head, body} = document;
	body.replaceChildren();
	head.replaceChildren();

	history.replaceState({}, '', '/cleanMoodle');

	GM_addStyle(style);

	// eslint-disable-next-line no-new
	new SettingsPage({
		target: body,
	});
};
