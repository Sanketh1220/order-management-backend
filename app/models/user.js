/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Describing the schema for database.
 *
 * @description
 *
 * @file        : models/user.js
 * @overview    : Provides schema for database and performs mongoose CRUD operations
 * @module      : this is necessary to perform CRUD operations, login and store the data
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : 1.0.0
 * @since       : 20-03-2022
 *********************************************************************/

const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{2,30}$/,
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z]{2,30}$/,
    },
    email: {
        type: String,
        required: true,
        validate: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    // generates the time stamp the data is been added
    timestamps: true,
    versionKey: false
})

UserInfoSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (error, hash) {
            if (error) return next(error);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserInfoSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//created constant variable to assign schema
const UserInfoModel = mongoose.model('UserInfo', UserInfoSchema);

module.exports = mongoose.model('UserInfo', UserInfoSchema)

//created a class to write functions
class UserModel {

    /**
     * @description function written to create user data into database 
     * @param {*} A valid userData is expected
     * @param {*} callBack 
     */
    async createInfo(userData) {
        try {
            const user = new UserInfoModel({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password
            });
            
            const userSaved = await user.save({});
            sendEmail.sendRegistrationEmail(userData);
            return userSaved;
        } catch (error) {
            return error;
        }
    }

    /**
     * @description checks if user is present and generates JWT token
     * @param {*} A valid userData is expected
     * @param {*} callBack 
     */
    async loginUser(userData) {
        try {
            const loginUser = await UserInfoModel.findOne({'email': userData.email});
            if(!loginUser) {
                return "This user doesn't exist! Please register.";
            }else {
            return loginUser;
            }
        } catch (error) {
            return error;
        }
    }
}

//exporting the class to utilize or call function created in this class
module.exports = new UserModel();