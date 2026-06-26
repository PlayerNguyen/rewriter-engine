import { DashboardLayout, Sidebar } from '@rewriter/ui';
import { Link, Outlet, createRootRoute, useRouterState } from '@tanstack/react-router';
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
  const { location } = useRouterState();

  const items = useMemo(() => {
    const pathname = location.pathname;
    return configureSidebar(t).map((item) => {
      if ('children' in item) {
        const hasActiveChild = item.children.some((c) => c.to === pathname);
        return {
          ...item,
          defaultExpanded: hasActiveChild,
          children: item.children.map((child) => ({
            ...child,
            active: child.to === pathname,
          })),
        };
      }
      return { ...item, active: item.to === pathname };
    });
  }, [t, location.pathname]);

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
