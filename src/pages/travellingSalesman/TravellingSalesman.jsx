// fix sorted and rerun
// fix best distance changes rerun'
// animate randomize, signal it has changed
// randomize city names picked

import React, { useState } from 'react'

import classes from "./TravellingSalesman.module.css";
import TravellingSalesmanControlPanel from './TravellingSalesmanControlPanel/TravellingSalesmanControlPanel';
import TravellingSalesmanTableCityPool from './TravellingSalesmanTables/TravellingSalesmanTableCityPool';
import TravellingSalesmanTableRoute from './TravellingSalesmanTables/TravellingSalesmanTableRoute';

import { genAdjSymMatrix, algoInitRandom, algoInitGreedy, greedyImprovement, greedyRandom } from "algorithms/tsp";

const TravellingSalesman = () => {
  const [arrRoute, setArrRoute] = useState([]);
  const [arrSize, setArrSize] = useState(10);
  const [mileRange, setMileRange] = useState(100);
  const [arrCities, setArrCities] = useState(genAdjSymMatrix(arrSize, mileRange));
  const [iterations, setIterations] = useState(50);
  const [distance, setDistance] = useState();
  const [bestDistance, setBestDistance] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [swapIndex, setSwapIndex] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [switchField, setSwitchField] = useState("greedy");
  const [frontIndex, setFrontIndex] = useState([]);
  const [sorted, setSorted] = useState(false);
  const [cityHover, setCityHover] = useState(null);
  
  const randomize = () => {
    setArrCities(genAdjSymMatrix(arrSize, mileRange));
  }

  const initRandom = () => {
    const route = algoInitRandom(arrCities);

    setSorted(false);
    setArrRoute(route.visitedCities);
    setDistance(route.distance);
    if(route.distance < bestDistance || !bestDistance) {
      setBestDistance(route.distance);
    }
  }

  const initGreedy = () => {
    const route = algoInitGreedy(arrCities);

    setSorted(false);
    setArrRoute(route.visitedCities);
    setDistance(route.distance);
    if(route.distance < bestDistance || !bestDistance) {
      setBestDistance(route.distance);
    }
  }

  const optimize = () => {
    // CHECK IF ROUTE IS INITED
    setPlaying(true);
    let sortingReplay = {};
    let runAlgo = new Promise((resolve, reject) => {
      switch (switchField) {
        case "greedy":
          sortingReplay = greedyImprovement([...arrCities], [...arrRoute], distance, iterations)
          break;
        case "greedyRandom":
          sortingReplay = greedyRandom([...arrCities], [...arrRoute], distance, iterations);
          break;
        default:
          break;
      }
      if(sortingReplay.arrMutation.length)
        resolve();
    })

    runAlgo.then(() => {
      let foundBestDistance = Infinity;
      for(let i in sortingReplay.arrMutation) {
        // eslint-disable-next-line 
        setTimeout(() => {
          setArrRoute(sortingReplay.arrMutation[i]);
          setCurrentIndex(sortingReplay.indexMovement[i]);
          setSwapIndex(sortingReplay.swapMovement[i]);
          setFrontIndex(sortingReplay.frontIndex[i]);
          setDistance(sortingReplay.distance[i]);
          // if(Math.min(sortingReplay.distance[i]) < bestDistance) {
          //   setBestDistance(sortingReplay.distance[i]);
          // }
          if(Math.min(sortingReplay.distance[i]) < foundBestDistance) {
            foundBestDistance = Math.min(sortingReplay.distance[i]);
            setBestDistance(foundBestDistance);
          }
          if(i >= sortingReplay.arrMutation.length - 1) {
            setPlaying(false);
            setSorted(true);
          }
        }, i * 100);
      }
    }).catch((rejection) => {
      console.error("Could not get choosen optimizing method : " + rejection);
      setPlaying(false);
      // some modal?
    });
  }

  const switchFieldHandler = (value) => {
    setSwitchField(value);
  }

  const cityHoverHandler = (index) => {
    setCityHover(index);
  }

  return (
    <div className={classes.Dashboard}>
      <section className={classes.Tables}>
        <TravellingSalesmanTableCityPool 
          arr={arrCities}
          randomize={randomize}
          playing={playing}
          cityHover={cityHover}
          cityHoverHandler={cityHoverHandler}
        />
        <TravellingSalesmanTableRoute 
          arr={arrRoute}
          initRandom={initRandom}
          initGreedy={initGreedy}
          frontIndex={frontIndex}
          currentIndex={currentIndex}
          swapIndex={swapIndex}
          sorted={sorted}
          playing={playing}
          arrRoute={arrRoute}
        />
      </section>
      <section className={classes.Control}>
        <div className={classes.Graph} />
        <TravellingSalesmanControlPanel
          playing={playing}
          switchFieldHandler={switchFieldHandler}
          currentSwitch={switchField}
          setArrSize={setArrSize}
          mileRange={mileRange}
          setMileRange={setMileRange}
          setIterations={setIterations}
          iterations={iterations}
          optimize={optimize}
          placeholderNumber={arrCities.length}
          currentDistance={distance}
          bestDistance={bestDistance}
        />
        
      </section>
    </div>
  )
}

export default TravellingSalesman