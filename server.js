/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : Starting point for the project
 *
 * @description
 *
 * @file        : server.js
 * @overview    : Set up the server, connect to database
 * @module      : this is necessary to run the order management app API
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : _ _ _
 * @since       : 20-03-2022
 *********************************************************************/

require('dotenv').config();
const express = require('express');
const databaseConnection = require('./config/dbConfig');
const app = express();
const cors = require('cors');

app.use(cors());

databaseConnection();

//parsing the requests from user
app.use(express.urlencoded({
    extended: true
}));

//parse the request from user
app.use(express.json());

require('./app/routes/routes')(app);

//defining a simple root statement
app.get('/', (req, res) => {
    res.send("<h1>Hey Guys! Welcome to Order Management Backend!</h1>");
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET , PUT , POST , DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
    next(); // Important
})

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})

//declaring a port number for server to run
app.listen(process.env.PORT, ()=>{
    console.log("Info", "Server is up and running!");
})

module.exports = app;