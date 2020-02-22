import React from 'react'

import classes from './SortingTable.module.css';

const SortingTable = ({arr}) => {
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
              <tr key={index}>
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
