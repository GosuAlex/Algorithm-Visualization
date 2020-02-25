import React from 'react'

import classes from './SortingColosseum.module.css';

const SortingColosseum = ({arr, currentIndex, swapIndex}) => {
  return (
    <div className={classes.SortingColosseum}>
      {arr.map((val, index) => (
        <div 
          key={index}
          className={
            swapIndex === index
                    ? [classes.Column, classes.SwapIndex].join(" ")
                      : currentIndex === index ? [classes.Column, classes.CurrentIndex].join(" ") : classes.Column
          }
          style={{height: val + "%"}}>
        </div>
      ))}
    </div>
  );
}

export default SortingColosseum


// swapIndex === index + 1