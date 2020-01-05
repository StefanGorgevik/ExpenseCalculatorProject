const productModel = require('../models/products')

const getAllProducts = (req, res) => {
    let q = {};
    q.userID = req.user.id;
    let sort = {};

    if(req.query.date_from != undefined) {
        if(q.date == undefined){
            q.date = {};
        }
        q.date.$gte = new Date(Number(req.query.date_from));
    }

    if(req.query.date_to != undefined) {
        if(q.date == undefined){
            q.date = {};
        }
        q.date.$lte = new Date(Number(req.query.date_to));
    }

    if(req.query.sort != undefined) {
        let sortable = ['date', 'price'];
        let sq = req.query.sort.split(':');
        if(sortable.indexOf(sq[0]) > -1){
            sort[sq[0]] = sq[1] == 'desc' ? -1 : 1;
        }
    }
    productModel.getAllProducts(q, sort)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        })
}

const getOne = (req, res) => {
    productModel.getOne(req.params.id, req.user.id)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
}

const saveProduct = (req, res) => {
    const newProduct = req.body;
    let errors = 0;
    if (newProduct.name == undefined || newProduct.name.length == 0) { errors++ };
    if (newProduct.type == undefined || newProduct.type.length == 0) { errors++ };
    if (newProduct.description == undefined || newProduct.description.length == 0) { errors++ };
    if (newProduct.date == undefined || newProduct.date.length == 0) { errors++ };
    if (newProduct.price == undefined || newProduct.price.length == 0) { errors++ };
    if (errors == 0) {
        productModel.saveProduct({...newProduct, userID: req.user.id})
            .then(() => {
                res.status(201).send("Created");
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    } else {
        res.status(400).send("Bad Request!");
    }
}

const replaceProduct = (req, res) => {
    const newProduct = req.body;
    let errors = 0;
    if (newProduct.name == undefined || newProduct.name.length == 0) { errors++ };
    if (newProduct.type == undefined || newProduct.type.length == 0) { errors++ };
    if (newProduct.description == undefined || newProduct.description.length == 0) { errors++ };
    if (newProduct.date == undefined || newProduct.date.length == 0) { errors++ };
    if (newProduct.price == undefined || newProduct.price.length == 0) { errors++ };
    if (errors == 0) {
        productModel.replaceProduct(req.params.id, newProduct)
            .then(() => {
                res.status(204).send("Product replaced");
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    } else {
        res.status(400).send("Bad Request!");
    }
}

const updateProduct = (req, res) => {
    var newProduct = req.body;
    productModel.replaceProduct(req.params.id, newProduct)
        .then(() => {
            res.status(201).send('Item updated!');
        })
        .catch((err) => {
            res.status(500).send(err)
        })
}

const deleteProduct = (req, res) => {
    productModel.deleteProduct(req.params.id)
    .then(() => {
        res.status(204).send("Item deleted");
    })
    .catch((err) => {
        res.status(500).send(err);
    })
}

module.exports = {
    getAllProducts,
    getOne,
    saveProduct,
    replaceProduct,
    updateProduct,
    deleteProduct
}