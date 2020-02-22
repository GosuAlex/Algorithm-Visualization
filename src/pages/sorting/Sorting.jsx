import React, { useState } from 'react'

import classes from "./Sorting.module.css";
import SortingTable from './SortingTable/SortingTable';
import SortingColosseum from './SortingColosseum/SortingColosseum';
import SortingControlPanel from './SortingControlPanel/SortingControlPanel';

const Sorting = () => {
  const [arr, setArr] = useState(Array.from({length: 5}, (val = 50, idx) => val - idx));
  const [arrSize, setArrSize] = useState(arr.length);

  const createRandomArr = () => {
    const random = () => {
      return Math.floor(Math.random() * arrSize) + 1;
    }
    const newArr = Array.from({length: arrSize}, () => random());
    setArr(newArr);
  }




  const insertionSort = () => {
    //setArr(Object.assign([...arr], {0 : arr[1], 1 : arr[0]})); // test one line set new array with swapped indexes. But it added whole thing.
    const newArr = [...arr];
    let i = 1;
    for(let counter = 1 ; counter < newArr.length ; counter++) {
      let greenLight = true;
      let index = counter;
      while(index >= 1 && greenLight) {
        // if behind index is bigger than current index
        if(newArr[index - 1] > newArr[index]) {
          // Destructure. Change places in this case.
          [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
          setTimeout(() => {
            setArr(newArr);
          }, i++ * 1000);
          console.log(i)
          //setArr(newArr);
          index--;
        } else {
          greenLight = false;
        }
      }
    }
  }

const sort = () => {
  insertionSort();
}
  
  return (
    <>
      <section className={classes.ControlPanel}>
        <SortingControlPanel
          createRandomArr={createRandomArr}
          placeholderNumber={arr.length}
          setArrSize={setArrSize}
          sort={sort}
        />
      </section>
      <section className={classes.Dashboard}>
        <SortingTable 
          arr={arr}
        />
        <SortingColosseum
          arr={arr}
        />
      </section>
    </>
  );
}

export default Sorting;