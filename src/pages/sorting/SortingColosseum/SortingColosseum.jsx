import React from 'react'

import classes from './SortingColosseum.module.css';

const SortingColosseum = ({arr}) => {
  return (
    <div className={classes.SortingColosseum}>
      {arr.map((val, idx) => (
        <div key={idx} className={classes.Column} style={{height: val + "%"}}></div>
      ))}
    </div>
  );
}

export default SortingColosseum
