import "./BookingClinic.scss"
import { useEffect } from 'react';
import { faUserDoctor, faStethoscope, faMagnifyingGlass, faVenusMars, faHospital, faDollarSign, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getDoctorByClinic } from "../../service/doctorService";
import { Buffer } from "buffer";
import _ from 'lodash';

const BookingClinic = () => {

    // param from url
    let { id } = useParams();
    // react router
    const navigate = useNavigate();
    // data
    const [clinicDetail, setClinicDetail] = useState();

    // call api
    useEffect(() => {
        const getData = async () => {
            const response = await getDoctorByClinic(id)
            response.data.result.Logo = Buffer.from(response.data.result.Logo.data, 'binary').toString('base64');
            setClinicDetail(response.data.result)
        };
        getData();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="row bc-container">
            <div className="col-4 bc-s1">
                <div className="bc-s1-title">Medical Facility Information</div>
                <div className="bc-s1-info d-flex flex-column">
                    {!_.isEmpty(clinicDetail) && (
                        <>
                            <img alt="" className="my-3" src={`data:image/*;base64,${clinicDetail.Logo}`}></img>
                            <div className="bc-s1-name mt-3"><FontAwesomeIcon icon={faHospital} className="me-2 icon" />{clinicDetail.Name}</div>
                            <div className="mb-3 bc-s1-address">{clinicDetail.Address}</div>
                            <div className="bc-s1-des pt-1">{clinicDetail.Short_Description}</div>
                        </>
                    )
                    }
                </div>
            </div>
            <div className="col-8 ps-4">
                <div className="bc-s2">
                    <div className="bc-s2-title">Book a doctor</div>
                    <div class="input-group mt-4 ps-2 ms-4 pe-5 bc-s2-search-container">
                        <input type="text" className="form-control shadow-none" placeholder="Find a doctor" />
                        <div className="input-group-append">
                            <button className="btn shadow-none" type="button">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                        </div>
                    </div>
                    <div className="bc-doctors-container ps-4 ms-2 mt-4 pe-3 me-4 pb-4">
                        <div className="bc-doctors d-flex flex-column gap-3">
                            {!_.isEmpty(clinicDetail?.doctors) && clinicDetail.doctors.map((item, index) => {
                                return (
                                    <div key={item.ID} className="bc-s2-card d-flex px-2 py-2" onClick={() => navigate(`/bookingDoctor/${item.ID}`)}>
                                        <div className="flex-fill ms-2 gap-1 d-flex flex-column">

                                            <div className="bc-s2-name">
                                                <div className="bc-s2-icon"><FontAwesomeIcon icon={faUserDoctor} /> </div>
                                                {item.Name}
                                            </div>
                                            <div className="bc-s2-doc-info">
                                                <div className="bc-s2-icon"><FontAwesomeIcon icon={faVenusMars} /></div>
                                                Gender: {item.Gender}
                                            </div>
                                            <div className="bc-s2-doc-info">
                                                <div className="bc-s2-icon"><FontAwesomeIcon icon={faStethoscope} /></div>
                                                Speciality: {item.speciality?.Name}
                                            </div>
                                            <div className="bc-s2-doc-info">
                                                <div className="bc-s2-icon"><FontAwesomeIcon icon={faGraduationCap} /></div>
                                                Degree: {item.degree?.Name}
                                            </div>
                                            <div className="bc-s2-doc-info">
                                                <div className="bc-s2-icon"><FontAwesomeIcon icon={faDollarSign} /></div>
                                                Price: {item.Price} VND
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BookingClinic