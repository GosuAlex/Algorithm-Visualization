import React from "react";
import classes from "./KnapsackControlPanel.module.css";

const KnapsackControlPanel = ({
  setWeightRange,
  weightRange,
  setValueRange,
  valueRange,
  setKnapsacks,
  knapsacks,
  setMaxWeight,
  maxWeight,
  setMaxItems,
  maxItems,
  setGenerations,
  generations,
  playing,
  readyForPlaying,
  optimize,
  bestTotal
}) => {
  return (
    <div className={classes.ControlPanel}>
      <div className={classes.ControlColumn}>
        <label className={[classes.Sign].join(" ")}>Items weight range :</label>
        <label className={[classes.Sign].join(" ")}>Items value range :</label>
        <label className={[classes.Sign].join(" ")}>Max weight :</label>
        <label className={[classes.Sign].join(" ")}>Max items :</label>
        <label className={[classes.Sign].join(" ")}>Knapsacks :</label>
        <label className={[classes.Sign].join(" ")}>Generations :</label>
        <button className={[classes.Btn, classes.Optimize].join(" ")} disabled={playing || !readyForPlaying} onClick={optimize}>
          Optimize
        </button>
      </div>
      <div className={classes.ControlColumn}>
        <input
          className={[classes.Btn, classes.WeightRange].join(" ")}
          type="number"
          onChange={e => setWeightRange(e.target.value)}
          placeholder={weightRange}
          min="10"
          max="100"
        />
        <input
          className={[classes.Btn, classes.ValueRange].join(" ")}
          type="number"
          onChange={e => setValueRange(e.target.value)}
          placeholder={valueRange}
          min="10"
          max="1000"
        />
        <input
          className={[classes.Btn, classes.MaxWeight].join(" ")}
          type="number"
          onChange={e => setMaxWeight(e.target.value)}
          placeholder={maxWeight}
          min="1"
          max="1000"
        />
        <input
          className={[classes.Btn, classes.MaxValue].join(" ")}
          type="number"
          onChange={e => setMaxItems(e.target.value)}
          placeholder={maxItems}
          min="1"
          max="200"
        />
        <input
          className={[classes.Btn, classes.Sacks].join(" ")}
          type="number"
          onChange={e => setKnapsacks(e.target.value)}
          placeholder={knapsacks}
          min="4"
          max="8"
        />
        <input
          className={[classes.Btn, classes.Generations].join(" ")}
          type="number"
          onChange={e => setGenerations(e.target.value)}
          placeholder={generations}
          min="1"
          max="10000"
        />
      </div>

      <div className={classes.ControlColumn}>
        <label className={[classes.Sign].join(" ")}>Best sack weight :</label>
        <label className={[classes.Sign].join(" ")}>Best sack value :</label>
        <label className={[classes.Sign].join(" ")}>Number of items :</label>
      </div>

      <div className={classes.ControlColumn}>
        <label className={[classes.Sign, classes.Best].join(" ")} >
          {bestTotal.weight}
        </label>
        <label className={[classes.Sign, classes.Best].join(" ")} >
          {bestTotal.value}
        </label>
        <label className={[classes.Sign, classes.Best].join(" ")} >
          {bestTotal.numberOfItems}
        </label>
      </div>
    </div>
  );
};

export default KnapsackControlPanel;
