const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = Schema({
  _id: Schema.Types.ObjectId,
  productName: String,
  description: String,
  category: { type: Schema.Types.ObjectId, ref: 'Categories' },
  price: { type: Number, min: 0 },
  weight: { type: Number, min: 0 }
});

module.exports = mongoose.model('Products', productsSchema, 'products');