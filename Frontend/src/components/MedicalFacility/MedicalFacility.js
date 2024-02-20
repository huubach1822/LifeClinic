import "./MedicalFacility.scss";
import React, { useRef, useEffect, useState } from 'react';
import { faAngleRight, faSearch, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { getAllClinics } from "../../service/clinicService";
import { Buffer } from 'buffer';
import mapboxgl from 'mapbox-gl';
import ReactReadMoreReadLess from "react-read-more-read-less";
import 'mapbox-gl/dist/mapbox-gl.css';
import _ from "lodash"
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const MedicalFacility = () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoibW9uc3Rlcnh5ejAyIiwiYSI6ImNsZnFtMWpyeTAwbjIzcm81OHZsam14NTYifQ.wL-EZFvgPDOvrF-JFVlWsA';
    const mapContainer = useRef(null);
    const [mapObject, setMap] = useState();

    const openToMap = () => {
        let lat = selectedClinic.Latitude;
        let lng = selectedClinic.Longitude;
        window.open(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`);
    }

    // call api
    const [selectedClinic, setSelectedClinic] = useState();
    const [clinics, setClinic] = useState()
    useEffect(() => {

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            zoom: 17,
            dragPan: false,
            scrollZoom: false,
            boxZoom: false,
            doubleClickZoom: false
        });
        setMap(map);

        const fetchData = async () => {
            var res = await getAllClinics()
            var temp = res.data.clinics
            for (let x of temp) {
                x.Logo = Buffer.from(x.Logo.data, 'binary').toString('base64');
            }
            setClinic(temp)
            setSelectedClinic(temp[0])
        }
        fetchData()
    }, []);

    useEffect(() => {
        if (!_.isEmpty(selectedClinic)) {
            var cor = [selectedClinic.Longitude, selectedClinic.Latitude]
            // eslint-disable-next-line
            let marker = new mapboxgl.Marker({ color: "#EA4335" }).setLngLat(cor).addTo(mapObject);
            mapObject?.setCenter(cor)
        }
    }, [selectedClinic, mapObject])

    const [location, setLocation] = useState("");
    const handleChange = (event) => {
        setLocation(event.target.value);
    };

    return (
        <div>
            <div className="mf-section-1">
                <div className="mf-s1-p1 mt-3">
                    <Link to="/" className="mf-s1-p1-hp me-2">Home Page</Link>
                    <FontAwesomeIcon icon={faAngleRight} />
                    <span className="mf-s1-p1-mf ms-2">Medical Facility</span>
                </div>
                <div className="mf-s1-p2 d-flex flex-column align-items-center pb-5">
                    <div className="mf-s1-p2-title">Medical Facility</div>
                    <div className="mf-s1-p2-description">Access to leading healthcare facilities will enhance your medical examination and treatment experience.</div>
                    <div className="form-group has-search mt-4 mb-4 d-flex flex-row">
                        <span className="form-control-feedback"><FontAwesomeIcon icon={faSearch} /></span>
                        <input type="text" className="form-control" placeholder="Find a Medical Facility" />
                        <div className="search-line-icon"></div>
                        <FormControl sx={{ width: "170px", height: "50px" }}>
                            <Select
                                value={location}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                renderValue={location !== "" ? undefined : () => <span className="placeholder-text">Location</span>}
                            >
                                <MenuItem value={5}>All Location</MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Ho Chi Minh</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className="mf-section-2">
                <div className="mf-s2-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-7 mt-4">
                                {clinics?.map((item, index) => {
                                    return (
                                        <div className="mf-s2-card d-flex mb-4 px-4 py-4" tabIndex={index} key={item.ID} onClick={() => setSelectedClinic(item)} >
                                            <img alt="" className="mf-s2-img" src={`data:image/*;base64,${item.Logo}`}></img>
                                            <div className="flex-fill ms-3">
                                                <div className="mf-s2-name">{item.Name}</div>
                                                <div className="mf-s2-address"><FontAwesomeIcon icon={faLocationDot} className="me-1" /> {item.Address}</div>
                                                <Link to={`/bookingClinic/${item.ID}`} type="button" className="mf-s2-button btn">Book now</Link>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="col-5 mt-4 position-relative pb-4">
                                <div className="mf-s2-sidecontent py-3">
                                    {!_.isEmpty(selectedClinic) &&
                                        <>
                                            <img alt="" className="mf-s2-sc-img mb-3" src={`data:image/*;base64,${selectedClinic.Logo}`}></img>
                                            <div className="mf-s2-sc-name">{selectedClinic.Name}</div>
                                            <div className="mf-s2-sc-address mb-3">{selectedClinic.Address}</div>
                                            <div className="mf-s2-sc-address temp-description pt-2 mb-3">
                                                <ReactReadMoreReadLess
                                                    charLimit={209}
                                                    readMoreText={"View more ▼"}
                                                    readLessText={"View less ▲"}
                                                    readMoreClassName={"more-less-btn"}
                                                    readLessClassName={"more-less-btn"}
                                                >
                                                    {selectedClinic.Short_Description}
                                                </ReactReadMoreReadLess>
                                            </div>
                                        </>
                                    }
                                    <div ref={mapContainer} className="map-container">
                                        <div className="container-open-map py-1 px-2">
                                            <div className="a-open-map" onClick={() => openToMap()}>View large map</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MedicalFacility;