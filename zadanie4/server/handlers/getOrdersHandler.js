const { getClient } = require("../db");
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;

const OrderModel = require("../models/order");

exports.getOrdersHandler = async (req, res) => {
    mongoose.connect('mongodb://localhost:27017/zad4DB');
    
    OrderModel
        .find({})
        .populate('status')
        .populate('products.product')
        .populate('products.product.category')
        .exec()
        .then(function (orders) {
            res.send(orders);
        })
        .catch(function (err) {
            res.send(err);
            return;
        });
}