import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { requestId } from 'hono/request-id';
import { openAPISpecs } from 'hono-openapi';
import { scalarMiddleware } from './lib/openapi';
import { createRoutes } from './routes';
import type { Scheduler } from './scheduler';
import type { AppEnv } from './types/env';

export function createApp(scheduler: Scheduler) {
  const app = new Hono<AppEnv>();

  app.use(requestId());

  app.use(
    '/api/*',
    cors({
      origin: ['http://localhost:5173'],
      allowMethods: ['GET', 'POST', 'OPTIONS'],
      allowHeaders: ['Content-Type'],
    }),
  );

  app.route('/api/v1', createRoutes(scheduler));

  app.get(
    '/api/v1/doc',
    openAPISpecs(app, {
      documentation: {
        info: {
          title: 'Rewriter Explorer API',
          version: '0.0.1',
          description: 'API for the explorer engine',
        },
        servers: [{ url: 'http://localhost:3002', description: 'Local Dev' }],
      },
    }),
  );

  app.get('/api/v1/scalar', scalarMiddleware);

  return app;
}
