import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Rate limiting store (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX = 3; // Max submissions per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

// Zod schema for input validation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name must be less than 100 characters').trim(),
  email: z.string().email('Please enter a valid email address').max(255, 'Email must be less than 255 characters').trim(),
  company: z.string().max(100, 'Company must be less than 100 characters').trim().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000, 'Message must be less than 5000 characters').trim(),
  website: z.string().max(0).optional(), // Honeypot field - should be empty
  csrfToken: z.string(),
});

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
    
    // Validate with Zod schema
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const errors = validationResult.error.issues.map(e => e.message).join(', ');
      return NextResponse.json(
        { success: false, error: errors },
        { status: 400 }
      );
    }
    
    const { name, email, company, message, website, csrfToken } = validationResult.data;
    
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
    
    // Sanitize email headers - strip \r\n to prevent header injection
    const sanitizedName = name.replace(/[\r\n<>]/g, '');
    const sanitizedEmail = email.replace(/[\r\n<>]/g, '');
    
    // Sanitize other inputs
    const sanitizedData = {
      name: sanitizedName,
      email: sanitizedEmail,
      company: (company || '').replace(/[\r\n<>]/g, ''),
      message: message.replace(/[<>]/g, ''),
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
