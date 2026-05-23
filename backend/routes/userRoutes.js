const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const { getProfile, updateProfile, getUsers, toggleWishlist } = require('../controllers/userController');

router.route('/profile').get(protect, getProfile).put(protect, updateProfile);
router.route('/wishlist/:productId').post(protect, toggleWishlist);
router.route('/').get(protect, authorizeRoles('admin'), getUsers);

module.exports = router;
