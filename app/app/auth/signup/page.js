'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    await signIn('google', { callbackUrl: '/admin/dashboard' });
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push('/auth/signin');
    } else {
      const data = await res.json();
      setError(data.message || 'Something went wrong');
    }
  };

  const strengthColors = ['bg-neutral-gray', 'bg-error', 'bg-warning', 'bg-info', 'bg-success', 'bg-success'];

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-off-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-neutral-white rounded-lg shadow-card">
        <h2 className="text-2xl font-bold text-center text-neutral-dark">Sign Up</h2>
        {error && <p className="text-center text-error">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-neutral-dark">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md bg-neutral-gray-light border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
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
          <div>
            <label className="text-sm font-medium text-neutral-dark">Password</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 mt-2 border rounded-md bg-neutral-gray-light border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
            <div className="w-full h-2 mt-2 bg-neutral-gray-light rounded-full">
              <div
                className={`h-2 rounded-full ${strengthColors[passwordStrength]}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="w-4 h-4 text-primary border-neutral-gray rounded focus:ring-primary"
            />
            <label className="ml-2 text-sm text-neutral-dark">I accept the terms and conditions</label>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign Up
          </button>
          <div className="flex items-center justify-center mt-4">
            <span className="text-sm text-neutral-dark">Or sign up with</span>
          </div>
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="w-full py-2 text-white rounded-md bg-secondary hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            Google
          </button>
        </form>
      </div>
    </div>
  );
}
