import { Text } from '@rewriter/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: DashboardHome,
});

function DashboardHome() {
  const { t } = useTranslation();
  return <Text size="headline">{t('dashboard')}</Text>;
}
