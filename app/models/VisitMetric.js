import mongoose from 'mongoose';

const VisitMetricSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  ref: {
    type: String,
  },
  ts: {
    type: Date,
    required: true,
  },
  ipHash: {
    type: String,
  },
}, { timestamps: true });

VisitMetricSchema.index({ path: 1 });
VisitMetricSchema.index({ ts: -1 });

export default mongoose.models.VisitMetric || mongoose.model('VisitMetric', VisitMetricSchema);
