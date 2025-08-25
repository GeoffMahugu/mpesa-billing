import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const allowedAdminEmails = process.env.ADMIN_ALLOWED_EMAILS?.split(',') || [];

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Determine role based on email
    const role = allowedAdminEmails.includes(email) ? 'admin' : 'user';

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create new user
    const user = await User.create({ name, email, passwordHash: hashedPassword, role });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
