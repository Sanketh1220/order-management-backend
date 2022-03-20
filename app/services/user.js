/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Invokes the functions related to the database
 *
 * @description
 *
 * @file        : service/user.js
 * @overview    : calls functions from the model to respond to the controller
 * @module      : this is necessary to perform CRUD operations
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : - - -
 * @since       : 20-03-2022
 *********************************************************************/

//importing a class from models and assigned to constant variable
const userModel = require('../models/user');

const helperClass = require('../middleware/helper');

require('dotenv').config();

class UserService {
    /**
     * @description function created to create user into database
     * @param {*} A valid userData is expected 
     * @param {*} callBack 
     */
    async createUserInfo(userData) {
        try {
            const createdUser = await userModel.createInfo(userData);
            return createdUser;
        }catch (error) {
            return error;
        }
    }

    /**
     * @description function created to login user
     * @param {*} A valid userData is expected 
     * @param {*} callBack 
     */
    async loginUser(userData) {
        try {
            const loginUser = await userModel.loginUser(userData)
            if(helperClass.bcryptDataCheck(userData.password, loginUser.password)){
                return "Please enter correct password";
            }else {
            const token = helperClass.generateAccessToken({userData});
            return token;
            }
        } catch (error) {
            return error;
        }
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new UserService();