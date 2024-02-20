import db from "../models/db";
import _ from "lodash"
import { Sequelize } from "sequelize";
import getPagingData from "../util/getPagingData";

let getAllClinics = async () => {
    try {
        var clinics = await db.clinic.findAll();
    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "success", code: 0, clinics }
}

let getAllClinicsPagination = async (page, queryString, idCity) => {

    console.log(idCity)
    const Op = Sequelize.Op;
    if (_.isEmpty(page)) page = 1;
    if (_.isEmpty(queryString)) queryString = "";
    if (_.isEmpty(idCity)) idCity = 1;

    let limit = 5;
    let offset = (limit * page) - limit;

    try {
        var clinics = await db.clinic.findAndCountAll({
            offset: offset,
            limit: limit,
            where: {
                Name: {
                    [Op.like]: `%${queryString}%`
                },
                ID_City: idCity
            }
        });
    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    let data = getPagingData(clinics, page, limit)

    return {
        message: "success",
        code: 0,
        data
    }
}

module.exports = {
    getAllClinics: getAllClinics,
    getAllClinicsPagination: getAllClinicsPagination
}