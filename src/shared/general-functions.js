const sortingUsingPivot = (
  array, comparisonFunction, left, right
) => {
  const pivot = array[ ( right + left ) >>> 1 ];
  let l = left;
  let r = right;

  while ( l <= r ) {
    while ( comparisonFunction(
      array[ l ],
      pivot
    ) < 0 ) {
      ++l;
    }

    while ( comparisonFunction(
      array[ r ],
      pivot
    ) > 0 ) {
      --r;
    }

    if ( l <= r ) {
      swap(
        array,
        l,
        r
      );
      ++l;
      --r;
    }
  }

  return l;
};

const swap = (
  array, index1, index2
) => {
  [ array[ index1 ], array[ index2 ] ] = [ array[ index2 ], array[ index1 ] ];
};

/**
 *
 * @param {array} array The array to sort
 * @param {function} fn The function to call when comparing vals
 * @param {number} left pivot
 * @param {number} right pivot
 *
 * @returns {array} The sorted array
 */
export const quickSort = (
  array, comparisonFunction, left = 0, right = array.length - 1
) => {
  if ( array.length > 1 ) {
    const index = sortingUsingPivot(
      array,
      comparisonFunction,
      left,
      right
    );

    if ( left < index - 1 ) {
      quickSort(
        array,
        comparisonFunction,
        left,
        index - 1
      );
    }

    if ( index < right ) {
      quickSort(
        array,
        comparisonFunction,
        index,
        right
      );
    }
  }

  return array;
};
