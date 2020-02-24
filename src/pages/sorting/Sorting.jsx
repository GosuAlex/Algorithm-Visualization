import React, { useState } from "react";

import classes from "./Sorting.module.css";
import SortingTable from "./SortingTable/SortingTable";
import SortingColosseum from "./SortingColosseum/SortingColosseum";
import SortingControlPanel from "./SortingControlPanel/SortingControlPanel";

const Sorting = () => {
  const [arr, setArr] = useState(Array.from({ length: 5 }, (val = 50, idx) => val - idx));
  const [arrSize, setArrSize] = useState(arr.length);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swapIndexes, setSwapIndexes] = useState([]);

  const createRandomArr = () => {
    const random = () => {
      return Math.floor(Math.random() * arrSize) + 1;
    };
    const newArr = Array.from({ length: arrSize }, () => random());
    setArr(newArr);
  };

  // try jsbin stuff
  // try without state and use refs and force update in some way
  const testarr = [];
  const insertionSort = () => {
    //setArr(Object.assign([...arr], {0 : arr[1], 1 : arr[0]})); // test one line set new array with swapped indexes. But it added whole thing.
    let myarr = [...arr];
    for (let counter = 1; counter < myarr.length; counter++) {
      let greenLight = true;
      let index = counter;
      setTimeout(() => {
        while (index >= 1 && greenLight) {
          console.log(index);
          setCurrentIndex(index);
          testarr.push(index);
          // if behind index is bigger than current index
          if (myarr[index - 1] > myarr[index]) {
            // Destructure. Change places in this case.
            [myarr[index - 1], myarr[index]] = [myarr[index], myarr[index - 1]];
            //setSwapIndexes([index, index - 1]);
            //setState;
            setArr([...myarr]);
            index--;
          } else {
            greenLight = false;
          }
        }
      }, counter * 250 + index * 50);
    }
  };

  const sort = () => {
    insertionSort();
    setTimeout(() => {
      let i = 1;
      testarr.forEach(item => {
        i++
        setTimeout(() => {
        console.log(item);
        setCurrentIndex(item);
      }, i * 200);
      })
    }, 5000);
  };

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
        <SortingTable arr={arr} currentIndex={currentIndex} swapIndexes={swapIndexes} />
        <SortingColosseum arr={arr} />
      </section>
    </>
  );
};

export default Sorting;
