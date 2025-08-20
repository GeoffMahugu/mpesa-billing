import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req) {
  await dbConnect();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const newUser = new User({
    name,
    email,
    passwordHash,
  });

  await newUser.save();

  return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
}
