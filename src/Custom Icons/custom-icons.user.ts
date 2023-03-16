// ==UserScript==
// @name      Custom Icons Preact
// @version   3.3.0
// @author    lusc
// @updateURL https://github.com/melusc/moodle_userscripts/raw/userscript-out/Custom%20Icons/custom-icons.user.js
// @match     *://moodle.*/*
// @match     *://moodle*.*/*
// @grant     GM_setValue
// @grant     GM_getValue
// @grant     GM_addStyle
// @grant     GM_deleteValue
// @grant     GM_addValueChangeListener
// @grant     GM_registerMenuCommand
// @grant     GM_xmlhttpRequest
// @run-at    document-start
// @connect   *
// ==/UserScript==

// eslint-disable-next-line n/file-extension-in-import
import {html, render} from 'htm/preact';

import {
	cleanAuthStorage,
	domReady,
	getSidebar,
	migrate,
} from '../shared/general-functions/index.js';
import {
	getCourses,
	Moodle,
	popupLogin,
	type Courses,
} from '../shared/moodle-functions-v3/index.js';

import {setupSettingsPage} from './settingspage.js';
import {
	deleteIconFromStorage,
	getPointers,
	getValueFromId,
	iconsKey,
	setIcons,
} from './shared.js';

import type {
	Icons,
	Pointers,
	ValidIconObject,
	Values,
} from './custom-icons.d.js';

Moodle.extend(getCourses).extend(popupLogin);
const moodle = new Moodle();

migrate({
	'1.3.0': cleanAuthStorage,
	'1.4.0'() {
		GM_deleteValue('changed');
		const pointers = GM_getValue<Pointers | undefined>('pointers');
		const values = GM_getValue<Values | undefined>('values');
		if (pointers && values) {
			setIcons({pointers, values});
		}

		GM_deleteValue('pointers');
		GM_deleteValue('values');
	},
});

// Stop webpack from removing the metadata above
if (location.protocol !== 'https:') {
	location.protocol = 'https:';
}

const isFrontpage = !/^\/customicons/i.test(location.pathname);

const testIfUserLeftCourse = async (id: string) => {
	let courses: Courses;

	try {
		courses = await moodle.getCourses();
	} catch {
		await moodle.popupLogin('Custom Icons');
		courses = await moodle.getCourses();
	}

	if (!courses.some(course => String(course.id) === id)) {
		deleteIconFromStorage(id);

		// eslint-disable-next-line no-alert
		alert(
			`You appear to not be in the course with the id "${id}" anymore.\nThe course will not be checked for anymore`,
		);
	}
};

const getAnchorFromSidebar = (id: string) =>
	getSidebar()?.querySelector(`a[href$="/course/view.php?id=${id}"]`);

const applyIcon = (id: string, icon?: ValidIconObject) => {
	const anchor = getAnchorFromSidebar(id);

	if (!anchor) {
		void testIfUserLeftCourse(id);

		return;
	}

	if (!icon) {
		const storageIcon = getValueFromId(id);

		if (!storageIcon) {
			removeIcon(id);

			deleteIconFromStorage(id);

			return;
		}

		icon = storageIcon;
	}

	if ('rawXML' in icon) {
		const span = document.createElement('span');

		span.dataset['customIcon'] = 'true';
		span.classList.add('icon', 'navicon');
		span.style.display = 'inline-block';
		span.style.color = 'var(--svg-fill, inherit)';
		span.tabIndex = -1;

		render(
			html(
				Object.assign([icon.rawXML], {
					raw: [icon.rawXML],
				}),
			),
			span,
		);

		anchor.prepend(span);
	} else {
		const img = new Image();

		img.dataset['customIcon'] = 'true';
		img.classList.add('icon', 'navicon');
		img.setAttribute('aria-hidden', 'true');
		img.style.cssText
			= 'fill: var(--svg-fill, inherit);stroke: var(--svg-fill, inherit);-moz-context-properties: fill, stroke;';

		img.tabIndex = -1;
		img.src = icon.dataURI;
		anchor.prepend(img);
	}
};

const removeIcon = (id: string) => {
	const anchor = getAnchorFromSidebar(id);

	const previous = anchor?.querySelector<HTMLElement>(
		'[data-custom-icon="true"]',
	);

	previous?.remove();
};

const refresh = (
	_valueName: string,
	oldValue: Icons | undefined,
	newValue: Icons | undefined,
	remote: boolean,
) => {
	if (!oldValue && !newValue) {
		return;
	}

	if (!remote) {
		return;
	}

	if (!newValue) {
		const {pointers} = oldValue!;
		for (const id of Object.keys(pointers)) {
			removeIcon(id);
		}

		return;
	}

	if (!oldValue) {
		updateIcons();
		return;
	}

	const {pointers: oldPointers} = oldValue;
	const {pointers: newPointers} = newValue;
	const oldKeys = new Set(Object.keys(oldPointers));
	for (const id of Object.keys(newPointers)) {
		if (newPointers[id] !== oldPointers[id]) {
			applyIcon(id);
		}

		oldKeys.delete(id);
	}

	for (const id of oldKeys) {
		removeIcon(id);
	}
};

const updateIcons = () => {
	const sidebar = getSidebar();

	if (sidebar) {
		const pointers = getPointers();
		const pointerKeys = Object.keys(pointers);

		for (const id of pointerKeys) {
			applyIcon(id);
		}

		GM_addValueChangeListener(iconsKey, refresh);
	}
};

const runOnceOnFrontPage = () => {
	if (getSidebar()) {
		GM_registerMenuCommand('Open settings', () => {
			open('/customIcons', '_blank');
		});

		addEventListener('customIcons', updateIcons);

		updateIcons();
	}
};

if (!/^\/cleanmoodle/i.test(location.pathname)) {
	const init = isFrontpage ? runOnceOnFrontPage : setupSettingsPage;

	domReady(init);
}
