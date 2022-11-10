// ==UserScript==
// @name      Clean Moodle with Preact
// @version   3.0.0
// @author    lusc
// @match     *://moodle.*/*
// @match     *://moodle*.*/*
// @updateURL https://git.io/JXgeW
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_deleteValue
// @grant     GM_addStyle
// @grant     GM_registerMenuCommand
// @grant     GM_addValueChangeListener
// @run-at    document-start
// ==/UserScript==

import {h, render, type FunctionalComponent} from 'preact';

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
	popupLogin,
	type Courses,
} from '../shared/moodle-functions-v3/index.js';

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

const isFrontpage = !/^\/cleanmoodlepreact/i.test(location.pathname);

const SvgSettingsGear: FunctionalComponent = () => (
	<a
		href='/cleanMoodlePreact'
		target='_blank'
		rel='noreferrer noopener'
		onClick={event_ => {
			event_.stopPropagation();
		}}
	>
		<svg
			style={{marginLeft: '0.2em'}}
			fill='currentColor'
			class='icon svg-icon-gear'
			viewBox='0 0 16 16'
		>
			<path d='M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 014.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 01-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 011.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 012.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 012.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 011.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 01-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 018.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 001.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 00.52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 00-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 00-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 00-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 00-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 00.52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 001.255-.52l.094-.319zM8 5.754a2.246 2.246 0 100 4.492 2.246 2.246 0 000-4.492zM4.754 8a3.246 3.246 0 116.492 0 3.246 3.246 0 01-6.492 0z' />
		</svg>
	</a>
);
const getCourseElementFromSidebar = (id: string) =>
	getSidebar()?.querySelector<HTMLAnchorElement>(
		`a[href$="/course/view.php?id=${id}"]`,
	);

const testForInexistantCourse = async (id: string) => {
	let courses: Courses;
	try {
		courses = await moodle.getCourses();
	} catch {
		await moodle.popupLogin('Clean Moodle');
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
const setCourseText = (id: string, newValue: string | undefined) => {
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
const setCourseVisibility = (id: string, visible: boolean) => {
	const anchor = getCourseElementFromSidebar(id);

	if (anchor) {
		const li = anchor.closest<HTMLLIElement>('li.type_course');
		const cl = li?.classList;

		// If the current page is the same as the current course link
		// don't remove it
		if (cl && !cl.contains('current_branch')) {
			cl.toggle('hide', !visible);
			cl.toggle('hidden', !visible);
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

		return numericBaseSensitiveCollator.compare(aText.trim(), bText.trim());
	});

	sidebar.prepend(...children);
};

const setCourse = (id: string, value: string | false) => {
	setCourseVisibility(id, value !== false);
	setCourseText(id, value === false ? undefined : value);
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
		open('/cleanMoodlePreact');
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
						setCourseText(id, undefined);
						setCourseVisibility(id, true);
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
			render(<SvgSettingsGear />, span);
		}
	}
};

if (!/^\/customicons/i.test(location.pathname)) {
	const init = isFrontpage ? setupFrontpage : setupSettingsPage;

	domReady(init);
}
