import "./Doctor.scss";
import tempLogo from "./tempDoctor.webp"
import { useEffect, useState } from 'react';
import { getAllDoctors } from "../../service/doctorService"
import { faAngleRight, faSearch, faLocationDot, faVenusMars, faBriefcaseMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const MedicalFacility = () => {

    const [doctors, setDoctor] = useState()
    // call api
    useEffect(() => {
        const fetchData = async () => {
            var res = await getAllDoctors();
            setDoctor(res.data.doctors);
        }
        fetchData()
    }, []);

    return (
        <div>
            <div className="doc-section-1">
                <div className="doc-s1-p1 mt-3">
                    <Link to="/" className="doc-s1-p1-hp me-2">Home Page</Link>
                    <FontAwesomeIcon icon={faAngleRight} />
                    <span className="doc-s1-p1-doc ms-2">Doctor</span>
                </div>
                <div className="doc-s1-p2 d-flex flex-column align-items-center pb-5">
                    <div className="doc-s1-p2-title">Book Doctors</div>
                    <div className="doc-s1-p2-description">A network of excellent specialists working at leading major hospitals, with verified information.</div>
                    <div className="form-group has-search mt-4 mb-4">
                        <span className="form-control-feedback"><FontAwesomeIcon icon={faSearch} /></span>
                        <input type="text" className="form-control" placeholder="Find a Doctor" />
                    </div>
                </div>
            </div>
            <div className="doc-section-2">
                <div className="doc-s2-container">
                    <div className="container">
                        <div className="row">
                            {doctors?.map((item, index) => {
                                return (
                                    <div className="col-6 mt-4" key={item.ID}>
                                        <div className="doc-s2-card d-flex mb-4 px-4 py-4">
                                            <img className="doc-s2-img" src={tempLogo}></img>
                                            <div className="flex-fill ms-3">
                                                <div className="doc-s2-name">{item.Name}</div>
                                                <div className="doc-s2-address"><FontAwesomeIcon icon={faLocationDot} className="me-1" /> {item.ID_clinic_clinic.Name}</div>
                                                <div className="doc-s2-address"><FontAwesomeIcon icon={faVenusMars} className="me-1" /> {item.Gender}</div>
                                                <div className="doc-s2-address"><FontAwesomeIcon icon={faBriefcaseMedical} className="me-1" /> {item.ID_speciality_speciality.Name}</div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="doc-s2-price">Price: <span>{item.Price} VND</span></div>
                                                    <Link to={`/doctorDetail/${item.ID}`} type="button" className="doc-s2-button btn">Book now</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MedicalFacility;