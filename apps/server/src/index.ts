import { logger } from '@rewriter/logger';
import { createApp } from './app';

const app = createApp();

const port = 3001;

logger.info({ port }, `Rewriter API running on http://localhost:${port}`);
logger.info(`Scalar docs at http://localhost:${port}/api/v1/scalar`);
logger.info(`OpenAPI spec at http://localhost:${port}/api/v1/doc`);

export default {
  port,
  fetch: app.fetch,
};
