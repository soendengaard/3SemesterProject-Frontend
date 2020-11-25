import React, { useState, useEffect} from 'react'
import URL from "../settings";


export default function KanyeRest() {
    const[data, setData] = useState([])


    useEffect (() => {
        const fetchURL = fetch ('https://api.kanye.rest')
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => console.log("Fail"))
        console.log(data)
    }, [])


    
    return (
        <div className="container mt-3">
            <div className="row">
                <h1>Kanye (R)est once said....</h1>
                <p>{data.quote}</p>
            </div>
        </div>
    )
}