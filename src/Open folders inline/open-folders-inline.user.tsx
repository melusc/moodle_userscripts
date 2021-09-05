// ==UserScript==
// @name      Moodle open folders inline preact
// @version   2021.09.05a
// @author    lusc
// @include   https://moodle.ksasz.ch/course/view.php?id=*
// @updateURL https://git.io/Jqlt0
// @grant     GM_setValue
// @grant     GM.setValue
// @grant     GM_getValue
// @grant     GM.getValue
// @grant     GM_deleteValue
// @grant     GM.deleteValue
// @grant     GM_addStyle
// @run-at    document-start
// ==/UserScript==

import {render, h} from 'preact';

import {Folder, toggleFolderVisibilityById} from './folder';
import {RefreshIcon, toggleRefreshVisibility} from './refresh-icon';

import style from './style.scss';

GM_addStyle(style);

const handleClick = async (event_: MouseEvent): Promise<void> => {
	if (event_.ctrlKey) {
		return;
	}

	if (!(event_.target instanceof Element)) {
		return;
	}

	const anchor = event_.target.closest('a');
	if (anchor?.pathname !== '/mod/folder/view.php') {
		return;
	}

	const folder = anchor.closest<HTMLLIElement>('li.activity.folder');
	if (!folder) {
		return;
	}

	const folderId = /\d+$/.exec(folder?.id)?.[0];
	if (!folderId) {
		console.error('Could not get folderId.');

		return;
	}

	const section = anchor.closest('li.section.main');
	const sectionId = section
		?.getAttribute('aria-labelledby')
		?.match(/(?<=-)\d+(?=-)/)?.[0];
	if (!sectionId) {
		console.error('sectionId was undefined.');

		return;
	}

	/* It's an anchor, but we don't want it to open a page */
	event_.preventDefault();

	const folderAlreadyExists = toggleFolderVisibilityById(folderId);
	if (folderAlreadyExists) {
		toggleRefreshVisibility(folderId);

		return;
	}

	const refresh = document.createElement('span');

	render(<RefreshIcon folderId={folderId} />, refresh);

	anchor.append(refresh);

	const container = document.createElement('span');
	container.className = 'folder-parent';

	render(<Folder sectionId={sectionId} folderId={folderId} />, container);

	folder.append(container);
};

const init = () => {
	document
		.querySelector<HTMLUListElement>('div.course-content > ul.topics')
		?.addEventListener('click', handleClick);
};

if (document.readyState === 'complete') {
	init();
} else {
	addEventListener('DOMContentLoaded', init, {once: true});
}
