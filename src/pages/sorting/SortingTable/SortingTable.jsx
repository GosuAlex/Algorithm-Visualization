import React from 'react'

import classes from './SortingTable.module.css';

const SortingTable = ({arr, currentIndex, swapIndex}) => {
  return (
    <div className={classes.Table}>
      <div className={classes.ArrayTable}>
        <h2>Array Table</h2>
        <table>
          <tbody>
            <tr>
              <th>Index</th>
              <th>Value</th>
            </tr>
            {arr.map((value, index) => (
              <tr 
                key={index} 
                className={
                  swapIndex === index
                    ? classes.SwapIndex
                      : currentIndex === index ? classes.CurrentIndex : null
                }
              >
                <td>{index}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SortingTable


/*
swapIndex === index
                    ? classes.swapIndex
                      : currentIndex === index && swapIndex === null ? classes.currentIndex : null
*/