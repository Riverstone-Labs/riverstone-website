import { describe, it, expect } from 'vitest';
import { GET } from '../app/api/health/route';

describe('Health API', () => {
  it('returns healthy status', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('ok');
    expect(data.service).toBe('riverstone-website');
    expect(data.timestamp).toBeDefined();
    
    // Verify timestamp is a valid ISO string
    const timestamp = new Date(data.timestamp);
    expect(timestamp.toISOString()).toBe(data.timestamp);
  });
});
