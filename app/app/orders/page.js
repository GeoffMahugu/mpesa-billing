'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Orders() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      async function fetchOrders() {
        try {
          const res = await fetch('/api/orders');
          if (!res.ok) {
            throw new Error('Failed to fetch orders');
          }
          const data = await res.json();
          setOrders(data);
        } catch (error) {
          console.error(error);
          // Handle error state here, e.g., show a toast message
        } finally {
          setLoading(false);
        }
      }

      fetchOrders();
    }
  }, [status, router]);

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-success text-neutral-white';
      case 'pending': return 'bg-warning text-neutral-dark';
      case 'failed': return 'bg-error text-neutral-white';
      case 'cancelled': return 'bg-neutral-gray text-neutral-dark';
      default: return 'bg-neutral-gray-light text-neutral-dark';
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-neutral-off-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-off-white">
      <header className="bg-neutral-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">My Orders</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-neutral-white rounded-lg shadow-card overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-neutral-gray-light">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-dark uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-gray-light">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{order._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-dark">{order.currency} {order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusChipColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/orders/${order._id}`} className="text-primary hover:text-secondary">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
