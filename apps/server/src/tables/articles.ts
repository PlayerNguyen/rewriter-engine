import { db } from '@rewriter/db';
import type { TableResponse } from '@rewriter/table-core';
import { type DefaultTableRequest, TableHandler } from '@rewriter/table-core';
import type { Context } from 'hono';

const SORTABLE_FIELDS = [
  'title',
  'url',
  'author',
  'status',
  'publishedAt',
  'fetchedAt',
  'createdAt',
] as const;

/**
 * Table handler for the **articles** entity.
 *
 * Supports full-text search across `title` and `url`,
 * sortable by any field in {@link SORTABLE_FIELDS},
 * with a default sort of `createdAt:desc`.
 */
export class ArticlesTableHandler extends TableHandler {
  readonly tableId = 'articles';

  async handle(request: DefaultTableRequest, _ctx: Context): Promise<TableResponse> {
    const where = request.search
      ? {
          OR: [
            { title: { contains: request.search, mode: 'insensitive' as const } },
            { url: { contains: request.search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const orderBy = this.toOrderBy(request.sort, SORTABLE_FIELDS);

    const [data, total] = await Promise.all([
      db.article.findMany({
        skip: (request.page - 1) * request.limit,
        take: request.limit,
        orderBy,
        where,
      }),
      db.article.count({ where }),
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
