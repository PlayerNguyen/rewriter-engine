import { db } from '@rewriter/db';
import type { TableResponse } from '@rewriter/table-core';
import { type DefaultTableRequest, TableHandler } from '@rewriter/table-core';
import type { Context } from 'hono';

const SORTABLE_FIELDS = ['name', 'isDefault', 'createdAt', 'updatedAt'] as const;

/**
 * Table handler for the **system-prompts** entity.
 *
 * Supports full-text search across `name` and `description`,
 * sortable by any field in {@link SORTABLE_FIELDS},
 * with a default sort of `createdAt:desc`.
 */
export class SystemPromptsTableHandler extends TableHandler {
  readonly tableId = 'system-prompts';

  async handle(request: DefaultTableRequest, _ctx: Context): Promise<TableResponse> {
    const where = request.search
      ? {
          OR: [
            {
              name: { contains: request.search, mode: 'insensitive' as const },
            },
            {
              description: {
                contains: request.search,
                mode: 'insensitive' as const,
              },
            },
          ],
        }
      : {};

    const orderBy = this.toOrderBy(request.sort, SORTABLE_FIELDS);

    const [data, total] = await Promise.all([
      db.systemPrompt.findMany({
        skip: (request.page - 1) * request.limit,
        take: request.limit,
        orderBy,
        where,
      }),
      db.systemPrompt.count({ where }),
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
