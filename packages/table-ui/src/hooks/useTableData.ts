import type { GetApiV1Table200, GetApiV1TableParams } from '@rewriter/rest-client';
import { getApiV1Table } from '@rewriter/rest-client';
import type { SortDto } from '@rewriter/table-core';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseTableDataOptions {
  pageSize?: number;
  initialSort?: SortDto;
}

export interface UseTableDataResult {
  data: unknown[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  sort: SortDto | null;
  search: string;
  setPage: (page: number) => void;
  setSort: (sort: SortDto | null) => void;
  setSearch: (search: string) => void;
  setFilters: (filters: Record<string, string>) => void;
}

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
