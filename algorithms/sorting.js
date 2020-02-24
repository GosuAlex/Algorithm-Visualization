export const insertionSort = (arr) => {
  // Check if arr length is more than just 1.
  if(arr.length < 2){
    return arr;
  }
  
  for(let counter = 1 ; counter < arr.length ; counter++) {
    let greenLight = true;
    let index = counter;
    
    while(index >= 1 && greenLight) {
      // if behind index is bigger than current index
      if(arr[index - 1] > arr[index]) {
        // Destructure. Change places in this case.
        [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
        index--;
      } else {
        greenLight = false;
      }
    }
    
  }
  
  // If you want don't want mutate original arr.
  // begin with: mutatableArr = [...arr];
  // return mutatableArr;
}

export const selectionSort = (arr) => {
  // Check if arr length is more than just 1.
  if(arr.length < 2){
    return arr;
  }

  for(let position = 0 ; position < arr.length ; position++) {
    
    let minIndex = position;
    let counter = minIndex + 1;

    for(let index = counter ; index < arr.length ; index++) {
      // Finds the index of the smallest number. The minimum index.
      if(arr[minIndex] > arr[index]) {
        minIndex = index;
      }
    }
    
    // Destructure. Change places in this case. Puts minIndex at the  current position index.
    [arr[minIndex], arr[position]] = [arr[position], arr[minIndex]];
  }
  
  // If you want don't want mutate original arr.
  // begin with: mutatableArr = [...arr];
  // return mutatableArr;
}

export const bubbleSort = (arr) => {
  
  for(let i =1 ; i < arr.length ; i++) {
    
    for(let index = 0 ; index < arr.length -1 ; index++) {

      if(arr[index] > arr[index+1]) {
        [arr[index], arr[index+1]] = [arr[index+1], arr[index]];
      }
    }
    
  }

  
  // If you want don't want mutate original arr.
  // begin with: mutatableArr = [...arr];
  // return mutatableArr;
}