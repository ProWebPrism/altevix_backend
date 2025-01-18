const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware'); // Import multer middleware
const { createOrUpdatePageUpdate, getPageUpdate } = require('../controllers/productPageController');

// Define the multer fields for file uploads
const uploadMiddleware = upload.fields([
  { name: 'bannerImage', maxCount: 1 },  // Banner image
  { name: 'sliderCards', maxCount: 6 },  // Maximum 6 slider cards
  { name: 'cardSection', maxCount: 4 },  // Maximum 4 cards in the card section
  { name: 'complimentaryCards', maxCount: 2 }, // Maximum 2 cards in the complimentary cards section
]);

// Get the single page update document
router.get('/', getPageUpdate);

// Create or update the page update document
router.post('/', uploadMiddleware, createOrUpdatePageUpdate);


module.exports = router;
