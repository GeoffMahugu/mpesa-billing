import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create new user with default role 'user'
    const user = await User.create({ name, email, passwordHash: hashedPassword, role: 'user' });

    // Check if the user is admin based on email domain or other criteria
    const isAdmin = email.endsWith('company.com'); // Example criteria

    if (isAdmin) {
      // Update user role to 'admin'
      user.role = 'admin';
      await user.save();
      return NextResponse.redirect(new URL('/admin/dashboard', req.url));
    }

    return NextResponse.redirect(new URL('/orders', req.url));
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
