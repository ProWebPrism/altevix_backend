const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/uploadMiddleware');

// Configure multer to handle multiple file fields
const multiUpload = upload.fields([
  { name: 'productImage', maxCount: 1 }, // Single product image
  { name: 'blueprintImages', maxCount: 2 }, // Up to 2 blueprint images
  { name: 'customisedSolutionCardsImages', maxCount: 4 }, // Up to 4 images for customised solution cards
]);

// Route to add a new product
router.post('/', multiUpload, productController.addProduct);

// Route to update a product
router.put('/:id', multiUpload, productController.updateProduct);

// Route to delete a product
router.delete('/:id', productController.deleteProduct);

// Route to list all products
router.get('/', productController.listAllProducts);
// Route to get a product by ID
router.get('/:id', productController.getProductById);

module.exports = router;
