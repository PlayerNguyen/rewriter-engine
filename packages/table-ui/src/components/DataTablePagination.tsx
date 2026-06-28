export interface DataTablePaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function DataTablePagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
}: DataTablePaginationProps) {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <span className="text-sm text-muted-foreground">
        {total === 0 ? 'No results' : `${from}–${to} of ${total}`}
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="px-3 py-1 text-sm rounded border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent transition-colors"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => {
            if (totalPages <= 7) return true;
            if (p === 1 || p === totalPages) return true;
            if (p >= page - 1 && p <= page + 1) return true;
            return false;
          })
          .map((p, idx, arr) => {
            const showEllipsis = idx > 0 && p - (arr[idx - 1] ?? 0) > 1;

            return (
              <span key={p} className="flex items-center gap-1">
                {showEllipsis && <span className="px-1 text-muted-foreground">…</span>}
                <button
                  type="button"
                  disabled={p === page}
                  onClick={() => onPageChange(p)}
                  className={`px-3 py-1 text-sm rounded border transition-colors ${
                    p === page
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'hover:bg-accent'
                  }`}
                >
                  {p}
                </button>
              </span>
            );
          })}
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="px-3 py-1 text-sm rounded border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-accent transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
