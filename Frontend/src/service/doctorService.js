import axios from "axios";

const getAllDoctors = async () => {
    return await axios.get("http://localhost:8080/getAllDoctors");
}

const getAllDoctorsPagination = async (page, queryString, idCity) => {
    return await axios.get(`http://localhost:8080/getAllDoctorsPagination/page=${page}&queryString=${queryString}&idCity=${idCity}`);
}

const getDoctorByClinic = async (id) => {
    return await axios.get(`http://localhost:8080/getDoctorByClinic/${id}`)
}

const getDoctorDetail = async (id) => {
    return await axios.get(`http://localhost:8080/getDoctorDetail/${id}`)
}

export {
    getAllDoctors,
    getAllDoctorsPagination,
    getDoctorByClinic,
    getDoctorDetail
}