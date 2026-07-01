import { DataTable } from '@rewriter/table-ui';
import { Button, Pencil, Plus, Stack, Text, Trash2 } from '@rewriter/ui';
import { useTranslation } from 'react-i18next';

export interface SourcesPageProps {
  onCreate?: () => void;
  onEdit?: (
    sourceId: string,
    currentName: string,
    currentUrl: string,
    currentType: string,
    currentIsActive: boolean,
  ) => void;
  onDelete?: (sourceId: string, sourceName: string) => void;
  refreshKey?: number;
}

/**
 * Displays all content sources in a paginated, sortable, searchable table
 * with create, edit, and delete actions.
 *
 * @example
 * ```tsx
 * import { useModal } from '../configs/configureModals';
 * import { toast } from '@rewriter/ui';
 * import { SourcesPage } from '@rewriter/sources-ui';
 *
 * function SourcesRoute() {
 *   const { open } = useModal();
 *   const { t } = useTranslation();
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
 *       onDelete={(id, name) =>
 *         open('confirm', {
 *           title: t('sources.deleteSource'),
 *           message: t('sources.deleteConfirm', { name }),
 *           confirmLabel: t('sources.delete'),
 *           onConfirm: () => deleteApiV1SourcesById(id)
 *             .then(() => { toast.success(t('sources.deleteSuccess')); })
 *             .catch(() => { toast.error(t('sources.deleteError')); }),
 *         })
 *       }
 *     />
 *   );
 * }
 * ```
 */
export function SourcesPage({ onCreate, onEdit, onDelete, refreshKey = 0 }: SourcesPageProps) {
  const { t } = useTranslation();
  return (
    <Stack gap="lg">
      <div className="flex items-center justify-between">
        <Text size="headline" weight={600}>
          {t('sidebar.sources')}
        </Text>
        <Button onClick={onCreate} icon={<Plus size={16} />} size="sm">
          {t('sources.addSource')}
        </Button>
      </div>
      <div key={refreshKey}>
        <DataTable
          tableId="sources"
          searchable
          columns={[
            { accessorKey: 'name', header: t('sources.name') },
            {
              accessorKey: 'url',
              header: t('sources.url'),
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
              header: t('sources.type'),
              cell: ({ getValue }) => {
                const val = getValue() as string;
                return (
                  <span className="inline-block px-2 py-0.5 text-xs rounded bg-surface-2 border border-hairline">
                    {val}
                  </span>
                );
              },
            },
            {
              accessorKey: 'isActive',
              header: t('sources.active'),
              cell: ({ getValue }) => {
                const active = getValue() as boolean;
                return (
                  <span className={active ? 'text-semantic-success' : 'text-ink-subtle'}>
                    {active ? t('sources.yes') : t('sources.no')}
                  </span>
                );
              },
            },
            {
              accessorKey: 'lastFetched',
              header: t('sources.lastFetched'),
              cell: ({ getValue }) => {
                const v = getValue() as string | null;
                return v ? new Date(v).toLocaleString() : '—';
              },
            },
            { accessorKey: 'createdAt', header: t('sources.createdAt') },
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
                      icon={<Pencil size={14} />}
                      onClick={() =>
                        onEdit?.(source.id, source.name, source.url, source.type, source.isActive)
                      }
                    >
                      {t('sources.editSource')}
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      icon={<Trash2 size={14} />}
                      onClick={() => onDelete?.(source.id, source.name)}
                    >
                      {t('sources.delete')}
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
