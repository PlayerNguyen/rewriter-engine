import { logger } from '@rewriter/logger';
import { GenericRSSParser, ParserRegistry, TuoiTreNormalParser } from '@rewriter/parser';
import { createApp } from './app';
import { ExplorerConfig } from './config';
import { Scheduler } from './scheduler';
import { ExplorerService } from './services/explorer.service';

// Build parser registry
const parserRegistry = new ParserRegistry();
parserRegistry.register(new TuoiTreNormalParser());
parserRegistry.register(new GenericRSSParser());

// Load config from DB
const config = await ExplorerConfig.load();

logger.info(
  {
    period: config.period,
    cronPattern: config.cronPattern,
    maxDepth: config.maxDepth,
    enabled: config.enabled,
  },
  'Explorer config loaded',
);

// Create services
const explorer = new ExplorerService(parserRegistry, config);
const scheduler = new Scheduler(config, () => explorer.explore());

// Start scheduler
scheduler.start();

// Create and start API server
const app = createApp(scheduler);
const port = 3002;

logger.info({ port }, `Rewriter Explorer running on http://localhost:${port}`);
logger.info(`Scalar docs at http://localhost:${port}/api/v1/scalar`);

export default {
  port,
  fetch: app.fetch,
};
