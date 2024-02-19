import clinic from "../models/clinic";
import db from "../models/db";

let getAllDoctors = async () => {
    try {
        var doctors = await db.doctor.findAll({
            include: [
                { model: db.clinic, attributes: ['Name', 'Address'], as: "ID_clinic_clinic" },
                { model: db.speciality, attributes: ['Name'], as: "ID_speciality_speciality" }
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
                { model: db.clinic, attributes: ['Name', 'Address'], as: "ID_clinic_clinic" },
                { model: db.speciality, attributes: ['Name'], as: "ID_speciality_speciality" },
            ],
            where: { ID: id },
        });

        var doctorSchedule = await db.doctor.findAll({
            attributes: [],
            include: [
                { model: db.schedule, as: "schedules", attributes: ['Date'] }
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
                { model: db.time_type, attributes: ['ID', 'Value'], as: "ID_time_type_time_type" },
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
        var doctors = await db.doctor.findAll({
            include: [
                { model: db.clinic, attributes: ['Name', 'Address', 'Short_Description'], as: "ID_clinic_clinic" },
            ],
            where: { ID_clinic: clinicID },
        });

    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "success", code: 0, doctors }
}

module.exports = {
    getAllDoctors: getAllDoctors,
    getDoctorDetail: getDoctorDetail,
    getDoctorScheduleByDate: getDoctorScheduleByDate,
    getDoctorByClinic: getDoctorByClinic
}