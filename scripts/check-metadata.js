import assert from 'node:assert/strict';
import {readdirSync as readdir, readFileSync as readFile} from 'node:fs';

const distDir = new URL('../dist/userscript-out/', import.meta.url);

/**
 * @param {URL} dir
 * @return {Iterable<URL>}
 */
function * readDir(dir) {
	for (const subDir of readdir(dir)) {
		try {
			yield * readDir(new URL(`${subDir}/`, dir));
		} catch {
			yield new URL(`${subDir}`, dir);
		}
	}
}

for (const path of readDir(distDir)) {
	if (path.href.endsWith('.user.js')) {
		const contents = readFile(path, 'utf8');
		const split = new Set(contents.split(/\n/).map(s => s.trim()));

		const find = s => {
			assert(
				split.has(s),
				`Could not find "${s}" in ${path.href.split('/').at(-1)}`,
			);
		};

		find('// ==UserScript==');
		find('// ==/UserScript==');
	}
}
