import React, { useState } from 'react'

import classes from "./Knapsack.module.css";
import KnapsackControlPanel from './KnapsackControlPanel/KnapsackControlPanel';
import KnapsackTableCityPool from './KnapsackTables/KnapsackTableCityPool';
import KnapsackTableRoute from './KnapsackTables/KnapsackTableRoute';

//import { } from "algorithms/knapsack";

const Knapsack = () => {
  const [arrRoute, setArrRoute] = useState(Array.from({ length: 10 }, v => 0));
  const [arrCities, setArrCities] = useState(Array.from({ length: 10 }, v => 100));
  const [arrSize, setArrSize] = useState(arrCities.length);
  const [MileRange, setMileRange] = useState(arrCities.length);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [swapIndex, setSwapIndex] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [switchField, setSwitchField] = useState("greedy");
  const [frontIndex, setFrontIndex] = useState(null);
  const [sorted, setSorted] = useState(false);
  
  const optimize = () => {
    console.log("opt");
  }

  const switchFieldHandler = (value) => {
    setSwitchField(value);
  }

  return (
    <div className={classes.Dashboard}>
      <h2 style={{margin: "auto", color: "red"}}>Not finished yet</h2>
      {/* <section className={classes.Tables}>
        <KnapsackTableCityPool 
          arr={arrCities}
        />
        <KnapsackTableRoute 
          arr={arrRoute}
        />
      </section>
      <section className={classes.Control}>
        <div className={classes.Graph} />
        <KnapsackControlPanel
          playing={playing}
          switchFieldHandler={switchFieldHandler}
          currentSwitch={switchField}
          setArrSize={setArrSize}
          setMileRange={setMileRange}
          optimize={optimize}
          placeholderNumber={arrCities.length}
        />
        
      </section> */}

    </div>
  )
}

export default Knapsack