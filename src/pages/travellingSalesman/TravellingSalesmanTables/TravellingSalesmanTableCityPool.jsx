import React from 'react'

import classes from './TravellingSalesmanTable.module.css'

const TravellingSalesmanTableCityPool = ({arr, currentIndex, swapIndex, frontIndex, sorted, randomize, playing}) => {
  return (
    <div className={classes.Table}>
      <h3>Reset pool :</h3>
      <button className={[classes.Btn, classes.Randomize].join(" ")} onClick={randomize} disabled={playing} >Randomize</button>
      <div className={classes.ArrayTable}>
      <h2>City Pool</h2>
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
                  frontIndex === index
                    ? classes.FrontIndex
                    : swapIndex === index
                      ? classes.SwapIndex
                      : currentIndex === index
                        ? classes.CurrentIndex
                        : sorted
                          ? classes.Sorted
                          : null
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
  )
}

export default TravellingSalesmanTableCityPool
