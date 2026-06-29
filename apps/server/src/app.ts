import { structuredLogger } from '@hono/structured-logger';
import { logger } from '@rewriter/logger';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { requestId } from 'hono/request-id';
import { openAPISpecs } from 'hono-openapi';
import { tableService } from './configs/configTable';
import { scalarMiddleware } from './lib/openapi';
import { errorHandler } from './middleware/error-handler';
import routes from './routes';
import type { AppEnv } from './types/env';

export function createApp() {
  const app = new Hono<AppEnv>();

  // Request ID + structured logging
  app.use(requestId());
  app.use(
    structuredLogger({
      createLogger: (c) => logger.child({ requestId: c.var.requestId }),
    }),
  );

  // CORS — allow dashboard to call the API
  app.use(
    '/api/*',
    cors({
      origin: ['http://localhost:5173'],
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    }),
  );

  // Global error handler — logs via Pino, returns JSON error responses
  app.onError(errorHandler);

  // Mount table API — generic endpoint for all registered table handlers
  app.route('/api/v1/table', tableService.registerToHono());

  // Mount API routes under /api/v1
  app.route('/api/v1', routes);

  // OpenAPI spec (JSON)
  app.get(
    '/api/v1/doc',
    openAPISpecs(app, {
      documentation: {
        info: {
          title: 'Rewriter API',
          version: '0.0.1',
          description: 'API for the content rewriter pipeline',
        },
        servers: [{ url: 'http://localhost:3001', description: 'Local Dev' }],
      },
    }),
  );

  // Scalar API reference UI
  app.get('/api/v1/scalar', scalarMiddleware);

  return app;
}
