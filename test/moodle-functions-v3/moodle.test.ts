import {describe, expect, test} from '@jest/globals';
import {violentMonkeyContext} from 'mock-violentmonkey';

import {
	getToken,
	getUsername,
} from '../../src/shared/moodle-functions-v3/credentials.js';
import {
	ERR_INVALID_CREDENTIALS,
	ERR_NO_CREDENTIALS,
	Moodle,
} from '../../src/shared/moodle-functions-v3/moodle.js';

import {password, username} from './credentials.js';

describe('#login', () => {
	test(
		'With empty credentials',
		violentMonkeyContext(async () => {
			const moodle = new Moodle();

			await expect(async () => {
				await moodle.login();
			}).rejects.toThrow(ERR_NO_CREDENTIALS);
		}),
	);

	test(
		'With invalid credentials',
		violentMonkeyContext(async () => {
			const moodle = new Moodle();

			await expect(async () => {
				await moodle.login({username: 'username', password: 'password'});
			}).rejects.toThrow(ERR_INVALID_CREDENTIALS);
		}),
	);

	test(
		'With valid credentials',
		violentMonkeyContext(async () => {
			const moodle = new Moodle();

			const token = await moodle.login({username, password});
			expect(typeof token).toBe('string');
			expect(getUsername()).toBe(username);
		}),
	);

	test(
		'Multiple logins to use cached token',
		violentMonkeyContext(async () => {
			const moodle1 = new Moodle();

			await moodle1.login({username, password});
			expect(typeof getToken()).toBe('string');

			const moodle2 = new Moodle();
			expect(typeof moodle2.credentials.token).toBe('string');

			await expect(new Moodle().login()).resolves.toBe(GM_getValue('token'));
		}),
	);
});

describe('#logout', () => {
	test(
		'Example item',
		violentMonkeyContext(async () => {
			const moodle = new Moodle();
			await moodle.login({username, password});

			moodle.logout();
			expect(getUsername()).toBe(username);
			expect(getToken()).toBeUndefined();
		}),
	);
});
