const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, shopName, ownerName, address, description } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password, role: role || 'customer', address });
  if (!user) {
    res.status(400);
    throw new Error('Invalid user data');
  }

  if (role === 'vendor') {
    user.isVendorApproved = true;
    await user.save();
    await Vendor.create({ user: user._id, shopName, ownerName, address, description, approved: true });
    await sendEmail(user.email, 'Vendor approved', `Hi ${user.name}, your vendor account is approved and ready to use.`);
  }

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVendorApproved: user.isVendorApproved,
    token: generateToken(user._id),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    isVendorApproved: user.isVendorApproved,
    token: generateToken(user._id),
  });
});

module.exports = { registerUser, loginUser };
