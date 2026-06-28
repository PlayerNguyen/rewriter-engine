import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver, validator as zValidator } from 'hono-openapi/zod';
import { z } from 'zod';
import { SettingsService } from './SettingsService';

const settingsService = new SettingsService();

const updateBodySchema = z.object({
  value: z.union([z.string(), z.number(), z.boolean(), z.record(z.any()), z.array(z.any())]),
});

const settingsRoute = new Hono();

settingsRoute.patch(
  '/settings/:key',
  describeRoute({
    tags: ['Settings'],
    description: 'Update a setting value by key',
    responses: {
      200: {
        description: 'Setting updated successfully',
        content: {
          'application/json': {
            schema: resolver(
              z.object({
                id: z.string(),
                key: z.string(),
                value: z.any(),
                updatedAt: z.string(),
              }),
            ),
          },
        },
      },
      404: { description: 'Setting not found' },
    },
  }),
  zValidator('json', updateBodySchema),
  async (c) => {
    const key = c.req.param('key');
    const { value } = c.req.valid('json');
    const updated = await settingsService.update(key, value);
    return c.json(updated);
  },
);

export default settingsRoute;
