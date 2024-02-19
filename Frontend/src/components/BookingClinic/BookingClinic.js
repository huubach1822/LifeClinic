import "./BookingClinic.scss"
import tempLogo from "../Doctor/tempDoctor.webp"
import { useEffect } from 'react';
import { faAngleRight, faSearch, faLocationDot, faVenusMars, faBriefcaseMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
var _ = require('lodash');

const BookingClinic = () => {

    let { id } = useParams();
    const [doctors, setDoctors] = useState();

    useEffect(() => {

        const getData = async () => {
            const response = await axios.get(`http://localhost:8080/getDoctorByClinic/${id}`)
            setDoctors(response.data.doctors)
        };
        getData();

    }, []);

    return (
        <div className="row bc-container">
            <div className="col-4 bc-s1">
                <div className="bc-s1-title">Medical Facility Information</div>
                <div className="bc-s1-info">
                    {!_.isEmpty(doctors) && (
                        <>
                            <div>{doctors[0].ID_clinic_clinic.Name}</div>
                            <div className="mb-3">{doctors[0].ID_clinic_clinic.Address}</div>
                            <div className="bc-s1-des pt-2">{doctors[0].ID_clinic_clinic.Short_Description}</div>
                        </>
                    )
                    }
                </div>

            </div>
            <div className="col-8 bc-s2">
                <div className="bc-s2-title">Book a doctor</div>
                <div>
                    {!_.isEmpty(doctors) && doctors.map((item, index) => {
                        return (
                            <div className="col-12 mt-4" key={item.ID}>
                                <div className="bc-s2-card d-flex mb-4 px-4 py-4">
                                    <img className="bc-s2-img" src={tempLogo}></img>
                                    <div className="flex-fill ms-3">
                                        <div className="bc-s2-name">{item.Name}</div>
                                        <div className="bc-s2-address"><FontAwesomeIcon icon={faLocationDot} className="me-1" /> {item.ID_clinic_clinic.Name}</div>
                                        <div className="bc-s2-address"><FontAwesomeIcon icon={faVenusMars} className="me-1" /> {item.Gender}</div>
                                        {/* <div className="bc-s2-address"><FontAwesomeIcon icon={faBriefcaseMedical} className="me-1" /> {item.ID_speciality_speciality.Name}</div> */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="bc-s2-price">Price: <span>{item.Price} VND</span></div>
                                            <Link to={`/doctorDetail/${item.ID}`} type="button" className="bc-s2-button btn">Book now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}

export default BookingClinic