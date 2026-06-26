import { Text } from '@rewriter/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/logs')({
  component: LogsPage,
});

function LogsPage() {
  return <Text size="headline">Logs</Text>;
}
