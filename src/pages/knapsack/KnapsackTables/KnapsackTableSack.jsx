import React from 'react'

import classes from './KnapsackTable.module.css'

const KnapsackTableSack = ({knapsacks, objects, currentSack, readyForPlaying, switchKnapsack, currentIndex, swapIndex, frontIndex, sorted, initSacks, playing}) => {
  return (
    <div className={classes.Table}>
      <button className={[classes.Btn, classes.Empty].join(" ")} onClick={initSacks} disabled={playing || !readyForPlaying} >Initialize Sacks</button>
      <div className={classes.ArrayTable}>
      <div className={classes.TableHeaderRow}>
        <button className={classes.Icon} onClick={() => switchKnapsack("left")} ><i className="fas fa-chevron-left"></i></button>
        <h2>Knapsack</h2>
        <span className={classes.SackNumber}>{currentSack}</span>
        <button className={classes.Icon} onClick={() => switchKnapsack("right")} ><i className="fas fa-chevron-right"></i></button>
      </div>
        <table>
          <tbody>
            <tr>
              <th>Item</th>
              <th>Weight</th>
              <th>Value</th>
            </tr>
            {knapsacks[currentSack-1].map((itemIsInside, index) => (
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
                <td>{itemIsInside ? index : "-"}</td>
                <td>{itemIsInside ? objects.weight[index] : null}</td>
                <td>{itemIsInside ? objects.value[index] : null}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default KnapsackTableSack
