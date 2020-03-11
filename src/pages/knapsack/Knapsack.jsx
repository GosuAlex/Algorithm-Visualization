// use realtime apexchart for better performance yes?
// loading progress. Either flat bar couple of pixels under graph or circle 360
// show that graph is not loading realtime with gens > 200

import React, { useState } from 'react'

import classes from "./Knapsack.module.css";
import KnapsackControlPanel from './KnapsackControlPanel/KnapsackControlPanel';
import KnapsackTableItemPool from './KnapsackTables/KnapsackTableItemPool';
import KnapsackTableSack from './KnapsackTables/KnapsackTableSack';

import { createRandomObjects, createRandomKnapsack, geneticRangeCrossover, checkWeight } from "algorithms/knapsack";
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
  const [swapIndex, setSwapIndex] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [readyForPlaying, setreadyForPlaying] = useState(false)
  const [graphData, setGraphData] = useState([])
  const [bestTotal, setBestTotal] = useState({weight: 0, value: 0, numberOfItems: 0})
  
  const randomize = () => {
    const randomizedObjects = createRandomObjects(maxItems, valueRange, weightRange);

    setObjects(randomizedObjects);
    setreadyForPlaying(true);
    setBestTotal({weight: 0, value: 0, numberOfItems: 0});
    initSacks();
  }

  const initSacks = () => {
    let sacks = [];
      
    while ((sacks.length < knapsacks && sacks.length < 8) || sacks.length < 2) {
      sacks.push(createRandomKnapsack(maxWeight, objects));
    }

    setCurrentSack(1);
    setSacks(sacks);
  }

  const optimize = () => {
    setPlaying(true);
    setSorted(false);

    let sortingReplay = {};
    let runAlgo = new Promise((resolve, reject) => {
      sortingReplay = geneticRangeCrossover([...sacks], maxWeight, generations, objects);
      if(sortingReplay.arrMutation.length)
        resolve();
    });

    runAlgo.then(() => {
      let foundBestTotalValue = 0;
      for(let i in sortingReplay.arrMutation) {
        // eslint-disable-next-line 
        setTimeout(() => {
          setSwapIndex(sortingReplay.swapMovement[i])
          setSacks(sortingReplay.arrMutation[i])

          //if(generations <= 200)
            setGraphData(sortingReplay.fitness.filter((item, index) => index <= i));
          
          const indexOfBest = sortingReplay.fitness[i].indexOf(Math.max(...sortingReplay.fitness[i]));
          if(sortingReplay.fitness[i][indexOfBest] > foundBestTotalValue) {
            foundBestTotalValue = sortingReplay.fitness[i][indexOfBest];
            if(foundBestTotalValue > bestTotal.value) {
              const bestKnapsack = {
                weight: checkWeight(sortingReplay.arrMutation[i][indexOfBest], objects),
                value: sortingReplay.fitness[i][indexOfBest],
                numberOfItems: sortingReplay.arrMutation[i][indexOfBest].reduce((total, item) => total + item)
              }
              //if(bestKnapsack.weight >= maxWeight)
                setBestTotal(bestKnapsack);
            }
          }
          if(i >= sortingReplay.arrMutation.length - 1) {
            setPlaying(false);
            setSorted(true);
            setGraphData(sortingReplay.fitness);
          }
        }, i * 100);
      }
    }).catch((rejection) => {
      console.error("Could not get something back from algo : " + rejection);
      setPlaying(false);
      // some modal?
    });
  }

  const switchKnapsack = (leftOrRight) => {
    const newCurrentSack = leftOrRight === "left" ? currentSack - 1 : currentSack + 1
    if(newCurrentSack < 1 || sacks.length < newCurrentSack)
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
          sorted={sorted}
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
          bestTotal={bestTotal}
        />
      </section>
      <div className={classes.WarningScreenSize}>
        <h3>Warning: This site is not optimized for all screensizes</h3>
      </div>
    </div>
  )
}

export default Knapsack