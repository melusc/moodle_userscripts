type ComparisonFunction<T> = (leftItem: T, rightItem: T) => number;

const swap = <T>(array: T[], index1: number, index2: number): void => {
	const left = array[index1];
	const right = array[index2];

	if (left && right) {
		[array[index1], array[index2]] = [right, left];
	}
};

const sortingUsingPivot = <T>(
	array: T[],
	comparisonFunction: ComparisonFunction<T>,
	l: number,
	r: number,
): number => {
	const pivot = array[(r + l) >> 1];

	if (!pivot) {
		throw new Error(
			`pivot was out of bounds: [${JSON.stringify(array)}][${(r + l) >> 1}]`,
		);
	}

	while (l <= r) {
		let left: T | undefined;

		while ((left = array[l]) && comparisonFunction(left, pivot) < 0) {
			++l;
		}

		let right: T | undefined;
		while ((right = array[r]) && comparisonFunction(right, pivot) > 0) {
			--r;
		}

		if (l <= r) {
			swap(array, l, r);
			++l;
			--r;
		}
	}

	return l;
};

/**
 *
 * @param {array} array The array to sort
 * @param {function} comparisonFunction The function to call when comparing vals
 * @param {number} left pivot
 * @param {number} right pivot
 *
 * @return {array} The sorted array
 */
export const quickSort = <T>(
	array: T[],
	comparisonFunction: ComparisonFunction<T>,
	left = 0,
	right = array.length - 1,
): T[] => {
	if (array.length > 1) {
		const index = sortingUsingPivot<T>(array, comparisonFunction, left, right);

		if (left < index - 1) {
			quickSort<T>(array, comparisonFunction, left, index - 1);
		}

		if (index < right) {
			quickSort<T>(array, comparisonFunction, index, right);
		}
	}

	return array;
};
