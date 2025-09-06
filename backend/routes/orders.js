const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
  getOrderStats
} = require('../controller/orderController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateOrder, validatePagination, validateObjectId } = require('../middleware/validation');

// Protected routes
router.use(authenticateToken);

// User order routes
router.post('/', validateOrder, createOrder);
router.get('/my-orders', validatePagination, getMyOrders);
router.get('/:id', validateObjectId('id'), getOrder);
router.put('/:id/cancel', validateObjectId('id'), cancelOrder);

// Admin routes
router.get('/admin/all', requireAdmin, validatePagination, getAllOrders);
router.put('/admin/:id/status', requireAdmin, validateObjectId('id'), updateOrderStatus);
router.get('/admin/stats', requireAdmin, getOrderStats);

module.exports = router;
