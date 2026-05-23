const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    image: { type: String },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    shippingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    totalAmount: { type: Number, required: true, default: 0 },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
