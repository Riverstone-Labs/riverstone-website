import { NextRequest, NextResponse } from 'next/server';

// Rate limiting store (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 3; // Max submissions per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

// Generate CSRF token
function generateCSRFToken(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
}

// Validate CSRF token
function validateCSRFToken(token: string, storedToken: string): boolean {
  if (!token || !storedToken) return false;
  if (token !== storedToken) return false;
  
  // Check token age (max 1 hour)
  const timestamp = parseInt(token.split('-')[0]);
  if (Date.now() - timestamp > 60 * 60 * 1000) return false;
  
  return true;
}

// Get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
  return ip;
}

// Check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  // Reset if window has passed
  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }
  
  // Check limit
  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }
  
  record.count++;
  return true;
}

// GET endpoint to generate CSRF token
export async function GET() {
  const token = generateCSRFToken();
  
  return NextResponse.json({
    csrfToken: token,
    success: true
  }, {
    headers: {
      'Set-Cookie': `csrf_token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600; Path=/`
    }
  });
}

// POST endpoint to submit contact form
export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { success: false, error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }
    
    // Parse body
    const body = await request.json();
    const { name, email, company, message, website, csrfToken } = body;
    
    // Honeypot check
    if (website) {
      console.log('Honeypot triggered - possible bot submission from IP:', clientIP);
      // Return success to avoid revealing it's a honeypot
      return NextResponse.json({ 
        success: true, 
        message: 'Thank you for your message!' 
      });
    }
    
    // Get stored CSRF token from cookie
    const storedToken = request.cookies.get('csrf_token')?.value;
    
    // Validate CSRF token
    if (!validateCSRFToken(csrfToken, storedToken || '')) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired session. Please refresh the page and try again.' },
        { status: 403 }
      );
    }
    
    // Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }
    
    // Sanitize inputs
    const sanitizedData = {
      name: name.trim().replace(/[<>]/g, '').slice(0, 100),
      email: email.trim().replace(/[<>]/g, '').slice(0, 100),
      company: (company || '').trim().replace(/[<>]/g, '').slice(0, 100),
      message: message.trim().replace(/[<>]/g, '').slice(0, 1000),
      ip: clientIP,
      timestamp: new Date().toISOString()
    };
    
    // Log submission (in production, send email or save to database)
    console.log('Contact form submission:', {
      ...sanitizedData,
      email: sanitizedData.email.substring(0, 3) + '***@***' // Partially mask email in logs
    });
    
    // TODO: Integrate with email service (SendGrid, AWS SES, etc.) or form backend
    // Example: await sendEmail(sanitizedData);
    
    // Clear CSRF token after successful submission
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We will get back to you within 24 hours.' 
      },
      {
        headers: {
          'Set-Cookie': 'csrf_token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'        }
      }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}
