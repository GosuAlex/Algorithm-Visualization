import React from "react";
import classes from "./KnapsackControlPanel.module.css";

const KnapsackControlPanel = ({setArrSize, setMileRange, placeholderNumber, optimize, playing, currentSwitch, switchFieldHandler }) => {
  return (
    <div className={classes.ControlPanel}>
      <div className={classes.ControlColumn}>
        <label className={[classes.Sign].join(" ")}>Number of Cities :</label>
        <label className={[classes.Sign].join(" ")}>Range of Miles :</label>
        <label className={[classes.Sign].join(" ")}>Iterations :</label>
        <button className={[classes.Btn, classes.Optimize].join(" ")} onClick={optimize} >Optimize with :</button>
      </div>
      <div className={classes.ControlColumn}>
        <input
          className={[classes.Btn, classes.NumberOfCities].join(" ")}
          type="number"
          onChange={e => setArrSize(e.target.value)}
          placeholder={placeholderNumber}
          min="10"
          max="999"
        />
        <input className={[classes.Btn, classes.MileRange].join(" ")} type="number" onChange={e => setMileRange(e.target.value)} placeholder={placeholderNumber} min="10" />
        <input className={[classes.Btn, classes.Iterations].join(" ")} type="number" placeholder={placeholderNumber} min="1" max="600" />
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
        <label className={[classes.Sign].join(" ")} id="currentDistance">
          2000
        </label>
        <label className={[classes.Sign].join(" ")} id="bestDistance">
          2000
        </label>
      </div>
    </div>
  );
};

export default KnapsackControlPanel;