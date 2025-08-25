import { getSession } from 'next-auth/react';
import db from '@/lib/db';
import BusinessAccount from '@/models/BusinessAccount';
import Order from '@/models/Order';
import Transaction from '@/models/Transaction';

export default async function handler(req, res) {
  const session = await getSession({ req });
  
  // Verify admin access
  if (!session?.user?.role === 'admin') {
    return res.status(403).json({ 
      ok: false, 
      code: 'FORBIDDEN', 
      message: 'Admin access required' 
    });
  }

  if (req.method === 'GET') {
    try {
      await db.connect();
      
      // Get sales summary data
      const [totalRevenue, totalOrders, recentTransactions] = await Promise.all([
        Transaction.aggregate([
          { $match: { status: 'success' } },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ]),
        Order.countDocuments(),
        Transaction.find({ status: 'success' })
          .sort({ createdAt: -1 })
          .limit(5)
          .populate('orderId', 'total')
      ]);

      const salesSummary = {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders,
        recentTransactions: recentTransactions.map(t => ({
          amount: t.amount,
          orderTotal: t.orderId?.total,
          createdAt: t.createdAt
        }))
      };

      res.status(200).json(salesSummary);
    } catch (error) {
      console.error('Error fetching sales summary:', error);
      res.status(500).json({ 
        ok: false, 
        code: 'SERVER_ERROR', 
        message: 'Failed to fetch sales data' 
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ 
      ok: false, 
      code: 'METHOD_NOT_ALLOWED', 
      message: `Method ${req.method} not allowed` 
    });
  }
}
