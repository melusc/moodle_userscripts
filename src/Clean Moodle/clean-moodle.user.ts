// ==UserScript==
// @name      Clean Moodle
// @version   4.0.2
// @author    lusc
// @match     *://moodle.*/*
// @match     *://moodle*.*/*
// @updateURL https://github.com/melusc/moodle_userscripts/raw/userscript-out/Clean%20Moodle/clean-moodle.user.js
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @grant     GM_registerMenuCommand
// @grant     GM_addValueChangeListener
// @run-at    document-start
// @license   MIT
// ==/UserScript==

import {domReady} from '../shared/general-functions/dom-ready.js';
import {
	cleanAuthStorage,
	migrate,
} from '../shared/general-functions/migrate.js';

import {setupFrontpage} from './frontpage.js';
import {setupSettingsPage} from './settingspage.js';

migrate({
	'1.4.0': cleanAuthStorage,
	'1.5.0'() {
		const remove: string[] = GM_getValue('remove') ?? [];
		const replace: Record<string, false | string>
			= GM_getValue('replace') ?? {};

		for (const id of remove) {
			replace[id] = false;
		}

		GM_setValue('overrides', replace);

		GM_deleteValue('remove');
		GM_deleteValue('replace');
	},
});

if (location.protocol !== 'https:') {
	location.protocol = 'https:';
}

if (!/^\/customicons/i.test(location.pathname)) {
	const isFrontpage = !/^\/cleanmoodle/i.test(location.pathname);

	const init = isFrontpage ? setupFrontpage : setupSettingsPage;

	domReady(init);
}
