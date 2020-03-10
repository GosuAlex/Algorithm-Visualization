import React, { useState } from 'react'

import classes from "./Knapsack.module.css";
import KnapsackControlPanel from './KnapsackControlPanel/KnapsackControlPanel';
import KnapsackTableItemPool from './KnapsackTables/KnapsackTableItemPool';
import KnapsackTableSack from './KnapsackTables/KnapsackTableSack';

import { createRandomObjects, createRandomKnapsack, geneticRangeCrossover } from "algorithms/knapsack";
import GraphKnapsack from 'components/graph/GraphKnapsack';

const Knapsack = () => {
  const [objects, setObjects] = useState({value: [], weight: []});
  const [sacks, setSacks] = useState([[],[],[],[]]);
  const [currentSack, setCurrentSack] = useState(1);
  const [weightRange, setWeightRange] = useState(25);
  const [valueRange, setValueRange] = useState(99);
  const [maxItems, setMaxItems] = useState(25);
  const [maxWeight, setMaxWeight] = useState(100);
  const [knapsacks, setKnapsacks] = useState(4);
  const [generations, setGenerations] = useState(50);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [swapIndex, setSwapIndex] = useState(null);
  const [frontIndex, setFrontIndex] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [readyForPlaying, setreadyForPlaying] = useState(false)
  const [graphData, setGraphData] = useState([1,2,3,4,5])
  
  const randomize = () => {
    const randomizedObjects = createRandomObjects(maxItems, valueRange, weightRange);

    setObjects(randomizedObjects);
    setreadyForPlaying(true);
  }

  const initSacks = () => {
    let sacks = [];
    for(let i = knapsacks ; i > 0 ; i--) {
      sacks.push(createRandomKnapsack(maxWeight, objects));
    }

    setSacks(sacks);
  }

  const optimize = () => {
    setPlaying(true);

    //const evolvedKnapsacks = geneticRangeCrossover([...sacks], maxWeight, generations, objects);
    // setSacks(evolvedKnapsacks);
    // setPlaying(false);

    let runAlgo = new Promise((resolve, reject) => {
      const sortingReplay = geneticRangeCrossover([...sacks], maxWeight, generations, objects);
      if(sortingReplay.arrMutation.length)
        resolve();
    });

    runAlgo.then(() => {

    }).catch((rejection) => {
      console.error("Could not get something back from algo : " + rejection);
      setPlaying(false);
      // some modal?
    });
  }

  const switchKnapsack = (leftOrRight) => {
    const newCurrentSack = leftOrRight === "left" ? currentSack - 1 : currentSack + 1
    if(newCurrentSack < 1 || knapsacks < newCurrentSack)
      return;
    setCurrentSack(newCurrentSack);
  }

  return (
    <div className={classes.Dashboard}>
      <section className={classes.Tables}>
        <KnapsackTableItemPool 
          objects={objects}
          randomize={randomize}
          playing={playing}
        />
        <KnapsackTableSack 
          knapsacks={sacks}
          playing={playing}
          initSacks={initSacks}
          currentSack={currentSack}
          readyForPlaying={readyForPlaying}
          switchKnapsack={switchKnapsack}
          objects={objects}
          swapIndex={swapIndex}
        />
      </section>
      <section className={classes.Control}>
      <div className={classes.Graph}>
        <GraphKnapsack
          graphData={graphData}
        />
      </div>
        <KnapsackControlPanel
          playing={playing}
          optimize={optimize}
          readyForPlaying={readyForPlaying}
          maxWeight={maxWeight}
          setMaxWeight={setMaxWeight}
          maxItems={maxItems}
          setMaxItems={setMaxItems}
          valueRange={valueRange}
          setValueRange={setValueRange}
          weightRange={weightRange}
          setWeightRange={setWeightRange}
          knapsacks={knapsacks}
          setKnapsacks={setKnapsacks}
          generations={generations}
          setGenerations={setGenerations}
        />
      </section>
      <div className={classes.WarningScreenSize}>
        <h3>Warning: This site is not optimized for all screensizes</h3>
      </div>
    </div>
  )
}

export default Knapsack