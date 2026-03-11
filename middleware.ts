import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// CORS configuration
const allowedOrigins = [
  'https://riverstone.ai',
  'https://www.riverstone.ai',
  'http://localhost:3000',
  'http://localhost:3001',
];

// Content Security Policy
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\s+/g, ' ').trim();

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  const response = NextResponse.next();

  // Add security headers to all responses
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  
  // Add Content Security Policy
  response.headers.set('Content-Security-Policy', cspHeader);

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    const corsResponse = new NextResponse(null, { status: 204 });
    
    // Copy security headers
    corsResponse.headers.set('X-Frame-Options', 'DENY');
    corsResponse.headers.set('X-Content-Type-Options', 'nosniff');
    corsResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    corsResponse.headers.set('Content-Security-Policy', cspHeader);
    
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
  matcher: [
    {
      source: '/((?!_next/static|_next/image|favicon.ico|public/).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
