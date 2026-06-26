import { Text } from '@rewriter/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/prompts')({
  component: PromptsPage,
});

function PromptsPage() {
  return <Text size="headline">Prompts</Text>;
}
