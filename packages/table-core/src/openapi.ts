import { resolver } from 'hono-openapi/zod';
import { z } from 'zod';

const tableResponseSchema = z.object({
  data: z.array(z.unknown()),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  totalPages: z.number(),
});

const errorResponseSchema = z.object({
  error: z.string(),
});

/**
 * OpenAPI route description for the table endpoint (GET /api/v1/table).
 *
 * Provides query parameters (`id`, `page`, `limit`, `sort`, `search`, `filters`)
 * and documents the 200, 400, and 404 responses. Consumed by {@link TableService}
 * via `describeRoute` from `hono-openapi`.
 */
export const tableRouteOpenApiDocs = {
  description: 'Query a registered table with pagination, sorting, search, and filters',
  tags: ['Table'],
  parameters: [
    {
      name: 'id',
      in: 'query' as const,
      required: true,
      description: 'Table identifier (e.g. "sources", "articles")',
      schema: { type: 'string' as const },
    },
    {
      name: 'page',
      in: 'query' as const,
      required: false,
      description: 'Page number (1-based, default: 1)',
      schema: { type: 'integer' as const, minimum: 1, default: 1 },
    },
    {
      name: 'limit',
      in: 'query' as const,
      required: false,
      description: 'Results per page (default: 20)',
      schema: { type: 'integer' as const, minimum: 1, default: 20 },
    },
    {
      name: 'sort',
      in: 'query' as const,
      required: false,
      description: 'JSON-encoded sort: {"fieldName":"createdAt","direction":"desc"}',
      schema: { type: 'string' as const },
    },
    {
      name: 'search',
      in: 'query' as const,
      required: false,
      description: 'Full-text search term',
      schema: { type: 'string' as const },
    },
    {
      name: 'filters',
      in: 'query' as const,
      required: false,
      description: 'JSON-encoded key-value filters: {"type":"news"}',
      schema: { type: 'string' as const },
    },
  ],
  responses: {
    200: {
      description: 'Paginated table data',
      content: {
        'application/json': {
          schema: resolver(tableResponseSchema),
        },
      },
    },
    400: {
      description: 'Invalid query parameters',
      content: {
        'application/json': {
          schema: resolver(errorResponseSchema),
        },
      },
    },
    404: {
      description: 'No handler found for the given table id',
      content: {
        'application/json': {
          schema: resolver(errorResponseSchema),
        },
      },
    },
  },
};
