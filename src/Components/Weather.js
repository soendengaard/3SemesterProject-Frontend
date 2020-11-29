import React, { useState, useEffect } from 'react'
import NoMatch from "./NoMatch";
import '../App.css';
import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";
  import URL from '../settings'

export default function Weather() {
  const [weatherData, setWeatherData] = useState([])


  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => console.log("Failed"))
  }, [])
  


    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-6">
            <h1>Weather</h1>
            <h3>Showing the current weather in Copenhagen, Denmark.</h3>
            <p>Location: {weatherData.city_name}, {weatherData.country_code}</p>
            <p>Temperature: {weatherData.temp}°C</p>
            <p>Feels like: {weatherData.app_temp}°C</p>
          </div>
        </div>
      </div>
    );
} 



