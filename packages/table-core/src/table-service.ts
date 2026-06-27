import type { Context } from 'hono';
import { Hono } from 'hono';
import { HandlerNotFoundError } from './errors';
import type { TableHandler } from './handler';
import { DefaultTableRequest } from './models';
import type { TableRegistry } from './registry';
import { tableQuerySchema } from './schemas';

/**
 * Service layer that bridges Hono HTTP requests to the {@link TableRegistry}.
 *
 * Responsibilities:
 * - Parse incoming query params into a {@link DefaultTableRequest}.
 * - Validate via Zod (positive integers, JSON parse for sort/filters, etc.).
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
   * Validation uses the handler's {@link TableHandler.getValidationSchema | getValidationSchema()},
   * which defaults to the base {@link tableQuerySchema} and can be extended
   * by subclasses for entity-specific constraints. Invalid or missing
   * parameters return a **400 Bad Request** with a descriptive error message.
   *
   * @returns A Hono instance to be mounted via `app.route(path, ...)`.
   */
  registerToHono(): Hono {
    const router = new Hono();

    router.get('/', async (c) => {
      const q = c.req.query();

      const parsed = tableQuerySchema.safeParse(q);
      if (!parsed.success) {
        return c.json(
          { error: parsed.error.issues[0]?.message ?? 'Invalid query parameters' },
          400,
        );
      }

      const request = new DefaultTableRequest({
        id: parsed.data.id,
        page: parsed.data.page,
        limit: parsed.data.limit,
        sort: parsed.data.sort,
        search: parsed.data.search,
        filters: parsed.data.filters,
      });

      let handler: TableHandler;
      try {
        handler = this.registry.resolve(request);
      } catch (e) {
        if (e instanceof HandlerNotFoundError) {
          return c.json({ error: e.message }, 404);
        }
        throw e;
      }

      const handlerSchema = handler.getValidationSchema();
      if (handlerSchema !== tableQuerySchema) {
        const handlerParsed = handlerSchema.safeParse(q);
        if (!handlerParsed.success) {
          return c.json(
            { error: handlerParsed.error.issues[0]?.message ?? 'Invalid query parameters' },
            400,
          );
        }
      }

      return await this.handle(request, c);
    });

    return router;
  }
}
