import { Text } from '@rewriter/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  return <Text size="headline">Settings</Text>;
}
