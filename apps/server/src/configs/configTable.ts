import { TableService, tableRegistryFactory } from '@rewriter/table';
import { ArticlesTableHandler } from '../tables/articles';
import { RewrittenArticlesTableHandler } from '../tables/rewritten-articles';
import { SourcesTableHandler } from '../tables/sources';
import { SystemPromptsTableHandler } from '../tables/system-prompts';

const registry = tableRegistryFactory.create([
  new SourcesTableHandler(),
  new ArticlesTableHandler(),
  new SystemPromptsTableHandler(),
  new RewrittenArticlesTableHandler(),
]);

export const tableService = new TableService(registry);
