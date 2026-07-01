import { SourcesPage } from '@rewriter/sources-ui';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useModal } from '../configs/configureModals';

export const Route = createFileRoute('/sources')({
  component: SourcesRoute,
});

function SourcesRoute() {
  const { open } = useModal();
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <SourcesPage
      refreshKey={refreshKey}
      onCreate={() =>
        open('create-source', {
          onCreated: () => setRefreshKey((k) => k + 1),
        })
      }
      onEdit={(id, name, url, type, isActive) =>
        open('edit-source', {
          sourceId: id,
          currentName: name,
          currentUrl: url,
          currentType: type,
          currentIsActive: isActive,
          onSaved: () => setRefreshKey((k) => k + 1),
        })
      }
      onDelete={(id, name) =>
        open('confirm', {
          title: 'Delete Source',
          message: `Are you sure you want to delete "${name}"?`,
          confirmLabel: 'Delete',
          onConfirm: () => {
            fetch(`/api/v1/sources/${id}`, { method: 'DELETE' }).then(() => {
              setRefreshKey((k) => k + 1);
            });
          },
        })
      }
    />
  );
}
