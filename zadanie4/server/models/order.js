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
      quantity: String,
      totalPrice: String
    }],
  totalOrderPrice: String
});


module.exports = mongoose.model('Orders', ordersSchema, 'orders');