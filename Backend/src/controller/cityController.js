import cityService from '../service/cityService';

const getAllCity = async (req, res) => {
    let result = await cityService.getAllCity();
    return res.status(200).json(result)
}

module.exports = {
    getAllCity: getAllCity
}