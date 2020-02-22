import React from 'react'

import classes from './Frontpage.module.css'
import svgTsp from "svg/destination.svg";
import svgKnapsack from "svg/backpack.svg";
import svgSorting from "svg/sort-amount-asc.svg";


const Frontpage = () => {
  return (
    <>
      {/* make this red, blue, sort the letters animation */}
      {/* do some testing */}
      <h1 className={classes.Headline}>Algorithm Visualization</h1> 

      <div className={classes.FlexContainer}>

        <div className={classes.FrontBoxContainer}>
          <div className={classes.Box}>
            <img src={svgTsp} alt="T" className={classes.Svg} />
          </div>
          <h2 className={classes.BoxTitle} >The Travelling Salesman</h2>
        </div>

        <div className={classes.FrontBoxContainer}>
          <div className={classes.Box}>
            <img src={svgKnapsack} alt="K" className={classes.Svg} />
          </div>
          <h2 className={classes.BoxTitle} >The Knapsack Problem</h2>
        </div>

        <div className={classes.FrontBoxContainer}>
          <div className={classes.Box}>
            <img src={svgSorting} alt="S" className={classes.Svg} />
          </div>
          <h2 className={classes.BoxTitle} >Sorting Algorithms</h2>
        </div>

      </div>

      <div className={classes.WarningScreenSize}>
        <h3>Warning: This site is not optimized for mobile view</h3>
      </div>
    </>
  )
}

export default Frontpage
