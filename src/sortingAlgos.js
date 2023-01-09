
export function mergesort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations,) {
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


export function bubbleSort(array){
    const animations = [];

    for(let i = 0; i<array.length-1;i++){
        for(let j = 0; j<array.length-i-1;j++){
            //push twice to change and then revert color
            animations.push([j,Number(j+1)]);
            animations.push([j,Number(j+1)]);

            //change j and j+1 index of array if necessary
            if(array[j]>array[j+1]) {
                let placeholder = array[j+1];
                array[j+1] = array[j];
                array[j] = placeholder;
            }
            animations.push([j,Number(array[j])])
            animations.push([j+1,Number(array[j+1])]);
        }

    }
    //console.log(animations)
    return animations;
}



export function quickSort(array){
    const animations = [];
    quicksortHelper(array,0,array.length-1, animations);
    console.log(array);
    //console.log(animations);
    return animations;
}

function quicksortHelper(array, low, high, animations){

    if(low<high){
        //sort both sides of the array
        let middle = partition(array, low, high, animations);

        //once sorted, call quicksortHelper again on sorted sections
        //excluding the middle element since that is in the right place
        quicksortHelper(array, middle+1, high, animations);
        quicksortHelper(array, low, middle-1, animations);
    }
}

// A utility function to swap two elements
function quickswap(arr, i, j,animations) {
    animations.push([1,i,arr[i],j,arr[j]]);
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


//animation returned as comparison: [-1, oneIDX, twoIDX] X2
//animation returned as swap: [1, oneIDX, oneHeight, twoIDX, twoHeight]
function partition(arr, low, high, animations) {

    let pivot = arr[high];

    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        animations.push([-1,j,high]);
        animations.push([-1,j,high]);

        if (arr[j] < pivot) {

            // Increment index of smaller element and swap
            i++;
            quickswap(arr, i, j, animations);
        }
    }
    quickswap(arr, i + 1, high, animations);
    return (i + 1);
}


export function heapSort(array) {
    const animations = [];
    let sorted = heapSortHelper(array, animations);
    return animations;

}

//animation returned as comparison: [-1, oneIDX, twoIDX] X2
//animation returned as swap: [1, oneIDX, oneHeight, twoIDX, twoHeight]
function heapSortHelper(array, animations){

    // Build max heap
    for (let i = Math.floor(array.length / 2); i >= 0; i--) {
        heapify(array, array.length, i, animations);
    }

    // Extract elements one by one
    for (let i = array.length - 1; i > 0; i--) {
        // Swap current root with end
        animations.push([1,0, array[0], i, array[i]]);
        [array[0], array[i]] = [array[i], array[0]];

        // Call max heapify on the reduced heap
        heapify(array, i, 0, animations);
    }

    return array;
}

function heapify(array, size, root, animations) {
    // Assume root is largest
    let largest = root;
    const left = 2 * root + 1;
    const right = 2 * root + 2;

    // If left child is larger than root
    if (left < size && array[left] > array[largest]) {
        animations.push([-1,left, largest]);
        animations.push([-1,left, largest]);
        largest = left;
    }

    // If right child is larger than root
    if (right < size && array[right] > array[largest]) {
        animations.push([-1,right, largest]);
        animations.push([-1,right, largest]);
        largest = right;
    }

    // If root is not largest, swap with largest and continue heapifying
    if (largest !== root) {
        animations.push([-1,root, largest]);
        animations.push([-1,root, largest]);
        animations.push([1,root, array[root], largest, array[largest]]);
        [array[root], array[largest]] = [array[largest], array[root]];
        heapify(array, size, largest, animations);
    }
}

export function selectionSort(array){
    const animations = [];
    let sorted = selectionSortHelper(array, animations);
    return animations;
}


//animation returned as comparison: [-1, oneIDX, twoIDX] X2
//animation returned as swap: [1, oneIDX, oneHeight, twoIDX, twoHeight]
function selectionSortHelper(array, animations) {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            animations.push([-1, j, minIndex]);
            animations.push([-1, j, minIndex]);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            animations.push([1, i, array[i], minIndex, array[minIndex]]);
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }
    }
    return array;
}


