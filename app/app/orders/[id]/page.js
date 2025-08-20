'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';

export default function OrderDetails() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && id) {
      async function fetchOrder() {
        try {
          const res = await fetch(`/api/orders/${id}`);
          if (!res.ok) {
            throw new Error('Failed to fetch order');
          }
          const data = await res.json();
          setOrder(data);
        } catch (error) {
          console.error(error);
          // Handle error state here, e.g., show a toast message
        } finally {
          setLoading(false);
        }
      }

      fetchOrder();
    }
  }, [status, router, id]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-neutral-off-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-neutral-off-white flex items-center justify-center">
        <p className="text-neutral-dark">Order not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-off-white">
      <header className="bg-neutral-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Order Details</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-neutral-white rounded-lg shadow-card p-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-neutral-dark">Order #{order._id}</h2>
              <p className="text-neutral-dark">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-success text-neutral-white`}>
              {order.status}
            </span>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-neutral-dark">Items</h3>
            <ul className="mt-4 space-y-2">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name} x {item.qty}</span>
                  <span>{order.currency} {item.subtotal}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 border-t border-neutral-gray-light pt-4">
            <div className="flex justify-between font-bold text-lg text-neutral-dark">
              <span>Total</span>
              <span>{order.currency} {order.total}</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-neutral-dark">Transaction Timeline</h3>
            {/* Placeholder for timeline component */}
            <div className="mt-4 p-4 bg-neutral-gray-light rounded-lg">
              <p className="text-neutral-dark">Transaction ID: {order.transactionId}</p>
              <p className="text-neutral-dark">Status: Paid</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button className="px-6 py-2 text-white rounded-md bg-primary hover:bg-secondary">
              Download Receipt
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
