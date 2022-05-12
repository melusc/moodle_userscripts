import {readFileSync} from 'node:fs';
import {env} from 'node:process';
import assert from 'node:assert/strict';

import {parse} from 'dotenv';

type Env = {
	MOODLE_USERNAME?: string;
	MOODLE_PASSWORD?: string;
};

let localEnv: Env;

const get = (key: keyof Env): string => {
	const inEnv = env[key];
	if (inEnv) {
		return inEnv;
	}

	// Only read if necessary
	localEnv ??= parse<Env>(
		readFileSync(new URL('../../../../.env', import.meta.url)),
	);
	const result = localEnv[key];

	assert(typeof result === 'string');
	return result;
};

export const username = get('MOODLE_USERNAME');
export const password = get('MOODLE_PASSWORD');
