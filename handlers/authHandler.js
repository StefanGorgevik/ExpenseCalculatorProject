const authModel = require('../models/authModel');
const userValidator = require('../validators/userValidator');
var validator = require("node-input-validator");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../config/index.js');

const register = (req, res) => {
    const newUser = req.body;
    var validate = new validator.Validator(newUser, userValidator.createUser)
    validate.check()
    .then(matched => {
        if(matched) {
            bcrypt.genSalt(10, function(err, salt) {
                if(err) {
                    throw new Error(err);
                    return;
                }
                bcrypt.hash(newUser.password, salt, function(err, hash) {
                    if(err) {
                        throw new Error(err);
                        return;
                    }
                    return authModel.register({...newUser, password: hash})
                })
            })
        } else {
            throw new Error("Validation failed!");
        }
    })
    .then(() => {
        return res.status(201).send("OK");
    })
    .catch(err => {
        console.log(err);
        return res.status(500).send(validate.errors);
    })
}

const login = (req, res) => {
    authModel.login(req.body.email)
    .then((data) => {
        bcrypt.compare(req.body.password, data.password, function(err, result) {
            if(err) {
                return res.status(500).send("Could not compare passwords")
            }
            if(result) {
                var tokenData = {
                    id: data._id,
                    full_name: `${data.first_name} ${data.first_name}`,
                    email: data.email
                }
                var token = jwt.sign(tokenData, config.getConfig('jwt').key)
                return res.status(200).send({jwt: token, first_name: data.first_name, last_name: data.last_name})
            }
            return res.status(400).send('Not found!')
        })
    })
    .catch(err => {
        return res.status(500).send("Could not found user!");
    })
}

module.exports = {
    register,
    login
}