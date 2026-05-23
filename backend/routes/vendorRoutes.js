const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { getVendorDashboard, getVendors } = require('../controllers/vendorController');

router.route('/dashboard').get(protect, authorizeRoles('vendor'), getVendorDashboard);
router.route('/').get(protect, authorizeRoles('admin'), getVendors);

module.exports = router;
