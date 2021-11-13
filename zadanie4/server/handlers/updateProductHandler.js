const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");


const ProductModel = require("../models/product");

exports.updateProductHandler = async(req, res) => {
    
    mongoose.connect('mongodb://localhost:27017/zad4DB');

    res.set('Content-Type', 'application/json')

    const id = req.body['_id'];
    const pName = req.body['productName'];
    const pDescription = req.body['description'];
    const pCategory = req.body['category'];
    const pPrice = req.body['price'];
    const pWeight = req.body['weight'];

    if (pName === "") {
        res.status(400).send({ errors: 'Product name can not be empty', status: 400 });
        return;
    }

    if (pCategory === "") {
        res.status(400).send({ errors: 'Product category can not be empty', status: 400 });
        return;
    }

    var re = new RegExp('^[0-9]+\,[0-9]{2}$');
    if (!re.test(pPrice)) {
        res.status(400).send({ errors: 'Product price is invalid', status: 400 });
        return;
    }

    if (!re.test(pWeight)) {
        res.status(400).send({ errors: 'Product weight is invalid', status: 400 });
        return;
    }
    
    const newProduct = new ProductModel({
        _id: new ObjectId,
        productName: pName,
        category: pCategory,
        price: pPrice,
        weight: pWeight})

        console.log(newProduct);

    ProductModel
    .findOneAndUpdate({_id: id}, {$set: {productName: newProduct.productName,
         category: newProduct.category, description: newProduct.description, price: newProduct.price,
        weight: newProduct.weight}})
    .then(function (product) {
        console.log(product);
        
        res.status(200).send( { response: 'OK', status: 200 } );
    })
    .catch(function (err) {
        res.status(400).send({ errors: 'Unable to save product' + err, status: 400 });;
    });

}