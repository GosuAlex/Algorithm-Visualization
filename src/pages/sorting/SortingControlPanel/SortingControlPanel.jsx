import React from 'react'

import classes from './SortingControlPanel.module.css';

const SortingControlPanel = ({setArrSize, placeholderNumber, createRandomArr, sort, playing, switchFieldHandler, currentSwitch}) => {
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
      <button className={[classes.Btn, classes.RandomizeBtn].join(" ")} onClick={createRandomArr} disabled={playing} >
        Randomize
      </button>

      <button className={[classes.Btn, classes.SortBtn].join(" ")} onClick={sort} disabled={playing} >
        Sort
      </button>

      <div className={classes.SwitchField}>
        <input type="radio" id="insertion" name="insertion" value="insertion" checked={currentSwitch === "insertion"} onChange={(e) => switchFieldHandler(e.currentTarget.value)} disabled={playing} />
        <label htmlFor="insertion">Insertion</label>
        <input type="radio" id="selection" name="selection" value="selection" checked={currentSwitch === "selection"} onChange={(e) => switchFieldHandler(e.currentTarget.value)} disabled={playing} />
        <label htmlFor="selection">Selection</label>
        <input type="radio" id="bubble" name="bubble" value="bubble" checked={currentSwitch === "bubble"} onChange={(e) => switchFieldHandler(e.currentTarget.value)} disabled={playing} />
        <label htmlFor="bubble">Bubble</label>
        <input type="radio" id="heap" name="heap" value="heap" checked={currentSwitch === "heap"} onChange={(e) => switchFieldHandler(e.currentTarget.value)} disabled={playing} />
        <label htmlFor="heap">Heap</label>
        <input type="radio" id="quick" name="quick" value="quick" checked={currentSwitch === "quick"} onChange={(e) => switchFieldHandler(e.currentTarget.value)} disabled={playing} />
        <label htmlFor="quick">Quick</label>
      </div>
    </>
  );
}

export default SortingControlPanel
