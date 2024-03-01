import axios from "axios";

const getAllClinics = async () => {
    return await axios.get("http://localhost:8080/getAllClinics");
}

const getAllClinicsPagination = async (page, queryString, idCity) => {
    return await axios.get(`http://localhost:8080/getAllClinicsPagination/page=${page}&queryString=${queryString}&idCity=${idCity}`);
}

export {
    getAllClinics,
    getAllClinicsPagination
}