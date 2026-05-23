const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const {
  getDashboard,
  getUsers,
  getVendors,
  approveVendor,
  deleteUser,
  getAllProducts,
  getAllOrders,
} = require('../controllers/adminController');

router.use(protect, authorizeRoles('admin'));
router.route('/dashboard').get(getDashboard);
router.route('/users').get(getUsers);
router.route('/vendors').get(getVendors);
router.route('/vendors/:id/approve').put(approveVendor);
router.route('/users/:id').delete(deleteUser);
router.route('/products').get(getAllProducts);
router.route('/orders').get(getAllOrders);

module.exports = router;
