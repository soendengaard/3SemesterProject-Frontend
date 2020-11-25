import React, { useState, useEffect } from 'react'
import NoMatch from "./NoMatch";
import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";

export default function Weather({isLoggedIn}) {
  const [weatherData, setWeatherData] = useState([])
  useEffect(() => {
    fetch('https://api.weatherbit.io/v2.0/current?city=Copenhagen&country=DK&key=INSERT-API-KEY-HERE')
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => console.log("Failed"))
    console.log(weatherData)
  }, [])
  
  if (isLoggedIn === true) {

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-6">
            <h1>Weather</h1>
            <h3>Showing the current weather in Copenhagen, Denmark.</h3>
            <p>Location: {weatherData.data[0].city_name}, {weatherData.data[0].country_code}</p>
            {/* <p>{JSON.stringify("Location: " + weatherData.city_name, weatherData.country_code)}</p> */}
            <p>Temperature: {weatherData.data[0].temp}°C</p>
            <p>Feels like: {weatherData.data[0].app_temp}°C</p>
          </div>
        </div>
      </div>
    );
} else {
    return (
        <Router>
            <Route>
                <NoMatch />
            </Route>
        </Router>
    )
}

}
