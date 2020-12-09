import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import SearchProperties from "./Components/SearchProperties";
import Home from "./Components/Home";
import NoMatch from "./Components/NoMatch";
import FavoriteList from "./Components/FavoriteList";

import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useHistory
} from "react-router-dom";

function Header() {
  return (
    <div>
      <ul className="header">
        <li><NavLink exact activeClassName="active" to="/searchProperties">Search properties</NavLink></li>
        <li><NavLink activeClassName="active" to="/favoritelist">Favorite List</NavLink></li>
      </ul>
    </div>
  );
}

function App() {
  
  return (
    <Router>
    <div>
      <Header />

      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/searchProperties">
            <SearchProperties />
          </Route>
          
          <Route path="/favoritelist">
            <FavoriteList />
          </Route>

          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>  
    </div>
    </Router>
  );
}

export default App;
