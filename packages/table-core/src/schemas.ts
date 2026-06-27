import { z } from 'zod';

const sortDtoSchema = z.object({
  fieldName: z.string().min(1),
  direction: z.enum(['asc', 'desc']),
});

const jsonSortSchema = z.string().transform((s) => sortDtoSchema.parse(JSON.parse(s)));

const jsonFiltersSchema = z.string().transform((s) => z.record(z.string()).parse(JSON.parse(s)));

/**
 * Zod validation schema for table endpoint query parameters.
 *
 * Coerces `page` and `limit` to positive integers with defaults,
 * and parses `sort` / `filters` JSON strings into their typed shapes.
 * Missing `id` is caught as a validation error.
 *
 * @example
 * const parsed = tableQuerySchema.parse({
 *   id: 'sources',
 *   page: '1',
 *   limit: '20',
 *   sort: '{"fieldName":"createdAt","direction":"desc"}',
 * });
 */
export const tableQuerySchema = z.object({
  id: z.string().min(1, 'id is required'),
  page: z.coerce.number().int('page must be an integer').positive('page must be >= 1').default(1),
  limit: z.coerce
    .number()
    .int('limit must be an integer')
    .positive('limit must be >= 1')
    .default(20),
  sort: jsonSortSchema.optional(),
  search: z.string().optional(),
  filters: jsonFiltersSchema.optional(),
});

/** Output type after successful Zod validation of query parameters. */
export type TableQuery = z.output<typeof tableQuerySchema>;
