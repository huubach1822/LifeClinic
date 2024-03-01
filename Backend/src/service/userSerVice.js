import db from "../models/db";
var _ = require('lodash');
const { Op } = require("sequelize");

const register = async (account) => {
    try {
        let temp = await db.account.findOne({
            where: {
                Username: account.username
            }
        });

        if (!_.isEmpty(temp)) {
            return { message: "Username already exists", code: 1 };
        } else {
            var tempacc = await db.account.create({ Username: account.username, Password: account.password, ID_account_type: 1 });
        }
    } catch (error) {
        console.log(error)
        return { message: "Something went wrong", code: 1 }
    }

    return { message: "Sucess", code: 0, account: tempacc }
}

const login = async (account) => {
    try {
        var temp = await db.account.findOne({
            where: {
                Username: account.username,
                Password: account.password
            }
        });
    } catch (error) {
        console.log(error)
        return { message: "Something went wrong", code: 1 }
    }

    if (!_.isEmpty(temp)) {
        return { message: "Success", code: 0, account: temp };
    } else {
        return { message: "Wrong username or password", code: 1 };
    }
}

const changePassword = async (account) => {

    try {
        var acc = await db.account.findOne({ where: { ID: account.id, Password: account.oldPassword } });
        if (_.isEmpty(acc)) {
            return { message: "Wrong old password", code: 1 };
        } else {
            acc.Password = account.newPassword;
            await acc.save({ fields: ["Password"] });
        }
    } catch (error) {
        console.log(error)
        return { message: "Something went wrong", code: 1 }
    }

    return { message: "Sucess", code: 0, account: acc };
}

module.exports = {
    register: register,
    login: login,
    changePassword: changePassword
}