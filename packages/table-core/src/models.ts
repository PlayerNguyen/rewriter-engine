/** Sort direction for table queries. */
export type SortDirection = 'asc' | 'desc';

/**
 * Describes a single sort field and its direction.
 *
 * @example
 * { fieldName: 'createdAt', direction: 'desc' }
 */
export interface SortDto {
  fieldName: string;
  direction: SortDirection;
}

/**
 * Structured payload returned by every {@link TableHandler}.
 * {@link TableService} centralizes JSON serialization so handlers
 * never deal with Hono's Response API directly.
 *
 * @typeParam T - The entity type for each row in `data`.
 */
export interface TableResponse<T = unknown> {
  /** Array of entity rows for the current page. */
  data: T[];
  /** Total number of records matching the query (across all pages). */
  total: number;
  /** Current page number (1-based). */
  page: number;
  /** Results per page. */
  limit: number;
  /** Total number of pages. */
  totalPages: number;
}

/**
 * Generic request contract for table queries.
 * The `id` field identifies which registered table handler to invoke.
 */
export interface TableRequest {
  /**
   * Table identifier — matches a handler's `tableId`
   * (e.g. "sources", "articles").
   */
  id: string;
  /** Page number (1-based). Defaults to 1. */
  page?: number;
  /** Results per page. Defaults to 20. */
  limit?: number;
  /** Sort by a single field and direction. */
  sort?: SortDto;
  /** Full-text search term applied at the handler's discretion. */
  search?: string;
  /** Arbitrary key-value filters applied at the handler's discretion. */
  filters?: Record<string, string>;
}

/**
 * Concrete request class with sensible defaults.
 * - `page` defaults to `1`
 * - `limit` defaults to `20`
 *
 * @example
 * new DefaultTableRequest({
 *   id: 'sources',
 *   page: 2,
 *   sort: { fieldName: 'createdAt', direction: 'desc' },
 * })
 */
export class DefaultTableRequest implements TableRequest {
  readonly id: string;
  readonly page: number;
  readonly limit: number;
  readonly sort?: SortDto;
  readonly search?: string;
  readonly filters?: Record<string, string>;

  constructor(params: {
    id: string;
    page?: number;
    limit?: number;
    sort?: SortDto;
    search?: string;
    filters?: Record<string, string>;
  }) {
    this.id = params.id;
    this.page = params.page ?? 1;
    this.limit = params.limit ?? 20;
    this.sort = params.sort;
    this.search = params.search;
    this.filters = params.filters;
  }
}
