/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : To contain express routes
 *
 * @description
 *
 * @file        : routes/routes.js
 * @overview    : Contains all the express routes
 * @module      : this is necessary to use HTTP methods
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : - - -
 * @since       : 20-03-2022
 *********************************************************************/

const userController = require('../controller/user');

//exporting it to server.js
module.exports = (app) => {

    //registration api POST request
    app.post('/register', userController.registration);

    //login api POST request
    app.post('/login', userController.login);
}