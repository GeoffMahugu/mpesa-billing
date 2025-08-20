'use client';

import { useState, useEffect } from 'react';

export default function Dashboard() {
  // Placeholder data
  const [stats, setStats] = useState({
    availableStock: 120,
    soldStock: 45,
    accountBalance: 50000,
    siteVisits: 1234,
  });
  const [recentTransactions, setRecentTransactions] = useState([
    { _id: '1', amount: 500, currency: 'KES', status: 'success' },
    { _id: '2', amount: 1500, currency: 'KES', status: 'success' },
  ]);
  const [balanceVisible, setBalanceVisible] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-off-white">
      <header className="bg-neutral-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-neutral-white rounded-lg shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-dark">Available Stock</h3>
            <p className="text-3xl font-bold text-primary mt-2">{stats.availableStock}</p>
          </div>
          <div className="bg-neutral-white rounded-lg shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-dark">Sold Stock</h3>
            <p className="text-3xl font-bold text-primary mt-2">{stats.soldStock}</p>
          </div>
          <div className="bg-neutral-white rounded-lg shadow-card p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-neutral-dark">Account Balance</h3>
              <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-sm text-primary">
                {balanceVisible ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="text-3xl font-bold text-primary mt-2">
              {balanceVisible ? `KES ${stats.accountBalance}` : '*****'}
            </p>
          </div>
          <div className="bg-neutral-white rounded-lg shadow-card p-6">
            <h3 className="text-lg font-semibold text-neutral-dark">Site Visits</h3>
            <p className="text-3xl font-bold text-primary mt-2">{stats.siteVisits}</p>
          </div>
        </div>
        <div className="mt-8 bg-neutral-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold text-neutral-dark">Recent Transactions</h3>
          <ul className="mt-4 space-y-2">
            {recentTransactions.map((tx) => (
              <li key={tx._id} className="flex justify-between items-center">
                <span>Transaction #{tx._id}</span>
                <span className="font-bold">{tx.currency} {tx.amount}</span>
                <span className="px-2 py-1 text-xs rounded-full bg-success text-neutral-white">{tx.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
