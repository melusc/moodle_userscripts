type ComparisonFunction<T> = (leftItem: T, rightItem: T) => number;

const swap = <T>(array: T[], index1: number, index2: number): void => {
	[array[index1], array[index2]] = [array[index2], array[index1]];
};

const sortingUsingPivot = <T>(
	array: T[],
	comparisonFunction: ComparisonFunction<T>,
	left: number,
	right: number
): number => {
	const pivot = array[(right + left) >>> 1];
	let l = left;
	let r = right;

	while (l <= r) {
		while (comparisonFunction(array[l], pivot) < 0) {
			++l;
		}

		while (comparisonFunction(array[r], pivot) > 0) {
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
	right = array.length - 1
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
