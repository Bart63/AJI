const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = Schema({
  _id: Schema.Types.ObjectId,
  productName: String,
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  price: String,
  weight: String
});


module.exports = mongoose.model('Product', productsSchema);
