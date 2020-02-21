import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NavBar from 'components/navbar'; // Look. This is with package.json "Main:" added
import Frontpage from 'pages/frontpage/Frontpage';
import Sorting from 'pages/sorting/Sorting';


function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Frontpage} />
        <Route path="/travellingsalesman" component={Sorting} />
        <Route path="/knapsack" component={Sorting} />
        <Route path="/sorting" component={Sorting} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
