const express = require('express');
const configureApp = require("./config");
const setApis = require('./api');
const { urlencoded } = require("express");
const cors=require('cors');
const bodyParser=require('body-parser');


const app = function () {

    // mounting .env file to configure application wide variable like port,secreate key
    configureApp();

    // initialize and configure express to take form data
    const server = express();
    server.use(cors());
    server.use(bodyParser.json());
    server.use(urlencoded({ extended: true }));

    // defining all the api endpoints (urls) to access services
    setApis(server);

    server.listen(process.env.PORT, () => {
        console.log("server started at port " + process.env.PORT + "\n http://localhost:" + process.env.PORT + "/")
    });
}

app();