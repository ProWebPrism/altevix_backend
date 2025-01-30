const Cart = require('../models/Cart'); // Import the Cart model
const Product = require('../models/Product'); // Import the Product model

// Add a product to the cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user; // Extracted from the JWT in the middleware

    // Find the cart and populate only the product name for items
    const cart = await Cart.findOne({ userId }).populate('items.productId', 'name productImage');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user; // Extracted from the JWT in the middleware
    const { productId, quantity } = req.body;

    // Validate product existence
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the cart exists for the user
    let cart = await Cart.findOne({ userId });
    if (cart) {
      // If the cart exists, update it
      const productIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (productIndex >= 0) {
        // If product exists in the cart, update the quantity
        cart.items[productIndex].quantity += quantity;
      } else {
        // If product does not exist, add it to the cart
        cart.items.push({
          productId,
          name: product.name, // Add the product name from the Product model
          quantity,
        });
      }
    } else {
      // Create a new cart if none exists
      cart = new Cart({
        userId,
        items: [{
          productId,
          name: product.name, // Add the product name from the Product model
          quantity,
        }],
      });
    }

    // Save the cart
    await cart.save();

    res.status(200).json({ message: 'Product added to cart successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};


// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user; // Extracted from the JWT in the middleware
    const { productId } = req.params;
    console.log(productId);
    

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    

    // Remove the product from the cart
    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();

    res.status(200).json({ message: 'Product removed from cart successfully', cart });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
