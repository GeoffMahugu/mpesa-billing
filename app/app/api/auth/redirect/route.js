import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/route';

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  if (session.user.role === 'admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url));
  } else {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
}
