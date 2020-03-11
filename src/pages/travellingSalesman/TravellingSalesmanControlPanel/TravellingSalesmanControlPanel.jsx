import React from "react";
import classes from "./TravellingSalesmanControlPanel.module.css";

const TravellingSalesmanControlPanel = ({setArrSize, setMileRange, newBest, readyForPlaying, mileRange, setIterations, iterations, currentDistance, bestDistance, placeholderNumber, optimize, playing, currentSwitch, switchFieldHandler }) => {
  return (
    <div className={classes.ControlPanel}>
      <div className={classes.ControlColumn}>
        <label className={[classes.Sign].join(" ")}>Number of Cities :</label>
        <label className={[classes.Sign].join(" ")}>Range of Miles :</label>
        <label className={[classes.Sign].join(" ")}>Iterations :</label>
        <button className={[classes.Btn, classes.Optimize].join(" ")} onClick={optimize} disabled={playing || !readyForPlaying} >Optimize with :</button>
      </div>
      <div className={classes.ControlColumn}>
        <input
          className={[classes.Btn, classes.NumberOfCities].join(" ")}
          type="number"
          onChange={e => setArrSize(e.target.value)}
          placeholder={placeholderNumber}
          min="10"
          max="200"
        />
        <input className={[classes.Btn, classes.MileRange].join(" ")} type="number" onChange={e => setMileRange(e.target.value)} placeholder={mileRange} min="10" max="10000" />
        <input className={[classes.Btn, classes.Iterations].join(" ")} type="number" onChange={e => setIterations(e.target.value)} placeholder={iterations} min="1" max="10000" />
      </div>

      <div className={classes.ControlColumn}>
        <label className={[classes.Sign].join(" ")}>Current Distance :</label>
        <label className={[classes.Sign].join(" ")}>Best Distance :</label>

        <div className={classes.SwitchField}>
          <input
            type="radio"
            id="greedy"
            name="greedy"
            value="greedy"
            checked={currentSwitch === "greedy"}
            onChange={(e) => switchFieldHandler(e.currentTarget.value)}
            disabled={playing}
          />
          <label htmlFor="greedy">Greedy</label>
          <input
            type="radio"
            id="greedyRandom"
            name="greedyRandom"
            value="greedyRandom"
            checked={currentSwitch === "greedyRandom"}
            onChange={(e) => switchFieldHandler(e.currentTarget.value)}
            disabled={playing}
          />
          <label htmlFor="greedyRandom">Greedy Random</label>
        </div>
      </div>

      <div className={classes.ControlColumn}>
        <label className={[classes.Sign, classes.Distance].join(" ")}>
          {currentDistance}
        </label>
        <label className={
            newBest ? [classes.Sign, classes.NewBest, classes.Distance].join(" ") : [classes.Sign, classes.Distance].join(" ") 
          }
        >
          {bestDistance}
        </label>
      </div>
    </div>
  );
};

export default TravellingSalesmanControlPanel;