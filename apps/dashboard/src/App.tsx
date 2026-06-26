import { DashboardLayout, Sidebar, Text } from '@rewriter/ui';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { configureSidebar } from './configs/configureSidebar';
import { SettingsMenu } from './components/SettingsMenu';

export function App() {
  const { t, i18n } = useTranslation();
  const [expanded, setExpanded] = useState(true);
  const items = useMemo(() => configureSidebar(t), [t]);

  useEffect(() => {
    document.title = t('pageTitle');
  }, [t, i18n.language]);

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
