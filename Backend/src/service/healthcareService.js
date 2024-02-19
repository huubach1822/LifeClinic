import db from "../models/db";

let getAllHealthcarePackage = async () => {
    try {
        var healthcarePackage = await db.healthcare_package.findAll({
            include: [
                { model: db.clinic, attributes: ['Name', 'Address', 'Logo'], as: "ID_clinic_clinic" },
                { model: db.healthcare_type, attributes: ['Name'], as: "ID_healthcare_type_healthcare_type" }
            ]
        });
    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "success", code: 0, healthcarePackage }
}

module.exports = {
    getAllHealthcarePackage: getAllHealthcarePackage
}