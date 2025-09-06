const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getCartCount
} = require('../controller/cartController');
const { authenticateToken } = require('../middleware/auth');
const { validateCartItem, validateObjectId } = require('../middleware/validation');

// All cart routes require authentication
router.use(authenticateToken);

// Cart routes
router.get('/', getCart);
router.get('/count', getCartCount);
router.post('/add', validateCartItem, addToCart);
router.put('/item/:productId', validateObjectId('productId'), updateCartItem);
router.delete('/item/:productId', validateObjectId('productId'), removeFromCart);
router.delete('/clear', clearCart);

module.exports = router;
