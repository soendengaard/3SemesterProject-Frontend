import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Modal, Carousel} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import No_Image_Available from "./No.jpg";
import '../../App.css';
import KEY from '../../apikey.js';

export default function Property({URL, city}) {

    const urlHouses = URL + 'api/properties/' + city;
    const urlCityInfo = URL + 'api/citydetails/' + city;
    const urlPhotoRefs = URL + 'api/photo/placeref/' + city;
    const [houses, setHouses] = useState([]);
    const [cityInfo, setCityInfo] = useState([]);
    const [photoRefsData, setPhotoRefsData] = useState([]);
    const [test, setTest] = useState([]);
    let images = [];
    let image = "";

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

    function EachPhoto(){
        return (
            <React.Fragment>
                {photoRefsData.map((p) => {
                    <div>
                    <img className="d-block w-100" src={p + KEY} alt="Slide" />
                    <img className="d-block w-100" src={No_Image_Available} alt="Slide" />
                <Carousel>
                        <Carousel.Item>
                
                    console.log("RAW: " + (p+KEY));
                    image = <img className="d-block w-100" src={p + KEY} alt="Slide" />;
                    console.log("IMAGE: " + image);
                
                </Carousel.Item>
                </Carousel>
                </div>
                })}
            </React.Fragment>
        )
    }

    function Carousel(props){
        return (
            <React.Fragment>
                <p>This is a carousel</p>
                <p>{props.photoUrl}</p>
                <p>This is the end of carousel</p>
            </React.Fragment>
        )
        
    }

    function Test(){
        for (var i = 0; i < photoRefsData.length; i++) {
            images.push(<img className="photoRef mb-2" src={photoRefsData[i] + KEY} alt={i} key={photoRefsData[i]}/>)
            //console.log(images);
            //console.log("Images: " + images);
        }    

        return images;
        // Save whole carousel in carousel attribute
        /*
        for (var i = 0; i < photoRefsData.length; i++) {
            image = <img className="photoRef" src={photoRefsData[i] + KEY} alt={i} />
            //<Carousel photoUrl={photoRefsData[i] + KEY}/>
            return image;
        }
        */
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

                <div className="container">
                    <div className="row">
                        <div className="col-12 mt-3 pHeader"> 
                            <p className="h5 mt-3 mb-2">Pictures of the city</p> 
                            <Test />
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
                                    <ModalFunction eachHouse={m}/>
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
                                <ModalFunction eachHouse={m}/>
                            </div>
                        </div>
                    )
                }
            })}      
         </React.Fragment>
    )
}
