const mongoose = require('mongoose');

const User = mongoose.model(
    'users',
    new mongoose.Schema({
        first_name: String,
        last_name: String,
        email: String,
        password: String,
        date_of_birth: Date,
        telephone: String,
        country: String,
        _created: { type: Date, default: Date.now}
    })
)

const register = (data) => {
    return new Promise((success, fail) => {
        var user = new User(data);
        user.save(err => {
            if(err) {
                return fail(err);
            }
            return success();
        })
    })
}

const login = (email) => {
    return new Promise((success,fail) => {
        User.find({email: email}, (err,data) => {
            if(err) {
                console.log(err);
                return fail(err);
            }
            return success(data[0])
        })
    })
}

module.exports = {
    register,
    login
}