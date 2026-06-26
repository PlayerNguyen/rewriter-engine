import { Bot, Box, FileText, Grid, GridItem, Link, Newspaper, Stack, Text } from '@rewriter/ui';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/')({
  component: DashboardHome,
});

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <Box bg="var(--colors-surface-1)" border="var(--colors-hairline)" rounded="lg" p="lg">
      <Stack direction="horizontal" align="center" gap="sm">
        <Box bg="var(--colors-surface-2)" p="sm" rounded="md" display="inline-flex">
          <Icon className="w-5 h-5 text-ink-subtle" />
        </Box>
        <Stack gap="xxs" align="start">
          <Text size="caption" color="ink-subtle">
            {label}
          </Text>
          <Text size="headline" weight={600}>
            {value}
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}

function SystemStatusCard() {
  const { t } = useTranslation();
  return (
    <Box bg="var(--colors-surface-1)" border="var(--colors-hairline)" rounded="lg" p="lg">
      <Stack gap="md">
        <Stack direction="horizontal" align="center" gap="sm">
          <span className="w-2 h-2 rounded-full bg-[var(--colors-semantic-success)]" />
          <Text size="card-title" weight={600}>
            {t('home.systemStatus')}
          </Text>
        </Stack>
        <Box bg="var(--colors-surface-2)" rounded="md" p="md">
          <Stack direction="horizontal" align="center" justify="between">
            <Text size="body-sm">{t('home.systemOperational')}</Text>
            <span className="w-2 h-2 rounded-full bg-[var(--colors-semantic-success)]" />
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

function RecentActivityCard() {
  const { t } = useTranslation();
  return (
    <Box bg="var(--colors-surface-1)" border="var(--colors-hairline)" rounded="lg" p="lg">
      <Stack gap="md">
        <Text size="card-title" weight={600}>
          {t('home.recentActivity')}
        </Text>
        <Box bg="var(--colors-surface-2)" rounded="md" p="md">
          <Text size="body-sm" color="ink-muted">
            {t('home.noActivity')}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
}

function DashboardHome() {
  const { t } = useTranslation();

  return (
    <Stack gap="lg">
      <Stack gap="xs">
        <Text size="headline" weight={600}>
          {t('home.title')}
        </Text>
        <Text size="body" color="ink-muted">
          {t('home.statsSubtext')}
        </Text>
      </Stack>

      <Grid columns={4} gap="lg">
        <GridItem>
          <StatCard icon={Newspaper} label={t('home.totalArticles')} value="42" />
        </GridItem>
        <GridItem>
          <StatCard icon={FileText} label={t('home.totalRewrites')} value="128" />
        </GridItem>
        <GridItem>
          <StatCard icon={Link} label={t('home.activeSources')} value="5" />
        </GridItem>
        <GridItem>
          <StatCard icon={Bot} label={t('home.activePrompts')} value="3" />
        </GridItem>
      </Grid>

      <Grid columns={2} gap="lg">
        <GridItem>
          <SystemStatusCard />
        </GridItem>
        <GridItem>
          <RecentActivityCard />
        </GridItem>
      </Grid>
    </Stack>
  );
}
