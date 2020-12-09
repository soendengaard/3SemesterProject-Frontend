import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal} from "react-bootstrap";
import Carousel from 'react-bootstrap/Carousel'
import React, {useState, useEffect} from "react";
import No_Image_Available from "./No.jpg";
import '../../App.css';
import KEY from '../../apikey.js';
//import Carousel from 'react-elastic-carousel';
import Item from "../Item"

export default function Property({URL, city}) {
    
    const urlHouses = URL + '/api/properties/' + city;
    const urlCityInfo = URL + '/api/citydetails/' + city;
    const urlPhotoRefs = URL + '/api/photo/placeref/' + city;
    const addFavoritesURL = URL + '/api/properties/saveprop';
    const [houses, setHouses] = useState([]);
    const [cityInfo, setCityInfo] = useState([]);
    const [photoRefsData, setPhotoRefsData] = useState([]);
    const [saved, setSaved] = useState("");
    const [alertMsg, setAlertMsg] = useState("");
    

    function fetchHouses(){
        fetch(urlHouses)
            .then((res) => res.json())
            .then((data) => setHouses(data.realtorDTO.properties))
            .catch((err) => console.log("An error have occured."));
    }
    function fetchCityInfo(){
        fetch(urlCityInfo)
            .then((res) => res.json())
            .then((data) => setCityInfo(data.geoCityDetailsDTO.data))
            .catch((err) => console.log("An error have occured."));
    }
    function fetchPhotoRefs(){
        fetch(urlPhotoRefs)
            .then((res) => res.json())
            .then((data) => setPhotoRefsData(data.photoRefs))
            .catch((err) => console.log("An error have occured."));
    }

    useEffect(() => {
        fetchHouses();
        fetchCityInfo();
        fetchPhotoRefs();
    }, [city])

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

    function addFavorite(house){
        const options = makeOptions("POST", house)
        return fetch(addFavoritesURL, options)
            .then(handleHttpErrors)
    }

    function FavoriteButton(props){
        const singleHouse = props.eachHouse;
        
        function handleOnclick(event){
            event.preventDefault();
            let prop_id = singleHouse.property_id;
            let city = singleHouse.address.city;
            let county = singleHouse.address.county;
            let line = singleHouse.address.line;
            let postal_code = singleHouse.address.postal_code;
            let price = singleHouse.price;
            let rdc_web_url = singleHouse.rdc_web_url;
            let state = singleHouse.address.state;
            let state_code = singleHouse.address.state_code;
            let thumbnail = "";
            if (singleHouse.hasOwnProperty('thumbnail')){
                thumbnail = singleHouse.thumbnail;
            } else {
                thumbnail = "--";
            }
            let type = singleHouse.prop_type;
            let size = "";
            let units = "";
            if (singleHouse.hasOwnProperty('building_size')){
                size = singleHouse.building_size.size;
                units = singleHouse.building_size.units;
            } else {
                size = "--";
                units = "--";
            }

            const save = {
                prop_id,
                city,
                county,
                line,
                postal_code,
                price,
                rdc_web_url,
                size,
                state,
                state_code,
                thumbnail,
                type,
                units
            }
            setSaved(save);
            addFavorite(save)
            .catch(err =>{
                if(err.status){
                  err.fullError.then(e=> 
                    setAlertMsg(<p className="alert alert-danger mt-3" role="alert">{e.message}</p>))
                }
                else{console.log("Network error"); }
            })
            .then(setAlertMsg(<p className="alert alert-success mt-3" role="alert">You added {save.line} to your favorites!</p>));
            console.log(singleHouse.property_id);
        }

        function AlertBox(){
            if (saved.prop_id === singleHouse.property_id){
                return (
                    alertMsg
                )
            } else {
                return "";
            }
            
        }
        return (
            <React.Fragment>
            <button className="btn btn-outline-info ml-3" type="submit" onClick={handleOnclick}>
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
            </button>
            <AlertBox />
          </React.Fragment>
        )
    }

      function PhotoCarousel(){
          return (
            <Carousel>
                <Carousel.Item className="carouselBackgroundColor">
                <img className="photoRef mb-2" src={photoRefsData[0] + KEY}/>
                </Carousel.Item>
                <Carousel.Item className="carouselBackgroundColor">
                <img className="photoRef mb-2" src={photoRefsData[1] + KEY}/>
                </Carousel.Item>
                <Carousel.Item className="carouselBackgroundColor">
                <img className="photoRef mb-2" src={photoRefsData[2] + KEY}/>
                </Carousel.Item>
                <Carousel.Item className="carouselBackgroundColor">
                <img className="photoRef mb-2" src={photoRefsData[3] + KEY}/>
                </Carousel.Item>
                <Carousel.Item className="carouselBackgroundColor">
                <img className="photoRef mb-2" src={photoRefsData[4] + KEY}/>
                </Carousel.Item>
                <Carousel.Item className="carouselBackgroundColor">
                <img className="photoRef mb-2" src={photoRefsData[5] + KEY}/>
                </Carousel.Item>
                <Carousel.Item className="carouselBackgroundColor">
                <img className="photoRef mb-2" src={photoRefsData[6] + KEY}/>
                </Carousel.Item>
                <Carousel.Item className="carouselBackgroundColor">
                <img className="photoRef mb-2" src={photoRefsData[7] + KEY}/>
                </Carousel.Item>
                <Carousel.Item className="carouselBackgroundColor">
                <img className="photoRef mb-2" src={photoRefsData[8] + KEY}/>
                </Carousel.Item>
                <Carousel.Item className="carouselBackgroundColor">
                <img className="photoRef mb-2" src={photoRefsData[9] + KEY}/>
                </Carousel.Item>
          </Carousel>
          )
      }


    function ModalFunction(props) {

        const singleHouse = props.eachHouse;
        const [show, setShow] = useState(false);
        
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
      
        let picture = "";
        let text = "";
        if (singleHouse.hasOwnProperty('thumbnail')){
            text = singleHouse.address.line;
            picture = <img className="imageModal" src={singleHouse.thumbnail} alt={text} />
        } else {
            text = "No Image Available";
            picture = <img className="imageModal" src={No_Image_Available} alt={text} />
        }

        let size = "";
        let units = "";
        if (singleHouse.hasOwnProperty('building_size')){
            size = singleHouse.building_size.size;
            units = singleHouse.building_size.units;
        } else {
            size = "--";
            units = "--";
        }

        let elevation = "";
        if (cityInfo.hasOwnProperty('elevationMeters')){
            elevation = cityInfo.elevationMeters;
        } else {
            elevation = "--";
        }

        return (
          <>
            <Button variant="primary" onClick={handleShow}>
                Go to house
            </Button>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                    {picture}
                    <h4 className="mt-4">${singleHouse.price}</h4>
                    <p className="h6">{singleHouse.address.line}, {singleHouse.address.city}, {singleHouse.address.state_code}, {singleHouse.address.postal_code}</p> 
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>  
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <p>Property Type:</p>
                            <p>Building Size:</p>
                            <p>Realtor:</p>
                        </div>
                        <div className="col-6 bold">
                            <p>{singleHouse.prop_type}</p>
                            <p>{size} {units}</p>
                            <p><a href={singleHouse.rdc_web_url}>Realtor.com</a></p>
                        </div>
                    </div>
                </div>

                <div className="container containerCityInfo mt-2">
                    <div className="row">
                        <div className="col-12 pHeader mt-2">
                            <p className="h5 mt-3">City Information</p> 
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 mt-2">
                            <p>City:</p>
                            <p>Country:</p>
                            <p>Elevation:</p>
                            <p>Population:</p>
                        </div>
                        <div className="col-6 bold mt-3">
                            <p>{cityInfo.city}</p>
                            <p>{cityInfo.country}</p>
                            <p>{cityInfo.elevationMeters}</p>
                            <p>{cityInfo.population}</p>
                        </div>
                    </div>
                </div>
                
    <div className="carousel">
        <div className="row">
            <div className="col-12 mt-3 pHeader"> 
                <p className="h5 mt-3 mb-2">Pictures of the city</p>
                  <PhotoCarousel />
              </div>
              </div>
              </div>
              
            </Modal.Body> 
            <Modal.Footer> 
              <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
            </Modal.Footer> 
            </Modal>
          </>
        );
  }

    return (
        <React.Fragment>
            {houses.map((m, key) => {
                let picture = "";
                let text = "";
                if (m.hasOwnProperty('thumbnail')){
                    text = m.line;
                    picture = <img className="card-img-top" src={m.thumbnail} alt={text} />
                } else {
                    text = "No Image Available";
                    picture = <img className="card-img-top" src={No_Image_Available} alt={text} />
                }
                if (m.hasOwnProperty('building_size')){
                    return(
                        <div key={key}>
                            <div id="main">
                            </div>
                            <div className="card">
                                {picture}
                                <div className="card-body">
                                    <h5 className="card-title">{m.address.line}</h5>
                                    <p className="card-text">
                                        {m.address.line}, {m.address.city}, {m.address.state_code}, {m.address.postal_code}.
                                        {"\n"}
                                        A {m.building_size.size} {m.building_size.units} {m.prop_type} home for ${m.price}
                                    </p>
                                    
                                    <div className="container">
                                        <div className="row">
                                            <ModalFunction eachHouse={m}/>
                                            <FavoriteButton eachHouse={m}/>
                                        </div>
                                    </div>  

                                </div>
                            </div>

                        </div>
                        
                    )
                } else {
                    return(
                        <div className="card" key={key}>
                            {picture}
                            <div className="card-body">
                                <h5 className="card-title">{m.address.line}</h5>
                                <p className="card-text">
                                    {m.address.line}, {m.address.city}, {m.address.state_code}, {m.address.postal_code}.
                                    {"\n"}
                                    A {m.prop_type} home for ${m.price}
                                </p>

                                <div className="container">
                                    <div className="row">
                                        <ModalFunction eachHouse={m}/>
                                        <FavoriteButton eachHouse={m}/>
                                    </div>
                                </div>        
                                
                            </div>
                        </div>
                    )
                }
            })}      
         </React.Fragment>
    )
}
