const { getClient }  = require ("../db");
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectId;

const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
const OrderModel = require("../models/order");


exports.getOrdersWithStateHandler = async (req, res) => {
    
    mongoose.connect('mongodb://localhost:27017/zad4DB');

    const { stateId } = req.params;


    OrderModel
    .find( {status: stateId} )
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