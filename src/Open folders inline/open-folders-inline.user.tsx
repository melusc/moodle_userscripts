// ==UserScript==
// @name      Moodle open folders inline preact
// @version   2021.07.26a
// @author    lusc
// @include   https://moodle.ksasz.ch/course/view.php?id=*
// @updateURL https://git.io/Jqlt0
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @run-at    document-start
// ==/UserScript==

import {render, h} from 'preact';

import {Folder, refreshByFolderId} from './folder';

import style from './style.scss';

GM_addStyle(style);

const handleClick = async (event_: MouseEvent): Promise<void> => {
	if (!(event_.target instanceof Element)) {
		return;
	}

	const anchor = event_.target.closest('a');

	if (anchor?.pathname !== '/mod/folder/view.php') {
		return;
	}

	const icon = anchor.querySelector<SVGSVGElement>('svg.svg-refresh')
		?.parentNode as HTMLSpanElement | null;
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

	if (event_.ctrlKey) {
		return;
	}

	/* It's an anchor, but we don't want it to open a page */
	event_.preventDefault();

	if (event_.target.closest('span') === icon) {
		refreshByFolderId(folderId);

		return;
	}

	if (folder.childElementCount > 1) {
		folder.lastElementChild?.remove();
		icon?.remove();
		return;
	}

	if (!icon) {
		const refresh = document.createElement('span');
		render(
			<svg
				fill="currentColor"
				aria-hidden="true"
				class="icon navicon svg-refresh"
				style={{marginLeft: 5}}
				viewBox="0 0 512 512"
			>
				<path d="M370.72 133.28C339.458 104.008 298.888 87.962 255.848 88c-77.458.068-144.328 53.178-162.791 126.85-1.344 5.363-6.122 9.15-11.651 9.15H24.103c-7.498 0-13.194-6.807-11.807-14.176C33.933 94.924 134.813 8 256 8c66.448 0 126.791 26.136 171.315 68.685L463.03 40.97C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.749zM32 296h134.059c21.382 0 32.09 25.851 16.971 40.971l-41.75 41.75c31.262 29.273 71.835 45.319 114.876 45.28 77.418-.07 144.315-53.144 162.787-126.849 1.344-5.363 6.122-9.15 11.651-9.15h57.304c7.498 0 13.194 6.807 11.807 14.176C478.067 417.076 377.187 504 256 504c-66.448 0-126.791-26.136-171.315-68.685L48.97 471.03C33.851 486.149 8 475.441 8 454.059V320c0-13.255 10.745-24 24-24z" />
			</svg>,
			refresh,
		);
		anchor.append(refresh);
	}

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
