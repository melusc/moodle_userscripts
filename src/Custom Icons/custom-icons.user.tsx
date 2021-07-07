// ==UserScript==
// @name      Custom Icons Preact
// @version   2021.07.07a
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
import {getCourses} from '../shared/moodle-functions';
import {Pointers, Values} from './custom-icons.d';
import {setupSettingsPage} from './settingspage.js';
import {deleteIconFromStorage} from './shared';

const defaultPointers = GM_getValue('pointers');
if (Object.prototype.toString.call(defaultPointers) !== '[object Object]') {
	GM_setValue('pointers', {});
	GM_setValue('values', {});
}

const isFrontpage = !/^\/customiconspreact/i.test(location.pathname);

const getSidebar = () =>
	document.querySelector<HTMLUListElement>(
		'li[aria-labelledby="label_2_4"] ul[role="group"]',
	);

const getDataURI = (id: string): false | Values[string] => {
	const pointers = GM_getValue<Pointers>('pointers');

	const uuid = pointers[id];

	if (!uuid) {
		return false;
	}

	const object = GM_getValue<Values>('values')[uuid];

	return object ?? false;
};

const getBlobURL = (
	id: string,
):
	| false
	| {
			rawXML: string;
	  }
	| {
			blobURL: string;
	  } => {
	const dataURI = getDataURI(id);

	if (dataURI === false) {
		return false;
	}

	if ('rawXML' in dataURI) {
		return dataURI;
	}

	const {mediaType, rawByteString} = dataURI;
	const byteString = atob(rawByteString);

	const encoder = new TextEncoder();
	const uintArray = encoder.encode(byteString);

	const blob = new Blob([uintArray], {
		type: mediaType,
	});

	return {blobURL: URL.createObjectURL(blob)};
};

const testIfUserLeftCourse = (id: string) => {
	void getCourses().then(courses => {
		if (!(id in courses)) {
			deleteIconFromStorage(id);

			// eslint-disable-next-line no-alert
			alert(
				`You appear to not be in the course with the id "${id}" anymore.\nThe course will not be checked for anymore`,
			);
		}
	});
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
		testIfUserLeftCourse(id);

		return;
	}

	if (anchor.firstElementChild) {
		const blobURLObject = getBlobURL(id);

		if (typeof blobURLObject !== 'object') {
			return;
		}

		if ('rawXML' in blobURLObject) {
			const span = document.createElement('span');

			span.classList.add('icon', 'navicon');
			span.style.display = 'inline-block';
			span.style.color = 'var(--svg-fill, inherit)';
			span.tabIndex = -1;

			const rawXMLArray: string[] & {
				raw?: string[];
			} = [blobURLObject.rawXML];
			rawXMLArray.raw = [blobURLObject.rawXML];

			render(html(rawXMLArray as TemplateStringsArray), span);

			anchor.firstElementChild.replaceWith(span);
		} else {
			const img = new Image();

			img.classList.add('icon', 'navicon');
			img.setAttribute('aria-hidden', 'true');
			img.style.cssText
				= 'fill: var(--svg-fill, inherit);stroke: var(--svg-fill, inherit);-moz-context-properties: fill, stroke;';

			img.tabIndex = -1;
			img.src = blobURLObject.blobURL;
			img.addEventListener(
				'load',
				() => {
					URL.revokeObjectURL(blobURLObject.blobURL);
				},
				{once: true},
			);
			anchor.firstElementChild.replaceWith(img);
		}
	}
};

const refresh = (
	_valueName: string,
	// I have no control over the order
	// eslint-disable-next-line @typescript-eslint/default-param-last
	oldValue: Record<string, string> = {},
	// eslint-disable-next-line @typescript-eslint/default-param-last
	newValue: Record<string, string> = {},
	remote: boolean,
) => {
	/* If the user clears the storage newValue will be undefined,
    so default to empty object.
    If the user undoes the clearing oldValue will be undefined,
    so default to empty object. */

	const sidebar = getSidebar();
	if (remote && sidebar) {
		const oldEntries = Object.entries(oldValue);
		const newEntries = Object.entries(newValue);
		const changedOrAdded = newEntries.filter(
			([key, value]) => !(key in oldValue) && oldValue[key] !== value,
		);
		const removed = oldEntries.filter(([key]) => !(key in newValue));

		for (const [id] of removed) {
			const img = sidebar.querySelector<HTMLImageElement>(
				`a[href="https://moodle.ksasz.ch/course/view.php?id=${id}"] > .icon.navicon`,
			);

			// Test nodeName to not update an icon accidentally
			if (img && (img.nodeName === 'SPAN' || img.nodeName === 'IMG')) {
				const icon = document.createElement('i');

				icon.classList.add(
					'icon',
					'fa',
					'fa-graduation-cap',
					'fa-fw',
					'navicon',
				);
				icon.setAttribute('aria-hidden', 'true');
				icon.tabIndex = -1;
				img.replaceWith(icon);
			}
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
