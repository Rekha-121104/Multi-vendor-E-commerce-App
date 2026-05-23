const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, category, stock, images } = req.body;
  const product = new Product({
    title,
    description,
    price,
    category,
    stock,
    images,
    vendor: req.user._id,
  });
  const created = await product.save();
  res.status(201).json(created);
});

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 12;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.search
    ? { title: { $regex: req.query.search, $options: 'i' } }
    : {};
  const category = req.query.category ? { category: req.query.category } : {};
  const price = req.query.minPrice || req.query.maxPrice
    ? {
        price: {
          $gte: Number(req.query.minPrice) || 0,
          $lte: Number(req.query.maxPrice) || Number.MAX_SAFE_INTEGER,
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword, ...category, ...price });
  const products = await Product.find({ ...keyword, ...category, ...price })
    .populate('vendor', 'name email')
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), count });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('vendor', 'name email');
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  if (req.user.role !== 'admin' && product.vendor.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to update this product');
  }

  const { title, description, price, category, stock, images } = req.body;
  product.title = title || product.title;
  product.description = description || product.description;
  product.price = price || product.price;
  product.category = category || product.category;
  product.stock = stock !== undefined ? stock : product.stock;
  product.images = images || product.images;

  const updated = await product.save();
  res.json(updated);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  if (req.user.role !== 'admin' && product.vendor.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Not authorized to delete this product');
  }
  await product.remove();
  res.json({ message: 'Product removed' });
});

const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
  if (alreadyReviewed) {
    res.status(400);
    throw new Error('Product already reviewed');
  }

  const review = { name: req.user.name, rating: Number(rating), comment, user: req.user._id };
  product.reviews.push(review);
  product.totalReviews = product.reviews.length;
  product.averageRating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
  await product.save();
  res.status(201).json({ message: 'Review added' });
});

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct, addReview };
