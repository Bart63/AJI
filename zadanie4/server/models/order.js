const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = Schema({
  _id: Schema.Types.ObjectId,
  userData: {
      username: String,
      email: String,
      phoneNumber: String
   },
  products: [{ 
      product: { type: Schema.Types.ObjectId, ref: 'Products' },
      quantity: { type: Number, min: 1 },
      totalPrice: { type: Number, min: 0 },
    }],
  totalOrderPrice: { type: Number, min: 0 },
  approvalDate: { type: Date, default: null },
  status: { type: Schema.Types.ObjectId, ref: 'States', default: new ObjectId("6194de4e437bf5950679a6ce") }
});


module.exports = mongoose.model('Orders', ordersSchema, 'orders');