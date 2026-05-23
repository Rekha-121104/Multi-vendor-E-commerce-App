const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalAmount, paymentResult } = req.body;
  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = new Order({
    user: req.user._id,
    orderItems: orderItems.map((item) => ({
      product: item.product,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      vendor: item.vendor,
    })),
    shippingAddress,
    paymentMethod,
    totalAmount,
    paymentStatus: paymentResult ? 'paid' : 'pending',
    paymentResult: paymentResult || {},
  });

  const createdOrder = await order.save();

  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (product) {
      product.stock = Math.max(product.stock - item.quantity, 0);
      await product.save();
    }
    if (item.vendor) {
      const vendor = await Vendor.findOne({ user: item.vendor });
      if (vendor) {
        vendor.earnings += item.price * item.quantity;
        vendor.totalSales += item.quantity;
        await vendor.save();
      }
    }
  }

  res.status(201).json(createdOrder);
});

const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  if (req.user.role !== 'admin' && order.user._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized');
  }
  res.json(order);
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  order.orderStatus = req.body.orderStatus || order.orderStatus;
  if (req.body.orderStatus === 'delivered') {
    order.deliveredAt = Date.now();
  }
  const updatedOrder = await order.save();
  res.json(updatedOrder);
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

const getVendorOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ 'orderItems.vendor': req.user._id });
  res.json(orders);
});

module.exports = { createOrder, getUserOrders, getOrderById, updateOrderStatus, getAllOrders, getVendorOrders };
