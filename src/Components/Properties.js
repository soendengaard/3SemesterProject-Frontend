import propertyFacade from './propertyFacade'
import React, {useState, useEffect} from "react";
import '../App.css';
import NoMatch from "./NoMatch";
import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";


function Properties({isLoggedIn}) {
  const[propertyData, setPropertyData] = useState([])
  

  useEffect(() => {
    propertyFacade.fetchPropertyData()
    .then(propertyData => setPropertyData(propertyData.realtorDTO.properties)) 
  }, [])

  if (isLoggedIn === true) {

    return (
      <div className="container mt-1">
        <div className="row">
            <div className="col-40 text-center">
              <h2 className="text">Properties for sale in New York</h2>
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">Property ID</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">Postal code</th>
                  <th scope="col">State code</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>{propertyData.map((m, key) => {
                        return(
                      <tr key={key}>
                        <td>{m.property_id}</td>
                        <td>{m.address.line}</td>
                        <td>{m.address.city}</td>
                        <td>{m.address.postal_code}</td>
                        <td>{m.address.state_code}</td>
                        <td>{m.price}</td>


                    </tr>
              )})
                       }
                  
              </tbody>
            </table>
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
export default Properties;