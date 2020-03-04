// setArr(Object.assign([...arr], {0 : arr[1], 1 : arr[0]})); // test one line set new array with swapped indexes. But it added whole thing.
// Replay object holds all the event records of this sorting algo.
// It will be playing back for DOM later to avoid setTimeout unfortunate changing variables behavior.

export const insertionSort = arr => {
  const sortingReplay = {
    arrMutation: [],
    indexMovement: [],
    swapMovement: [],
    frontIndex: []
  };

  for (let counter = 1; counter < arr.length; counter++) {
    let greenLight = true;
    let index = counter;

    while (index >= 1 && greenLight) {
      sortingReplay.indexMovement.push(index);
      // if behind index is bigger than current index
      if (arr[index - 1] > arr[index]) {
        // Destructure. Change places in this case.
        [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
        sortingReplay.swapMovement.push(index - 1);
        index--;
      } else {
        sortingReplay.swapMovement.push(null);
        greenLight = false;
      }
      sortingReplay.arrMutation.push([...arr]);
      sortingReplay.frontIndex.push(counter + 1);
    }
  }

  sortingReplay.arrMutation.push([...arr]);
  sortingReplay.swapMovement.push(null);
  sortingReplay.indexMovement.push(null);
  sortingReplay.frontIndex.push(null);

  return sortingReplay;
};

export const selectionSort = arr => {
  const sortingReplay = {
    arrMutation: [],
    indexMovement: [],
    swapMovement: [],
    frontIndex: []
  };

  for (let position = 0; position < arr.length; position++) {
    let minIndex = position;
    let counter = minIndex + 1;

    for (let index = counter; index < arr.length; index++) {
      sortingReplay.indexMovement.push(position);
      sortingReplay.frontIndex.push(index);
      // Finds the index of the smallest number. The minimum index.
      if (arr[minIndex] > arr[index]) {
        minIndex = index;
      }
      sortingReplay.swapMovement.push(minIndex);
      sortingReplay.arrMutation.push([...arr]);
    }
    // Destructure. Change places in this case. Puts minIndex at the  current position index.
    [arr[minIndex], arr[position]] = [arr[position], arr[minIndex]];

    sortingReplay.arrMutation.push([...arr]);
    sortingReplay.swapMovement.push(minIndex);
    sortingReplay.indexMovement.push(position);
    sortingReplay.frontIndex.push(null);
  }

  sortingReplay.arrMutation.push([...arr]);
  sortingReplay.swapMovement.push(null);
  sortingReplay.indexMovement.push(null);
  sortingReplay.frontIndex.push(null);

  return sortingReplay;
};

export const bubbleSort = arr => {
  const sortingReplay = {
    arrMutation: [],
    indexMovement: [],
    swapMovement: [],
    frontIndex: []
  };

  for (let i = 1; i < arr.length; i++) {
    for (let index = 0; index < arr.length - 1; index++) {
      if (arr[index] > arr[index + 1]) {
        sortingReplay.indexMovement.push(index);
        sortingReplay.swapMovement.push(index + 1);
        sortingReplay.frontIndex.push(null);
        [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
      } else {
        sortingReplay.indexMovement.push(null);
        sortingReplay.swapMovement.push(null);
        sortingReplay.frontIndex.push(index);
      }
      sortingReplay.arrMutation.push([...arr]);
    }
  }

  sortingReplay.arrMutation.push([...arr]);
  sortingReplay.swapMovement.push(null);
  sortingReplay.indexMovement.push(null);
  sortingReplay.frontIndex.push(null);

  return sortingReplay;
};

export const heapSort = arr => {
  const sortingReplay = {
    arrMutation: [],
    indexMovement: [],
    swapMovement: [],
    frontIndex: []
  };
  const sortedArr = [];

  // Sort a maxHeap then puts the root(then the biggest node) into sortedArr, then pop it out of arr and redo the maxHeap sort until arr==0)
  // Straight up recursion is normally used instead of this while loop written here. 
  while (arr.length > 0) {

    for (let counter = Math.floor(arr.length / 2); counter >= 0; counter--) {
      let isHeap = false;
      let maxChild = null;
      let startIndex = counter;

      while (startIndex * 2 < arr.length - 1 && isHeap === false) {

        // Put front index "search index"(the blue color) on children. 
        sortingReplay.arrMutation.push([...arr, ...sortedArr]);
        sortingReplay.frontIndex.push(startIndex);
        
        // If index/node only has one child
        if (startIndex * 2 + 1 === arr.length - 1) {
          sortingReplay.swapMovement.push(null);
          sortingReplay.indexMovement.push(startIndex * 2 + 1);
          maxChild = startIndex * 2 + 1;
        } else {
          sortingReplay.swapMovement.push(startIndex * 2 + 2);
          sortingReplay.indexMovement.push(startIndex * 2 + 1);
          // Gets the bigger child. Which is bigger ? left : right. 
          maxChild = arr[startIndex * 2 + 1] > arr[startIndex * 2 + 2] ? maxChild = startIndex * 2 + 1 : maxChild = startIndex * 2 + 2
        }

        // Is the child bigger then current node/index?  
        if (arr[startIndex] < arr[maxChild]) {
          sortingReplay.swapMovement.push(maxChild);
          sortingReplay.indexMovement.push(startIndex);
          sortingReplay.frontIndex.push(null);
          [arr[startIndex], arr[maxChild]] = [arr[maxChild], arr[startIndex]];
          startIndex = maxChild;
        } else {
          sortingReplay.swapMovement.push(null);
          sortingReplay.indexMovement.push(null);
          sortingReplay.frontIndex.push(null);
          isHeap = true;
        }
        sortingReplay.arrMutation.push([...arr, ...sortedArr]);
      }
    }

    [arr[arr.length - 1], arr[0]] = [arr[0], arr[arr.length - 1]];
    sortedArr.push(arr.pop());
  }

  sortingReplay.arrMutation.push([...arr, ...sortedArr]);
  sortingReplay.swapMovement.push(null);
  sortingReplay.indexMovement.push(null);
  sortingReplay.frontIndex.push(null);

  return sortingReplay;
};

export const actualQuickSort = (arr, left, right, sortingReplay) => {

  // Sort and get dividing index.
  function subSort(arr, left, right) {
    // Pivot get set to the middle item in the array.
    let pivot = arr[Math.floor((right + left) / 2)];
    let pivotIndex = Math.floor((right + left) / 2);
    
    // While the left & right pointers have not passed each other.
    while(left <= right) {

      // While left pointer's index has lesser value than pivot value. Step to next index.
      while(arr[left] < pivot) {
        left++;
        sortingReplay.arrMutation.push([...arr]);
        sortingReplay.swapMovement.push(right);
        sortingReplay.indexMovement.push(left);
        sortingReplay.frontIndex.push(pivotIndex);
      }
      // While right pointer's index has greater value than pivot value. Step to next index.
      while(arr[right] > pivot) {
        right--;
        sortingReplay.arrMutation.push([...arr]);
        sortingReplay.swapMovement.push(right);
        sortingReplay.indexMovement.push(left);
        sortingReplay.frontIndex.push(pivotIndex);
      }
      
      // If left & right pointers have passed each other. Swap the values on those indexes, and step both pointers to the next index.
      if(left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];

        sortingReplay.arrMutation.push([...arr]);
        sortingReplay.swapMovement.push(right);
        sortingReplay.indexMovement.push(left);
        sortingReplay.frontIndex.push(pivotIndex);
        
        left++;
        right--;
      }
    }
    
    return left;
  }
  
  // Get a index to divide the array at, and performe quick sort on those children and so on...
  let dividerIndex = subSort(arr, left, right);
  
  // more items on the left side of the dividerIndex
  if(left < dividerIndex - 1) {
    actualQuickSort(arr, left, dividerIndex - 1, sortingReplay);
  }
  // more items on the left side of the dividerIndex
  if(dividerIndex < right) {
    actualQuickSort(arr, dividerIndex, right, sortingReplay);
  }
  
  return sortingReplay;
}

export const quickSort = (arr, left, right) => {
  let sortingReplay = {
    arrMutation: [],
    indexMovement: [],
    swapMovement: [],
    frontIndex: []
  };

  actualQuickSort(arr, left, right, sortingReplay);
  
  sortingReplay.arrMutation.push(...[sortingReplay.arrMutation[sortingReplay.arrMutation.length-1]]);
  sortingReplay.swapMovement.push(null);
  sortingReplay.indexMovement.push(null);
  sortingReplay.frontIndex.push(null);

  return sortingReplay;
}