import { SettingsPage } from '@rewriter/settings-ui';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useModal } from '../configs/configureModals';

export const Route = createFileRoute('/settings')({
  component: SettingsRoute,
});

function SettingsRoute() {
  const { open } = useModal();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <SettingsPage
      refreshKey={refreshKey}
      onEdit={(key, value) =>
        open('edit-setting', {
          settingKey: key,
          currentValue: value,
          onSaved: () => setRefreshKey((k) => k + 1),
        })
      }
    />
  );
}
