const ObjectId = require('mongodb').ObjectId;
const mongoose = require("mongoose");


const OrderModel = require("../models/order");
const StateModel = require("../models/state");

exports.updateOrderStateHandler = async (req, res) => {
    mongoose.connect('mongodb://localhost:27017/zad4DB');
    res.set('Content-Type', 'application/json')

    const id = req.body['_id'];
    const status = req.body['status'];

    var o = await OrderModel
    .find({ _id: id })
    .populate('status')
    .exec()
    .then(function (orders) {
        
        return orders[0];
        
    })

    if (o.status.stateName != 'ZATWIERDZONE')
    {
        res.status(400).send({ errors: 'Nie można zmienić statusu zamówienia', status: 400 });
        return;
    }
    

    var s = await StateModel
    .find({ _id: status })
    .exec()
    .then(function (states) {
        
        return states[0];
        
    })

    if (s.stateName == 'NIEZATWIERDZONE')
    {
        
        res.status(400).send({ errors: 'Nie można zmienić statusu zamówienia', status: 400 });
        return;
    }


    OrderModel
        .findOneAndUpdate({ _id: id }, {
            $set: {
                status: status
            }
        })
        .then(function (product) {
            console.log(product);

            res.status(200).send({ response: 'OK', status: 200 });
        })
        .catch(function (err) {
            res.status(400).send({ errors: 'Unable to update order' + err, status: 400 });
        });
}