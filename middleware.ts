import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// CORS configuration
const allowedOrigins = [
  'https://riverstone.ai',
  'https://www.riverstone.ai',
  'http://localhost:3000',
  'http://localhost:3001',
];

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const response = NextResponse.next();

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    const corsResponse = new NextResponse(null, { status: 204 });
    
    if (origin && allowedOrigins.includes(origin)) {
      corsResponse.headers.set('Access-Control-Allow-Origin', origin);
    } else {
      corsResponse.headers.set('Access-Control-Allow-Origin', '*');
    }
    
    corsResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    corsResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    corsResponse.headers.set('Access-Control-Max-Age', '86400');
    corsResponse.headers.set('Access-Control-Allow-Credentials', 'true');
    
    return corsResponse;
  }

  // Add CORS headers to all API responses
  if (request.nextUrl.pathname.startsWith('/api/')) {
    if (origin && allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};
