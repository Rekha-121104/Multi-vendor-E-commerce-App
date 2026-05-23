const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  getVendorOrders,
} = require('../controllers/orderController');

router.route('/').post(protect, createOrder).get(protect, authorizeRoles('admin'), getAllOrders);
router.route('/my-orders').get(protect, getUserOrders);
router.route('/vendor').get(protect, authorizeRoles('vendor'), getVendorOrders);
router.route('/:id').get(protect, getOrderById).put(protect, authorizeRoles('admin', 'vendor'), updateOrderStatus);

module.exports = router;
