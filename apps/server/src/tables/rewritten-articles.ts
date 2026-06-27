import { db } from '@rewriter/db';
import type { TableResponse } from '@rewriter/table-core';
import { type DefaultTableRequest, TableHandler } from '@rewriter/table-core';
import type { Context } from 'hono';

const SORTABLE_FIELDS = ['title', 'llmModel', 'tokensUsed', 'processingTime', 'createdAt'] as const;

/**
 * Table handler for the **rewritten-articles** entity.
 *
 * Supports full-text search across `title`, `content`, and `llmModel`,
 * sortable by any field in {@link SORTABLE_FIELDS},
 * with a default sort of `createdAt:desc`.
 */
export class RewrittenArticlesTableHandler extends TableHandler {
  readonly tableId = 'rewritten-articles';

  async handle(request: DefaultTableRequest, _ctx: Context): Promise<TableResponse> {
    const where = request.search
      ? {
          OR: [
            { title: { contains: request.search, mode: 'insensitive' as const } },
            { content: { contains: request.search, mode: 'insensitive' as const } },
            { llmModel: { contains: request.search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const orderBy = this.toOrderBy(request.sort, SORTABLE_FIELDS);

    const [data, total] = await Promise.all([
      db.rewrittenArticle.findMany({
        skip: (request.page - 1) * request.limit,
        take: request.limit,
        orderBy,
        where,
      }),
      db.rewrittenArticle.count({ where }),
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
