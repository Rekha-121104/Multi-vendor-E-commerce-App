const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const Product = require('../models/Product');
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');

const getDashboard = asyncHandler(async (req, res) => {
  const usersCount = await User.countDocuments();
  const vendorsCount = await Vendor.countDocuments();
  const productsCount = await Product.countDocuments();
  const ordersCount = await Order.countDocuments();
  const sales = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, totalSales: { $sum: '$totalAmount' } } },
  ]);
  res.json({ usersCount, vendorsCount, productsCount, ordersCount, totalSales: sales[0]?.totalSales || 0 });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

const getVendors = asyncHandler(async (req, res) => {
  const vendors = await Vendor.find().populate('user', 'name email role isVendorApproved');
  res.json(vendors);
});

const approveVendor = asyncHandler(async (req, res) => {
  const vendor = await Vendor.findById(req.params.id).populate('user');
  if (!vendor) {
    res.status(404);
    throw new Error('Vendor not found');
  }
  vendor.approved = true;
  vendor.user.isVendorApproved = true;
  await vendor.user.save();
  await vendor.save();
  await sendEmail(vendor.user.email, 'Vendor approved', `Hello ${vendor.user.name}, your vendor account is now approved.`);
  res.json(vendor);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  await user.remove();
  res.json({ message: 'User removed' });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().populate('vendor', 'name email');
  res.json(products);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = { getDashboard, getUsers, getVendors, approveVendor, deleteUser, getAllProducts, getAllOrders };
