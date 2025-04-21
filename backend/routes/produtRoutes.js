const express = require('express');
const router = express.Router();
const upload = require('../services/fileUpload');
const { createProduct, getAllProducts, getProductDetailsById } = require('../controllers/productController');

// Route to create a new product with details + images
router.post('/addProduct', upload.array('images', 4), createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProductDetails/:id', getProductDetailsById);

module.exports = router;


