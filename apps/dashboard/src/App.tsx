import { DashboardLayout, Sidebar, Text } from '@rewriter/ui';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SettingsMenu } from './components/SettingsMenu';
import { configureSidebar } from './configs/configureSidebar';

export function App() {
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
        />
      }
    >
      <Text size="headline">{t('dashboard')}</Text>
    </DashboardLayout>
  );
}
