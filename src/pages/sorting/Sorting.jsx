// put speed control
// import sort algos instead

import React, { useState } from "react";

import classes from "./Sorting.module.css";
import SortingTable from "./SortingTable/SortingTable";
import SortingColosseum from "./SortingColosseum/SortingColosseum";
import SortingControlPanel from "./SortingControlPanel/SortingControlPanel";
import {insertionSort} from "algorithms/sorting";

const Sorting = () => {
  const [arrState, setArrState] = useState(Array.from({ length: 5 }, (val = 50, idx) => val - idx));
  const [arrSize, setArrSize] = useState(arrState.length);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [swapIndex, setSwapIndex] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [switchField, setSwitchField] = useState("insertion");
  const [frontIndex, setFrontIndex] = useState(null);
  const [sorted, setSorted] = useState(false);

  
  const createRandomArr = () => {
    setSorted(false);
    const random = () => {
      return Math.floor(Math.random() * 100) + 1;
    };
    const newArr = Array.from({ length: arrSize }, () => random());
    setArrState(newArr);
  };

  // const insertionSort = (arr) => {
  //   // setArr(Object.assign([...arr], {0 : arr[1], 1 : arr[0]})); // test one line set new array with swapped indexes. But it added whole thing.
  //   // Replay object holds all the event records of this sorting algo.
  //   // It will be playing back for DOM later to avoid setTimeout unfortunate changing variables behavior.  
  //   const sortingReplay = {
  //     arrMutation: [],
  //     indexMovement: [],
  //     swapMovement: [],
  //     frontIndex: []
  //   };

  //   for (let counter = 1; counter < arr.length; counter++) {
  //     let greenLight = true;
  //     let index = counter;

  //       while (index >= 1 && greenLight) {
  //         sortingReplay.indexMovement.push(index);
  //         // if behind index is bigger than current index
  //         if (arr[index - 1] > arr[index]) {
  //           // Destructure. Change places in this case.
  //           [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
  //           sortingReplay.swapMovement.push(index - 1);
  //           index--;
  //         } else {            
  //           sortingReplay.swapMovement.push(null);
  //           greenLight = false;
  //         }
  //         sortingReplay.arrMutation.push([...arr]);
  //         sortingReplay.frontIndex.push(counter+1);
  //       }
  //   }

  //   sortingReplay.arrMutation.push([...arr]);
  //   sortingReplay.swapMovement.push(null);
  //   sortingReplay.indexMovement.push(null);
  //   sortingReplay.frontIndex.push(null);
    
  //   return sortingReplay;
  // };

  const sort = () => {
    setPlaying(true);
    let sortingReplay = undefined;
    let runAlgo = new Promise((resolve) => {
      sortingReplay = insertionSort([...arrState]);
      if(sortingReplay.arrMutation.length)
        resolve();
    })

    runAlgo.then(() => {  
      setArrState([]);
      for(let i in sortingReplay.arrMutation) {
        // eslint-disable-next-line 
        setTimeout(() => {
          setArrState(sortingReplay.arrMutation[i]);
          setCurrentIndex(sortingReplay.indexMovement[i]);
          setSwapIndex(sortingReplay.swapMovement[i]);
          setFrontIndex(sortingReplay.frontIndex[i]);
          if(i >= sortingReplay.arrMutation.length - 1) {
            setPlaying(false);
            setSorted(true);
          }
        }, i * 100);
      }
    })
  };

  const switchFieldHandler = (value) => {
    setSwitchField(value);
  }

  return (
    <>
      <section className={classes.ControlPanel}>
        <SortingControlPanel
          createRandomArr={createRandomArr}
          placeholderNumber={arrState.length}
          setArrSize={setArrSize}
          sort={sort}
          playing={playing}
          switchFieldHandler={switchFieldHandler}
          currentSwitch={switchField}
        />
      </section>
      <section className={classes.Dashboard}>
        <SortingTable arr={arrState} currentIndex={currentIndex} swapIndex={swapIndex} frontIndex={frontIndex} sorted={sorted} />
        <SortingColosseum arr={arrState} currentIndex={currentIndex} swapIndex={swapIndex} frontIndex={frontIndex} sorted={sorted} />
      </section>
    </>
  );
};

export default Sorting;
