const express = require('express');
const upload = require('../middlewares/uploadMiddleware'); // Path to the multer config
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory
} = require('../controllers/categoryController');

const router = express.Router();

// Route to add a new category
router.post('/', upload.single('image'), addCategory);

// Route to update an existing category
router.put('/:id', upload.single('image'), updateCategory);

// Route to delete a category
router.delete('/:id', deleteCategory);
router.get('/', getAllCategories)
router.get('/:id', getSingleCategory)

module.exports = router;
