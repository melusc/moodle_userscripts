// ==UserScript==
// @name       No Force Download
// @match      *://moodle.*/*
// @match      *://moodle*.*/*
// @grant      none
// @version    2.0.0
// @author     lusc
// @license    MIT
// @updateURL  https://github.com/melusc/moodle_userscripts/raw/userscript-out/no-force-download/no-force-download.user.js
// @run-at     document-start
// ==/UserScript==

import {domReady} from '../shared/general-functions/dom-ready.js';

domReady(() => {
	const anchors = document.querySelectorAll<HTMLAnchorElement>(
		'a[href*="?"][href*="forcedownload"]',
	);

	for (const anchor of anchors) {
		if (anchor.search) {
			const search = new URLSearchParams(anchor.search);
			search.delete('forcedownload');
			anchor.search = `?${search.toString()}`;
		}
	}
});
