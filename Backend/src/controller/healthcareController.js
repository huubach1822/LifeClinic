import healthcareService from '../service/healthcareService';

const getAllHealthcarePackage = async (req, res) => {

    let result = await healthcareService.getAllHealthcarePackage();
    return res.status(200).json(result)

}

module.exports = {
    getAllHealthcarePackage: getAllHealthcarePackage
}