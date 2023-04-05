// ==UserScript==
// @name      Clean Moodle
// @version   4.0.1
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

import {
	cleanAuthStorage,
	domReady,
	getSidebar,
	migrate,
	numericBaseSensitiveCollator,
} from '../shared/general-functions/index.js';
import {
	getCourses,
	Moodle,
	type Courses,
} from '../shared/moodle-functions-v3/index.js';
import {popupLogin} from '../shared/moodle-functions-v3/popup-login-svelte.js';

import SettingsGear from './settings-gear.svelte';
import {setupSettingsPage} from './settingspage.js';
import {
	getOverrides,
	removeElementFromStorage,
	type Overrides,
} from './shared.js';

Moodle.extend(getCourses).extend(popupLogin);

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

const moodle = new Moodle();

const isFrontpage = !/^\/cleanmoodle/i.test(location.pathname);

const getCourseElementFromSidebar = (id: string) =>
	getSidebar()?.querySelector<HTMLAnchorElement>(
		`a[href$="/course/view.php?id=${id}"]`,
	);

/*
	For a race condition where testForInexistantCourse is called twice
	before it can resolve. (i.e. when two courses have been deleted)
	That would cause two popups to open.
*/
let popupLoginPromise: Promise<string> | undefined;
const testForInexistantCourse = async (id: string) => {
	if (popupLoginPromise) {
		await popupLoginPromise;
	}

	let courses: Courses;

	try {
		courses = await moodle.getCourses();
	} catch {
		await (popupLoginPromise = moodle.popupLogin('Clean Moodle'));
		courses = await moodle.getCourses();
	}

	if (!courses.some(course => String(course.id) === id)) {
		removeElementFromStorage(id);

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
const setCourseText = (
	anchor: HTMLAnchorElement,
	newValue: string | undefined,
) => {
	const text = newValue ?? anchor.title; // Instead of now removed resetReplaced()

	const textNode = anchor.lastChild;
	if (textNode?.nodeType === Node.TEXT_NODE) {
		textNode.textContent = text;
	}
};

/**
 * Sets the visibility of a course by id
 * @param {string} id The id of the course to remove
 */
const setCourseVisibility = (anchor: HTMLAnchorElement, visible: boolean) => {
	const li = anchor.closest<HTMLLIElement>('li.type_course');
	const cl = li?.classList;

	// If the current page is the same as the current course link
	// don't remove it
	if (cl && !cl.contains('current_branch')) {
		cl.toggle('hide', !visible);
		cl.toggle('hidden', !visible);
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

		return numericBaseSensitiveCollator.compare(aText.trim(), bText.trim());
	});

	sidebar.prepend(...children);
};

const setCourse = (id: string, value: string | false | undefined) => {
	const anchor = getCourseElementFromSidebar(id);

	if (anchor) {
		setCourseVisibility(anchor, value !== false);
		setCourseText(anchor, typeof value === 'string' ? value : undefined);
	} else {
		void testForInexistantCourse(id);
	}
};

const cleanFrontpage = () => {
	const sidebar = getSidebar();

	if (!sidebar) {
		return;
	}

	const overrides = getOverrides();

	for (const [id, newValue] of Object.entries(overrides)) {
		setCourse(id, newValue);
	}

	sortSidebar();
};

const setupFrontpage = () => {
	const sidebar = getSidebar();

	GM_registerMenuCommand('Open settings', () => {
		open('/cleanMoodle');
	});

	if (sidebar) {
		cleanFrontpage();

		GM_addValueChangeListener(
			'overrides',
			(
				_name: string,
				oldOverrides: Overrides | undefined,
				newOverrides: Overrides,
				remote: boolean,
			) => {
				if (!remote) {
					return;
				}

				if (!oldOverrides) {
					cleanFrontpage();
					return;
				}

				for (const id of Object.keys(oldOverrides)) {
					if (!(id in newOverrides)) {
						setCourse(id, undefined);
					}
				}

				for (const [id, newValue] of Object.entries(newOverrides)) {
					if (newValue !== oldOverrides[id]) {
						setCourse(id, newValue);
					}
				}

				sortSidebar();
			},
		);

		const p = sidebar.previousSibling;

		if (p instanceof HTMLParagraphElement) {
			const span = document.createElement('span');

			p.append(span);

			// eslint-disable-next-line no-new
			new SettingsGear({
				target: span,
			});
		}
	}
};

if (!/^\/customicons/i.test(location.pathname)) {
	const init = isFrontpage ? setupFrontpage : setupSettingsPage;

	domReady(init);
}
