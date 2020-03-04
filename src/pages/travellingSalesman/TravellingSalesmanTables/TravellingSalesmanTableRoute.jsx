import React from 'react'

import classes from './TravellingSalesmanTable.module.css'

const TravellingSalesmanTableRoute = ({arr, currentIndex, swapIndex, frontIndex, sorted, initRandom, initGreedy, playing}) => {
  return (
    <div className={classes.Table}>
      <h3>Initialize route with :</h3>
      <button className={[classes.Btn, classes.RouteInit].join(" ")} onClick={initRandom} disabled={playing} >Random</button>
      <button className={[classes.Btn, classes.RouteInit].join(" ")} onClick={initGreedy} disabled={playing} >Greedy</button>
      <div className={classes.ArrayTable}>
      <h2>Route</h2>
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
                  frontIndex.some(element => element === index) 
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

export default TravellingSalesmanTableRoute
