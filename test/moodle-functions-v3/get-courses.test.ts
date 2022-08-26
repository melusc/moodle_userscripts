import {describe, expect, test} from '@jest/globals';
import {violentMonkeyContext} from 'mock-violentmonkey';

import {getCourses} from '../../src/shared/moodle-functions-v3/get-courses.js';
import {Moodle} from '../../src/shared/moodle-functions-v3/moodle.js';

import {password, username} from './credentials.js';

Moodle.extend(getCourses);

describe('#getCourses', () => {
	test(
		'Invalid token',
		violentMonkeyContext(async () => {
			const moodle = new Moodle();
			await expect(async () => {
				moodle.credentials.token = 'INVALID';
				await moodle.getCourses();
			}).rejects.toThrow();
		}),
	);

	test(
		'Valid credentials',
		violentMonkeyContext(async () => {
			const moodle = new Moodle();
			await moodle.login({username, password});

			const courses = await moodle.getCourses();
			expect(courses.find(({id}) => id === 32)).toStrictEqual({
				id: 32,
				name: 'Allgemeine Informationen',
			});
		}),
	);
});
