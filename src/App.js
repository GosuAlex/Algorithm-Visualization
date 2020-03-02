import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from 'components/navbar'; // Look. This is with package.json "Main:" added
import Frontpage from 'pages/frontpage/Frontpage';
import Sorting from 'pages/sorting/Sorting';
import TravellingSalesman from 'pages/travellingSalesman/TravellingSalesman';
import Knapsack from 'pages/knapsack/Knapsack';



function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Frontpage} />
        <Route path="/travellingsalesman" component={TravellingSalesman} />
        <Route path="/knapsack" component={Knapsack} />
        <Route path="/sorting" component={Sorting} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
