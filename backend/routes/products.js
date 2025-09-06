const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
  getCategories,
  getFeaturedProducts,
  searchProducts
} = require('../controller/productController');
const { authenticateToken, requireAdmin, optionalAuth } = require('../middleware/auth');
const {
  validateProduct,
  validateProductUpdate,
  validateReview,
  validatePagination,
  validateObjectId
} = require('../middleware/validation');

// Public routes
router.get('/', validatePagination, optionalAuth, getProducts);
router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);
router.get('/categories', getCategories);
router.get('/:id', validateObjectId('id'), optionalAuth, getProduct);

// Protected routes
router.post('/:id/reviews', authenticateToken, validateReview, addReview);

// Admin routes
router.post('/', authenticateToken, requireAdmin, validateProduct, createProduct);
router.put('/:id', authenticateToken, requireAdmin, validateObjectId('id'), validateProductUpdate, updateProduct);
router.delete('/:id', authenticateToken, requireAdmin, validateObjectId('id'), deleteProduct);

module.exports = router;
