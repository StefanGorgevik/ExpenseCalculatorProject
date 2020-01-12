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
app.use(                                                       //sekoj req ke pomine niz ova i ke vrati req.user
    jwt(
        { secret: config.getConfig('jwt').key }
    )
        .unless(
            { path: ['/app/v1/auth/register', '/app/v1/auth/login'] }
        )
);

//routes
const authHandler = require('../handlers/authHandler')
const url = '/app/v1/auth/'

app.post(url + 'register', authHandler.register)
app.post(url + 'login', authHandler.login)
app.post(url + 'user-info', authHandler.getUserInfo)
app.put(url + 'user-info/:id', authHandler.updateUserInfo)

app.listen(8006, (err) => {
    if(err) {
        console.log(err);
        return
    }
    console.log("Auth Server has started successfully on port 8006")
})