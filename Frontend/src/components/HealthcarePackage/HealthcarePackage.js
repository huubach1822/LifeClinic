import "./HealthcarePackage.scss";
import tempLogo from "./tempLogo.webp";
import { useEffect, useState } from 'react';
import { faAngleRight, faSearch, faHospital, faBriefcaseMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { getAllHealthcare } from "../../service/healthcareService";
import { Buffer } from 'buffer';
import _ from 'lodash';


const MedicalFacility = () => {

    const [healthcare, setHealthcare] = useState();
    const [selectedHealthcare, setSelectedHealthcare] = useState();

    // call api
    useEffect(() => {
        const fetchData = async () => {
            var res = await getAllHealthcare()
            var temp = res.data.healthcarePackage
            for (let x of temp) {
                x.ID_clinic_clinic.Logo = Buffer.from(x.ID_clinic_clinic.Logo.data, 'binary').toString('base64');
            }
            setHealthcare(temp)
            setSelectedHealthcare(temp[0])
        }
        fetchData()
    }, []);

    return (
        <div>
            <div className="hc-section-1">
                <div className="hc-s1-p1 mt-3">
                    <Link to="/" className="hc-s1-p1-hp me-2">Home Page</Link>
                    <FontAwesomeIcon icon={faAngleRight} />
                    <span className="hc-s1-p1-hc ms-2">Healthcare Package</span>
                </div>
                <div className="hc-s1-p2 d-flex flex-column align-items-center pb-5">
                    <div className="hc-s1-p2-title">Healthcare Package</div>
                    <div className="hc-s1-p2-description">Extensive health check-up packages at trusted medical institutions meet all the needs of the people.</div>
                    <div className="form-group has-search mt-4 mb-4">
                        <span className="form-control-feedback"><FontAwesomeIcon icon={faSearch} /></span>
                        <input type="text" className="form-control" placeholder="Find a Healthcare Package" />
                    </div>
                </div>
            </div>
            <div className="hc-section-2">
                <div className="hc-s2-container">
                    <div className="container">
                        <div className="row">
                            <div className="col-7 mt-4">
                                {healthcare?.map((item, index) => {
                                    return (
                                        <div autofocus={index === 0 ? "true" : "false"} className="hc-s2-card d-flex mb-4 px-4 py-4" tabIndex={index} key={item.ID} onClick={() => setSelectedHealthcare(item)} >
                                            <img alt="" className="hc-s2-img" src={tempLogo}></img>
                                            <div className="flex-fill ms-3">
                                                <div className="hc-s2-name">{item.Name}</div>
                                                <div className="hc-s2-address"><FontAwesomeIcon icon={faHospital} className="me-1" /> {item.ID_clinic_clinic.Name}</div>
                                                <div className="hc-s2-address"><FontAwesomeIcon icon={faBriefcaseMedical} className="me-1" /> {item.ID_healthcare_type_healthcare_type.Name}</div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="hc-s2-price">Price: <span>{item.Price} VND</span></div>
                                                    <button type="button" className="hc-s2-button btn">Book now</button>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="col-5 mt-4 ">
                                {!_.isEmpty(selectedHealthcare) &&
                                    <>
                                        <div className="hc-s2-sidecontent p-4">
                                            <img alt="" className="hc-s2-sc-img mb-4" src={`data:image/*;base64,${selectedHealthcare.ID_clinic_clinic.Logo}`}></img>
                                            <div className="hc-s2-sc-name">{selectedHealthcare.Name}</div>
                                            <div className="hc-s2-sc-address">{selectedHealthcare.ID_clinic_clinic.Name}</div>
                                            <div className="hc-s2-sc-address mb-3">{selectedHealthcare.ID_clinic_clinic.Address}</div>
                                            <div className="hc-s2-sc-address temp-description pt-2">{selectedHealthcare.Description}</div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MedicalFacility;