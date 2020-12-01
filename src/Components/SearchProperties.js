import React, {useState, useEffect} from "react";
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import URL from '../settings'

          
export default function SearchByCity(){
const [city, setCity] = useState([])

function handleSubmit(event) {
    event.preventDefault()
    
}

function fetchCityData (){
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    }

    let city = document.getElementsByName("SearchByCity").value
    

    fetch(URL+"api/properties/" + city, options)
    .then((res) => res.json())
    .then((data) => {
        setCity(data.realtorDTO.properties)
    })
  }

  useEffect(() => {
    fetchCityData()
}, []) 

  return (
    
<form className="container mt-1">
            <div className="row">
                <div className="col-40 text-center">
                <h2 className="text">Search</h2>
                <input
                type="text"
                id="name"
                placeholder="Search for city"/>
                <button 
                type="submit"
                onClick={fetchCityData}>Search</button>


        </div>
        <p>{city.city}</p>
        
    </div>
</form>
  )
}