import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { promises as fs } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

// Email configuration
const EMAIL_RECIPIENT = process.env.NOTIFICATION_EMAIL || 'warwick@riverstonelabs.com.au';
const EMAIL_FROM = process.env.EMAIL_FROM || 'noreply@riverstonelabs.com.au';

// Lazy initialization of Resend client
let resend: Resend | null = null;
function getResendClient(): Resend | null {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// File path for leads storage
const DATA_DIR = join(process.cwd(), 'data');
const LEADS_FILE = join(DATA_DIR, 'leads.json');

// Zod schema for input validation - matches spec exactly
const leadSchema = z.object({
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
    .optional()
    .transform(val => val || null),
  message: z.string()
    .max(2000, 'Message must be less than 2000 characters')
    .trim()
    .optional()
    .transform(val => val || null),
});

// Type for lead data
export type LeadData = z.infer<typeof leadSchema>;

interface LeadEntry {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string | null;
  source: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
}

interface LeadsData {
  leads: LeadEntry[];
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
  company: string | null;
  message: string | null;
}): string {
  const companyDisplay = data.company || 'Unknown Company';
  
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
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Company</p>
                    <p style="margin: 4px 0 0 0; color: #0a1628; font-size: 16px; font-weight: 500;">${escapeHtml(companyDisplay)}</p>
                  </td>
                </tr>
                ${data.message ? `
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                    <p style="margin: 4px 0 0 0; color: #0a1628; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</p>
                  </td>
                </tr>
                ` : ''}
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
                Submitted from website contact form<br>
                ${new Date().toLocaleString('en-AU', { 
                  timeZone: 'Australia/Sydney',
                  dateStyle: 'full',
                  timeStyle: 'short'
                })}
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

// Read leads from file
async function readLeadsFile(): Promise<LeadsData> {
  try {
    const data = await fs.readFile(LEADS_FILE, 'utf-8');
    return JSON.parse(data) as LeadsData;
  } catch (error) {
    // File doesn't exist or is invalid, return empty structure
    return { leads: [] };
  }
}

// Write leads to file
async function writeLeadsFile(data: LeadsData): Promise<void> {
  // Ensure data directory exists
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory might already exist
  }
  
  // Write file atomically using temp file
  const tempFile = `${LEADS_FILE}.tmp`;
  await fs.writeFile(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  await fs.rename(tempFile, LEADS_FILE);
}

// Append lead to file
async function appendLead(lead: LeadEntry): Promise<void> {
  const data = await readLeadsFile();
  data.leads.push(lead);
  await writeLeadsFile(data);
}

// POST endpoint to submit lead
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid JSON body' 
        },
        { status: 400 }
      );
    }
    
    // Validate with Zod schema
    const validationResult = leadSchema.safeParse(body);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues.map(issue => issue.message).join(', ');
      return NextResponse.json(
        { 
          success: false, 
          error: errorMessages 
        },
        { status: 400 }
      );
    }
    
    const { name, email, company, message } = validationResult.data;
    
    // Create lead entry
    const leadEntry: LeadEntry = {
      id: uuidv4(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company,
      message,
      source: 'website-contact-form',
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    
    // Append to leads.json
    try {
      await appendLead(leadEntry);
    } catch (fileError) {
      console.error('Failed to write to leads.json:', fileError);
      // Continue - don't fail the submission if file write fails
    }
    
    // Send email using Resend
    const resendClient = getResendClient();
    if (resendClient) {
      try {
        await resendClient.emails.send({
          from: EMAIL_FROM,
          to: EMAIL_RECIPIENT,
          subject: `New Lead: ${name} from ${company || 'Unknown Company'}`,
          html: generateEmailTemplate({ name, email, company, message }),
          replyTo: email,
        });
        console.log('Email notification sent successfully to:', EMAIL_RECIPIENT);
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue - don't fail the submission if email fails
      }
    } else {
      console.log('Resend not configured - email not sent, but lead captured to file');
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you for your enquiry" 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Server error' 
      },
      { status: 500 }
    );
  }
}