import { SettingsTableHandler } from '@rewriter/settings';
import { SourcesTableHandler } from '@rewriter/sources';
import { TableService, tableRegistryFactory } from '@rewriter/table-core';
import { ArticlesTableHandler } from '../tables/articles';
import { RewrittenArticlesTableHandler } from '../tables/rewritten-articles';
import { SystemPromptsTableHandler } from '../tables/system-prompts';

const registry = tableRegistryFactory.create([
  new SourcesTableHandler(),
  new ArticlesTableHandler(),
  new SystemPromptsTableHandler(),
  new RewrittenArticlesTableHandler(),
  new SettingsTableHandler(),
]);

/**
 * App-wide singleton {@link TableService} with all entity handlers
 * pre-registered. Mounted at `/api/v1/table` in {@link createApp}.
 */
export const tableService = new TableService(registry);
