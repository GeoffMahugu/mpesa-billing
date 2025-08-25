'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await signIn('credentials', {
    redirect: false,
    email,
    password,
  });

  if (result.error) {
    setError('Invalid credentials');
  } else {
    router.push('/api/auth/redirect');
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-off-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-neutral-white rounded-lg shadow-card">
        <h2 className="text-2xl font-bold text-center text-neutral-dark">Sign In</h2>
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
          <div>
            <label className="text-sm font-medium text-neutral-dark">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md bg-neutral-gray-light border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white rounded-md bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-neutral-dark">
          Don't have an account?{' '}
          <a href="/auth/signup" className="text-primary hover:underline">
            Sign Up
          </a>
        </p>
        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-gray"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neutral-white text-neutral-dark">Or continue with</span>
          </div>
        </div>
<button
  onClick={() => signIn('google')}
  className="w-full py-2 text-neutral-dark border rounded-md border-neutral-gray hover:bg-neutral-gray-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
>
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
