import mongoose from 'mongoose';

const BusinessAccountSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  tillOrPaybill: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  mpesa: {
    shortcode: String,
    passkey: String,
    environment: {
      type: String,
      enum: ['sandbox', 'production'],
    },
    callbackUrl: String,
  },
}, { timestamps: true });

export default mongoose.models.BusinessAccount || mongoose.model('BusinessAccount', BusinessAccountSchema);
