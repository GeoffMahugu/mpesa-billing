import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  provider: {
    type: String,
    enum: ['mpesa'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',
  },
  merchantRequestID: {
    type: String,
  },
  checkoutRequestID: {
    type: String,
    unique: true,
  },
  mpesaReceiptNumber: {
    type: String,
  },
  resultCode: {
    type: String,
  },
  resultDesc: {
    type: String,
  },
  rawCallback: {
    type: Object,
  },
}, { timestamps: true });

TransactionSchema.index({ checkoutRequestID: 1 }, { unique: true });
TransactionSchema.index({ orderId: 1 });
TransactionSchema.index({ status: 1 });
TransactionSchema.index({ createdAt: -1 });

export default mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);
