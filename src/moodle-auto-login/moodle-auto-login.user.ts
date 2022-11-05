// ==UserScript==
// @name       Moodle Auto Login
// @version    2.0.0
// @author     lusc
// @match      *://moodle.*/*
// @match      *://moodle*.*/*
// @grant      GM_setValue
// @grant      GM_getValue
// @run-at     document-start
// @license    MIT
// @updateURL  https://github.com/melusc/moodle_userscripts/raw/userscript-out/moodle-auto-login/moodle-auto-login.user.js
// ==/UserScript==

import {domReady} from '../shared/general-functions/index.js';

// Stop Webpack from removing the metadata
if (location.protocol !== 'https:') {
	location.protocol = 'https:';
}

const setLast = () => {
	GM_setValue('last', Date.now());
};

const listenForCredentials = (
	form: HTMLFormElement,
	usernameInput: HTMLInputElement,
	passwordInput: HTMLInputElement,
) => {
	form.addEventListener('submit', () => {
		GM_setValue('username', usernameInput.value);
		GM_setValue('password', passwordInput.value);
		setLast();
	});
};

// Run only on /login/index.php
// The script itself is enabled on all paths
// to be able to quickly disable from any path
// for example to log out without logging in automatically
if (location.pathname.startsWith('/login/index.php')) {
	domReady(() => {
		const usernameInput = document.querySelector<HTMLInputElement>('#username');
		const passwordInput = document.querySelector<HTMLInputElement>('#password');
		const form = document.querySelector<HTMLFormElement>('#login');
		const password = GM_getValue<string | undefined>('password');
		const username = GM_getValue<string | undefined>('username');

		if (!usernameInput || !passwordInput || !form) {
			return;
		}

		if (!password || !username) {
			listenForCredentials(form, usernameInput, passwordInput);
			return;
		}

		// Always prefill username
		// it will probably never change
		usernameInput.value = username;

		const timeDelta = Date.now() - GM_getValue<number>('last');

		const loginErrorAnchor
			= document.querySelector<HTMLAnchorElement>('#loginerrormessage');
		const loginErrorAnchorText = loginErrorAnchor?.textContent;

		if (
			// If first run ever
			// but password and username are in store
			!Number.isFinite(timeDelta)
			//
			// If last login was more than 10s ago
			|| timeDelta > 10_000
			//
			// If the session timed out
			// the credentials weren't incorrect
			|| (loginErrorAnchorText
				&& /session has timed out/i.test(loginErrorAnchorText))
		) {
			// Only input password if it's probably
			// the correct password
			passwordInput.value = password;
			setLast();
			form.submit();
			return;
		}

		// If it didn't use invalid credentials last time
		// but that was less than 10 seconds ago
		if (!loginErrorAnchorText || !/invalid login/i.test(loginErrorAnchorText)) {
			console.log(
				'[%cMoodle Auto Login%c] Last attempt was too recently, waiting %ds to prevent infinite loop.',
				'color: #0074d9',
				'',
				(10_000 - timeDelta) / 1000,
			);
		}

		// Invalid or not
		// listen for updated credentials
		// just in case
		listenForCredentials(form, usernameInput, passwordInput);
	});
}
