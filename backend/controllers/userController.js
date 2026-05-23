const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json(user);
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.profileImage = req.body.profileImage || user.profileImage;
  user.address = req.body.address || user.address;
  if (req.body.password) {
    user.password = req.body.password;
  }
  const updatedUser = await user.save();
  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    profileImage: updatedUser.profileImage,
    role: updatedUser.role,
    isVendorApproved: updatedUser.isVendorApproved,
    address: updatedUser.address,
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

const toggleWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const productId = req.params.productId;
  const alreadyAdded = user.wishlist.includes(productId);
  if (alreadyAdded) {
    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
  } else {
    user.wishlist.push(productId);
  }
  await user.save();
  res.json({ wishlist: user.wishlist });
});

module.exports = { getProfile, updateProfile, getUsers, toggleWishlist };
