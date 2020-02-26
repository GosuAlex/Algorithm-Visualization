// setArr(Object.assign([...arr], {0 : arr[1], 1 : arr[0]})); // test one line set new array with swapped indexes. But it added whole thing.
// Replay object holds all the event records of this sorting algo.
// It will be playing back for DOM later to avoid setTimeout unfortunate changing variables behavior.  

export const insertionSort = (arr) => {
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
        sortingReplay.frontIndex.push(counter+1);
      }
  }

  sortingReplay.arrMutation.push([...arr]);
  sortingReplay.swapMovement.push(null);
  sortingReplay.indexMovement.push(null);
  sortingReplay.frontIndex.push(null);
  
  return sortingReplay;
};

export const selectionSort = (arr) => {
  const sortingReplay = {
    arrMutation: [],
    indexMovement: [],
    swapMovement: [],
    frontIndex: []
  };

  for(let position = 0 ; position < arr.length ; position++) {
    let minIndex = position;
    let counter = minIndex + 1;

    for(let index = counter ; index < arr.length ; index++) {
      sortingReplay.indexMovement.push(position);
      sortingReplay.frontIndex.push(index);
      // Finds the index of the smallest number. The minimum index.
      if(arr[minIndex] > arr[index]) {
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
}

export const bubbleSort = (arr) => {
  const sortingReplay = {
    arrMutation: [],
    indexMovement: [],
    swapMovement: [],
    frontIndex: []
  };

  for(let i = 1 ; i < arr.length ; i++) {
    
    for(let index = 0 ; index < arr.length -1 ; index++) {
      if(arr[index] > arr[index+1]) {
        sortingReplay.indexMovement.push(index);
        sortingReplay.swapMovement.push(index+1);
        sortingReplay.frontIndex.push(null);
        [arr[index], arr[index+1]] = [arr[index+1], arr[index]];
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
}

export const heapSort = (arr) => {

}

export const quickSort = (arr) => {

}
