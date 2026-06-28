import { db } from '@rewriter/db';
import type { TableResponse } from '@rewriter/table-core';
import { type DefaultTableRequest, TableHandler } from '@rewriter/table-core';
import type { Context } from 'hono';

const SORTABLE_FIELDS = ['key', 'createdAt', 'updatedAt'] as const;

export class SettingsTableHandler extends TableHandler {
  readonly tableId = 'settings';

  async handle(request: DefaultTableRequest, _ctx: Context): Promise<TableResponse> {
    const where = request.search
      ? {
          key: { contains: request.search, mode: 'insensitive' as const },
        }
      : {};

    const orderBy = this.toOrderBy(request.sort, SORTABLE_FIELDS);

    const [data, total] = await Promise.all([
      db.setting.findMany({
        skip: (request.page - 1) * request.limit,
        take: request.limit,
        orderBy,
        where,
      }),
      db.setting.count({ where }),
    ]);

    return {
      data,
      total,
      page: request.page,
      limit: request.limit,
      totalPages: Math.ceil(total / request.limit),
    };
  }
}
