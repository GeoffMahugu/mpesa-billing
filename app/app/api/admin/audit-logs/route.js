import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AuditLog } from "@/models/AuditLog";
import dbConnect from "@/lib/db";

export async function GET() {
  await dbConnect();
  
  const session = await getServerSession(authOptions);
  if (!session?.user?.role === 'admin') {
    return Response.json(
      { ok: false, code: 'FORBIDDEN', message: 'Admin access required' },
      { status: 403 }
    );
  }

  try {
    const logs = await AuditLog.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();
      
    return Response.json(logs);
  } catch (error) {
    return Response.json(
      { ok: false, code: 'SERVER_ERROR', message: error.message },
      { status: 500 }
    );
  }
}
