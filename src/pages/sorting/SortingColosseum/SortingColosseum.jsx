import React from 'react'

import classes from './SortingColosseum.module.css';

const SortingColosseum = ({arr, currentIndex, swapIndex, frontIndex, sorted}) => {
  return (
    <div className={classes.SortingColosseum}>
      {arr.map((val, index) => (
        <div 
          key={index}
          className={
            frontIndex === index
              ? [classes.Column, classes.FrontIndex].join(" ")
              : swapIndex === index
                ? [classes.Column, classes.SwapIndex].join(" ")
                : currentIndex === index
                  ? [classes.Column, classes.CurrentIndex].join(" ")
                  : sorted
                    ? [classes.Column, classes.Sorted].join(" ")
                    : classes.Column
          }
          style={{height: val + "%"}}>
        </div>
      ))}
    </div>
  );
}

export default SortingColosseum


// swapIndex === index + 1

// swapIndex === index
// ? [classes.Column, classes.SwapIndex].join(" ")
//   : currentIndex === index ? [classes.Column, classes.CurrentIndex].join(" ") : classes.Column