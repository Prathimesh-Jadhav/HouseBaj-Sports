const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  image: {
    type: String, // Store image path or URL
    required: true
  },
  badge: {
    type: String,
    default: null
  },
  description: {
    type: String,
    required: true
  },
  productDetailsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductDetails'
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
