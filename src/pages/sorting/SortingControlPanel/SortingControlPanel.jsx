import React from 'react'

import classes from './SortingControlPanel.module.css';

const SortingControlPanel = ({setArrSize, placeholderNumber, createRandomArr, sort}) => {
  return (
    <>
      <label className={classes.Sign}>Array Size :</label>
      <input
        className={[classes.Btn, classes.ArraySizeBtn].join(" ")}
        id="arraySize"
        type="number"
        onChange={e => setArrSize(e.target.value)}
        placeholder={placeholderNumber}
        min="2"
        max="100"
      />
      <button className={[classes.Btn, classes.RandomizeBtn].join(" ")} onClick={createRandomArr}>
        Randomize
      </button>

      <button className={[classes.Btn, classes.SortBtn].join(" ")} onClick={sort}>
        Sort
      </button>

      <div className={classes.SwitchField}>
        <input type="radio" id="insertion" name="insertion" value="insertion" checked />
        <label htmlFor="insertion">Insertion</label>
        <input type="radio" id="selection" name="selection" value="selection" />
        <label htmlFor="selection">Selection</label>
        <input type="radio" id="bubble" name="bubble" value="bubble" />
        <label htmlFor="bubble">Bubble</label>
        <input type="radio" id="heap" name="heap" value="heap" />
        <label htmlFor="heap">Heap</label>
      </div>
    </>
  );
}

export default SortingControlPanel
