import doctorService from '../service/doctorService';

const getAllDoctors = async (req, res) => {

    let result = await doctorService.getAllDoctors();
    return res.status(200).json(result)

}
const getDoctorDetail = async (req, res) => {

    let result = await doctorService.getDoctorDetail(req.params.id);
    return res.status(200).json(result)

}
const getDoctorScheduleByDate = async (req, res) => {
    let result = await doctorService.getDoctorScheduleByDate(req.body.doctorID, req.body.date);
    return res.status(200).json(result)

}
const getDoctorByClinic = async (req, res) => {
    let result = await doctorService.getDoctorByClinic(req.params.id);
    return res.status(200).json(result)

}
const getAllDoctorsPagination = async (req, res) => {
    let result = await doctorService.getAllDoctorsPagination(req.params.page, req.params.queryString, req.params.idCity);
    return res.status(200).json(result)

}

module.exports = {
    getAllDoctors: getAllDoctors,
    getDoctorDetail: getDoctorDetail,
    getDoctorScheduleByDate: getDoctorScheduleByDate,
    getDoctorByClinic: getDoctorByClinic,
    getAllDoctorsPagination: getAllDoctorsPagination
}