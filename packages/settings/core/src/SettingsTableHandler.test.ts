import { beforeEach, describe, expect, it, mock } from 'bun:test';
import { DefaultTableRequest } from '@rewriter/table-core';
import type { Context } from 'hono';
import { SettingsTableHandler } from './SettingsTableHandler';

const mockFindMany = mock();
const mockCount = mock();

mock.module('@rewriter/db', () => ({
  db: {
    setting: {
      findMany: (...args: unknown[]) => mockFindMany(...args),
      count: (...args: unknown[]) => mockCount(...args),
    },
  },
}));

interface FindManyArgs {
  where?: Record<string, unknown>;
  orderBy?: Record<string, string>;
  skip?: number;
  take?: number;
}

describe('SettingsTableHandler', () => {
  const handler = new SettingsTableHandler();

  beforeEach(() => {
    mockFindMany.mockReset();
    mockCount.mockReset();
  });

  it('returns correct paginated shape', async () => {
    const rows = [
      {
        id: '1',
        key: 'test',
        value: 'hello',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockFindMany.mockResolvedValue(rows);
    mockCount.mockResolvedValue(1);

    const request = new DefaultTableRequest({ id: 'settings' });
    const result = await handler.handle(request, {} as unknown as Context);

    expect(result.data).toEqual(rows);
    expect(result.total).toBe(1);
    expect(result.page).toBe(1);
    expect(result.limit).toBe(20);
    expect(result.totalPages).toBe(1);
  });

  it('applies search filter', async () => {
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(0);

    const request = new DefaultTableRequest({
      id: 'settings',
      search: 'llm',
    });
    await handler.handle(request, {} as unknown as Context);

    expect(mockFindMany).toHaveBeenCalled();
    const call = mockFindMany.mock.calls[0]![0] as FindManyArgs;
    expect(call.where).toEqual({
      key: { contains: 'llm', mode: 'insensitive' },
    });
  });

  it('default sort is createdAt:desc', async () => {
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(0);

    const request = new DefaultTableRequest({ id: 'settings' });
    await handler.handle(request, {} as unknown as Context);

    const call = mockFindMany.mock.calls[0]![0] as FindManyArgs;
    expect(call.orderBy).toEqual({ createdAt: 'desc' });
  });

  it('allowed field sort passes through', async () => {
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(0);

    const request = new DefaultTableRequest({
      id: 'settings',
      sort: { fieldName: 'key', direction: 'asc' },
    });
    await handler.handle(request, {} as unknown as Context);

    const call = mockFindMany.mock.calls[0]![0] as FindManyArgs;
    expect(call.orderBy).toEqual({ key: 'asc' });
  });

  it('disallowed field falls back to default', async () => {
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(0);

    const request = new DefaultTableRequest({
      id: 'settings',
      sort: { fieldName: 'dangerous', direction: 'asc' },
    });
    await handler.handle(request, {} as unknown as Context);

    const call = mockFindMany.mock.calls[0]![0] as FindManyArgs;
    expect(call.orderBy).toEqual({ createdAt: 'desc' });
  });

  it('correct pagination math', async () => {
    mockFindMany.mockResolvedValue([]);
    mockCount.mockResolvedValue(50);

    const request = new DefaultTableRequest({
      id: 'settings',
      page: 2,
      limit: 10,
    });
    await handler.handle(request, {} as unknown as Context);

    const call = mockFindMany.mock.calls[0]![0] as FindManyArgs;
    expect(call.skip).toBe(10);
    expect(call.take).toBe(10);
  });
});
