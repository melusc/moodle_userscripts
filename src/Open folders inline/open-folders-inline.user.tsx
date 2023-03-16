// ==UserScript==
// @name      Moodle open folders inline preact
// @version   3.2.0
// @author    lusc
// @match     *://moodle.*/course/view.php?id=*
// @match     *://moodle*.*/course/view.php?id=*
// @updateURL https://github.com/melusc/moodle_userscripts/raw/userscript-out/Open%20folders%20inline/open-folders-inline.user.js
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @run-at    document-start
// ==/UserScript==

import {render} from 'preact';

import {
	cleanAuthStorage,
	domReady,
	migrate,
} from '../shared/general-functions/index.js';

import {Folder} from './folder.js';

import style from './style.scss';

migrate({
	'1.2.0': cleanAuthStorage,
});

GM_addStyle(style);

const handleClick = (event: MouseEvent): void => {
	if (event.ctrlKey) {
		return;
	}

	if (!(event.target instanceof Element)) {
		return;
	}

	const anchor = event.target.closest('a');
	if (anchor?.pathname !== '/mod/folder/view.php') {
		return;
	}

	const folder = anchor.closest<HTMLLIElement>('li.activity.folder');
	if (!folder) {
		return;
	}

	const folderId = /\d+$/.exec(folder.id)?.[0];
	if (!folderId) {
		console.error('Could not get folderId.');

		return;
	}

	const section = anchor.closest('li.section.main');
	const sectionId = section
		?.getAttribute('aria-labelledby')
		?.match(/-(\d+)-/)?.[1];

	if (!sectionId) {
		console.error('sectionId was undefined.');

		return;
	}

	/* It's an anchor, but we don't want it to open a page */
	event.preventDefault();

	const container = document.createElement('span');
	container.className = 'folder-parent';

	render(
		<Folder sectionId={sectionId} folderId={folderId} anchor={anchor} />,
		container,
	);

	folder.append(container);
};

const init = () => {
	document
		.querySelector<HTMLUListElement>('div.course-content > ul')
		?.addEventListener('click', handleClick);
};

domReady(init);
