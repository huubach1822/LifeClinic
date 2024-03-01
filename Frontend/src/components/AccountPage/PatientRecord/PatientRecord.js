import './PatientRecord.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleUser, faCakeCandles, faPhone, faVenusMars, faLocationDot, faPeopleGroup, faTrashCan, faCircleInfo, faUserPlus } from "@fortawesome/free-solid-svg-icons"

const PatientRecord = () => {
    return (
        <div className='pr-container'>
            <div className='pr-title d-flex justify-content-between'><div>Patient Record</div><button type="button" class="btn btn-primary pr-btn-add me-4"><FontAwesomeIcon icon={faUserPlus} className='me-2' />Add Patient</button></div>
            <div className='row pr-content'>
                <div className='col-12 pr-card'>
                    <div className='pr-info'>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faCircleUser} /></span>Full name: <span className='pr-name'>Tran Van An</span></div>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faCakeCandles} /></span>Date of birth: <span className='fw-bold'>06/04/1992</span></div>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faPhone} /></span>Phone number: <span className='fw-bold'>0864949732</span></div>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faVenusMars} /></span>Gender: <span className='fw-bold'>Male</span></div>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faLocationDot} /></span>Address: <span className='fw-bold'>45 Nui Truc Phu Tay, Xa An, Binh Chanh, Ho Chi Minh</span></div>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faPeopleGroup} /></span>Ethnicity: <span className='fw-bold'>Kinh</span></div>
                    </div>
                    <div className='pr-btn d-flex justify-content-end'>
                        <button type="button" class="btn btn-primary pr-btn-delete"><FontAwesomeIcon icon={faTrashCan} className='me-2' />Delete</button>
                        <button type="button" class="btn btn-primary pr-btn-detail"><FontAwesomeIcon icon={faCircleInfo} className='me-2' />Detail</button>
                    </div>
                </div>
                <div className='col-12 pr-card'>
                    <div className='pr-info'>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faCircleUser} /></span>Full name: <span className='pr-name'>Tran Van An</span></div>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faCakeCandles} /></span>Date of birth: <span className='fw-bold'>06/04/1992</span></div>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faPhone} /></span>Phone number: <span className='fw-bold'>0864949732</span></div>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faVenusMars} /></span>Gender: <span className='fw-bold'>Male</span></div>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faLocationDot} /></span>Address: <span className='fw-bold'>45 Nui Truc Phu Tay, Xa An, Binh Chanh, Ho Chi Minh</span></div>
                        <div className='mb-1'><span className='pr-icon'><FontAwesomeIcon icon={faPeopleGroup} /></span>Ethnicity: <span className='fw-bold'>Kinh</span></div>
                    </div>
                    <div className='pr-btn d-flex justify-content-end'>
                        <button type="button" class="btn btn-primary pr-btn-delete"><FontAwesomeIcon icon={faTrashCan} className='me-2' />Delete</button>
                        <button type="button" class="btn btn-primary pr-btn-detail"><FontAwesomeIcon icon={faCircleInfo} className='me-2' />Detail</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientRecord