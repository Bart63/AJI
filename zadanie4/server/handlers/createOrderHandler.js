const { getClient } = require("../db");
const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");


const OrderModel = require("../models/order");

exports.createOrderHandler = async(req, res) => {
    
    mongoose.connect('mongodb://localhost:27017/zad4DB');

    res.set('Content-Type', 'application/json')

    const userData = req.body['userData'];
    const products = req.body['products'];
    const totalOrderPrice = req.body['totalOrderPrice'];
    

    const newProduct = new OrderModel({
        _id: new ObjectId,
        userData: userData,
        products: products,
        totalOrderPrice: totalOrderPrice,
        approvalDate: Date.now()
        })

    newProduct
    .save()
    .then(function (product) {
        console.log(product);
        
        res.status(200).send( { response: 'OK', status: 200 } );
    })
    .catch(function (err) {
        res.status(400).send({ errors: 'Unable to save order' + err, status: 400 });;
    });

}