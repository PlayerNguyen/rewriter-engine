import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver } from 'hono-openapi/zod';
import { z } from 'zod';
import type { Scheduler } from '../scheduler';
import type { AppEnv } from '../types/env';

const statusResponseSchema = z.object({
  running: z.boolean(),
  lastRun: z.string().nullable(),
  lastError: z.string().nullable(),
  enabled: z.boolean(),
  cronPattern: z.string(),
  period: z.string(),
});

const triggerResponseSchema = z.object({
  triggered: z.boolean(),
  reason: z.string().optional(),
});

export function createExploreRoutes(scheduler: Scheduler) {
  const routes = new Hono<AppEnv>();

  routes.get(
    '/status',
    describeRoute({
      tags: ['Explorer'],
      description: 'Get explorer status',
      responses: {
        200: {
          description: 'Explorer status',
          content: {
            'application/json': {
              schema: resolver(statusResponseSchema),
            },
          },
        },
      },
    }),
    (c) => {
      return c.json(scheduler.getStatus());
    },
  );

  routes.post(
    '/trigger',
    describeRoute({
      tags: ['Explorer'],
      description: 'Manually trigger an exploration run',
      responses: {
        200: {
          description: 'Trigger result',
          content: {
            'application/json': {
              schema: resolver(triggerResponseSchema),
            },
          },
        },
      },
    }),
    async (c) => {
      const result = await scheduler.trigger();
      return c.json(result);
    },
  );

  return routes;
}
