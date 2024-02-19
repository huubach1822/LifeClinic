import axios from "axios";

const getAllDoctors = async () => {
    return await axios.get("http://localhost:8080/getAllDoctors");
}

export {
    getAllDoctors
}