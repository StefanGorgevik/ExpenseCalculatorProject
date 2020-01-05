const express =require("express");
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//making the connection with mongoose
const config = require('../config/index')
const DBConnection = require('../db/connection')
var c = config.getConfig("db")
DBConnection.initialize(c);

//handler
const productHandler = require('../handlers/products')

const cors = require('cors');
app.use(cors())

//jwt tokens
var jwt = require('express-jwt');
app.use(                                                       //sekoj req ke pomine niz ova i ke vrati req.user
    jwt(
        { secret: config.getConfig('jwt').key }
    )
);

//routes and methods
//const url = '/app/v1/products/'
app.get('/app/v1/products', productHandler.getAllProducts);
app.get('/app/v1/products/:id', productHandler.getOne);
app.post('/app/v1/products', productHandler.saveProduct);
app.put('/app/v1/products/:id', productHandler.replaceProduct);
app.patch('/app/v1/products/:id', productHandler.updateProduct);
app.delete('/app/v1/products/:id', productHandler.deleteProduct);

app.listen(8080, (err) => {
    if(err) {
        console.log(err)
        return
    }
    console.log("Products Server has started successfully on port 8080");
})