import { Text } from '@rewriter/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/sources')({
  component: SourcesPage,
});

function SourcesPage() {
  return <Text size="headline">Sources</Text>;
}
