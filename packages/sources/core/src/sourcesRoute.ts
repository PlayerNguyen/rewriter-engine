import { PrismaClientKnownRequestError } from '@rewriter/db';
import { Hono } from 'hono';
import { describeRoute } from 'hono-openapi';
import { resolver, validator as zValidator } from 'hono-openapi/zod';
import { z } from 'zod';
import { SourcesService } from './SourcesService';

const sourcesService = new SourcesService();

const sourceTypeSchema = z.enum(['RSS', 'WEB', 'API']);

const createSourceSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
  type: sourceTypeSchema.default('RSS'),
  isActive: z.boolean().default(true),
});

const updateSourceSchema = z
  .object({
    name: z.string().min(1),
    url: z.string().url(),
    type: sourceTypeSchema,
    isActive: z.boolean(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided',
  });

const sourceResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  type: sourceTypeSchema,
  isActive: z.boolean(),
  lastFetched: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const idParamSchema = z.object({ id: z.string().uuid() });

const sourcesRoute = new Hono();

sourcesRoute.post(
  '/sources',
  describeRoute({
    tags: ['Sources'],
    description: 'Create a new content source',
    responses: {
      201: {
        description: 'Source created successfully',
        content: {
          'application/json': {
            schema: resolver(sourceResponseSchema),
          },
        },
      },
      400: { description: 'Validation error' },
    },
  }),
  zValidator('json', createSourceSchema),
  async (c) => {
    const body = c.req.valid('json');
    const source = await sourcesService.create(body);
    return c.json(source, 201);
  },
);

sourcesRoute.patch(
  '/sources/:id',
  describeRoute({
    tags: ['Sources'],
    description: 'Update an existing source',
    responses: {
      200: {
        description: 'Source updated successfully',
        content: {
          'application/json': {
            schema: resolver(sourceResponseSchema),
          },
        },
      },
      400: { description: 'Validation error' },
      404: { description: 'Source not found' },
    },
  }),
  zValidator('param', idParamSchema),
  zValidator('json', updateSourceSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const body = c.req.valid('json');
    try {
      const source = await sourcesService.update(id, body);
      return c.json(source);
    } catch (e: unknown) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        return c.json({ error: 'Source not found' }, 404);
      }
      throw e;
    }
  },
);

sourcesRoute.delete(
  '/sources/:id',
  describeRoute({
    tags: ['Sources'],
    description: 'Delete a source',
    responses: {
      200: {
        description: 'Source deleted successfully',
        content: {
          'application/json': {
            schema: resolver(sourceResponseSchema),
          },
        },
      },
      400: { description: 'Validation error' },
      404: { description: 'Source not found' },
    },
  }),
  zValidator('param', idParamSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    try {
      const source = await sourcesService.delete(id);
      return c.json(source);
    } catch (e: unknown) {
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2025') {
        return c.json({ error: 'Source not found' }, 404);
      }
      throw e;
    }
  },
);

export default sourcesRoute;
