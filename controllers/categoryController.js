const Category = require('../models/Category');

// Add a new category
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required.' });
    }

    const category = new Category({
      name,
      image: req.file.path, // Save the file path to the image field
    });

    await category.save();
    res.status(201).json({ message: 'Category added successfully.', category });
  } catch (error) {
    res.status(500).json({ message: 'Error adding category.', error: error.message });
  }
};

// Update an existing category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    // Update fields
    if (name) category.name = name;
    if (req.file) category.image = req.file.path; // Update image if a new one is uploaded

    await category.save();
    res.status(200).json({ message: 'Category updated successfully.', category });
  } catch (error) {
    res.status(500).json({ message: 'Error updating category.', error: error.message });
  }
};

// Delete a category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category.', error: error.message });
  }
};

  const getSingleCategory = async (req, res) => {
    try {
      const { id } = req.params;
  
      const category = await Category.findById(id);
      if (!category) {
        return res.status(404).json({ message: 'Category not found.' });
      }
  
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching category.', error: error.message });
    }
  };
  const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching categories.', error: error.message });
    }
  };

module.exports = {
  addCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory,
  getAllCategories
};
