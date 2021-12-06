const { getClient } = require("../db");
const mongoose = require("mongoose");


const StateModel = require("../models/state");

exports.getOrdersStatesHandler = async (req, res) => {
    mongoose.connect('mongodb://localhost:27017/zad4DB');

    StateModel
        .find()
        .exec()
        .then(function (states) {


            res.send(states);
        })
        .catch(function (err) {
            res.send(err);
        });
}