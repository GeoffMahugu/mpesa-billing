'use client';

import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const res = await fetch('/api/auth/password/reset/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage('If an account with that email exists, a password reset link has been sent.');
    } else {
      const data = await res.json();
      setError(data.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-off-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-neutral-white rounded-lg shadow-card">
        <h2 className="text-2xl font-bold text-center text-neutral-dark">Forgot Password</h2>
        {message && <p className="text-center text-success">{message}</p>}
        {error && <p className="text-center text-error">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-neutral-dark">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md bg-neutral-gray-light border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
