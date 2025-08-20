import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  await dbConnect();

  const { email } = await req.json();

  const user = await User.findOne({ email });

  if (user) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    user.passwordReset = { token, expiresAt };
    await user.save();

    // In a real application, you would send an email with the reset link here.
    // For example: await sendPasswordResetEmail(email, token);
  }

  // Always return a success message to prevent user enumeration attacks
  return NextResponse.json({ ok: true });
}
