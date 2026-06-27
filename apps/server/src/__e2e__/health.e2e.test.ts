import { describe, expect, test } from 'bun:test';
import { createApp } from '../app';

describe('Health endpoint', () => {
  const app = createApp();

  test('GET /api/v1/health returns 200 with status ok', async () => {
    const res = await app.request('/api/v1/health');

    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('application/json');

    const body = await res.json();
    expect(body).toEqual({
      status: 'ok',
      timestamp: expect.any(String),
    });
  });

  test('GET /api/v1/health timestamp is valid ISO-8601', async () => {
    const res = await app.request('/api/v1/health');
    const body = await res.json();

    const date = new Date(body.timestamp);
    expect(date.toISOString()).toBe(body.timestamp);
  });

  test('GET /api/v1/health is idempotent', async () => {
    const a = await app.request('/api/v1/health');
    const b = await app.request('/api/v1/health');

    expect(a.status).toBe(b.status);
    expect((await a.json()).status).toBe((await b.json()).status);
  });

  test('GET /api/v1/health/ returns 404 (no trailing slash route)', async () => {
    const res = await app.request('/api/v1/health/');
    expect(res.status).toBe(404);
  });
});

describe('CORS headers', () => {
  const app = createApp();

  test('OPTIONS /api/v1/health returns CORS headers', async () => {
    const res = await app.request('/api/v1/health', {
      method: 'OPTIONS',
      headers: new Headers({
        Origin: 'http://localhost:5173',
        'Access-Control-Request-Method': 'GET',
      }),
    });

    expect(res.status).toBe(204);
    expect(res.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
    expect(res.headers.get('access-control-allow-methods')).toContain('GET');
  });

  test('GET /api/v1/health includes CORS headers for allowed origin', async () => {
    const res = await app.request('/api/v1/health', {
      headers: new Headers({ Origin: 'http://localhost:5173' }),
    });

    expect(res.status).toBe(200);
    expect(res.headers.get('access-control-allow-origin')).toBe('http://localhost:5173');
  });
});

describe('Not found', () => {
  const app = createApp();

  test('GET /api/v1/nonexistent returns 404', async () => {
    const res = await app.request('/api/v1/nonexistent');
    expect(res.status).toBe(404);
  });
});
