// ==UserScript==
// @name      Clean Moodle with Preact
// @version   1.3.0
// @author    lusc
// @include   *://moodle.ksasz.ch/*
// @updateURL https://git.io/JXgeW
// @grant     GM.setValue
// @grant     GM.getValue
// @grant     GM.deleteValue
// @grant     GM_addStyle
// @grant     GM_registerMenuCommand
// @grant     GM_addValueChangeListener
// @run-at    document-start
// ==/UserScript==

import {render, h} from 'preact';
import domReady from '@wordpress/dom-ready';

import {popupGetCourses} from '../shared/moodle-functions-v2';
import {
	numericBaseSensitiveCollator,
	getSidebar,
} from '../shared/general-functions';

import {setupSettingsPage} from './settingspage';
import {removeElementFromStorage} from './shared';

if (location.protocol !== 'https:') {
	location.protocol = 'https:';
}

const {isArray} = Array;

const isFrontpage = !/^\/cleanmoodlepreact/i.test(location.pathname);

const SvgSettingsGear = () => (
	<a
		href="/cleanMoodlePreact/"
		target="_blank"
		rel="noreferrer noopener"
		onClick={event_ => {
			event_.stopPropagation();
		}}
	>
		<svg
			style={{marginLeft: '0.2em'}}
			fill="currentColor"
			class="icon svg-icon-gear"
			viewBox="0 0 16 16"
		>
			<path d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319zM8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z" />
		</svg>
	</a>
);
const getCourseElementFromSidebar = (id: string) =>
	getSidebar()?.querySelector<HTMLAnchorElement>(
		`a[href="https://moodle.ksasz.ch/course/view.php?id=${id}"]`,
	);

const testForInexistantCourse = async (id: string) => {
	const courses = await popupGetCourses('Clean Moodle');
	if (!(id in courses)) {
		await removeElementFromStorage(id);

		// eslint-disable-next-line no-alert
		alert(
			`You appear to not be in the course with the id "${id}" anymore.\nThe course will not be checked for anymore`,
		);
	}
};

/**
 * Replace the text of a course
 * @param {number|string} id The id of the course to replace
 * @param {[string]} newValue The new value, defaults to the anchors title (for resetting it)
 */
const setCourseText = (id: string, newValue?: string) => {
	const anchor = getCourseElementFromSidebar(id);

	if (!anchor) {
		void testForInexistantCourse(id);
		return;
	}

	const text = newValue ?? anchor.title; // Instead of now removed resetReplaced()

	if (anchor.childElementCount === 0) {
		anchor.textContent = text;
	} else {
		/* Because custom icons can use a span with an svg in it
			 so we need to be more specific about which span */
		const span = anchor.querySelector<HTMLSpanElement>(
			'span.item-content-wrap',
		);

		if (span) {
			span.textContent = text;
		}
	}
};

/**
 * Sets the visibility of a course by id
 * @param {string} id The id of the course to remove
 */
const setCourseVisibility = (id: string, visible = false) => {
	const anchor = getCourseElementFromSidebar(id);

	if (anchor) {
		const li = anchor.closest<HTMLLIElement>('li.type_course');

		// If the current page is the same as the current course link
		// don't remove it
		if (li && !li.classList.contains('contains_branch')) {
			li.classList.toggle('hide', !visible);
			if (visible) {
				li.classList.remove('hide', 'hidden');
			} else {
				li.classList.add('hide', 'hidden');
			}
		}
	} else {
		void testForInexistantCourse(id);
	}
};

/**
 * Sort the sidebar by the courses' name
 */
const sortSidebar = () => {
	const sidebar = getSidebar();

	if (!sidebar) {
		return;
	}

	const children = [
		...sidebar.querySelectorAll<HTMLLIElement>(':scope > li.type_course'),
	];

	children.sort((a, b) => {
		const aText = a.firstElementChild?.textContent;
		//              ^ if we're on the courses page it has more text like "participants" or "grades"
		// but we only want to sort it by the course's name
		// normally it would sort it in the same way if we allowed the additional text
		// but if two courses start with the same name it can sort it wrong
		const bText = b.firstElementChild?.textContent;

		if (!aText || !bText) {
			throw new Error('aText or bText was undefined');
		}

		return numericBaseSensitiveCollator.compare(aText, bText);
	});

	sidebar.prepend(...children);
};

const cleanFrontpage = async () => {
	const sidebar = getSidebar();

	if (!sidebar) {
		return;
	}

	const replaceObject = await GM.getValue<Record<string, string> | undefined>(
		'replace',
	);

	if (typeof replaceObject === 'object') {
		const replaceEntries = Object.entries(replaceObject);
		for (const item of replaceEntries) {
			setCourseText(...item);
		}
	} else {
		void GM.setValue('replace', {});
	}

	const removeArray = await GM.getValue<string[] | undefined>('remove');
	if (isArray(removeArray)) {
		for (const id of removeArray) {
			setCourseVisibility(id);
		}
	} else {
		void GM.setValue('remove', []);
	}

	sortSidebar();
};

const refreshReplaced = (
	oldValue: Record<string, string>,
	newValue: Record<string, string>,
) => {
	for (const key of Object.keys({...oldValue, ...newValue})) {
		if (oldValue[key] !== newValue[key]) {
			// If key only exists in oldValue, newValue[key] is undefined and it resets the text
			setCourseText(key, newValue[key]);
		}
	}

	// Changing text leaves it potentially unsorted
	sortSidebar();
};

const refreshRemoved = (oldValue: string[], newValue: string[]) => {
	for (const id of oldValue) {
		if (!newValue.includes(id)) {
			setCourseVisibility(id, true);
		}
	}

	for (const id of newValue) {
		if (!oldValue.includes(id)) {
			setCourseVisibility(id);
		}
	}
};

const refresh
	= <T,>( // eslint-disable-line @typescript-eslint/comma-dangle
		cb: (oldValue: T, newValue: T) => void,
	) =>
	(_name: string, oldValue: T, newValue: T, remote: boolean) => {
		if (remote && getSidebar()) {
			cb(oldValue, newValue);
		}
	};

const setupFrontpage = () => {
	const sidebar = getSidebar();

	GM_registerMenuCommand('Open settings', () => {
		open('https://moodle.ksasz.ch/cleanMoodlePreact/');
	});

	if (sidebar) {
		void cleanFrontpage();

		GM_addValueChangeListener('replace', refresh(refreshReplaced));
		GM_addValueChangeListener('remove', refresh(refreshRemoved));

		const p = sidebar.previousSibling;

		if (p instanceof HTMLParagraphElement) {
			const span = document.createElement('span');

			p.append(span);
			render(<SvgSettingsGear />, span);
		}
	}
};

if (!/^\/customicons/i.test(location.pathname)) {
	const init = isFrontpage ? setupFrontpage : setupSettingsPage;

	domReady(init);
}
