import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function PATCH(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const body = await req.json();
  const { newPassword } = body;

  if (!newPassword) {
    return NextResponse.json({ message: 'New password is required' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);

  const updatedUser = await User.findByIdAndUpdate(
    session.user.id,
    { passwordHash },
    { new: true }
  );

  if (!updatedUser) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Password updated successfully' });
}
