import clinicService from '../service/clinicService';

const getAllClinics = async (req, res) => {

    let result = await clinicService.getAllClinics();
    return res.status(200).json(result)

}

module.exports = {
    getAllClinics: getAllClinics
}