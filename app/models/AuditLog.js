import mongoose from 'mongoose';

const AuditLogSchema = new mongoose.Schema({
  actorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  actorRole: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  target: {
    type: String,
  },
  meta: {
    type: Object,
  },
  ip: {
    type: String,
  },
  userAgent: {
    type: String,
  },
}, { timestamps: true });

AuditLogSchema.index({ actorId: 1 });
AuditLogSchema.index({ createdAt: -1 });

export default mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
