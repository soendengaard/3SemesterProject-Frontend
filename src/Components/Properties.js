import PropertyFacade from "../Rest/PropertyFacade"
import React, {useState, useEffect} from "react";
import '../App.css';
//import URL from '../settings'

export default function Properties() {
  const[data, setData] = useState([])

    useEffect(() => {
      fetch(PropertyFacade) //Spørg Jorg!
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log("Oh no"))
      console.log(data)
    }, [])
    
    return (
      <div className="container mt-3">
        <div className="row">
              <h2 className="col-7 text-center">All properties for sale : </h2>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Property id</th>
                    <th scope="col">Addresse</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data) => (
                    <tr key={data.property_id}>
                      <td>{data.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
          </div>
        </div>
    );

}