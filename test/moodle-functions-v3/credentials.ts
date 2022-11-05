import {env} from 'node:process';

type Env = {
	MOODLE_USERNAME?: string;
	MOODLE_PASSWORD?: string;
};

const get = (key: keyof Env): string => {
	const inEnv = env[key] as string;
	if (inEnv) {
		return inEnv;
	}

	throw new Error(`${key} not found in environment variables`);
};

export const username = get('MOODLE_USERNAME');
export const password = get('MOODLE_PASSWORD');
