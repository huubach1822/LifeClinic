import axios from "axios";

const loginUser = async (user) => {
    return await axios.post("http://localhost:8080/login", user);
}

const registerUser = async (user) => {
    return await axios.post("http://localhost:8080/register", user);
}

export {
    loginUser,
    registerUser
}