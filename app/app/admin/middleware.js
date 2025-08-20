import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    if (req.nextauth.token?.role !== 'admin') {
      return new NextResponse('You are not authorized to access this page.', { status: 403 });
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ['/admin/:path*'] };
