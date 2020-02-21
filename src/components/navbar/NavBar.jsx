import React from 'react';
import { NavLink } from "react-router-dom";

import classes from "./NavBar.module.css";
import svgTsp from "svg/destination.svg";
import svgKnapsack from "svg/backpack.svg";
import svgSorting from "svg/sort-amount-asc.svg";



const NavBar = () => {
  return (
    <nav className={classes.NavBar}>
      <div className={classes.NavIconGroup}>
        <NavLink to="/travellingSalesman" className={classes.Icon} activeClassName={classes.ActiveLink} >
          <img src={svgTsp} alt="T" className={classes.Svg} />
          <div class={classes.Tooltip}>Travelling Salesman Problem</div>
        </NavLink>
        <NavLink to="/knapsack" className={classes.Icon}>
          <img src={svgKnapsack} alt="T" className={classes.Svg} activeClassName={classes.ActiveLink} />
          <div class={classes.Tooltip}>Knapsack Problem</div>
        </NavLink>
        <NavLink to="/sorting" className={classes.Icon}>
          <img src={svgSorting} alt="T" className={classes.Svg} activeClassName={classes.ActiveLink} />
          <div class={classes.Tooltip}>Sorting</div>
        </NavLink>
        <div className={classes.Me}>
          <a href="http://www.github.com/gosualex" target="_blank" rel="noopener noreferrer" ><i class="fab fa-github"></i></a>
          <a href="http://www.linkedin.com/in/roy-alexander-daae/" target="_blank" rel="noopener noreferrer" ><i class="fab fa-linkedin"></i></a>
        </div>
        <button className={[classes.ResetIcon, classes.Icon].join(" ")}>
          Reset
        </button>
      </div>
    </nav>
  );
}

export default NavBar
