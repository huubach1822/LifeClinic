import axios from "axios";

const getAllClinics = async () => {
    return await axios.get("http://localhost:8080/getAllClinics");
}

export {
    getAllClinics
}