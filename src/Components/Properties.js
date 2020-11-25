import URL from "../settings";
import React, {useState, useEffect} from "react";
import '../App.css';

export default function Properties() {
  const[data, setData] = useState([])
  
  function getProperty() {
    fetch(URL)
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log("An error have occured."))
  }

    useEffect(() => {
      getProperty();
    }, [])

    return (
      <div class="container mt-3">
        <div class="row">
          <div class="col-sm">
          <h2>Search for properties</h2>
          <p><b>Time: </b> {data.text}</p>
          <p className="time">{data.time}</p>
          </div>
        </div>
      </div>

    );


}