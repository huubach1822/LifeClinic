import axios from "axios";

const getAllHealthcare = async () => {
    return await axios.get("http://localhost:8080/getAllHealthcarePackage");
}

export {
    getAllHealthcare
}