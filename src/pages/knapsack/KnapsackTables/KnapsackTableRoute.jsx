import React from 'react'

import classes from './KnapsackTable.module.css'

const KnapsackTableRoute = ({arr, currentIndex, swapIndex, frontIndex, sorted}) => {
  return (
    <div className={classes.Table}>
      <h3>Initialize route with :</h3>
      <button className={[classes.Btn, classes.RouteInit].join(" ")} >Random</button>
      <button className={[classes.Btn, classes.RouteInit].join(" ")} >Greedy</button>
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

export default KnapsackTableRoute
