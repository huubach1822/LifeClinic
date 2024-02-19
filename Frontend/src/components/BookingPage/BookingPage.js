import "./BookingPage.scss";
import { faVenusMars, faBriefcaseMedical, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import tempLogo from "../Doctor/tempDoctor.webp"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import { useSelector } from 'react-redux'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
var _ = require('lodash');

const BookingPage = () => {

    const navigate = useNavigate();
    const account = useSelector(state => state.user.account)
    const [doctorDetail, setDoctor] = useState()
    const [timeSchedule, setTimeSchedule] = useState({})
    const [startDate, setStartDate] = useState(new Date());

    let { id } = useParams();
    useEffect(() => {

        const getData = async () => {
            const response = await axios.get(`http://localhost:8080/getDoctorDetail/${id}`)
            setDoctor(response.data.doctorDetail)

        };
        getData();

    }, []);

    const handleChange = (e) => {
        if (e.target.value === "0") {
            setTimeSchedule({})
        } else {
            axios.post(`http://localhost:8080/getDoctorScheduleByDate`, { doctorID: doctorDetail.ID, date: e.target.value }).then((res) => {
                setTimeSchedule(res.data.timeSchedule)
            })
        }
    }

    const checkAvaliable = (id) => {
        if (timeSchedule.filter(e => e.ID_time_type_time_type.ID === id).length > 0) {
            /* vendors contains the element we're looking for */
            return false
        }
        return true
    }

    const [selectedSchedule, setSchedule] = useState();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        let obj = timeSchedule.find(x => x.ID_time_type_time_type.ID === id)
        setSchedule(obj.ID)
    }
    const onFormSubmit = e => {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        formDataObj.id_schedule = selectedSchedule
        formDataObj.id_account = account.ID
        axios.post(`http://localhost:8080/updateBooking`, formDataObj).then((e) => {
            if (e.data.code === 0) {
                toast(e.data.message);
                navigate("/")
                window.scrollTo(0, 0)
            } else {
                toast(e.data.message);
            }
        })

    }



    return (
        <div className="booking-page-container">
            {
                !_.isEmpty(doctorDetail) && <>
                    <div className="bp-s1 d-flex">
                        <img alt="" src={tempLogo}></img>
                        <div className="bp-doc-detail ms-4">
                            <div className="bp-doc-name">{doctorDetail.Name}</div>
                            <div className="bp-doc-gender mt-1"><FontAwesomeIcon icon={faVenusMars} className="me-1" />{doctorDetail.Gender}</div>
                            <div className="bp-doc-spe mt-1"><FontAwesomeIcon icon={faBriefcaseMedical} className="me-1" />{doctorDetail.ID_speciality_speciality.Name}</div>
                            <div className="bp-doc-des mt-3">{doctorDetail.Description}</div>
                        </div>
                    </div>
                    <div className="bp-s2 d-flex mt-5">
                        <div className="bp-s2-p1">
                            <select className="form-select" aria-label="Default select example" onChange={(e) => handleChange(e)}>
                                <option defaultValue value={0}>Choose Date</option>
                                {doctorDetail.doctorSchedule.map((item, index) => {
                                    return (
                                        <option key={index} value={item}>{item}</option>
                                    )
                                })}
                            </select>
                            <div className="bp-s2-p1-title mt-3 mb-3"><FontAwesomeIcon icon={faCalendarDays} /> Appointment Schedule</div>
                            {!_.isEmpty(timeSchedule) &&
                                <>
                                    <div className="d-flex justify-content-between me-5">
                                        <button disabled={checkAvaliable(1)} type="button" className="btn btn-primary" onClick={() => handleShow(1)}>7:00 - 8:00</button>
                                        <button disabled={checkAvaliable(2)} type="button" className="btn btn-primary" onClick={() => handleShow(2)}>8:00 - 9:00</button>
                                        <button disabled={checkAvaliable(3)} type="button" className="btn btn-primary" onClick={() => handleShow(3)}>9:00 - 10:00</button>
                                        <button disabled={checkAvaliable(4)} type="button" className="btn btn-primary" onClick={() => handleShow(4)}>10:00 - 11:00</button>
                                    </div>
                                    <div className="d-flex justify-content-between me-5 mt-3">
                                        <button disabled={checkAvaliable(5)} type="button" className="btn btn-primary" onClick={() => handleShow(5)}>13:00 - 14:00</button>
                                        <button disabled={checkAvaliable(6)} type="button" className="btn btn-primary" onClick={() => handleShow(6)}>14:00 - 15:00</button>
                                        <button disabled={checkAvaliable(7)} type="button" className="btn btn-primary" onClick={() => handleShow(7)}>15:00 - 16:00</button>
                                        <button disabled={checkAvaliable(8)} type="button" className="btn btn-primary" onClick={() => handleShow(8)}>16:00 - 17:00</button>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="bp-s2-p2">
                            <div className="bp-s2-p2-title">Hospital Location</div>
                            <div>{doctorDetail.ID_clinic_clinic.Name}</div>
                            <div>{doctorDetail.ID_clinic_clinic.Address}</div>
                            <div className="bp-s2-p2-price mt-3">Price: <span>{doctorDetail.Price} VND</span></div>
                        </div>
                    </div>
                </>
            }
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Patient Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => onFormSubmit(e)} className="row">
                        <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="" name="name" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6 flex-column d-flex" controlId="formBasicEmail">
                            <Form.Label>DateOfBirth</Form.Label>
                            <DatePicker id="dt-picker" selected={startDate} onChange={(date) => setStartDate(date)} name="dateofbirth" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="" name="email" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select aria-label="Default select example" name="gender">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="" name="phone" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                            <Form.Label>Health Insurance Code</Form.Label>
                            <Form.Control type="text" placeholder="" name="health_ic" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                            <Form.Label>Ethnicity</Form.Label>
                            <Form.Control type="text" placeholder="" name="ethnicity" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-6" controlId="formBasicEmail">
                            <Form.Label>Citizen ID Number</Form.Label>
                            <Form.Control type="text" placeholder="" name="citizen_id" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-12" controlId="formBasicEmail">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="" name="address" />
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </div>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default BookingPage