import React from 'react'

import classes from './TravellingSalesmanTable.module.css'

const TravellingSalesmanTableCityPool = ({arr, randomize, playing, cityHoverHandler, cityHover, cityNames}) => {
  return (
    <div className={classes.Table}>
      <h3>Reset pool :</h3>
      <button className={[classes.Btn, classes.Randomize].join(" ")} onClick={randomize} disabled={playing} >Randomize</button>
      <div className={classes.ArrayTable}>
      <h2>City Pool</h2>
        <table>
          <tbody>
            <tr>
              <th className={classes.Theader}>City</th>
              <th>Miles To</th>
            </tr>
            {arr.map((value, index) => (
              <tr 
                key={index}
                onMouseOver={() => cityHoverHandler(index)}
                onMouseLeave={() => cityHoverHandler(null)}
                className={
                  cityHover === index
                    ? classes.CityHoverCurrentCity
                    : null
                }
              >
                <td>{cityNames[index]}</td>
                <td
                  className={
                    cityHover === index
                      ? null
                      : cityHover >= 0
                        ? classes.CityHover
                        : null}
                >{value[cityHover]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TravellingSalesmanTableCityPool
