const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/auth');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  addReview,
} = require('../controllers/productController');

router.route('/').get(getProducts).post(protect, authorizeRoles('vendor', 'admin'), createProduct);
router.route('/:id').get(getProductById).put(protect, authorizeRoles('vendor', 'admin'), updateProduct).delete(protect, authorizeRoles('vendor', 'admin'), deleteProduct);
router.route('/:id/reviews').post(protect, addReview);

module.exports = router;
