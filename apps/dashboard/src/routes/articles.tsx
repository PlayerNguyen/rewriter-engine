import { Text } from '@rewriter/ui';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/articles')({
  component: ArticlesPage,
});

function ArticlesPage() {
  return <Text size="headline">Articles</Text>;
}
