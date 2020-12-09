import URL from "../settings";
import React, {useState, useEffect} from "react";
import '../App.css';
import No_Image_Available from "./Facade/No.jpg";

export default function FavoriteList() {

    const urlSaved = URL + '/api/properties/saved';
    const deleteSaved = URL + '/api/properties/deleteprop/';
    const [saved, setSaved] = useState([{}]); 

    function fetchSaved(){
        fetch(urlSaved)
            .then((res) => res.json())
            .then((data) => setSaved(data.favorites))
            .catch((err) => console.log("An error have occured.")); 
    }

    useEffect(() => {
        fetchSaved(); 
    }, []);


    function makeOptions(method, body) {
        var opts =  {
          method: method,
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
          }
        }
        if(body){
          opts.body = JSON.stringify(body);
        }
        return opts;
    }
      
    function handleHttpErrors(res){
        console.log(res)
        if(!res.ok){
        return Promise.reject({status: res.status, fullError: res.json() })
        }
        return res.json();
    }

    function deleteFav(id){
        const options = makeOptions("DELETE");
        return fetch(deleteSaved + id, options)
        .then(handleHttpErrors)
    }

    function DeleteFavoriteButton(props){
        const singleHouse = props.eachHouse;
        
        function handleOnclick(event){
            event.preventDefault();
            let prop_id = singleHouse.propId;

            deleteFav(prop_id)
            .catch(err =>{
                if(err.status){
                  err.fullError.then(e=> console.log(e.message))
                }
                else{console.log("Network error"); }
            });

        }

        return (
            <React.Fragment> 
                <button className="btn btn-danger ml-3" type="submit" id="deleteButton"
                onClick={handleOnclick}>Remove</button>
            </React.Fragment>
        )
    }

    function Cards(){
        return (
            <React.Fragment>
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="card-columns">
                            {saved.map((s, key) => {
                                let picture = "";
                                let text = "";
                                if (s.thumbnail !== '--'){
                                    text = s.line;
                                    picture = <img className="card-img-top" src={s.thumbnail} alt={text} />
                                } else {
                                    text = "No Image Available";
                                    picture = <img className="card-img-top" src={No_Image_Available} alt={text} />
                                }
                                if (s.hasOwnProperty('size')){
                                    return(
                                        <div key={key}>
                                            <div id="main">
                                            </div>
                                            <div className="card">
                                                {picture}
                                                <div className="card-body">
                                                    <h5 className="card-title">{s.line}</h5>
                                                    <p className="card-text">
                                                        {s.line}, {s.city}, {s.stateCode}, {s.postalCode}.
                                                        {"\n"}
                                                        A {s.size} {s.units} {s.type} home for ${s.price}
                                                    </p>
                                                    <DeleteFavoriteButton eachHouse={s}/>
                                                </div>
                                            </div>

                                        </div>
                                        
                                    )
                                } else {
                                    return(
                                        <div className="card" key={key}>
                                            {picture}
                                            <div className="card-body">
                                                <h5 className="card-title">{s.line}</h5>
                                                <p className="card-text">
                                                    {s.line}, {s.city}, {s.stateCode}, {s.postalCode}.
                                                    {"\n"}
                                                    A {s.type} home for ${s.price}
                                                </p>
                                                <DeleteFavoriteButton eachHouse={s}/>
                                            </div>
                                        </div>
                                    )
                                }
                            })} 
                        </div>    
                    </div>
                </div>
            </React.Fragment>
        )
    }

    async function handleOnclickFetch(event){
        event.preventDefault();
        fetchSaved();
    }

    return (   
        <React.Fragment>
        <div className="container mt-4">
            <div className="row">
                <div className="col-6">
                    <h2>Your Favorite Houses</h2>
                    <button className="btn btn-primary mt-3 ml-3" type="submit" onClick={handleOnclickFetch}>
                        Reload your favorites
                    </button>
                </div>
            </div>        

            <Cards/>
        </div>

        </React.Fragment>


    );
}