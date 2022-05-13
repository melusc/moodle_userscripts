import {describe, expect, jest, test} from '@jest/globals';
import {update_GM_info, violentMonkeyContext} from 'mock-violentmonkey';
import {
	compare,
	upgrader,
	Version,
	parseVersion,
} from '../../src/shared/general-functions/upgrader.js';

describe('greaterThan', () => {
	test.each([
		[[2, 3, 4], [1, 2, 3], 1],
		[[1, 3, 4], [1, 2, 3], 1],
		[[1, 2, 4], [1, 2, 3], 1],
		[[1, 5, 6], [2, 3, 4], -1],
		[[1, 2, 5], [2, 3, 4], -1],
		[[1, 2, 3], [1, 2, 3], 0],
	])('%j > %j === %j', (a: Version, b: Version, expected: boolean) => {
		expect(compare(a, b)).toStrictEqual(expected);
	});

	test('parseVersion', () => {
		expect(parseVersion('0.0.1')).toStrictEqual([0, 0, 1]);
		expect(parseVersion('10.10.10')).toStrictEqual([10, 10, 10]);
		expect(() => {
			parseVersion('1.0.0.0');
		}).toThrow();
		expect(() => {
			parseVersion('a.b.c');
		}).toThrow();
		expect(() => {
			parseVersion(' 1.2.3 ');
		}).toThrow();
	});
});

describe('upgrader', () => {
	test(
		'Call none',
		violentMonkeyContext(() => {
			update_GM_info({
				version: '0.0.0',
			});

			const dontCall = jest.fn();

			upgrader({
				'0.0.1': dontCall,
				'0.1.0': dontCall,
			});

			expect(dontCall).not.toHaveBeenCalled();
		}),
	);

	test(
		'Call some',
		violentMonkeyContext(() => {
			update_GM_info({
				version: '1.0.0',
			});

			const dontCall = jest.fn();
			const doCall = jest.fn();

			upgrader({
				'0.0.0': doCall,
				'1.0.0': doCall,
				'1.0.1': dontCall,
			});

			expect(dontCall).not.toHaveBeenCalled();
			expect(doCall).toHaveBeenCalledTimes(2);
		}),
	);

	test(
		'Call all',
		violentMonkeyContext(() => {
			update_GM_info({
				version: '1.0.0',
			});

			const doCall = jest.fn();

			upgrader({
				'0.0.0': doCall,
				'0.0.1': doCall,
				'0.1.0': doCall,
				'1.0.0': doCall,
			});

			expect(doCall).toHaveBeenCalledTimes(4);
		}),
	);
});
