import React, {useState, useEffect} from "react";

export default function Property({URL, city}) {

    const url = URL + 'api/properties/' + city;
    const [houses, setHouses] = useState([]);

    function fetchHouses(){
        fetch(url)
            .then((res) => res.json())
            .then((data) => setHouses(data.realtorDTO.properties))
            .catch((err) => console.log("An error have occured."));
    }
    console.log(url);
    useEffect(() => {
        fetchHouses();
    }, [city])

    return (
        <React.Fragment>
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
                <tbody>
                    {houses.map((m, key) => {
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
                        )
                    })}
                    </tbody>
            </table>
         </React.Fragment>
    )
    
}