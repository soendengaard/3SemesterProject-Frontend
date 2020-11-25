import URL from "../settings";
import React, {useState, useEffect} from "react";
import '../App.css';

export default function CatFacts() {
  const url = URL + '/api/catfacts'
  
 const [catfactData, setCatfactData] = useState('')

  function getCatFact() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => setCatfactData(data))
        .catch((err) => console.log("An error have occured."))
  }

    useEffect(() => {
      getCatFact();
    }, [])

    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-6">
            <h2>Cat Facts</h2>
            <p><b>Fact:</b> {catfactData.text}</p>
            <p><b>Created At:</b> {catfactData.createdAt}</p>
            <p className="time">{catfactData.time}</p>
            <button onClick={getCatFact}>Get a new fact</button>
          </div>
        </div>
      </div>
    );


}