# @rewriter/logger — Shared Logger Package

Isolated pino logger factory with sensible defaults for the rewriter monorepo. Reusable across all apps and packages.

## Quick Start

```typescript
import { logger, createLogger } from '@rewriter/logger';

logger.info({ key: 'value' }, 'message');

const child = logger.child({ component: 'rewriter-engine' });
child.info('doing work');
```

## Architecture

```
packages/logger/
├── src/
│   └── index.ts          — Singleton logger, factory functions, type re-exports
├── package.json
└── tsconfig.json
```

## Exports

| Export | Description |
|--------|-------------|
| `logger` | Pre-configured singleton pino instance |
| `createLogger(options?)` | Create a new logger with custom options |
| `createChildLogger(parent, bindings)` | Create a child logger with bound fields |
| `Logger` | TypeScript type for a pino logger |
| `LoggerOptions` | TypeScript type for pino options |

## Configuration

| Mode | Level | Transport |
|------|-------|-----------|
| Development (`NODE_ENV !== 'production'`) | `debug` (or `LOG_LEVEL` env) | `pino-pretty` |
| Production (`NODE_ENV === 'production'`) | `info` (or `LOG_LEVEL` env) | None (raw JSON) |

Override the log level at runtime:

```bash
LOG_LEVEL=trace bun run dev
```

## Usage in Hono

When using with `@hono/structured-logger`, create request-scoped child loggers:

```typescript
import { requestId } from 'hono/request-id';
import { structuredLogger } from '@hono/structured-logger';
import { logger } from '@rewriter/logger';

app.use(requestId());
app.use(
  structuredLogger({
    createLogger: (c) => logger.child({ requestId: c.var.requestId }),
  }),
);
```

Then access the logger from any handler via `c.var.logger`:

```typescript
app.get('/', (c) => {
  c.var.logger.info('handling request');
  return c.json({ ok: true });
});
```
