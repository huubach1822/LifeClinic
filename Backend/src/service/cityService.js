import db from "../models/db";

let getAllCity = async () => {
    try {
        var city = await db.city.findAll();
    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "success", code: 0, city }
}

module.exports = {
    getAllCity: getAllCity
}