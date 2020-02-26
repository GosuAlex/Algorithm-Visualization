// put speed control
// better sort pressed twice happening
// model for catch rejected promise
// way to stop sort
// better reset event then refresh page

import React, { useState } from "react";

import classes from "./Sorting.module.css";
import SortingTable from "./SortingTable/SortingTable";
import SortingColosseum from "./SortingColosseum/SortingColosseum";
import SortingControlPanel from "./SortingControlPanel/SortingControlPanel";
import {insertionSort, selectionSort, bubbleSort, heapSort, quickSort} from "algorithms/sorting";

const Sorting = () => {
  const [arrState, setArrState] = useState(Array.from({ length: 10 }, (val = 50, idx) => val - idx));
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

  const sort = () => {
    setPlaying(true);
    let sortingReplay = {};
    let runAlgo = new Promise((resolve, reject) => {
      switch (switchField) {
        case "insertion":
          sortingReplay = insertionSort([...arrState]);
          break;
        case "selection":
          sortingReplay = selectionSort([...arrState]);
          break;
        case "bubble":
          sortingReplay = bubbleSort([...arrState]);
          break;
        case "heap":
          sortingReplay = heapSort([...arrState]);
          break;
        case "quick":
          sortingReplay = quickSort([...arrState]);
          break;
        default:
          break;
      }
      if(sortingReplay.arrMutation.length)
        resolve();
    })

    runAlgo.then(() => {
      setArrState([]); // Put this so the first index gets colored green on pressing sort twice, but the whole thing turns green then.
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
    }).catch((rejection) => {
      console.error("Could not get choosen sorting method : " + rejection);
      setPlaying(false);
      // some modal?
    });
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
