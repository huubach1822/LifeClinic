import db from "../models/db";

let updateBooking = async (obj) => {
    try {
        var tempPatient = {
            Name: obj.name,
            DateOfBirth: obj.dateofbirth,
            Email: obj.email,
            Gender: obj.gender,
            Phone: obj.phone,
            Address: obj.address,
            Health_insurance_code: obj.health_ic,
            Ethnicity: obj.ethnicity,
            Citizen_id_number: obj.citizen_id,
            ID_account: obj.id_account
        }
        var patient = await db.patient.create(tempPatient);
        var tempBooking = {
            Status: "Ok",
            Booking_date: new Date().toLocaleDateString(),
            ID_patient: patient.ID,
            ID_schedule: obj.id_schedule
        }
        var res = await db.booking.create(tempBooking);

    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "success", code: 0, res }
}

module.exports = {
    updateBooking: updateBooking
}