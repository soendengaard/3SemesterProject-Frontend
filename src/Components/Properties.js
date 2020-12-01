import React, {useState, useEffect} from "react";
import '../App.css';
import URL from '../settings'
import facade from './facadeLoginout'
import "bootstrap/dist/css/bootstrap.min.css"
import SearchByCity from '../Components/SearchProperties'

export default function Properties() {
  const[propertyData, setPropertyData] = useState([])
  const [city, setCity] = useState([])
  const options = facade.makeOptions("GET", true)

  function fetchPropertyData (){
    let options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    }

    fetch(URL + "api/properties/London", options)
    .then((res) => res.json())
    .then((data) => {
      setPropertyData(data.realtorDTO.properties)
    })
  }
      
    useEffect(() => {
      fetchPropertyData()
  }, []) 

    return (
      <div className="container mt-1">
        <div className="row">
            <div className="col-40 text-center">
              <h2 className="text">Properties for sale</h2>
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">Property ID</th>
                  <th scope="col">Address</th>
                  <th scope="col">City</th>
                  <th scope="col">Postal code</th>
                  <th scope="col">State code</th>
                  <th scope="col">State</th>
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
                        <td>{m.address.state}</td>
                        <td>{m.price}</td>
                    </tr>
              

               )})}

            

              
              </tbody>

              
            </table>

            
          </div>
        </div>
      </div>  
    );
    

  
    
}                      