import db from "../models/db";
var _ = require('lodash');

const register = async (account) => {
    try {
        let temp = await db.account.findAll({
            where: {
                Username: account.username
            }
        });

        if (!_.isEmpty(temp)) {
            return { message: "user already exist", code: 1 };
        } else {
            var tempacc = await db.account.create({ Username: account.username, Password: account.password, ID_account_type: 1 });
        }
    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    return { message: "sucess", code: 0, account: tempacc[0] }
}

const login = async (account) => {
    try {
        var temp = await db.account.findAll({
            where: {
                Username: account.username,
                Password: account.password
            }
        });
    } catch (error) {
        console.log(error)
        return { message: "error", code: 1 }
    }

    if (!_.isEmpty(temp)) {
        return { message: "success", code: 0, account: temp[0] };
    } else {
        return { message: "wrong username or password", code: 1 };
    }
}


module.exports = {
    register: register,
    login: login
}