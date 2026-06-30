import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test';
import type { RequestParams } from './fetch-instance';
import { customFetchInstance } from './fetch-instance';

const DEFAULT_URL = 'http://localhost:3001';

function makeResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function mockFetch(status: number, body: unknown) {
  return mock(async (_url: string | URL | Request, _init?: RequestInit) => {
    return makeResponse(status, body);
  });
}

function setFetch(fn: ReturnType<typeof mockFetch>) {
  globalThis.fetch = fn as unknown as typeof globalThis.fetch;
}

beforeEach(() => {
  delete process.env.API_URL;
  delete process.env.VITE_API_URL;
  delete (globalThis as Record<string, unknown>).document;
  delete (globalThis as Record<string, unknown>).localStorage;
});

afterEach(() => {
  mock.restore();
});

function buildParams(overrides?: Partial<RequestParams>): RequestParams {
  return {
    url: '/api/v1/health',
    method: 'GET',
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Base URL resolution
// ---------------------------------------------------------------------------
describe('base URL resolution', () => {
  test('falls back to http://localhost:3001 when no env var is set', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(buildParams());

    const url = fetchMock.mock.calls[0]?.[0] as string;
    expect(url).toBe(`${DEFAULT_URL}/api/v1/health`);
  });

  test('uses process.env.API_URL when set', async () => {
    process.env.API_URL = 'https://api.example.com';
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(buildParams());

    const url = fetchMock.mock.calls[0]?.[0] as string;
    expect(url).toBe('https://api.example.com/api/v1/health');
  });

  test('prefers VITE_API_URL over API_URL when both are set', async () => {
    process.env.API_URL = 'https://api.example.com';
    process.env.VITE_API_URL = 'https://vite.example.com';
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(buildParams());

    const url = fetchMock.mock.calls[0]?.[0] as string;
    expect(url).toBe('https://vite.example.com/api/v1/health');
  });

  test('uses VITE_API_URL when only it is set', async () => {
    process.env.VITE_API_URL = 'https://vite.example.com';
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(buildParams());

    const url = fetchMock.mock.calls[0]?.[0] as string;
    expect(url).toBe('https://vite.example.com/api/v1/health');
  });
});

// ---------------------------------------------------------------------------
// Query parameters
// ---------------------------------------------------------------------------
describe('query parameters', () => {
  test('appends params as URL search params', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(
      buildParams({
        url: '/api/v1/table',
        params: { id: 'sources', page: '1', limit: '20' },
      }),
    );

    const url = fetchMock.mock.calls[0]?.[0] as string;
    expect(url).toContain('?');
    expect(url).toContain('id=sources');
    expect(url).toContain('page=1');
    expect(url).toContain('limit=20');
  });

  test('skips null and undefined param values', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(
      buildParams({
        params: { search: 'test', filter: null, sort: undefined },
      }),
    );

    const url = fetchMock.mock.calls[0]?.[0] as string;
    expect(url).toContain('search=test');
    expect(url).not.toContain('filter');
    expect(url).not.toContain('sort');
  });

  test('stringifies non-string param values', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(
      buildParams({
        params: { page: 2, active: true },
      }),
    );

    const url = fetchMock.mock.calls[0]?.[0] as string;
    expect(url).toContain('page=2');
    expect(url).toContain('active=true');
  });

  test('does not add query string when params is undefined', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(buildParams({ params: undefined }));

    const url = fetchMock.mock.calls[0]?.[0] as string;
    expect(url).not.toContain('?');
  });
});

// ---------------------------------------------------------------------------
// Auth header injection
// ---------------------------------------------------------------------------
describe('auth header injection', () => {
  test('injects Authorization header when token exists in localStorage', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);
    (globalThis as Record<string, unknown>).document = {};
    (globalThis as Record<string, unknown>).localStorage = {
      getItem: mock((_key: string) => 'test-token'),
    };

    await customFetchInstance(buildParams());

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBe('Bearer test-token');
  });

  test('does not inject Authorization header when token is absent', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);
    (globalThis as Record<string, unknown>).document = {};
    (globalThis as Record<string, unknown>).localStorage = {
      getItem: mock((_key: string) => null),
    };

    await customFetchInstance(buildParams());

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBeUndefined();
  });

  test('does not attempt localStorage when document is undefined', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);
    // document is already deleted in beforeEach

    await customFetchInstance(buildParams());

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers.Authorization).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Error normalization
// ---------------------------------------------------------------------------
describe('error normalization', () => {
  test('throws { status, body } on non-2xx responses with JSON body', async () => {
    const fetchMock = mockFetch(404, { error: 'Not found' });
    setFetch(fetchMock);

    expect(customFetchInstance(buildParams())).rejects.toEqual({
      status: 404,
      body: { error: 'Not found' },
    });
  });

  test('throws with null body when error response is not JSON', async () => {
    setFetch(
      mock(async () => {
        return new Response('plain text error', { status: 500 });
      }),
    );

    expect(customFetchInstance(buildParams())).rejects.toEqual({
      status: 500,
      body: null,
    });
  });

  test('returns parsed JSON on 2xx responses', async () => {
    const payload = { status: 'ok', timestamp: '2026-01-01T00:00:00.000Z' };
    const fetchMock = mockFetch(200, payload);
    setFetch(fetchMock);

    const result = await customFetchInstance(buildParams());

    expect(result).toEqual(payload);
  });
});

// ---------------------------------------------------------------------------
// Request body serialization
// ---------------------------------------------------------------------------
describe('request body serialization', () => {
  test('JSON-stringifies data when present', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(buildParams({ method: 'POST', data: { name: 'test' } }));

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.body).toBe('{"name":"test"}');
  });

  test('omits body when data is absent', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(buildParams());

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.body).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// Custom headers
// ---------------------------------------------------------------------------
describe('custom headers', () => {
  test('sets Content-Type: application/json by default', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(buildParams());

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers['Content-Type']).toBe('application/json');
  });

  test('merges custom headers with defaults', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(buildParams({ headers: { 'X-Request-Id': 'abc123' } }));

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers['Content-Type']).toBe('application/json');
    expect(headers['X-Request-Id']).toBe('abc123');
  });

  test('custom Content-Type overrides default', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(buildParams({ headers: { 'Content-Type': 'text/plain' } }));

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    const headers = init.headers as Record<string, string>;
    expect(headers['Content-Type']).toBe('text/plain');
  });
});

// ---------------------------------------------------------------------------
// Signal passthrough
// ---------------------------------------------------------------------------
describe('signal passthrough', () => {
  test('passes AbortSignal to fetch', async () => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);
    const controller = new AbortController();

    await customFetchInstance(buildParams({ signal: controller.signal }));

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.signal).toBe(controller.signal);
  });
});

// ---------------------------------------------------------------------------
// HTTP method propagation
// ---------------------------------------------------------------------------
describe('HTTP method', () => {
  test.each([
    ['GET' as const],
    ['POST' as const],
    ['PUT' as const],
    ['DELETE' as const],
    ['PATCH' as const],
  ])('sends %s method to fetch', async (method) => {
    const fetchMock = mockFetch(200, { ok: true });
    setFetch(fetchMock);

    await customFetchInstance(buildParams({ method, data: {} }));

    const init = fetchMock.mock.calls[0]?.[1] as RequestInit;
    expect(init.method).toBe(method);
  });
});
