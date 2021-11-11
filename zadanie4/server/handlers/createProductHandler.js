const { getClient } = require("../db");
const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");


const ProductModel = require("../models/product");

exports.createProductHandler = async(req, res) => {
    
    mongoose.connect('mongodb://localhost:27017/zad4DB');

    res.set('Content-Type', 'application/json')

    const pName = req.body['productName'];
    const pCategory = req.body['category'];
    const pPrice = req.body['price'];
    const pWeight = req.body['weight'];

    if (pName === "") {
        res.status(400).send({ errors: 'Product name can not be empty', status: 400 });
    }

    if (pCategory === "") {
        res.status(400).send({ errors: 'Product category can not be empty', status: 400 });
    }

    var re = new RegExp('^[0-9]+(\.[0-9]{1,2})?$');
    if (!re.test(pPrice)) {
        res.status(400).send({ errors: 'Product price is invalid', status: 400 });
    }

    if (!re.test(pWeight)) {
        res.status(400).send({ errors: 'Product weight is invalid', status: 400 });
    }
    
    const newProduct = new ProductModel({
        _id: new ObjectId,
        productName: pName,
        category: mongoose.Types.ObjectId(pCategory),
        price: pPrice,
        weight: pWeight})

    newProduct
    .save()
    .then(function (product) {
        console.log(product);
        
        res.status(200).send( { response: 'OK', status: 200 } );
    })
    .catch(function (err) {
        res.status(400).send({ errors: 'Unable to save product' + err, status: 400 });;
    });

}
