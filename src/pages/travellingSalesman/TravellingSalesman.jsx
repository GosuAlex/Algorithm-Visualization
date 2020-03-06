// fix sorted and rerun
// fix best distance changes rerun'
// animate randomize, signal it has changed
// randomize city names picked
// newBest didn't animate quickly enough if there is fast changes
// getting crowded here
// when creating separate table data row component, prolly better performance from that also React.memo()
// check greedyRandom for iteration times. Set better number.
// Add progress round bar
// add speed control, also check out lots of cities, it still slow
// cities dont work. Some are not shown.

import React, { useState } from 'react'
import { genAdjSymMatrix, algoInitRandom, algoInitGreedy, greedyImprovement, greedyRandom } from "algorithms/tsp";
import {cities} from "./cities";

import classes from "./TravellingSalesman.module.css";
import TravellingSalesmanControlPanel from './TravellingSalesmanControlPanel/TravellingSalesmanControlPanel';
import TravellingSalesmanTableCityPool from './TravellingSalesmanTables/TravellingSalesmanTableCityPool';
import TravellingSalesmanTableRoute from './TravellingSalesmanTables/TravellingSalesmanTableRoute';
import GraphLine from 'components/graph/GraphLine';

const TravellingSalesman = () => {
  const [arrRoute, setArrRoute] = useState([]);
  const [arrSize, setArrSize] = useState(10);
  const [mileRange, setMileRange] = useState(100);
  const [arrCities, setArrCities] = useState([]);
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
  const [graphData, setGraphData] = useState([]);
  const [graphYAxisMax, setGraphYAxisMax] = useState(null);
  const [readyForPlaying, setReadyForPlaying] = useState(false);
  const [readyForInit, setReadyForInit] = useState(false);
  const [cityNames, setCityNames] = useState([]);
  
  const randomize = () => {
    setArrCities(genAdjSymMatrix(arrSize, mileRange));

    const RandomizedCityNames = [];
    for (let i = 0; i < arrSize; i++) {
      RandomizedCityNames.push(cities[Math.floor(Math.random() * cities.length)]);
    }

    setReadyForInit(true);
    setCityNames(RandomizedCityNames);
    setReadyForPlaying(false);
    setArrRoute([]);
    setGraphData([]);
    setBestDistance(null);
    setGraphYAxisMax(mileRange * arrSize * 0.65);
  }

  const initRandom = () => {
    const initData = algoInitRandom(arrCities);

    setSorted(false);
    setArrRoute(initData.visitedCities);
    setDistance(initData.distance);
    if(initData.distance < bestDistance || !bestDistance) {
      setBestDistance(initData.distance);
    }
    calcGraphData(initData.visitedCities);
    setReadyForPlaying(true);
  }

  const initGreedy = () => {
    const initData = algoInitGreedy(arrCities);

    setSorted(false);
    setArrRoute(initData.visitedCities);
    setDistance(initData.distance);
    if(initData.distance < bestDistance || !bestDistance) {
      setBestDistance(initData.distance);
    }
    calcGraphData(initData.visitedCities);
    setReadyForPlaying(true);
  }

  const optimize = () => {
    // CHECK IF ROUTE IS INITED
    setPlaying(true);
    setSorted(false);
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
            if(foundBestDistance < bestDistance)
              setBestDistance(foundBestDistance);
          }
          if(i >= sortingReplay.arrMutation.length - 1) {
            setPlaying(false);
            setSorted(true);
            calcGraphData(sortingReplay.arrMutation[sortingReplay.arrMutation.length - 1]);
          }
        }, i * 100);
      }
    }).catch((rejection) => {
      console.error("Could not get choosen optimizing method : " + rejection);
      setPlaying(false);
      // some modal?
    });
  }

  const calcGraphData = (route) => {
    const cities = arrCities;
    let accumulatedDistance = [];

    for (let i = 0; i < route.length-1; i++) {
      // Add distance to next city
      let accumulator = cities[route[i]][route[i+1]];
      // Get previous accumulated miles if there is any
      if (accumulatedDistance.length)
        accumulator += accumulatedDistance[accumulatedDistance.length-1];

      accumulatedDistance.push(accumulator);
    }

    setGraphData(accumulatedDistance);
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
          cityNames={cityNames}
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
          cityNames={cityNames}
          readyForInit={readyForInit}
        />
      </section>
      <section className={classes.Control}>
        <div className={classes.Graph}>
          <GraphLine
            graphData={graphData}
            graphYAxisMax={graphYAxisMax}
            cityNames={cityNames}
          />
        </div>
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
          readyForPlaying={readyForPlaying}
        />
      </section>
      <div className={classes.WarningScreenSize}>
        <h3>Warning: This site is not optimized for all screensizes</h3>
      </div>
    </div>
  )
}

export default TravellingSalesman