import { NextResponse } from 'next/server';

export async function GET() {
  console.log('[Health Check] Endpoint called at', new Date().toISOString());
  
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'riverstone-website'
  });
}
