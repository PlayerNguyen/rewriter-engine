import { beforeEach, describe, expect, it, mock } from 'bun:test';
import type { Source } from '@rewriter/db';
import { SourcesService } from './SourcesService';

const mockCreate = mock();
const mockUpdate = mock();
const mockDelete = mock();
const mockFindUnique = mock();

mock.module('@rewriter/db', () => ({
  db: {
    source: {
      create: (...args: unknown[]) => mockCreate(...args),
      update: (...args: unknown[]) => mockUpdate(...args),
      delete: (...args: unknown[]) => mockDelete(...args),
      findUnique: (...args: unknown[]) => mockFindUnique(...args),
    },
  },
}));

const makeSource = (overrides: Partial<Source> = {}): Source => ({
  id: '1',
  name: 'TechCrunch',
  url: 'https://techcrunch.com/feed/',
  type: 'RSS',
  isActive: true,
  parserKey: null,
  requestDelayMs: 1000,
  lastFetched: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

describe('SourcesService', () => {
  let service: SourcesService;

  beforeEach(() => {
    mockCreate.mockReset();
    mockUpdate.mockReset();
    mockDelete.mockReset();
    mockFindUnique.mockReset();
    service = new SourcesService();
  });

  describe('create', () => {
    it('calls db.source.create with correct args', async () => {
      const record = makeSource();
      mockCreate.mockResolvedValue(record);

      const result = await service.create({
        name: 'TechCrunch',
        url: 'https://techcrunch.com/feed/',
      });

      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          name: 'TechCrunch',
          url: 'https://techcrunch.com/feed/',
        },
      });
      expect(result).toBe(record);
    });

    it('passes type and isActive when provided', async () => {
      mockCreate.mockResolvedValue(makeSource());

      await service.create({
        name: 'Test',
        url: 'https://example.com',
        type: 'WEB',
        isActive: false,
      });

      expect(mockCreate).toHaveBeenCalledWith({
        data: {
          name: 'Test',
          url: 'https://example.com',
          type: 'WEB',
          isActive: false,
        },
      });
    });
  });

  describe('update', () => {
    it('calls db.source.update with correct args', async () => {
      const record = makeSource({ name: 'Updated' });
      mockUpdate.mockResolvedValue(record);

      const result = await service.update('1', { name: 'Updated' });

      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { name: 'Updated' },
      });
      expect(result).toBe(record);
    });
  });

  describe('delete', () => {
    it('calls db.source.delete with correct args', async () => {
      const record = makeSource();
      mockDelete.mockResolvedValue(record);

      const result = await service.delete('1');

      expect(mockDelete).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toBe(record);
    });
  });

  describe('getById', () => {
    it('calls db.source.findUnique with correct args', async () => {
      const record = makeSource();
      mockFindUnique.mockResolvedValue(record);

      const result = await service.getById('1');

      expect(mockFindUnique).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toBe(record);
    });

    it('returns null when not found', async () => {
      mockFindUnique.mockResolvedValue(null);

      const result = await service.getById('nonexistent');

      expect(result).toBeNull();
    });
  });
});
