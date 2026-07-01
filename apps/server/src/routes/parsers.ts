import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver } from 'hono-openapi/zod';
import { z } from 'zod';
import { parserRegistry } from '../configs/configureParsers';

const parserSchema = z.object({
  key: z.string(),
  name: z.string(),
  urlPatterns: z.array(z.string()),
});

const parsersRoute = new Hono();

parsersRoute.get(
  '/parsers',
  describeRoute({
    tags: ['Parsers'],
    description: 'List all available parsers',
    responses: {
      200: {
        description: 'List of parsers',
        content: {
          'application/json': {
            schema: resolver(z.array(parserSchema)),
          },
        },
      },
    },
  }),
  (c) => {
    return c.json(parserRegistry.list());
  },
);

export default parsersRoute;
