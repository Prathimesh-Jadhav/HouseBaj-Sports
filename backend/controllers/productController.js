const Product = require('../models/productsModel');
const ProductDetails = require('../models/productDetails');

// Convert null-prototype objects into plain ones for Mongoose compatibility
const toPlainObject = (obj) => JSON.parse(JSON.stringify(obj));

const createProduct = async (req, res) => {
  try {
    console.log('Received req.body:', req.body);
    console.log('Received files:', req.files);

    const imagePaths = req.files.map(file => file.path);

    const {
      name,
      price,
      category,
      brand,
      colors,
      sizes,
      rating,
      reviews,
      stock,
      description,
      features,
      specifications,
      badge
    } = req.body;

    // Safe parsing helper
    const parseMaybeJSON = (value, fallback) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value);
        } catch {
          return fallback;
        }
      }
      return value ?? fallback;
    };

    const parsedColors = parseMaybeJSON(colors, []);
    const parsedSizes = parseMaybeJSON(sizes, []);
    const parsedFeatures = parseMaybeJSON(features, []);
    const parsedSpecifications = parseMaybeJSON(specifications, {});

    // 1. Save full product details
    const productDetails = new ProductDetails({
      name,
      price,
      category,
      brand,
      images: imagePaths,
      colors: parsedColors,
      sizes: parsedSizes,
      rating: parseFloat(rating),
      reviews: parseInt(reviews),
      stock: parseInt(stock),
      description,
      features: parsedFeatures,
      specifications: toPlainObject(parsedSpecifications) // 👈 Fixed here
    });

    const savedDetails = await productDetails.save();

    // 2. Save summary product
    const product = new Product({
      name,
      price,
      category,
      brand,
      image: imagePaths[0],
      badge,
      description,
      productDetailsId: savedDetails._id
    });

    const savedProduct = await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: savedProduct,
      productDetails: savedDetails
    });

  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET all products (basic summary)
const getAllProducts = async (req, res) => {
    console.log('Fetching all products...');
    try {
      const products = await Product.find().populate('productDetailsId', '_id'); // Optional: minimal population
      console.log('Fetched products:', products); 
      res.status(200).json({data:products});
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // GET full product details by Product ID
  const getProductDetailsById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const product = await Product.findById(id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
  
      const productDetails = await ProductDetails.findById(product.productDetailsId);
      if (!productDetails) return res.status(404).json({ error: 'Product details not found' });
  
      res.status(200).json({ product, productDetails });
    } catch (error) {
      console.error('Error fetching product details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = { createProduct, getAllProducts, getProductDetailsById };
