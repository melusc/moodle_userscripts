const sortingUsingPivot = (
  arr, fn, left, right
) => {
  const pivot = arr[ ( right + left ) >>> 1 ];
  let l = left;
  let r = right;

  while ( l <= r ) {
    while ( fn(
      arr[ l ],
      pivot
    ) === -1 ) {
      l++;
    }

    while ( fn(
      arr[ r ],
      pivot
    ) === 1 ) {
      r--;
    }

    if ( l <= r ) {
      swap(
        arr,
        l,
        r
      );
      l++;
      r--;
    }
  }

  return l;
};

const swap = (
  arr, l, r
) => {
  [ arr[ l ], arr[ r ] ] = [ arr[ r ], arr[ l ] ];
};

/**
 *
 * @param {array} arr The array to sort
 * @param {function} fn The function to call when comparing vals
 * @param {number} left pivot
 * @param {number} right pivot
 *
 * @returns {array} The sorted array
 */
export const quickSort = (
  arr, fn, left = 0, right = arr.length - 1
) => {
  let index;

  if ( arr.length > 1 ) {
    index = sortingUsingPivot(
      arr,
      fn,
      left,
      right
    );

    if ( left < index - 1 ) {
      quickSort(
        arr,
        fn,
        left,
        index - 1
      );
    }

    if ( index < right ) {
      quickSort(
        arr,
        fn,
        index,
        right
      );
    }
  }

  return arr;
};
