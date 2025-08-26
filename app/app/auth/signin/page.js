'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError("Invalid credentials");
    } else {
      router.push("/api/auth/redirect");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-neutral-off-white'>
      <div className='w-full max-w-md p-8 space-y-6 bg-neutral-white rounded-lg shadow-card'>
        <h2 className='text-2xl font-bold text-center text-neutral-dark'>
          MxChange Sign In
        </h2>
        {error && <p className='text-center text-error'>{error}</p>}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='text-sm font-medium text-neutral-dark'>
              Email
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 mt-2 border rounded-md bg-neutral-gray-light border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary'
              required
            />
          </div>
          <div>
            <label className='text-sm font-medium text-neutral-dark'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full px-4 py-2 mt-2 border rounded-md bg-neutral-gray-light border-neutral-gray focus:outline-none focus:ring-2 focus:ring-primary'
                required
              />
              <button
                type='button'
                onClick={toggleShowPassword}
                className='cursor-pointer absolute right-3 bottom-1 -translate-y-1/2 text-neutral-dark hover:text-accent'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button
            type='submit'
            className='cursor-pointer w-full py-2 text-white rounded-md bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
          >
            Sign In
          </button>
        </form>
        <p className='mt-4 text-center text-sm text-neutral-dark'>
          Do not have an account?{" "}
          <a href='/auth/signup' className='text-primary hover:underline'>
            Sign Up
          </a>
        </p>
        <div className='relative mt-6'>
          <div className='absolute inset-0 flex items-center'>
            <div className='w-full border-t border-neutral-gray'></div>
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='px-2 bg-neutral-white text-neutral-dark'>
              Or continue with
            </span>
          </div>
        </div>
        <button
          onClick={async () => {
            const result = await signIn("google", { redirect: false });
            if (!result.error) {
              router.push("/api/auth/redirect");
            } else {
              setError("Google signin failed");
            }
          }}
          className='cursor-pointer w-full py-2 text-primary border border-black outline-none hover:text-white rounded-md bg-errorRed hover:bg-red-700  hover:border-red-800 focus:ring-2 focus:ring-offset-2 focus:ring-errorRed'
        >
          Sign In with Google
        </button>
      </div>
    </div>
  );
}
