import type { Context } from 'hono';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver } from 'hono-openapi/zod';
import { z } from 'zod';
import type { AppEnv } from '../types/env';

const health = new Hono<AppEnv>();

health.get(
  '/health',
  describeRoute({
    tags: ['Health'],
    description: 'Health check endpoint',
    responses: {
      200: {
        description: 'Service is healthy',
        content: {
          'application/json': {
            schema: resolver(
              z.object({
                status: z.string(),
                timestamp: z.string(),
              }),
            ),
          },
        },
      },
    },
  }),
  (c: Context<AppEnv>) => {
    c.var.logger.info('health check');
    return c.json({ status: 'ok', timestamp: new Date().toISOString() });
  },
);

export default health;
