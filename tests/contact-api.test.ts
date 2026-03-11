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
      expect(data.error).toContain('Name');
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
      expect(data.error).toContain('email');
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
      expect(data.error).toContain('Message');
    });

    it('returns generic error message on server errors', async () => {
      // Create a request with invalid JSON body
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

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toBe('An unexpected error occurred. Please try again later.');
      expect(data.details).toBeUndefined(); // Should not expose internal details
    });

    it('catches honeypot submissions', async () => {
      const request = createRequest({
        ...validBody,
        website: 'spam-bot',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true); // Returns success to avoid revealing honeypot
    });

    it('returns 429 when rate limit exceeded', async () => {
      // Make multiple requests from same IP
      const body = {
        ...validBody,
        csrfToken: 'test-token',
      };

      const request1 = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': '10.0.0.50',
        },
        body: JSON.stringify(body),
      });

      await POST(request1);
      await POST(request1);
      await POST(request1);
      const response4 = await POST(request1);
      const data = await response4.json();

      expect(response4.status).toBe(429);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Rate limit exceeded');
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
  });
});
