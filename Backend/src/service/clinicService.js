import db from "../models/db";

let getAllClinics = async () => {
    try {
        var clinics = await db.clinic.findAll();
    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "success", code: 0, clinics }
}

module.exports = {
    getAllClinics: getAllClinics
}