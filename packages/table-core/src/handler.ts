import type { Context } from 'hono';
import type { z } from 'zod';
import type { DefaultTableRequest, SortDto, TableRequest, TableResponse } from './models';
import type { TableQuery } from './schemas';
import { tableQuerySchema } from './schemas';

/**
 * Abstract base class for a table handler.
 * Each handler processes requests for one or more logical tables
 * and is registered into a {@link TableRegistry}.
 *
 * Handlers return a structured {@link TableResponse} — they never
 * touch Hono's `Response` or `ctx.json()`. The {@link TableService}
 * handles serialization centrally.
 *
 * @typeParam T - The entity type returned in `data` rows (defaults to `unknown`).
 *
 * @example
 * // Single-ID handler (default isAssociate checks request.id === tableId)
 * class SourcesTableHandler extends TableHandler<Source> {
 *   readonly tableId = 'sources';
 *   async handle(request, ctx) {
 *     const [data, total] = await Promise.all([...]);
 *     return { data, total, page: request.page, limit: request.limit, totalPages: ... };
 *   }
 * }
 *
 * @example
 * // Multi-ID handler (overrides isAssociate to handle several logical tables)
 * class CrudTableHandler extends TableHandler<unknown> {
 *   readonly tableId = 'crud';
 *
 *   isAssociate(req: TableRequest): boolean {
 *     return ['sources', 'articles', 'prompts'].includes(req.id);
 *   }
 *
 *   async handle(request, ctx) {
 *     switch (request.id) {
 *       case 'sources': ...
 *       case 'articles': ...
 *     }
 *   }
 * }
 */
export abstract class TableHandler<T = unknown> {
  /** Unique identifier for this handler (used for registration and debugging). */
  abstract readonly tableId: string;

  /**
   * Determines whether this handler should process the given request.
   *
   * Default implementation checks `request.id === this.tableId`.
   * Override to service multiple table IDs or apply custom matching logic.
   *
   * @param request - The incoming table request.
   * @returns `true` if this handler should process the request.
   */
  isAssociate(request: TableRequest): boolean {
    return request.id === this.tableId;
  }

  /**
   * Returns the Zod validation schema for incoming table query parameters.
   *
   * The base schema validates `id`, `page`, `limit`, `sort`, `search`,
   * and `filters`. Override in subclasses to add entity-specific
   * constraints (e.g. allowed filter keys, sortable field names).
   *
   * @returns A Zod schema whose input is a flat `Record<string, string>`
   *          (raw query params) and whose output is a validated
   *          {@link TableQuery}.
   *
   * @example
   * // Subclass extending validation with allowed filter keys
   * class SourcesTableHandler extends TableHandler {
   *   getValidationSchema() {
   *     return super.getValidationSchema().extend({
   *       filters: z.record(z.enum(['type', 'isActive'])).optional(),
   *     });
   *   }
   * }
   */
  getValidationSchema(): z.ZodSchema<TableQuery> {
    return tableQuerySchema as z.ZodSchema<TableQuery>;
  }

  /**
   * Builds a Prisma-compatible `orderBy` clause from a {@link SortDto}.
   * Falls back to `{ createdAt: 'desc' }` when `sort` is undefined
   * or the requested field is not in the allowlist.
   *
   * @param sort           - Sort specification from the request.
   * @param sortableFields - Allowlisted field names for this entity.
   * @returns A single-key sort record safe for Prisma queries.
   */
  protected toOrderBy(
    sort: SortDto | undefined,
    sortableFields: readonly string[],
  ): Record<string, 'asc' | 'desc'> {
    if (!sort) return { createdAt: 'desc' };
    if (sortableFields.includes(sort.fieldName)) {
      return { [sort.fieldName]: sort.direction };
    }
    return { createdAt: 'desc' };
  }

  /**
   * Process a table request and return a structured data payload.
   * @param request - The parsed and validated table request.
   * @param ctx     - The Hono request context (for logging, headers, etc.).
   * @returns A {@link TableResponse} containing the paginated result set.
   */
  abstract handle(request: DefaultTableRequest, ctx: Context): Promise<TableResponse<T>>;
}
