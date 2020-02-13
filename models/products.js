const mongoose = require('mongoose');

const Product = mongoose.model(
    'product', new mongoose.Schema({
        name: String,
        type: String,
        description: String,
        date: Date,
        price: Number, 
        userID: String,
        _created: Date,
        _modified: Date
    })
)

const getAllProducts = (q, sort) => {
    return new Promise((success, fail) => {
        Product.find(q, {}, {sort: sort}, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    })
}

const getOne = (id, userID) => {
    return new Promise((success, fail) => {
        Product.find({ _id: id, userID: userID }, (err, data) => {
            if (err) {
                return fail(err);
            }
            return success(data)
        })
    })
}

const saveProduct = (data) => {
    return new Promise((success, fail) => {
        var newProduct = new Product(data);
        newProduct.save(data, err => {
            if (err) {
                return fail(err);
            }
            return success(data);
        })
    })
}

const replaceProduct = (id, data) => {
    return new Promise((success, fail) => {
        Product.updateOne({ _id: id }, data, err => {
            if (err) {
                return fail(err)
            }
            return success(data)
        })
    })
}


const deleteProduct = (id) => {
    return new Promise((success,fail) => {
        Product.deleteOne({_id: id}, err => {
            if(err) {
                return fail(err);
            }
            return success();
        })
    })
}
const deleteAll = (userid) => {
    return new Promise((success,fail) => {
        Product.deleteMany({userID: userid}, err => {
            if(err) {
                return fail(err);
            }
            return success();
        })
    })
}

module.exports = {
    getAllProducts,
    getOne,
    saveProduct,
    replaceProduct,
    deleteProduct,
    deleteAll
}