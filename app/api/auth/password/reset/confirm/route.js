import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  await dbConnect();

  const { token, newPassword } = await req.json();

  if (!token || !newPassword) {
    return NextResponse.json({ message: 'Token and new password are required' }, { status: 400 });
  }

  const user = await User.findOne({
    'passwordReset.token': token,
    'passwordReset.expiresAt': { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  user.passwordHash = passwordHash;
  user.passwordReset = undefined; // Invalidate the token

  await user.save();

  return NextResponse.json({ ok: true });
}
