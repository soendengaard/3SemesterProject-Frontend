import URL from "../settings";
import React, {useState} from "react";
import '../App.css';
import Property from "./Facade/propertyFacade";

export default function Properties() {

    const [content, setContent] = useState([]);
    const [city,setCity] = useState('');

    function handleFormSubmit(event) {
        event.preventDefault();
        setContent(<Property URL={URL} city={city}/>);
    }
    function handleChange(event) {
        const target = event.target;
        const value = target.value;
        setCity(value);
    }


    return (

        <div className="container mt-3">
            <div className="row">
                <div className="col-6">
                    <form className="mt-4" onSubmit={handleFormSubmit}>
                        <input className="form-control" id="inputCity" 
                            aria-describedby="cityHelp" placeholder="Enter City" onChange={handleChange}/>  
                        <button type="submit" className="btn btn-success mt-2">Search Houses</button>
                    </form>
                </div>
            </div> 
            

            <div className="row">
                <div className="col-12 mt-3">
                  <div className="card-columns">
                    {content}
                  </div>    
                </div>
            </div>   
 
        </div>
    )
    
}