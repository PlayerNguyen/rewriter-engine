import { HandlerNotFoundError } from './errors';
import type { TableHandler } from './handler';
import type { TableRequest } from './models';

/**
 * Per-app registry that maps table IDs to {@link TableHandler} instances.
 *
 * Handlers are registered once during app bootstrap via
 * {@link tableRegistryFactory.create}. Resolution uses each handler's
 * {@link TableHandler.isAssociate | isAssociate} method, allowing one
 * handler to serve multiple table IDs.
 *
 * @example
 * const registry = tableRegistryFactory.create([
 *   new SourcesTableHandler(),
 *   new CrudTableHandler(), // handles 'articles', 'prompts' via isAssociate
 * ]);
 */
export class TableRegistry {
  private handlers: TableHandler[] = [];

  /**
   * Register a handler.
   * @throws If the same handler instance is already registered.
   */
  register(handler: TableHandler): void {
    if (this.handlers.includes(handler)) {
      throw new Error(`Table handler '${handler.tableId}' is already registered`);
    }
    this.handlers.push(handler);
  }

  /**
   * Resolve the first handler whose {@link TableHandler.isAssociate | isAssociate}
   * returns `true` for the given request.
   *
   * @throws {HandlerNotFoundError} If no associated handler is found.
   */
  resolve(request: TableRequest): TableHandler {
    for (const handler of this.handlers) {
      if (handler.isAssociate(request)) {
        return handler;
      }
    }
    throw new HandlerNotFoundError(request.id);
  }
}

/**
 * Factory for building a {@link TableRegistry} from an array of handlers.
 *
 * @example
 * const registry = tableRegistryFactory.create([
 *   new SourcesTableHandler(),
 *   new ArticlesTableHandler(),
 * ]);
 */
export const tableRegistryFactory = {
  /**
   * @param handlers - Array of handler instances to register.
   * @returns A fully configured TableRegistry.
   * @throws If the same handler instance appears more than once.
   */
  create(handlers: TableHandler[]): TableRegistry {
    const registry = new TableRegistry();
    for (const handler of handlers) {
      registry.register(handler);
    }
    return registry;
  },
};
