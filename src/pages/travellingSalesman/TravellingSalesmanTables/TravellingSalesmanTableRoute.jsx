import React from 'react'

import classes from './TravellingSalesmanTable.module.css'
import {cities} from "../cities";

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
              <th>From</th>
              <th className={classes.Theader}>To</th>
            </tr>
            {arr.map((value, index) => (
              index < arr.length-1 && (
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
                  <td>{cities[arr[index]]}</td>
                  {index === arr.length-2 ? <td>{cities[arr[0]]}</td> : <td>{cities[arr[index+1]]}</td> }
                </tr>
                )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TravellingSalesmanTableRoute
