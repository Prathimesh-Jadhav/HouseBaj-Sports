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
  images: {
    type: [String], // Array of image URLs or paths
    required: true
  },
  colors: {
    type: [String],
    default: []
  },
  sizes: {
    type: [String],
    default: []
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  specifications: {
    type: Map,
    of: String,
    default: {}
  }
}, { timestamps: true });

const ProductDetails = mongoose.model('ProductDetails', productSchema);

module.exports = ProductDetails;
