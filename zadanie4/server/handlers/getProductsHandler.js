const { getClient }  = require ("../db");
const mongoose = require("mongoose");


const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");


exports.getProductsHandler = async (req, res) => {
    
    mongoose.connect('mongodb://localhost:27017/zad4DB');

    ProductModel
    .find()
    .populate('category')
    .exec()
    .then(function (products) {
        console.log(products);
       
        res.send(products);
    })
    .catch(function (err) {
        res.send(err);
    });
}