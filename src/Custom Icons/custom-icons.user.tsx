// ==UserScript==
// @name      Custom Icons Preact
// @version   1.3.0
// @author    lusc
// @updateURL https://git.io/JXgei
// @include   *://moodle.ksasz.ch/*
// @grant     GM.setValue
// @grant     GM_setValue
// @grant     GM.getValue
// @grant     GM_getValue
// @grant     GM_addStyle
// @grant     GM.deleteValue
// @grant     GM_addValueChangeListener
// @grant     GM_registerMenuCommand
// @grant     GM_xmlhttpRequest
// @run-at    document-start
// @connect   *
// ==/UserScript==

import {render, html} from 'htm/preact';
import domReady from '@wordpress/dom-ready';

import {
	Moodle,
	getCourses,
	popupLogin,
	Courses,
} from '../shared/moodle-functions-v3';
import {
	getSidebar,
	upgrader,
	cleanAuthStorage,
} from '../shared/general-functions';

import {setupSettingsPage} from './settingspage';
import {
	deleteIconFromStorage,
	DispatchType,
	getPointers,
	getValueFromId,
	StorageKeys,
} from './shared';

import type {ValidIconObject} from './custom-icons.d';

Moodle.extend(getCourses).extend(popupLogin);
const moodle = new Moodle();

upgrader({
	'1.3.0': cleanAuthStorage,
});

// Stop webpack from removing the metadata above
if (location.protocol !== 'https:') {
	location.protocol = 'https:';
}

const isFrontpage = !/^\/customiconspreact/i.test(location.pathname);

const testIfUserLeftCourse = async (id: string) => {
	let courses: Courses;

	try {
		courses = await moodle.getCourses();
	} catch {
		await moodle.popupLogin('Custom Icons');
		courses = await moodle.getCourses();
	}

	if (!courses.some(course => String(course.id) === id)) {
		await deleteIconFromStorage(id);

		// eslint-disable-next-line no-alert
		alert(
			`You appear to not be in the course with the id "${id}" anymore.\nThe course will not be checked for anymore`,
		);
	}
};

const applyIcon = async (id: string, icon?: ValidIconObject) => {
	const sidebar = getSidebar();

	if (!sidebar) {
		return;
	}

	const anchor = sidebar.querySelector(
		`a[href="https://moodle.ksasz.ch/course/view.php?id=${id}"]`,
	);

	if (!anchor) {
		void testIfUserLeftCourse(id);

		return;
	}

	if (!anchor.firstElementChild) {
		return;
	}

	if (!icon) {
		const storageIcon = await getValueFromId(id);

		if (!storageIcon) {
			resetIcon(id);

			void deleteIconFromStorage(id);

			return;
		}

		icon = storageIcon;
	}

	if ('rawXML' in icon) {
		const span = document.createElement('span');

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

		anchor.firstElementChild.replaceWith(span);
	} else {
		const img = new Image();

		img.classList.add('icon', 'navicon');
		img.setAttribute('aria-hidden', 'true');
		img.style.cssText
			= 'fill: var(--svg-fill, inherit);stroke: var(--svg-fill, inherit);-moz-context-properties: fill, stroke;';

		img.tabIndex = -1;
		img.src = icon.dataURI;
		anchor.firstElementChild.replaceWith(img);
	}
};

const resetIcon = (id: string) => {
	const sidebar = getSidebar();

	const img = sidebar?.querySelector<HTMLImageElement>(
		`a[href="https://moodle.ksasz.ch/course/view.php?id=${id}"] > .icon.navicon`,
	);

	// Test nodeName to not update an icon accidentally
	if (img && (img.nodeName === 'SPAN' || img.nodeName === 'IMG')) {
		const icon = document.createElement('i');

		icon.classList.add('icon', 'fa', 'fa-graduation-cap', 'fa-fw', 'navicon');
		icon.setAttribute('aria-hidden', 'true');
		icon.tabIndex = -1;
		img.replaceWith(icon);
	}
};

const refresh = async (
	_valueName: string,
	_oldValue: Record<string, string>,
	changed:
		| [
				type: DispatchType,
				id: string,
				optionalObject: ValidIconObject | undefined,
				cacheBuster: number,
		  ]
		| undefined,
	remote: boolean,
) => {
	if (!remote || !changed) {
		return;
	}

	const [type, id, optionalObject] = changed;

	if (type === DispatchType.deleted) {
		resetIcon(id);
	} else {
		void applyIcon(id, optionalObject);
	}
};

const updateIcons = async () => {
	const sidebar = getSidebar();

	if (sidebar) {
		const pointers = await getPointers();
		const pointerKeys = Object.keys(pointers);

		for (const id of pointerKeys) {
			await applyIcon(id);
		}

		GM_addValueChangeListener(StorageKeys.changed, refresh);
	}
};

const runOnceOnFrontPage = () => {
	if (getSidebar()) {
		GM_registerMenuCommand('Open settings', () => {
			open('/customIconsPreact/', '_blank');
		});

		addEventListener('customIconsPreact', updateIcons);

		void updateIcons();
	}
};

if (!/^\/cleanmoodle/i.test(location.pathname)) {
	const init = isFrontpage ? runOnceOnFrontPage : setupSettingsPage;

	domReady(init);
}
