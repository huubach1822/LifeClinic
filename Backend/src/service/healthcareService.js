import db from "../models/db";
import _ from "lodash";
import getPagingData from "../util/getPagingData";
import { Sequelize } from "sequelize";


let getAllHealthcarePackage = async () => {
    try {
        var healthcarePackage = await db.healthcare_package.findAll({
            include: [
                { model: db.clinic, attributes: ['Name', 'Address', 'Logo'] },
                { model: db.healthcare_type, attributes: ['Name'] }
            ]
        });
    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "success", code: 0, healthcarePackage }
}

let getAllHealthcarePagination = async (page, queryString, idCity) => {

    const Op = Sequelize.Op;
    if (_.isEmpty(page)) page = 1;
    if (_.isEmpty(queryString)) queryString = "";
    if (_.isEmpty(idCity)) idCity = {
        [Op.not]: null
    };

    let limit = 8;
    let offset = (limit * page) - limit;

    try {
        var rawData = await db.healthcare_package.findAndCountAll({
            offset: offset,
            limit: limit,
            include: [
                { model: db.clinic, attributes: ['ID', 'Name', 'Address'] },
                { model: db.healthcare_type, attributes: ['ID', 'Name'] }
            ],
            where: {
                Name: {
                    [Op.like]: `%${queryString}%`
                },
                '$clinic.ID_city$': idCity
            }
        });
    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    let data = getPagingData(rawData, page, limit)

    return {
        message: "success",
        code: 0,
        data
    }
}


module.exports = {
    getAllHealthcarePackage: getAllHealthcarePackage,
    getAllHealthcarePagination: getAllHealthcarePagination
}