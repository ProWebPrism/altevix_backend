const Product = require('../models/Product');

// Add a new product
exports.addProduct = async (req, res) => {

    try {
        // Destructure body fields
        const { name, category, description, advantages, applications, technicalFeatures, customisedSolutionCards } = req.body;

        // Handle file uploads
        const productImage = req.files?.productImage?.[0]?.path || null;
        const blueprintImages = req.files?.blueprintImages?.map((file) => file.path) || [];
        const customisedSolutionCardsImages = req.files?.customisedSolutionCardsImages?.map((file) => file.path) || [];

        // Parse JSON fields from req.body (make sure to handle empty strings or invalid JSON)
        const parsedAdvantages = advantages ? JSON.parse(advantages) : [];
        const parsedApplications = applications ? JSON.parse(applications) : [];
        const parsedTechnicalFeatures = technicalFeatures
            ? JSON.parse(technicalFeatures).map((tf) => ({
                title: tf.title,
                features: Array.isArray(tf.feature) ? tf.feature : [tf.feature], // Ensure 'features' is an array
            }))
            : [];

        const parsedSolutionCards = customisedSolutionCards ? JSON.parse(customisedSolutionCards) : [];
        console.log('Parsed Technical Features:', parsedTechnicalFeatures); 

        // Attach images to solution cards, if any
        const solutionCardsWithImages = parsedSolutionCards.map((card, index) => ({
            ...card,
            image: customisedSolutionCardsImages[index] || null,  // Assign image if available
        }));

        // Create the new product object
        const product = new Product({
            name,
            category,
            description,
            advantages: parsedAdvantages,
            productImage,
            blueprintImages,
            applications: parsedApplications,
            technicalFeatures: parsedTechnicalFeatures,
            customisedSolutionCards: solutionCardsWithImages,
        });

        // Save the product to the database
        await product.save();

        // Respond with a success message
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        // Handle errors if any
        console.error('Error adding product:', error);
        res.status(400).json({ message: 'Error adding product', error: error.message });
    }
};



// Update a product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    
    try {
      const existingProduct = await Product.findById(id);
  
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Destructure and process the body fields
      const { name, category, description, advantages, applications, technicalFeatures, customisedSolutionCards } = req.body;
  
      // Handle file uploads
      const productImage = req.files?.productImage?.[0]?.path || existingProduct.productImage;
      const blueprintImages = req.files?.blueprintImages?.map((file) => file.path) || existingProduct.blueprintImages;
      const customisedSolutionCardsImages = req.files?.customisedSolutionCardsImages?.map((file) => file.path) || [];
  
      // Parse JSON fields from req.body (ensure to handle empty or invalid JSON)
      const parsedAdvantages = advantages ? JSON.parse(advantages) : existingProduct.advantages;
      const parsedApplications = applications ? JSON.parse(applications) : existingProduct.applications;
      const parsedTechnicalFeatures = technicalFeatures
        ? JSON.parse(technicalFeatures).map((tf) => ({
            title: tf.title,
            features: Array.isArray(tf.feature) ? tf.feature : [tf.feature], // Ensure 'features' is an array
        }))
        : existingProduct.technicalFeatures;
  
      const parsedSolutionCards = customisedSolutionCards ? JSON.parse(customisedSolutionCards) : existingProduct.customisedSolutionCards;
  
      // Attach images to solution cards, if any
      const solutionCardsWithImages = parsedSolutionCards.map((card, index) => ({
        ...card,
        image: customisedSolutionCardsImages[index] || card.image || null, // Assign image if available
      }));
  
      // Prepare the update object
      const updates = {
        name,
        category,
        description,
        advantages: parsedAdvantages,
        productImage,
        blueprintImages,
        applications: parsedApplications,
        technicalFeatures: parsedTechnicalFeatures,
        customisedSolutionCards: solutionCardsWithImages,
      };
  
      // Update product
      const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });
  
      // Respond with the updated product
      res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
      // Handle errors
      console.error('Error updating product:', error);
      res.status(400).json({ message: 'Error updating product', error: error.message });
    }
  };
  

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting product', error: error.message });
  }
};
exports.listAllProducts = async (req, res) => {
    try {
      const products = await Product.find(); // Fetch all products from the database
      res.status(200).json({
        message: 'Products retrieved successfully',
        products,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Error retrieving products',
        error: error.message,
      });
    }
  };
  // Get a product by ID
exports.getProductById = async (req, res) => {
    const { id } = req.params; // Get the product ID from the URL parameter
    try {
      const product = await Product.findById(id); // Find product by ID in the database
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' }); // Handle case when product is not found
      }
  
      res.status(200).json({
        message: 'Product retrieved successfully',
        product,
      });
    } catch (error) {
      res.status(400).json({
        message: 'Error retrieving product',
        error: error.message,
      });
    }
  };
  

