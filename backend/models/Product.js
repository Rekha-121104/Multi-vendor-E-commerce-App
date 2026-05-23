const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    images: [{ type: String }],
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
