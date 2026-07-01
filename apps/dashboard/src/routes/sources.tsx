import { deleteApiV1SourcesById } from '@rewriter/rest-client';
import { SourcesPage } from '@rewriter/sources-ui';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useModal } from '../configs/configureModals';

export const Route = createFileRoute('/sources')({
  component: SourcesRoute,
});

function SourcesRoute() {
  const { open } = useModal();
  const { t } = useTranslation();
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
          title: t('sources.deleteSource'),
          message: t('sources.deleteConfirm', { name }),
          confirmLabel: t('sources.delete'),
          onConfirm: () => {
            deleteApiV1SourcesById(id).then(() => {
              setRefreshKey((k) => k + 1);
            });
          },
        })
      }
    />
  );
}
