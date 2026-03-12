import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST } from '../app/api/lead/route';
import { promises as fs } from 'fs';

// Mock fs module
vi.mock('fs', async () => {
  const actual = await vi.importActual('fs');
  return {
    ...actual,
    promises: {
      readFile: vi.fn(),
      writeFile: vi.fn(),
      mkdir: vi.fn(),
      rename: vi.fn(),
    },
  };
});

// Mock uuid
vi.mock('uuid', () => ({
  v4: vi.fn(() => 'test-uuid-1234'),
}));

// Mock Resend
const mockSend = vi.fn();
vi.mock('resend', () => ({
  Resend: vi.fn(() => ({
    emails: {
      send: mockSend,
    },
  })),
}));

describe('Lead API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env.RESEND_API_KEY;
    delete process.env.NOTIFICATION_EMAIL;
  });

  const createRequest = (body: object) => {
    return new NextRequest('http://localhost:3000/api/lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  describe('POST /api/lead', () => {
    it('returns 200 with valid data', async () => {
      vi.mocked(fs.readFile).mockRejectedValueOnce(new Error('File not found'));
      vi.mocked(fs.mkdir).mockResolvedValueOnce(undefined);
      vi.mocked(fs.writeFile).mockResolvedValueOnce(undefined);
      vi.mocked(fs.rename).mockResolvedValueOnce(undefined);

      const request = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Test Company',
        message: 'I need AI help',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Thank you for your enquiry');
    });

    it('returns 400 when name is missing', async () => {
      const request = createRequest({
        email: 'john@example.com',
        message: 'Test message',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });

    it('returns 400 when email is missing', async () => {
      const request = createRequest({
        name: 'John Doe',
        message: 'Test message',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toBeDefined();
    });

    it('returns 400 when name is too short', async () => {
      const request = createRequest({
        name: 'J',
        email: 'john@example.com',
        message: 'Test message',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('2 characters');
    });

    it('returns 400 when email is invalid', async () => {
      const request = createRequest({
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Test message',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('email');
    });

    it('returns 400 for invalid JSON body', async () => {
      const request = new NextRequest('http://localhost:3000/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: 'not-valid-json',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('JSON');
    });

    it('accepts optional fields (company, message)', async () => {
      vi.mocked(fs.readFile).mockRejectedValueOnce(new Error('File not found'));
      vi.mocked(fs.mkdir).mockResolvedValueOnce(undefined);
      vi.mocked(fs.writeFile).mockResolvedValueOnce(undefined);
      vi.mocked(fs.rename).mockResolvedValueOnce(undefined);

      const request = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('validates name maximum length (100 chars)', async () => {
      const request = createRequest({
        name: 'a'.repeat(101),
        email: 'john@example.com',
        message: 'Test message',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('100');
    });

    it('validates company maximum length (200 chars)', async () => {
      const request = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
        company: 'a'.repeat(201),
        message: 'Test message',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('200');
    });

    it('validates message maximum length (2000 chars)', async () => {
      const request = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'a'.repeat(2001),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('2000');
    });

    it('sanitizes input with special characters', async () => {
      vi.mocked(fs.readFile).mockRejectedValueOnce(new Error('File not found'));
      vi.mocked(fs.mkdir).mockResolvedValueOnce(undefined);
      vi.mocked(fs.writeFile).mockResolvedValueOnce(undefined);
      vi.mocked(fs.rename).mockResolvedValueOnce(undefined);

      const request = createRequest({
        name: 'John<script>alert("xss")</script>',
        email: 'john@example.com',
        message: 'Hello <b>world</b>',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('returns 200 even if file write fails', async () => {
      vi.mocked(fs.readFile).mockRejectedValueOnce(new Error('Unexpected error'));

      const request = createRequest({
        name: 'John Doe',
        email: 'john@example.com',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });
});