import clinicService from '../service/clinicService';

const getAllClinics = async (req, res) => {

    let result = await clinicService.getAllClinics();
    return res.status(200).json(result)

}

const getAllClinicsPagination = async (req, res) => {

    let result = await clinicService.getAllClinicsPagination(req.params.page, req.params.queryString, req.params.idCity);
    return res.status(200).json(result)

}

module.exports = {
    getAllClinics: getAllClinics,
    getAllClinicsPagination: getAllClinicsPagination
}