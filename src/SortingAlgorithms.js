export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }

  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }

  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliary = array.slice();
    BubbleSort(array, auxiliary, animations);
    return animations;
  }

export function BubbleSort(array, auxiliary, animations) {
   for (let i = 0; i < array.length; i++) {
     for (let j = 0; j < array.length; j++) {
         // Push the indices and the colors of the bars being compared
         //animations.push([j, j + 1]);
         if (array[j] > array[j+1]) {

         // Push the indices and new heights of the bars being swapped
         animations.push([j, j + 1]);
         animations.push([j + 1, j ]);
         animations.push([[j, array[j + 1 ]], [ j + 1 ,array[j]]]);


         let temp = array[j];
         array[j] = array[j + 1];
         array[j + 1] = temp;
       }
     }
   }
   return animations;
}

export function getSelectionSortAnimations(array) {
  const animations = [];
  const length = array.length;

  for (let i = 0; i < length; i++) {
    let min = i;
    let temp = array[i];

    for (let j = i + 1; j < length; j++) {

      animations.push([j, j]);
      animations.push([j, j]);
      animations.push([[ i, array[i]],[ i, array[i]]]);

      if (array[j] < array[min]) {
        min = j;
      }
    }

    // Push to animations

    animations.push([i, min]);
    animations.push([min, i]);
    animations.push([[min, array[i]], [i, array[min]]])

    array[i] = array[min];
    array[min] = temp;
  }
  return animations;
}
