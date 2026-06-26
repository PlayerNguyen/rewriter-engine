import { Text } from '@rewriter/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/rewrites')({
  component: RewritesPage,
});

function RewritesPage() {
  return <Text size="headline">Rewrites</Text>;
}
