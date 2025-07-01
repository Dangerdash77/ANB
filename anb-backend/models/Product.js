const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  size: String,
  color: String,
  material: String,
  stdPacking: String,
  minQty: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model('Product', productSchema);
