import { DataTable } from '@rewriter/table-ui';
import { Button, Stack, Text } from '@rewriter/ui';

export interface SourcesPageProps {
  onCreate?: () => void;
  onEdit?: (
    sourceId: string,
    currentName: string,
    currentUrl: string,
    currentType: string,
    currentIsActive: boolean,
    onSaved: () => void,
  ) => void;
  onDelete?: (sourceId: string, sourceName: string, onDeleted: () => void) => void;
  refreshKey?: number;
}

/**
 * Displays all content sources in a paginated, sortable, searchable table
 * with create, edit, and delete actions.
 *
 * @example
 * ```tsx
 * import { useModal } from '../configs/configureModals';
 * import { SourcesPage } from '@rewriter/sources-ui';
 *
 * function SourcesRoute() {
 *   const { open } = useModal();
 *   const [refreshKey, setRefreshKey] = useState(0);
 *   return (
 *     <SourcesPage
 *       refreshKey={refreshKey}
 *       onCreate={() => open('create-source', {
 *         onCreated: () => setRefreshKey((k) => k + 1),
 *       })}
 *       onEdit={(id, name, url, type, isActive) =>
 *         open('edit-source', {
 *           sourceId: id, currentName: name, currentUrl: url,
 *           currentType: type, currentIsActive: isActive,
 *           onSaved: () => setRefreshKey((k) => k + 1),
 *         })
 *       }
 *       onDelete={(id, name, onDeleted) => {
 *         if (confirm(`Delete source "${name}"?`)) {
 *           fetch(`/api/v1/sources/${id}`, { method: 'DELETE' }).then(() => onDeleted());
 *         }
 *       }}
 *     />
 *   );
 * }
 * ```
 */
export function SourcesPage({ onCreate, onEdit, onDelete, refreshKey = 0 }: SourcesPageProps) {
  return (
    <Stack gap="lg">
      <div className="flex items-center justify-between">
        <Text size="headline" weight={600}>
          Sources
        </Text>
        <Button onClick={onCreate}>Add Source</Button>
      </div>
      <div key={refreshKey}>
        <DataTable
          tableId="sources"
          searchable
          columns={[
            { accessorKey: 'name', header: 'Name' },
            {
              accessorKey: 'url',
              header: 'URL',
              cell: ({ getValue }) => {
                const url = getValue() as string;
                return (
                  <span className="truncate block max-w-xs" title={url}>
                    {url}
                  </span>
                );
              },
            },
            {
              accessorKey: 'type',
              header: 'Type',
              cell: ({ getValue }) => {
                const t = getValue() as string;
                return (
                  <span className="inline-block px-2 py-0.5 text-xs rounded bg-surface-2 border border-hairline">
                    {t}
                  </span>
                );
              },
            },
            {
              accessorKey: 'isActive',
              header: 'Active',
              cell: ({ getValue }) => {
                const active = getValue() as boolean;
                return (
                  <span className={active ? 'text-semantic-success' : 'text-ink-subtle'}>
                    {active ? 'Yes' : 'No'}
                  </span>
                );
              },
            },
            {
              accessorKey: 'lastFetched',
              header: 'Last Fetched',
              cell: ({ getValue }) => {
                const v = getValue() as string | null;
                return v ? new Date(v).toLocaleString() : '—';
              },
            },
            { accessorKey: 'createdAt', header: 'Created' },
            {
              id: 'actions',
              header: '',
              cell: ({ row }) => {
                const source = row.original as unknown as {
                  id: string;
                  name: string;
                  url: string;
                  type: string;
                  isActive: boolean;
                };
                return (
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onEdit?.(
                          source.id,
                          source.name,
                          source.url,
                          source.type,
                          source.isActive,
                          () => {},
                        )
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete?.(source.id, source.name, () => {})}
                    >
                      Delete
                    </Button>
                  </div>
                );
              },
            },
          ]}
        />
      </div>
    </Stack>
  );
}
