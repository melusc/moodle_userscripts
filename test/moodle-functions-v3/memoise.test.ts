import {describe, expect, jest, test} from '@jest/globals';

import {memoise} from '../../src/shared/moodle-functions-v3/memoise.js';

describe('memoise', () => {
	test('No parameters', () => {
		const fn = jest.fn<() => void>();
		const memoised = memoise(fn);

		memoised(true);
		expect(fn).toHaveBeenCalledTimes(1);
		// To have been called with nothing
		expect(fn).toHaveBeenLastCalledWith();

		memoised(true);
		expect(fn).toHaveBeenCalledTimes(1);

		memoised(false);
		expect(fn).toHaveBeenCalledTimes(2);
	});

	test('One parameter', () => {
		const fn = jest.fn<(a: number) => [number]>(a => [a]);
		const memoised = memoise(fn);

		const result1 = memoised(1, true);
		const result1Cached = memoised(1, true);
		expect(result1Cached).toBe(result1);

		const result2 = memoised(1, false);
		expect(result2).toStrictEqual(result1);
		expect(result2).not.toBe(result1);

		expect(fn).toHaveBeenCalledTimes(2);
	});

	test('Arbitrary parameters', () => {
		const fn = jest.fn<(...args: number[]) => number[]>((...args) => args);
		const memoised = memoise(fn);

		const result1 = memoised(1, 2, 3, true);

		const result2 = memoised(1, 2, 3, 4, true);
		expect(result2).toEqual([1, 2, 3, 4]);

		const result1Cached = memoised(1, 2, 3, true);
		expect(result1Cached).toBe(result1);
	});

	test('Async function that fails', async () => {
		let callCount = 0;

		// eslint-disable-next-line @typescript-eslint/require-await
		async function fn(): Promise<Record<string, boolean>> {
			if (callCount++ === 0) {
				throw new Error('Oh no!');
			}

			return {
				noError: true,
			};
		}

		const memoised = memoise(fn);

		// Both failing is okay
		// only once it actually fails should it be removed from the cache
		await Promise.all([
			expect(memoised(true)).rejects.toThrow('Oh no!'),
			expect(memoised(true)).rejects.toThrow('Oh no!'),
		]);

		const result = await memoised(true);
		expect(result).toEqual({noError: true});
		await expect(memoised(true)).resolves.toBe(result);
	});

	test('Use `this` for memoisation', () => {
		const fn = jest.fn(function (this: {n: number}) {
			expect(typeof this.n).toBe('number');
		});

		const memoised = memoise(fn);
		const this1 = {n: 1};
		memoised.call(this1, true);
		expect(fn).toHaveBeenCalledTimes(1);
		memoised.call(this1, true);
		expect(fn).toHaveBeenCalledTimes(1);

		memoised.call(this1, false);
		expect(fn).toHaveBeenCalledTimes(2);

		memoised.call({n: 1}, true);
		expect(fn).toHaveBeenCalledTimes(3);
	});
});
