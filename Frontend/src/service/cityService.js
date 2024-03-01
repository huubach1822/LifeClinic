import axios from "axios";

const getAllCity = async () => {
    return await axios.get("http://localhost:8080/getAllCity");
}

export {
    getAllCity
}