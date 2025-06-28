const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  minQuantity: Number,
  imageUrl: String,
  color: String,
  size: String,
  material: String,
  packing: String,
});

module.exports = mongoose.model('Product', productSchema);



//temp