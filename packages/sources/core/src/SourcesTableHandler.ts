import { db } from '@rewriter/db';
import type { TableResponse } from '@rewriter/table-core';
import { type DefaultTableRequest, TableHandler } from '@rewriter/table-core';
import type { Context } from 'hono';

const SORTABLE_FIELDS = ['name', 'url', 'type', 'isActive', 'createdAt', 'updatedAt'] as const;

/**
 * Table handler for the **sources** entity.
 *
 * Supports full-text search across `name`,
 * sortable by any field in {@link SORTABLE_FIELDS},
 * with a default sort of `createdAt:desc`.
 */
export class SourcesTableHandler extends TableHandler {
  readonly tableId = 'sources';

  async handle(request: DefaultTableRequest, _ctx: Context): Promise<TableResponse> {
    const where = request.search
      ? { name: { contains: request.search, mode: 'insensitive' as const } }
      : {};

    const orderBy = this.toOrderBy(request.sort, SORTABLE_FIELDS);

    const [data, total] = await Promise.all([
      db.source.findMany({
        skip: (request.page - 1) * request.limit,
        take: request.limit,
        orderBy,
        where,
      }),
      db.source.count({ where }),
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
