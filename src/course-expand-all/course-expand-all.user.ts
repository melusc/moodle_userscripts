/* eslint-disable @typescript-eslint/no-empty-function */

// ==UserScript==
// @name        Moodle Course Expand All
// @match       *://moodle.*/course/view.php
// @match       *://moodle*.*/course/view.php
// @grant       none
// @version     0.0.1
// @author     lusc
// @license    MIT
// @run-at     document-start
// @updateURL  https://github.com/melusc/moodle_userscripts/raw/userscript-out/course-expand-all/course-expand-all.user.js
// ==/UserScript==

import {domReady} from '../shared/general-functions/dom-ready.js';

declare const M: {
	course: {
		format: {
			fmtCollapseAllOnClick(
				event: Pick<MouseEvent, 'target' | 'preventDefault'>,
			): void;
			fmtInit(): void;
			fmtCollapseOnHashChange(): void;
		};
	};
};

domReady(() => {
	const script = document.querySelector<HTMLScriptElement>(
		'script[src$="/course/format/multitopic/format.js"]',
	);

	const expandButton = document.querySelector<HTMLDivElement>(
		'div.collapsible-actions',
	);

	if (!expandButton || !script) {
		return;
	}

	const doExpand = () => {
		M.course.format.fmtCollapseAllOnClick({
			target: expandButton,
			preventDefault() {},
		});

		M.course.format.fmtCollapseOnHashChange = () => {};
	};

	try {
		doExpand();
	} catch {}

	script.addEventListener('load', doExpand);
});
