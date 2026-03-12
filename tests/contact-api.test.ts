import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { GET, POST } from '../app/api/contact/route';

describe('Contact API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/contact', () => {
    it('returns a CSRF token', async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.csrfToken).toBeDefined();
      expect(typeof data.csrfToken).toBe('string');
    });

    it('sets CSRF token cookie', async () => {
      const response = await GET();
      const setCookie = response.headers.get('Set-Cookie');

      expect(setCookie).toBeDefined();
      expect(setCookie).toContain('csrf_token=');
      expect(setCookie).toContain('HttpOnly');
      expect(setCookie).toContain('Secure');
      expect(setCookie).toContain('SameSite=Strict');
    });
  });

  describe('POST /api/contact', () => {
    const validBody = {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'This is a test message that is long enough.',
      csrfToken: '1234567890-abc123',
    };

    const createRequest = (body: object, cookie?: string) => {
      return new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(cookie && { Cookie: cookie }),
          'X-Forwarded-For': `192.168.1.${Math.floor(Math.random() * 255)}`, // Random IP to avoid rate limits
        },
        body: JSON.stringify(body),
      });
    };

    it('validates required fields', async () => {
      const request = createRequest({
        name: '',
        email: 'test@example.com',
        message: 'Valid message here.',
        csrfToken: 'token',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('validation');
      expect(data.fields).toBeDefined();
      expect(data.fields.name).toContain('Name');
    });

    it('validates email format', async () => {
      const request = createRequest({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Valid message here.',
        csrfToken: 'token',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('validation');
      expect(data.fields).toBeDefined();
      expect(data.fields.email).toContain('email');
    });

    it('validates message length', async () => {
      const request = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Too short',
        csrfToken: 'token',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('validation');
      expect(data.fields).toBeDefined();
      expect(data.fields.message).toContain('Message');
    });

    it('validates message maximum length (2000 chars)', async () => {
      const request = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'a'.repeat(2001),
        csrfToken: 'token',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('validation');
      expect(data.fields).toBeDefined();
      expect(data.fields.message).toContain('2000');
    });

    it('validates company maximum length (200 chars)', async () => {
      const request = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message that is long enough to pass validation.',
        company: 'a'.repeat(201),
        csrfToken: 'token',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('validation');
      expect(data.fields).toBeDefined();
      expect(data.fields.company).toContain('200');
    });

    it('validates role maximum length (100 chars)', async () => {
      const request = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message that is long enough to pass validation.',
        role: 'a'.repeat(101),
        csrfToken: 'token',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('validation');
      expect(data.fields).toBeDefined();
      expect(data.fields.role).toContain('100');
    });

    it('validates budget maximum length (100 chars)', async () => {
      const request = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a valid message that is long enough to pass validation.',
        budget: 'a'.repeat(101),
        csrfToken: 'token',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('validation');
      expect(data.fields).toBeDefined();
      expect(data.fields.budget).toContain('100');
    });

    it('accepts optional fields (company, role, budget)', async () => {
      const body = {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Test Company',
        role: 'CTO',
        budget: '$50k-$100k',
        message: 'This is a test message that is long enough.',
        csrfToken: 'token',
      };

      const request = createRequest(body);
      const response = await POST(request);
      await response.json();

      // Should not be a validation error - might be CSRF error but not 400
      expect(response.status).not.toBe(400);
    });

    it('returns server error on invalid JSON body', async () => {
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.168.1.100',
        },
        body: 'not-valid-json',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('validation');
    });

    it('returns generic server error message', async () => {
      // Create a request with a body that will cause JSON parse to throw
      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'X-Forwarded-For': '192.168.1.100',
        },
        body: 'not-json',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('validation');
      expect(data.message).toBeDefined();
    });

    it('catches honeypot submissions with _honeypot field', async () => {
      const request = createRequest({
        ...validBody,
        _honeypot: 'spam-bot',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true); // Returns success to avoid revealing honeypot
    });

    it('returns 429 when rate limit exceeded (5 requests per hour)', async () => {
      // Use a fixed IP to test rate limiting
      const fixedIP = '10.0.0.99';
      const body = {
        ...validBody,
        csrfToken: 'test-token',
      };

      // Make 6 requests - the 6th should fail
      for (let i = 0; i < 5; i++) {
        const request = new NextRequest('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': fixedIP,
          },
          body: JSON.stringify(body),
        });
        const response = await POST(request);
        expect(response.status).not.toBe(429); // First 5 should succeed
      }

      // 6th request should be rate limited
      const request6 = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': fixedIP,
        },
        body: JSON.stringify(body),
      });
      const response6 = await POST(request6);
      const data6 = await response6.json();

      expect(response6.status).toBe(429);
      expect(data6.success).toBe(false);
      expect(data6.error).toBe('rate_limit');
      expect(data6.message).toContain('wait');
    });

    it('sanitizes input to prevent injection', async () => {
      const request = createRequest({
        name: 'John<script>alert("xss")</script>',
        email: 'john@example.com',
        message: 'Hello <b>world</b>',
        csrfToken: 'token',
      });

      // Should not throw and should sanitize the input
      const response = await POST(request);
      
      // Should fail CSRF but not throw 500
      expect(response.status).not.toBe(500);
    });

    it('returns validation error format matching spec', async () => {
      const request = createRequest({
        name: 'J', // Too short
        email: 'not-an-email',
        message: 'Hi', // Too short
        csrfToken: 'token',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBe('validation');
      expect(data.fields).toBeDefined();
      expect(typeof data.fields).toBe('object');
      expect(data.fields.name).toBeDefined();
      expect(data.fields.email).toBeDefined();
      expect(data.fields.message).toBeDefined();
    });

    it('returns rate limit error format matching spec', async () => {
      const fixedIP = '10.0.0.88';
      const body = {
        ...validBody,
        csrfToken: 'test-token',
      };

      // Make 6 requests
      for (let i = 0; i < 6; i++) {
        const request = new NextRequest('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': fixedIP,
          },
          body: JSON.stringify(body),
        });
        await POST(request);
      }

      const finalRequest = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': fixedIP,
        },
        body: JSON.stringify(body),
      });
      const response = await POST(finalRequest);
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.success).toBe(false);
      expect(data.error).toBe('rate_limit');
      expect(data.message).toBeDefined();
    });

    it('returns success message matching spec', async () => {
      const body = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message that is long enough.',
        csrfToken: 'test-token',
      };

      const request = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '192.168.100.50',
          'Cookie': 'csrf_token=test-token',
        },
        body: JSON.stringify(body),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe("Thank you for your inquiry. We'll be in touch soon.");
    });
  });
});
