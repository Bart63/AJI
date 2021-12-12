const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statesSchema = Schema({
  _id: Schema.Types.ObjectId,
  stateName: String
});

module.exports = mongoose.model('States', statesSchema, 'states');