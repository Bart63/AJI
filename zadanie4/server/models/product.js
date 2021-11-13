const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = Schema({
  _id: Schema.Types.ObjectId,
  productName: String,
  description: String,
  category: { type: Schema.Types.ObjectId, ref: 'Categories' },
  price: Number,
  weight: Number
});


module.exports = mongoose.model('Products', productsSchema, 'products');
