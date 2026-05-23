const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shopName: { type: String, required: true },
    ownerName: { type: String, required: true },
    description: { type: String },
    address: { type: String },
    approved: { type: Boolean, default: false },
    earnings: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vendor', vendorSchema);
