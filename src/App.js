import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import CatFacts from "./Components/CatFacts";
import Weather from "./Components/Weather";
import Loginout from "./Components/Login-out";
import Home from "./Components/Home";
import NoMatch from "./Components/NoMatch";
import KanyeRest from "./Components/KanyeRest";

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
        <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
        <li><NavLink activeClassName="active" to="/catfacts">Cat Facts</NavLink></li>
        <li><NavLink activeClassName="active" to="/kanyerest">Kanye Rest</NavLink></li>

        {isLoggedIn && (
          <React.Fragment>
            <li><NavLink activeClassName="selected" to="/weather">Weather</NavLink></li>
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
          <Route path="/catfacts">
            <CatFacts />
          </Route>
          <Route path="/kanyerest">
            <KanyeRest />
          </Route>
          <Route path="/weather">
            <Weather isLoggedIn={isLoggedIn}/>
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
