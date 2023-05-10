const cache = new Map<unknown, unknown>();

export function memoise<This, Args extends unknown[], R>(
	fn: (this: This, ...args: Args) => R,
): (this: This, ...args: [...Args, boolean]) => R {
	/*
		Implementing memoise naively would make
		`cache.get(1).get(2)` return the result directly
		which would disallow
		`cache.get(1).get(2).get(3)` in the future

		Using `cache.get(..)..get(cacheKey)` makes the cache unique to the memoised function
		but allows the same cache for all functions
		It also allows what was shown above
	*/
	const cacheKey = Symbol(fn.name);

	function getMap(args: [This, ...Args]) {
		let map = cache;
		for (const arg of args) {
			if (!map.has(arg)) {
				map.set(arg, new Map());
			}

			map = map.get(arg)! as Map<unknown, unknown>;
		}

		return map;
	}

	return function (...args: [...args: Args, useCache: boolean]): R {
		const fnArgs = args.slice(0, -1) as Args;
		const cachePath = [this, ...fnArgs] as [This, ...Args];
		const useCache = args.at(-1) as boolean;

		const map = getMap(cachePath);

		if (useCache && map.has(cacheKey)) {
			return map.get(cacheKey) as R;
		}

		const result = fn.apply(this, fnArgs);
		map.set(cacheKey, result);

		// Normally the rule of memoising is that it should have no side effects
		// and it should behave the same with the same inputs
		// For our own use we'll break that rule, because it memoises Moodle API functions
		// If something fails they normally try to login and then retry
		// The token is not in the parameter, so this is necessary.
		if (result instanceof Promise) {
			result.catch(() => {
				map.delete(cacheKey);
			});
		}

		return result;
	};
}
