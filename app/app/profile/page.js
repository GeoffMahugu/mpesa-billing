'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [status, router, session]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const res = await fetch('/api/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      setMessage('Profile updated successfully');
      update({ name, email });
    } else {
      const data = await res.json();
      setError(data.message || 'Something went wrong');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = await fetch('/api/profile/password', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword: password }),
    });

    if (res.ok) {
      setMessage('Password changed successfully');
      setPassword('');
      setConfirmPassword('');
    } else {
      const data = await res.json();
      setError(data.message || 'Something went wrong');
    }
  };

  if (status === 'loading') {
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
          <h1 className="text-2xl font-bold text-primary">My Profile</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-neutral-white rounded-lg shadow-card p-8">
            <h2 className="text-xl font-semibold text-neutral-dark">Profile Information</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-6 mt-4">
              <div>
                <label className="text-sm font-medium text-neutral-dark">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md bg-neutral-gray-light border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-dark">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md bg-neutral-gray-light border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Update Profile
              </button>
            </form>
          </div>
          <div className="bg-neutral-white rounded-lg shadow-card p-8">
            <h2 className="text-xl font-semibold text-neutral-dark">Change Password</h2>
            <form onSubmit={handlePasswordChange} className="space-y-6 mt-4">
              <div>
                <label className="text-sm font-medium text-neutral-dark">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md bg-neutral-gray-light border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-neutral-dark">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border rounded-md bg-neutral-gray-light border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
