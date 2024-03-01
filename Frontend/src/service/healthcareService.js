import axios from "axios";

const getAllHealthcare = async () => {
    return await axios.get("http://localhost:8080/getAllHealthcarePackage");
}

const getAllHealthcarePagination = async (page, queryString, idCity) => {
    return await axios.get(`http://localhost:8080/getAllHealthcarePagination/page=${page}&queryString=${queryString}&idCity=${idCity}`);
}

export {
    getAllHealthcare,
    getAllHealthcarePagination
}