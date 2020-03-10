import React from 'react'

import classes from './KnapsackTable.module.css'

const KnapsackTableItemPool = ({objects, randomize, currentIndex, swapIndex, frontIndex, playing, sorted}) => {
  return (
    <div className={classes.Table}>
      <button className={[classes.Btn, classes.Randomize].join(" ")} onClick={randomize} disabled={playing} >Randomize</button>
      <div className={classes.ArrayTable}>
      <h2>Item Pool</h2>
        <table>
          <tbody>
            <tr>
              <th>Index</th>
              <th>Weight</th>
              <th>Value</th>
            </tr>
            {objects.value.map((value, index) => (
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
                <td>{objects.weight[index]}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default KnapsackTableItemPool
