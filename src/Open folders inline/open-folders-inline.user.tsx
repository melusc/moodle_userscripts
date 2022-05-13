// ==UserScript==
// @name      Moodle open folders inline preact
// @version   1.2.0
// @author    lusc
// @include   https://moodle.ksasz.ch/course/view.php?id=*
// @updateURL https://git.io/JXgvE
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @run-at    document-start
// ==/UserScript==

import {render, h} from 'preact';
import domReady from '@wordpress/dom-ready';

import {upgrader, cleanAuthStorage} from '../shared/general-functions';

import {Folder} from './folder';

import style from './style.scss';

upgrader({
	'1.2.0': cleanAuthStorage,
});

GM_addStyle(style);

const handleClick = async (event: MouseEvent): Promise<void> => {
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
		.querySelector<HTMLUListElement>('div.course-content > ul.topics')
		?.addEventListener('click', handleClick);
};

domReady(init);
