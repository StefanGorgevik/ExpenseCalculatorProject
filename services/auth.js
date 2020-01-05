const express = require('express');
const app = express();

const bodyParser = require('body-parser');

//making the connection with mongoose
const config = require('../config/index')
const DBConnection = require('../db/connection')
var c = config.getConfig("db")
DBConnection.initialize(c);

app.use(bodyParser.json());

const cors = require('cors');
app.use(cors())

//jwt tokens
var jwt = require('express-jwt');
app.use(                                                       
    jwt(
        { secret: config.getConfig('jwt').key }
    )
        .unless(
            { path: ['/app/v1/auth/register', '/app/v1/auth/login'] }
        )
);

//routes
const authHandler = require('../handlers/authHandler')
//const url = '/app/v1/auth/'

app.post('/app/v1/auth/register', authHandler.register)
app.post('/app/v1/auth/login', authHandler.login)

app.listen(8081, (err) => {
    if(err) {
        console.log(err);
        return
    }
    console.log("Auth Server has started successfully on port 8081")
})