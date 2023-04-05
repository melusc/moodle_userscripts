import {numericBaseSensitiveCollator} from '../shared/general-functions/intl-collator.js';

import type {SanitizedContentFile} from './page-content.js';

export function getEntries(
	contents: SanitizedContentFile[],
	directoryDepth: number,
): {
	root: SanitizedContentFile[] | undefined;
	entries: Array<[string, SanitizedContentFile[]]>;
} {
	const filePaths: Record<string, SanitizedContentFile[]> = {};

	for (const item of contents) {
		if ('isexternalfile' in item) {
			const path = item.filePath[directoryDepth] ?? '/';

			const filePathArray = filePaths[path] ?? (filePaths[path] = []);

			filePathArray.push(item);
		}
	}

	const root = filePaths['/'];
	root?.sort((a, b) =>
		numericBaseSensitiveCollator.compare(a.filename.trim(), b.filename.trim()),
	);

	delete filePaths['/'];

	const entries = Object.entries(filePaths);
	entries.sort(([keyA], [keyB]) =>
		numericBaseSensitiveCollator.compare(keyA.trim(), keyB.trim()),
	);

	return {root, entries};
}

export function cleanHref(href: string): string {
	const url = new URL(href);
	if (url.searchParams.get('forcedownload') === '1') {
		url.searchParams.set('forcedownload', '0');
	}

	return url.href;
}

export function portal(element: HTMLElement, target: HTMLElement) {
	console.log(element, target);

	function update() {
		target.append(element);
	}

	function destroy() {
		element.remove();
	}

	update();
	return {
		update,
		destroy,
	};
}
