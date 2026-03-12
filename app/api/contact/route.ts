import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { logEnvironmentStatus } from '@/lib/env-validation';

// Log environment status on first load
logEnvironmentStatus();

// Email configuration
const EMAIL_RECIPIENT = 'warwick@riverstonelabs.com.au';
const EMAIL_FROM = 'contact@riverstonelabs.com.au';

// Lazy initialization of Resend client
let resend: Resend | null = null;
function getResendClient(): Resend | null {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Rate limiting store (in production, use Redis or database)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_MAX = 5; // Max submissions per hour per spec
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

// Zod schema for input validation - matches spec exactly
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .trim(),
  company: z.string()
    .max(200, 'Company must be less than 200 characters')
    .trim()
    .optional(),
  role: z.string()
    .max(100, 'Role must be less than 100 characters')
    .trim()
    .optional(),
  budget: z.string()
    .max(100, 'Budget must be less than 100 characters')
    .trim()
    .optional(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters')
    .trim(),
  _honeypot: z.string().optional(), // Honeypot field - should be empty
  csrfToken: z.string(),
});

// Type for validated lead data
export type LeadData = z.infer<typeof contactSchema>;

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
  const submissions = rateLimitMap.get(ip) || [];
  
  // Filter out old submissions outside the window
  const recentSubmissions = submissions.filter(
    timestamp => now - timestamp < RATE_LIMIT_WINDOW
  );
  
  // Check if limit exceeded
  if (recentSubmissions.length >= RATE_LIMIT_MAX) {
    return false;
  }
  
  // Add current submission timestamp
  recentSubmissions.push(now);
  rateLimitMap.set(ip, recentSubmissions);
  
  return true;
}

// Clean up old rate limit entries periodically
function cleanupRateLimitMap(): void {
  const now = Date.now();
  for (const [ip, submissions] of rateLimitMap.entries()) {
    const recentSubmissions = submissions.filter(
      timestamp => now - timestamp < RATE_LIMIT_WINDOW
    );
    if (recentSubmissions.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recentSubmissions);
    }
  }
}

// Run cleanup every 10 minutes
setInterval(cleanupRateLimitMap, 10 * 60 * 1000);

// Format validation errors for response
function formatValidationErrors(error: z.ZodError): Record<string, string> {
  const fields: Record<string, string> = {};
  error.issues.forEach(issue => {
    const field = issue.path[0] as string;
    fields[field] = issue.message;
  });
  return fields;
}

// Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Generate professional HTML email template
function generateEmailTemplate(data: {
  name: string;
  email: string;
  company?: string;
  role?: string;
  budget?: string;
  message: string;
  ip: string;
  timestamp: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead - Riverstone Labs</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #0a1628; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">Riverstone Labs</h1>
              <p style="margin: 8px 0 0 0; color: #3b82f6; font-size: 14px;">New Lead Inquiry</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 24px 0; color: #0a1628; font-size: 20px; font-weight: 600;">Lead Details</h2>
              
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                    <p style="margin: 4px 0 0 0; color: #0a1628; font-size: 16px; font-weight: 500;">${escapeHtml(data.name)}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                    <p style="margin: 4px 0 0 0; color: #3b82f6; font-size: 16px; font-weight: 500;">
                      <a href="mailto:${escapeHtml(data.email)}" style="color: #3b82f6; text-decoration: none;">${escapeHtml(data.email)}</a>
                    </p>
                  </td>
                </tr>
                ${data.company ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Company</p>
                    <p style="margin: 4px 0 0 0; color: #0a1628; font-size: 16px; font-weight: 500;">${escapeHtml(data.company)}</p>
                  </td>
                </tr>
                ` : ''}
                ${data.role ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Role</p>
                    <p style="margin: 4px 0 0 0; color: #0a1628; font-size: 16px; font-weight: 500;">${escapeHtml(data.role)}</p>
                  </td>
                </tr>
                ` : ''}
                ${data.budget ? `
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Budget</p>
                    <p style="margin: 4px 0 0 0; color: #0a1628; font-size: 16px; font-weight: 500;">${escapeHtml(data.budget)}</p>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                    <p style="margin: 4px 0 0 0; color: #0a1628; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
                  </td>
                </tr>
              </table>
              
              <!-- Reply Button -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${escapeHtml(data.email)}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-size: 16px; font-weight: 500;">Reply to Lead</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 40px; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px; text-align: center;">
                Submitted on ${new Date(data.timestamp).toLocaleString('en-AU', { 
                  timeZone: 'Australia/Sydney',
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}<br>
                IP: ${escapeHtml(data.ip)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
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
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Check rate limit first
    const clientIP = getClientIP(request);
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'rate_limit',
          message: 'Please wait before submitting another form'
        },
        { status: 429 }
      );
    }
    
    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: 'validation',
          message: 'Invalid request body'
        },
        { status: 400 }
      );
    }
    
    // Validate with Zod schema
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'validation',
          fields: formatValidationErrors(validationResult.error)
        },
        { status: 400 }
      );
    }
    
    const { name, email, company, role, budget, message, _honeypot, csrfToken } = validationResult.data;
    
    // Honeypot check - silently reject bots
    if (_honeypot && _honeypot.length > 0) {
      console.log('Honeypot triggered - possible bot submission from IP:', clientIP);
      // Return success to avoid revealing it's a honeypot
      return NextResponse.json({ 
        success: true, 
        message: "Thank you for your inquiry. We'll be in touch soon."
      });
    }
    
    // Get stored CSRF token from cookie
    const storedToken = request.cookies.get('csrf_token')?.value;
    
    // Validate CSRF token
    if (!validateCSRFToken(csrfToken, storedToken || '')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'validation',
          message: 'Invalid or expired session. Please refresh the page and try again.'
        },
        { status: 403 }
      );
    }
    
    // Sanitize inputs
    const sanitizedData = {
      name: name.replace(/[\r\n<>]/g, '').trim(),
      email: email.replace(/[\r\n<>]/g, '').trim(),
      company: company ? company.replace(/[\r\n<>]/g, '').trim() : undefined,
      role: role ? role.replace(/[\r\n<>]/g, '').trim() : undefined,
      budget: budget ? budget.replace(/[\r\n<>]/g, '').trim() : undefined,
      message: message.trim(),
      ip: clientIP,
      timestamp: new Date().toISOString()
    };
    
    // Log submission (mask email for privacy)
    console.log('Lead captured:', {
      name: sanitizedData.name,
      email: sanitizedData.email.substring(0, 3) + '***@***',
      timestamp: sanitizedData.timestamp
    });
    
    // Send email using Resend
    const resendClient = getResendClient();
    if (resendClient) {
      try {
        await resendClient.emails.send({
          from: EMAIL_FROM,
          to: EMAIL_RECIPIENT,
          subject: `New Lead: ${sanitizedData.name}${sanitizedData.company ? ` from ${sanitizedData.company}` : ''}`,
          html: generateEmailTemplate(sanitizedData),
          replyTo: sanitizedData.email,
        });
        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue - don't fail the submission if email fails
      }
    } else {
      console.log('Resend not configured - email not sent, but lead captured');
    }
    
    // Clear CSRF token after successful submission
    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you for your inquiry. We'll be in touch soon."
      },
      {
        headers: {
          'Set-Cookie': 'csrf_token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/'
        }
      }
    );
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'server',
        message: 'Something went wrong. Please try again or email us directly.'
      },
      { status: 500 }
    );
  }
}
