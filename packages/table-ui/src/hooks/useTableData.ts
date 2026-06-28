import type { GetApiV1Table200, GetApiV1TableParams } from '@rewriter/rest-client';
import { getApiV1Table } from '@rewriter/rest-client';
import type { SortDto } from '@rewriter/table-core';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseTableDataOptions {
  /** Results per page. @default 10 */
  pageSize?: number;
  /** Initial sort applied on first render. */
  initialSort?: SortDto;
}

export interface UseTableDataResult {
  /** Array of entity rows for the current page. */
  data: unknown[];
  /** Total number of records matching the query (across all pages). */
  total: number;
  /** Current page number (1-based). */
  page: number;
  /** Results per page. */
  limit: number;
  /** Total number of pages. */
  totalPages: number;
  /** Whether a fetch is in progress. */
  isLoading: boolean;
  /** Error message if the last fetch failed, otherwise null. */
  error: string | null;
  /** Current sort state (null = unsorted). */
  sort: SortDto | null;
  /** Current search term. */
  search: string;
  /** Navigate to a specific page. */
  setPage: (page: number) => void;
  /** Set sort state and reset to page 1. */
  setSort: (sort: SortDto | null) => void;
  /** Set search term and reset to page 1. */
  setSearch: (search: string) => void;
  /** Set filter values and reset to page 1. */
  setFilters: (filters: Record<string, string>) => void;
}

/**
 * React hook that fetches table data from the API and manages pagination,
 * sorting, search, and filter state.
 *
 * Internally calls {@link getApiV1Table} from `@rewriter/rest-client`,
 * JSON-stringifying `sort` and `filters` before passing to the API.
 *
 * Catches non-2xx errors thrown by `customFetchInstance` and surfaces
 * the error message via the `error` state.
 *
 * @param tableId - Table identifier (e.g. "sources", "articles").
 * @param options - {@link UseTableDataOptions} for page size and initial sort.
 * @returns {@link UseTableDataResult} with data, pagination, sort, search state, and setters.
 *
 * @example
 * const {
 *   data,
 *   isLoading,
 *   error,
 *   setPage,
 *   setSort,
 * } = useTableData('sources', { pageSize: 20 });
 */
export function useTableData(
  tableId: string,
  options: UseTableDataOptions = {},
): UseTableDataResult {
  const { pageSize = 10, initialSort } = options;

  const [data, setData] = useState<unknown[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPageInternal] = useState(1);
  const [limit] = useState(pageSize);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSortState] = useState<SortDto | null>(initialSort ?? null);
  const [search, setSearchState] = useState('');
  const [filters, setFiltersState] = useState<Record<string, string>>({});

  const mountedRef = useRef(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params: GetApiV1TableParams = {
        id: tableId,
        page,
        limit,
        ...(sort && { sort: JSON.stringify(sort) }),
        ...(search && { search }),
        ...(Object.keys(filters).length > 0 && {
          filters: JSON.stringify(filters),
        }),
      };

      const result: GetApiV1Table200 = await getApiV1Table(params);

      if (!mountedRef.current) return;

      setData(result.data);
      setTotal(result.total);
      setTotalPages(result.totalPages);
    } catch (err) {
      if (!mountedRef.current) return;

      const e = err as { status: number; body?: { error?: string } };
      setError(e.body?.error ?? `Request failed (${e.status})`);
    } finally {
      if (mountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [tableId, page, limit, sort, search, filters]);

  useEffect(() => {
    mountedRef.current = true;
    fetchData();
    return () => {
      mountedRef.current = false;
    };
  }, [fetchData]);

  const setPage = useCallback((p: number) => {
    setPageInternal(p);
  }, []);

  const setSort = useCallback((s: SortDto | null) => {
    setSortState(s);
    setPageInternal(1);
  }, []);

  const setSearch = useCallback((s: string) => {
    setSearchState(s);
    setPageInternal(1);
  }, []);

  const setFilters = useCallback((f: Record<string, string>) => {
    setFiltersState(f);
    setPageInternal(1);
  }, []);

  return {
    data,
    total,
    page,
    limit,
    totalPages,
    isLoading,
    error,
    sort,
    search,
    setPage,
    setSort,
    setSearch,
    setFilters,
  };
}
