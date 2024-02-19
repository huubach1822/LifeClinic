import "./MedicalFacility.scss";
import { useEffect, useState } from 'react';
import { faAngleRight, faSearch, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { getAllClinics } from "../../service/clinicService";
import { Buffer } from 'buffer';
import _ from "lodash"

const MedicalFacility = () => {

    // call api
    const [selectedClinic, setSelectedClinic] = useState();
    const [clinics, setClinic] = useState()
    useEffect(() => {
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
                    <div className="form-group has-search mt-4 mb-4">
                        <span className="form-control-feedback"><FontAwesomeIcon icon={faSearch} /></span>
                        <input type="text" className="form-control" placeholder="Find a Medical Facility" />
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
                            <div className="col-5 mt-4 ">
                                {!_.isEmpty(selectedClinic) &&
                                    <>
                                        <div className="mf-s2-sidecontent p-4">
                                            <img alt="" className="mf-s2-sc-img mb-4" src={`data:image/*;base64,${selectedClinic.Logo}`}></img>
                                            <div className="mf-s2-sc-name">{selectedClinic.Name}</div>
                                            <div className="mf-s2-sc-address mb-3">{selectedClinic.Address}</div>
                                            <div className="mf-s2-sc-address temp-description pt-2">{selectedClinic.Short_Description}</div>
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