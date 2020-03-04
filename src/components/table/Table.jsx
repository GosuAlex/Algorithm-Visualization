import React from 'react'

import classes from './Table.module.css'

const Table = ({arr, currentIndex, swapIndex, frontIndex, sorted, tableName}) => {
  return (
    <div className={classes.Table}>
      <button className={[classes.Btn, classes.Randomize].join(" ")} >Randomize Pool</button>
      <div className={classes.ArrayTable}>
      <h2>{tableName}</h2>
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

export default Table