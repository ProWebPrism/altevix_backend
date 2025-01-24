const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');
const authenticateUser = require('../middlewares/authMiddleware');

const router = express.Router();

// Add to cart
router.post('/add', authenticateUser, addToCart);

// Get cart
router.get('/', authenticateUser, getCart);

// Remove from cart
router.delete('/remove/:productId', authenticateUser, removeFromCart);

module.exports = router;
