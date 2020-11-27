import propertyFacade from './propertyFacade'
import React, {useState, useEffect} from "react";
import '../App.css';


function Properties(data) {
  const[propertyData, setPropertyData] = useState('Loading data from server...')

  useEffect(() => {
    propertyFacade.fetchPropertyData()
    .then(propertyData => setPropertyData(propertyData))
  }, [])

  
    return (
      <div className="container mt-3">
        <div className="row">
          <div className="col-7">
            <h2>All properties for sale :</h2>
            <h3>{JSON.stringify(propertyData)}</h3>
          </div>
        </div>
      </div>
    );

}

export default Properties;