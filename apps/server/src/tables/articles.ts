import { db } from '@rewriter/db';
import type { SortDto, TableResponse } from '@rewriter/table';
import { type DefaultTableRequest, TableHandler } from '@rewriter/table';
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

    const orderBy = this.toOrderBy(request.sort);

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

  private toOrderBy(sort?: SortDto): Record<string, 'asc' | 'desc'> {
    if (!sort) return { createdAt: 'desc' };
    if (SORTABLE_FIELDS.includes(sort.fieldName as (typeof SORTABLE_FIELDS)[number])) {
      return { [sort.fieldName]: sort.direction };
    }
    return { createdAt: 'desc' };
  }
}
