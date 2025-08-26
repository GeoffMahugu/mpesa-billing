import { connectToDB } from '../lib/db';
import AuditLog from './AuditLog';

export async function getAuditLogs(filters) {
  const conn = await connectToDB();
  const AuditLogModel = conn.model('AuditLog', AuditLog.schema);
  return AuditLogModel.find(filters).exec();
}
