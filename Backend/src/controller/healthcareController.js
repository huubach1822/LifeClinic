import healthcareService from '../service/healthcareService';

const getAllHealthcarePackage = async (req, res) => {

    let result = await healthcareService.getAllHealthcarePackage();
    return res.status(200).json(result)

}

const getAllHealthcarePagination = async (req, res) => {
    let result = await healthcareService.getAllHealthcarePagination(req.params.page, req.params.queryString, req.params.idCity);
    return res.status(200).json(result)

}

module.exports = {
    getAllHealthcarePackage: getAllHealthcarePackage,
    getAllHealthcarePagination: getAllHealthcarePagination
}