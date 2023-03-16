import assert from 'node:assert/strict';
import {readdirSync as readdir, readFileSync as readFile} from 'node:fs';
import {exit} from 'node:process';

const distDir = new URL('../dist/', import.meta.url);

function escapeRegex(string) {
	return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

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

try {
	for (const path of readDir(distDir)) {
		if (path.href.endsWith('.user.js')) {
			const contents = readFile(path, 'utf8');
			const split = new Set(contents.split(/\n/).map(s => s.trim()));
			const name = path.href.split('/').at(-1);

			const find = s => {
				if (typeof s === 'string') {
					assert(split.has(s), `Could not find "${s}" in ${name}`);
				} else {
					let has = false;
					for (const line of split) {
						if (s.test(line)) {
							has = true;
						}
					}

					assert(has, `Could not find line satisfying regex ${s} in ${name}`);
				}
			};

			find('// ==UserScript==');
			find('// ==/UserScript==');
			find(
				new RegExp(
					`^// @updateURL\\s*https://github.com/melusc/moodle_userscripts/raw/userscript-out/.+/${escapeRegex(
						name,
					)}`,
				),
			);
			find(/^\/\/ @license\s+MIT$/);
			find(/^\/\/ @name\s+/);
			find(/^\/\/ @version\s+\d+\.\d+\.\d+$/);
			find(/^\/\/ @run-at\s+document-start$/);
		}
	}
} catch (error) {
	console.error(error.message);
	exit(1);
}
