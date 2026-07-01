import { beforeEach, describe, expect, it, mock } from 'bun:test';

const mockCreate = mock();
const mockUpdate = mock();
const mockDelete = mock();

class MockPrismaError extends Error {
  code: string;
  clientVersion: string;
  constructor(message: string, { code }: { code: string }) {
    super(message);
    this.code = code;
    this.clientVersion = '1.0.0';
  }
}

mock.module('@rewriter/db', () => ({
  db: {
    source: {
      create: (...args: unknown[]) => mockCreate(...args),
      update: (...args: unknown[]) => mockUpdate(...args),
      delete: (...args: unknown[]) => mockDelete(...args),
    },
  },
  PrismaClientKnownRequestError: MockPrismaError,
}));

const { default: sourcesRoute } = await import('./sourcesRoute');

const SOURCE_ID = '550e8400-e29b-41d4-a716-446655440000';

const makeSource = (overrides: Record<string, unknown> = {}) => ({
  id: SOURCE_ID,
  name: 'TechCrunch',
  url: 'https://techcrunch.com/feed/',
  type: 'RSS',
  isActive: true,
  lastFetched: null,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

describe('sourcesRoute', () => {
  beforeEach(() => {
    mockCreate.mockReset();
    mockUpdate.mockReset();
    mockDelete.mockReset();
  });

  describe('POST /sources', () => {
    it('creates a source and returns 201', async () => {
      const source = makeSource();
      mockCreate.mockResolvedValue(source);

      const res = await sourcesRoute.request('/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'TechCrunch', url: 'https://techcrunch.com/feed/' }),
      });

      expect(res.status).toBe(201);
      const body = (await res.json()) as { name: string };
      expect(body.name).toBe('TechCrunch');
    });

    it('returns 400 for invalid body', async () => {
      const res = await sourcesRoute.request('/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: '', url: 'not-a-url' }),
      });

      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /sources/:id', () => {
    it('updates a source and returns 200', async () => {
      const source = makeSource({ name: 'Updated' });
      mockUpdate.mockResolvedValue(source);

      const res = await sourcesRoute.request(`/sources/${SOURCE_ID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Updated' }),
      });

      expect(res.status).toBe(200);
      const body = (await res.json()) as { name: string };
      expect(body.name).toBe('Updated');
    });

    it('returns 400 for empty body', async () => {
      const res = await sourcesRoute.request(`/sources/${SOURCE_ID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      expect(res.status).toBe(400);
    });

    it('returns 404 when source not found', async () => {
      mockUpdate.mockRejectedValue(new MockPrismaError('Record not found', { code: 'P2025' }));

      const res = await sourcesRoute.request(`/sources/${SOURCE_ID}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test' }),
      });

      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /sources/:id', () => {
    it('deletes a source and returns 200', async () => {
      const source = makeSource();
      mockDelete.mockResolvedValue(source);

      const res = await sourcesRoute.request(`/sources/${SOURCE_ID}`, {
        method: 'DELETE',
      });

      expect(res.status).toBe(200);
    });

    it('returns 404 when source not found', async () => {
      mockDelete.mockRejectedValue(new MockPrismaError('Record not found', { code: 'P2025' }));

      const res = await sourcesRoute.request(`/sources/${SOURCE_ID}`, {
        method: 'DELETE',
      });

      expect(res.status).toBe(404);
    });
  });
});
