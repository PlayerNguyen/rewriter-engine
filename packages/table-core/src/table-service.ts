import type { Context } from 'hono';
import { Hono } from 'hono';
import { HandlerNotFoundError } from './errors';
import { DefaultTableRequest } from './models';
import type { TableRegistry } from './registry';

/**
 * Service layer that bridges Hono HTTP requests to the {@link TableRegistry}.
 *
 * Responsibilities:
 * - Parse incoming query params into a {@link DefaultTableRequest}.
 * - Guard JSON.parse with try/catch → 400 on malformed sort/filters.
 * - Resolve the correct {@link TableHandler} from the registry.
 * - Delegate to the handler and wrap the {@link TableResponse} with ctx.json().
 * - Surface {@link HandlerNotFoundError} as a 404 JSON response.
 *
 * @example
 * // Bootstrap
 * const registry = tableRegistryFactory.create([...]);
 * const tableService = new TableService(registry);
 *
 * // Mount in Hono
 * app.route('/api/v1/table', tableService.registerToHono());
 */
export class TableService {
  constructor(private registry: TableRegistry) {}

  /**
   * Resolve the handler via each handler's {@link TableHandler.isAssociate | isAssociate}
   * check, delegate, and serialize the returned {@link TableResponse} via `ctx.json()`.
   * @throws {HandlerNotFoundError} if no associated handler is found.
   */
  async handle(request: DefaultTableRequest, ctx: Context): Promise<Response> {
    const handler = this.registry.resolve(request);
    const result = await handler.handle(request, ctx);
    return ctx.json(result);
  }

  /**
   * Creates a Hono sub-app that handles `GET /` with query parameters:
   *   - `id` (required) — table identifier
   *   - `page`, `limit` — pagination (defaults 1 / 20)
   *   - `sort` — JSON-encoded {@link SortDto}
   *   - `search` — full-text search term
   *   - `filters` — JSON-encoded key-value map
   *
   * Malformed `sort` or `filters` JSON returns a **400 Bad Request**
   * instead of a 500 crash. Missing `id` also returns 400.
   *
   * @returns A Hono instance to be mounted via `app.route(path, ...)`.
   */
  registerToHono(): Hono {
    const router = new Hono();

    router.get('/', async (c) => {
      const q = c.req.query();
      if (!q.id) {
        return c.json({ error: 'Missing required parameter: id' }, 400);
      }

      let sort: { fieldName: string; direction: 'asc' | 'desc' } | undefined;
      if (q.sort) {
        try {
          sort = JSON.parse(q.sort);
        } catch {
          return c.json({ error: 'Invalid sort parameter: must be valid JSON' }, 400);
        }
      }

      let filters: Record<string, string> | undefined;
      if (q.filters) {
        try {
          filters = JSON.parse(q.filters);
        } catch {
          return c.json({ error: 'Invalid filters parameter: must be valid JSON' }, 400);
        }
      }

      const request = new DefaultTableRequest({
        id: q.id,
        page: q.page ? Number(q.page) : undefined,
        limit: q.limit ? Number(q.limit) : undefined,
        sort,
        search: q.search,
        filters,
      });

      try {
        return await this.handle(request, c);
      } catch (e) {
        if (e instanceof HandlerNotFoundError) {
          return c.json({ error: e.message }, 404);
        }
        throw e;
      }
    });

    return router;
  }
}
