import {describe, expect, jest, test} from '@jest/globals';
import {update_GM_info, violentMonkeyContext} from 'mock-violentmonkey';
import {
	compare,
	upgrader,
	type Version,
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
	] as Array<[Version, Version, number]>)(
		'%j > %j === %j',
		(a, b, expected) => {
			expect(Math.sign(compare(a, b))).toStrictEqual(expected);
		},
	);

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
			GM_setValue('lastUpgraded', '1.0.0');
			update_GM_info({
				script: {
					version: '1.2.3',
				},
			});

			const dontCall = jest.fn();

			upgrader({
				'0.0.1': dontCall,
				'0.1.0': dontCall,
				'1.0.0': dontCall,
			});

			expect(dontCall).not.toHaveBeenCalled();
			expect(GM_getValue('lastUpgraded')).toBe('1.2.3');
		}),
	);

	test(
		'Call some',
		violentMonkeyContext(() => {
			GM_setValue('lastUpgraded', '0.0.0');
			update_GM_info({
				script: {
					version: '1.1.0',
				},
			});

			const dontCall = jest.fn();
			const doCall = jest.fn();

			upgrader({
				'0.0.0': dontCall,
				'1.0.0': doCall,
				'1.0.1': doCall,
			});

			expect(dontCall).not.toHaveBeenCalled();
			expect(doCall).toHaveBeenCalledTimes(2);
			expect(GM_getValue('lastUpgraded')).toBe('1.1.0');
		}),
	);

	test(
		'Call all',
		violentMonkeyContext(() => {
			update_GM_info({
				script: {
					version: '1.0.0',
				},
			});

			const doCall = jest.fn();

			upgrader({
				'0.0.0': doCall,
				'0.0.1': doCall,
				'0.1.0': doCall,
				'1.0.0': doCall,
			});

			expect(doCall).toHaveBeenCalledTimes(4);
			expect(GM_getValue('lastUpgraded')).toBe('1.0.0');
		}),
	);

	test(
		'Call order',
		violentMonkeyContext(() => {
			expect.assertions(4);

			let index = 0;
			const makeTester = (expectedIndex: number) => () => {
				expect(index).toEqual(expectedIndex);
				++index;
			};

			upgrader({
				'2.3.0': makeTester(3),
				'1.2.4': makeTester(1),
				'1.4.2': makeTester(2),
				'0.2.1': makeTester(0),
			});
		}),
	);
});
