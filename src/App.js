import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import SearchProperties from "./Components/SearchProperties";
import Loginout from "./Components/Login-out";
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

function Header({isLoggedIn, loginMsg}) {
  return (
    <div>
      <ul className="header">
        <li><NavLink exact activeClassName="active" to="/searchProperties">Search properties</NavLink></li>

        {isLoggedIn && (
          <React.Fragment>
        <li><NavLink activeClassName="active" to="/favoritelist">Favorite List</NavLink></li>
          </React.Fragment>
        )}
        <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
      </ul>
    </div>
  );
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  };

  return (
    <Router>
    <div>
      <Header 
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
      />

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

          <Route path="/login-out">
            <Loginout 
              loginMsg={isLoggedIn ? "Logout" : "Login"}
              isLoggedIn={isLoggedIn}
              setLoginStatus={setLoginStatus}
            />
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
