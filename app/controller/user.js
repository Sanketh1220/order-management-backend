/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 * 
 * Purpose      : Controls the operations of user creation and login
 * 
 * @description
 * 
 * @file        : controllers/user.js
 * @overview    : controls the operations of user creation, login, forgot password and reset password
 * @module      : this is necessary to register new user and give authorization.
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : 1.0.0
 * @since       : 20-02-2022
 *********************************************************************/

const userService = require('../services/user');

const {userDataValidation, userLoginData} = require('../middleware/validation');

class UserController {
    /**
     * @description function written to register user
     * @param {*} A valid req is expected
     * @param {*} res
     */
    async registration(req, res) {
        try {
            let dataValidation = userDataValidation.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }
            const userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }
            const userCreated = await userService.createUserInfo(userData);
            res.send({success: true, message: "User registered!", data: userCreated});
            
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while registering user" });
        }
    }

    /**
    * @description this function handles the login API
    * @param {*} req 
    * @param {*} res 
    * @returns 
    */
    async login(req, res) {
        try {
            let dataValidation = userLoginData.validate(req.body);
            if (dataValidation.error) {
                return res.status(400).send({
                    message: dataValidation.error.details[0].message
                });
            }
            const userData = {
                email: req.body.email,
                password: req.body.password
            }
            const loginUser = await userService.loginUser(userData)
            if(loginUser.length < 30){
                res.status(401).send({message: loginUser});
            }
            res.send({success: true, message: "User login successful!", token: loginUser});
        }catch (error) {
            console.log(error);
            res.status(500).send({success: false, message: "Some error occurred while logging user" });
        }
    }
}

//exporting th whole class to utilize or call function created in this class
module.exports = new UserController();