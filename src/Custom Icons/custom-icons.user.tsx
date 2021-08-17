// ==UserScript==
// @name      Custom Icons Preact
// @version   2021.08.17b
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
import {Pointers, Values} from './custom-icons.d';
import {setupSettingsPage} from './settingspage';
import {deleteIconFromStorage} from './shared';

// Stop webpack from removing the metadata above
if (location.protocol !== 'https:') {
	location.protocol = 'https:';
}

const defaultPointers = GM_getValue<Pointers | undefined>('pointers');
if (Object.prototype.toString.call(defaultPointers) !== '[object Object]') {
	GM_setValue('pointers', {});
	GM_setValue('values', {});
}

const isFrontpage = !/^\/customiconspreact/i.test(location.pathname);

const getSidebar = () =>
	document.querySelector<HTMLUListElement>(
		'li[aria-labelledby="label_2_4"] ul[role="group"]',
	);

const getDataURI = (id: string): Values[string] | false => {
	const pointers = GM_getValue<Pointers>('pointers');

	const uuid = pointers[id];

	if (!uuid) {
		return false;
	}

	const values = GM_getValue<Values>('values');

	return values[uuid] ?? false;
};

const getBlobURL = (
	id: string,
):
	| {
			rawXML: string;
	  }
	| {
			url: string;
	  }
	| false => {
	const icon = getDataURI(id);

	if (icon === false) {
		return false;
	}

	if ('rawXML' in icon) {
		return icon;
	}

	if ('dataURI' in icon) {
		return {
			url: icon.dataURI,
		};
	}

	const {mediaType, rawByteString} = icon;

	return {
		url: `data:${mediaType};base64,${rawByteString}`,
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
		img.src = iconObject.url;
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
	// I have no control over the order
	// eslint-disable-next-line @typescript-eslint/default-param-last
	oldValue: Record<string, string> = {},
	// eslint-disable-next-line @typescript-eslint/default-param-last
	newValue: Record<string, string> = {},
	remote: boolean,
) => {
	/* Because of race conditions
		 Tampermonkey fires the changes in the order
		 of modification
		 Violentmonkey batches the modifications and fires
		 the changes in alphabetical order (I think)
		 This way it waits a bit and so both are updated afterwards */
	await Promise.resolve();

	/* If the user clears the storage newValue will be undefined,
    so default to empty object.
    If the user undoes the clearing oldValue will be undefined,
    so default to empty object. */

	const sidebar = getSidebar();
	if (remote && sidebar) {
		const oldEntries = Object.entries(oldValue);
		const newEntries = Object.entries(newValue);

		const changedOrAdded = newEntries.filter(
			([key, value]) => !(key in oldValue) || oldValue[key] !== value,
		);
		const removed = oldEntries.filter(([key]) => !(key in newValue));

		for (const [id] of removed) {
			resetIcon(id);
		}

		for (const [id] of changedOrAdded) {
			applyIcon(id);
		}
	}
};

const updateIcons = () => {
	const sidebar = getSidebar();

	if (sidebar) {
		const pointers = Object.keys(GM_getValue('pointers'));

		for (const id of pointers) {
			applyIcon(id);
		}

		GM_addValueChangeListener('pointers', refresh); // Only listen for changes to pointers because if values changes this will change
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
