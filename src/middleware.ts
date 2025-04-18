import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('wallet-connected')?.value === 'true';
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/chatting')) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};