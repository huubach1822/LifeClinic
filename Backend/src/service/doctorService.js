import db from "../models/db";
import { Sequelize } from "sequelize";
import _ from "lodash";
import getPagingData from "../util/getPagingData";

let getAllDoctors = async () => {
    try {
        var doctors = await db.doctor.findAll({
            include: [
                { model: db.clinic, attributes: ['Name', 'Address'] },
                { model: db.speciality, attributes: ['Name'] },
                { model: db.degree, attributes: ['Name'] }
            ]
        });
    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "success", code: 0, doctors }
}

let getDoctorDetail = async (id) => {
    try {
        var doctorDetail = await db.doctor.findOne({
            include: [
                { model: db.clinic, attributes: ['Name', 'Address'] },
                { model: db.speciality, attributes: ['Name'] },
                { model: db.degree, attributes: ['Name'] }
            ],
            where: { ID: id },
        });

        var doctorSchedule = await db.doctor.findAll({
            attributes: [],
            include: [
                { model: db.schedule, attributes: ['Date'] }
            ],
            group: ['Date'],
            raw: true,
            where: { ID: id },
        });

        doctorDetail.dataValues.doctorSchedule = doctorSchedule.map((x) => Object.values(x)).flat(1)

    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "success", code: 0, doctorDetail }
}

let getDoctorScheduleByDate = async (doctorID, date) => {

    try {
        var timeSchedule = await db.schedule.findAll({
            include: [
                { model: db.time_type, attributes: ['ID', 'Value'] },
            ],
            where: { ID_doctor: doctorID, Date: date },
        });

    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "success", code: 0, timeSchedule }
}

let getDoctorByClinic = async (clinicID) => {

    try {
        var result = await db.clinic.findOne({
            include: [
                { model: db.doctor, include: [{ model: db.degree }, { model: db.speciality }] },
            ],
            where: { ID: clinicID },
        });

    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "success", code: 0, result }
}

let getAllDoctorsPagination = async (page, queryString, idCity) => {

    const Op = Sequelize.Op;
    if (_.isEmpty(page)) page = 1;
    if (_.isEmpty(queryString)) queryString = "";
    if (_.isEmpty(idCity)) idCity = {
        [Op.not]: null
    };

    let limit = 8;
    let offset = (limit * page) - limit;

    try {
        var rawData = await db.doctor.findAndCountAll({
            offset: offset,
            limit: limit,
            include: [
                { model: db.clinic, attributes: ['ID', 'Name', 'Address'] },
                { model: db.speciality, attributes: ['ID', 'Name'] },
                { model: db.degree, attributes: ['ID', 'Name'] }
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
    getAllDoctors: getAllDoctors,
    getDoctorDetail: getDoctorDetail,
    getDoctorScheduleByDate: getDoctorScheduleByDate,
    getDoctorByClinic: getDoctorByClinic,
    getAllDoctorsPagination: getAllDoctorsPagination
}