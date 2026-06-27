/**
 * Thrown when a {@link TableRegistry} cannot resolve a table ID
 * to a registered {@link TableHandler}.
 */
export class HandlerNotFoundError extends Error {
  readonly tableId: string;

  constructor(tableId: string) {
    super(`No table handler registered for '${tableId}'`);
    this.name = 'HandlerNotFoundError';
    this.tableId = tableId;
  }
}
