import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import { verifyResetToken } from '@/lib/utils';

export async function POST(req) {
  await dbConnect();

  const body = await req.json();
  const { token, newPassword } = body;

  if (!token || !newPassword) {
    return NextResponse.json({ message: 'Token and new password are required' }, { status: 400 });
  }

  try {
    const userId = await verifyResetToken(token);

    if (!userId) {
      return NextResponse.json({ message: 'Invalid or expired reset token' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { passwordHash },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ message: 'Error resetting password' }, { status: 500 });
  }
}
