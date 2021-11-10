const { getClient }  = require ("../db");
const mongoose = require("mongoose");

/*
const Category = require("../models/category");
const Product = require("../models/product");
*/

exports.getProductsHandler = async (req, res) => {
    const client = await getClient();
    const collection = client.collection('products');

    const products = await collection.find({}).toArray();

    /*
    const collection2 = client.collection('categories');
    const categories = await collection2.find({}).toArray();

    Product.
    Category.insertMany(categories);

    Product.populate('category');
    */

    res.send(products);
}