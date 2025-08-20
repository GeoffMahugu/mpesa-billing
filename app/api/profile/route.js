import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function PATCH(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();

  const body = await req.json();
  const { name, email } = body;

  const updatedUser = await User.findByIdAndUpdate(
    session.user.id,
    { name, email },
    { new: true }
  );

  if (!updatedUser) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(updatedUser);
}
