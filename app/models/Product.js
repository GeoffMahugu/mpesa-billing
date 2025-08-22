import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

ProductSchema.index({ price: 1 });
ProductSchema.index({ active: 1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
