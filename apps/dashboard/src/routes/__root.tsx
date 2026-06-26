import { DashboardLayout, Sidebar } from '@rewriter/ui';
import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsMenu } from '../components/SettingsMenu';
import { configureSidebar } from '../configs/configureSidebar';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  const items = useMemo(() => configureSidebar(t), [t]);

  useEffect(() => {
    document.title = t('pageTitle');
  }, [t]);

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          expanded={expanded}
          onToggle={() => setExpanded(!expanded)}
          items={items}
          footer={<SettingsMenu expanded={expanded} />}
          linkComponent={Link}
        />
      }
    >
      <Outlet />
    </DashboardLayout>
  );
}
