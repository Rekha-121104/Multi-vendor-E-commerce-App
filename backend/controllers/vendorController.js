const asyncHandler = require('express-async-handler');
const Vendor = require('../models/Vendor');
const User = require('../models/User');
const Product = require('../models/Product');

const getVendorDashboard = asyncHandler(async (req, res) => {
  const vendorProfile = await Vendor.findOne({ user: req.user._id }).populate('user', 'name email');
  const products = await Product.find({ vendor: req.user._id });
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const earnings = vendorProfile?.earnings || 0;
  res.json({ vendorProfile, totalProducts, totalStock, earnings, products });
});

const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find().populate('user', 'name email role isVendorApproved');
  res.json(vendors);
});

module.exports = { getVendorDashboard, getVendors };
