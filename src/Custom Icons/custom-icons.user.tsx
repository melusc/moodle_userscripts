// ==UserScript==
// @name      Custom Icons Preact
// @version   2021.08.17c
// @author    lusc
// @updateURL https://git.io/Jqlt8
// @include   *://moodle.ksasz.ch/*
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

import {render, html} from 'htm/preact';
import {popupGetCourses} from '../shared/moodle-functions-v2';
import {setupSettingsPage} from './settingspage';
import {
	deleteIconFromStorage,
	getPointers,
	getValues,
	StorageKeys,
	updateDeprecatedSplitDataURI,
} from './shared';

// Stop webpack from removing the metadata above
if (location.protocol !== 'https:') {
	location.protocol = 'https:';
}

const isFrontpage = !/^\/customiconspreact/i.test(location.pathname);

const getSidebar = () =>
	document.querySelector<HTMLUListElement>(
		'li[aria-labelledby="label_2_4"] ul[role="group"]',
	);

const getBlobURL = (
	id: string,
):
	| {
			rawXML: string;
	  }
	| {
			dataURI: string;
	  }
	| false => {
	const pointers = getPointers();
	const uuid = pointers[id];

	if (!uuid) {
		return false;
	}

	const values = getValues();
	const icon = values[uuid];

	if (icon === undefined) {
		return false;
	}

	if ('rawXML' in icon) {
		return icon;
	}

	if ('dataURI' in icon) {
		return icon;
	}

	const dataURI = updateDeprecatedSplitDataURI(uuid, icon);

	return {
		dataURI,
	};
};

const testIfUserLeftCourse = async (id: string) => {
	const courses = await popupGetCourses('Custom Icons');

	if (!(id in courses)) {
		deleteIconFromStorage(id);

		// eslint-disable-next-line no-alert
		alert(
			`You appear to not be in the course with the id "${id}" anymore.\nThe course will not be checked for anymore`,
		);
	}
};

const applyIcon = (id: string) => {
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

	const iconObject = getBlobURL(id);

	if (!iconObject) {
		resetIcon(id);

		deleteIconFromStorage(id);

		return;
	}

	if ('rawXML' in iconObject) {
		const span = document.createElement('span');

		span.classList.add('icon', 'navicon');
		span.style.display = 'inline-block';
		span.style.color = 'var(--svg-fill, inherit)';
		span.tabIndex = -1;

		render(
			html(
				Object.assign([iconObject.rawXML], {
					raw: [iconObject.rawXML],
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
		img.src = iconObject.dataURI;
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

const refresh = (
	_valueName: string,
	_oldValue: Record<string, string>,
	changed: [cacheBuster: number, changed: string[]],
	remote: boolean,
) => {
	if (remote) {
		// Don't rely on pointers updating first,
		// instead wait a bit and let pointers update as well
		setTimeout(() => {
			const pointers = getPointers();
			for (const courseId of changed[1]) {
				if (courseId in pointers) {
					applyIcon(courseId);
				} else {
					resetIcon(courseId);
				}
			}
		});
	}
};

const updateIcons = () => {
	const sidebar = getSidebar();

	if (sidebar) {
		const pointers = Object.keys(getPointers());

		for (const id of pointers) {
			applyIcon(id);
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

		updateIcons();
	}
};

if (!/^\/cleanmoodle/i.test(location.pathname)) {
	const functionToRun = isFrontpage ? runOnceOnFrontPage : setupSettingsPage;

	if (document.readyState === 'complete') {
		functionToRun();
	} else {
		addEventListener('DOMContentLoaded', functionToRun, {once: true});
	}
}
