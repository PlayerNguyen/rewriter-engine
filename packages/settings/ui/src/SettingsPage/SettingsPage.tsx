import { DataTable } from '@rewriter/table-ui';
import { Button, Stack, Text } from '@rewriter/ui';

export interface SettingsPageProps {
  onEdit?: (key: string, currentValue: unknown, onSaved: () => void) => void;
  refreshKey?: number;
}

/**
 * Displays all system settings in a paginated, sortable, searchable table
 * with an inline edit button per row.
 *
 * The edit button delegates to {@link SettingsPageProps.onEdit | onEdit} —
 * the app is responsible for opening a modal and calling the `onSaved`
 * callback after a successful save. Incrementing `refreshKey` causes the
 * table to remount and re-fetch.
 *
 * @example
 * ```tsx
 * import { useModal } from '../config/configureModals';
 * import { SettingsPage } from '@rewriter/settings-ui';
 *
 * function SettingsRoute() {
 *   const { open } = useModal();
 *   const [refreshKey, setRefreshKey] = useState(0);
 *   return (
 *     <SettingsPage
 *       refreshKey={refreshKey}
 *       onEdit={(key, value, onSaved) =>
 *         open('edit-setting', { settingKey: key, currentValue: value, onSaved })
 *       }
 *     />
 *   );
 * }
 * ```
 */
export function SettingsPage({
  onEdit,
  refreshKey = 0,
}: SettingsPageProps) {
  return (
    <Stack gap="lg">
      <Text size="headline" weight={600}>
        Settings
      </Text>
      <div key={refreshKey}>
        <DataTable
          tableId="settings"
          searchable
          columns={[
            { accessorKey: 'key', header: 'Key' },
            {
              accessorKey: 'value',
              header: 'Value',
              cell: ({ getValue }) => {
                const v = getValue();
                return typeof v === 'string' ? v : JSON.stringify(v);
              },
            },
            { accessorKey: 'updatedAt', header: 'Updated' },
            { accessorKey: 'createdAt', header: 'Created' },
            {
              id: 'actions',
              header: '',
              cell: ({ row }) => {
                const setting = row.original as {
                  key: string;
                  value: unknown;
                };
                return (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      onEdit?.(setting.key, setting.value, () => {})
                    }
                  >
                    Edit
                  </Button>
                );
              },
            },
          ]}
        />
      </div>
    </Stack>
  );
}
