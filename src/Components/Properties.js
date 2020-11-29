import propertyFacade from './propertyFacade'
import React, {useState, useEffect} from "react";
import '../App.css';


function Properties() {
  const[propertyData, setPropertyData] = useState([])
  

  useEffect(() => {
    propertyFacade.fetchPropertyData()
    .then(propertyData => setPropertyData(propertyData.realtorDTO.properties)) 
  }, [])

  console.log(typeof(propertyData))

    return (
      <div className="container mt-1">
        <div className="row">
            <div className="col-5 text-center">
              <h2 className="text">Properties for sale in New York</h2>
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">"Property ID</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">Street</th>
                  <th scope="col">Postal code</th>
                  <th scope="col">State code</th>
                </tr>
              </thead>
              <tbody>
                    {propertyData (
                      propertyData.map((m) => ( 
                      <tr key={m.property_id}>
                        <td>{m.propertyData}</td>
                        </tr> 
              ))
                    
                    )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );

}
export default Properties;