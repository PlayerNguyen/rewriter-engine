# @rewriter/db — Shared Database Package

Shared Prisma client singleton and type exports for the rewriter-engine monorepo. All apps and packages import database access from here.

## Quick Start

```typescript
import { db } from '@rewriter/db';
import type { Article, Source, RewrittenArticle, Prisma } from '@rewriter/db';

// Query
const pendingArticles = await db.article.findMany({
  where: { status: 'PENDING' },
  include: { source: true },
});

// Transaction
const result = await db.$transaction(async (tx) => {
  const article = await tx.article.update({
    where: { id: articleId },
    data: { status: 'PROCESSING' },
  });
  return article;
});
```

## Architecture

```
rewriter-engine/
├── prisma/                        ← Schema & migrations (root level)
│   ├── schema.prisma              ← Single source of truth
│   ├── migrations/                ← Migration history
│   └── seed.ts                    ← Seed script
└── packages/db/                   ← This package
    ├── src/
    │   ├── client.ts              ← Singleton PrismaClient
    │   ├── index.ts               ← Re-exports
    │   └── generated/prisma/      ← Auto-generated types (committed)
    └── package.json
```

### Why schema at root, client in packages?

- **Root `prisma/`**: CLI runs naturally from project root (`bun run db:studio`, `bun run db:migrate`)
- **`packages/db/`**: Application code imports via `@rewriter/db` — clean separation of concerns
- **`output` in schema.prisma** points to `../packages/db/src/generated/prisma` so generated types live inside the package

## How It Works

### Singleton Pattern (`client.ts`)

```typescript
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { PrismaClient } from './generated/prisma';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const isProduction = process.env.NODE_ENV === 'production';
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: isProduction ? ['error'] : ['query', 'error', 'warn'],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
```

**Why singleton?** Hot-reload in dev (Bun `--hot`) would create multiple connection pools without this pattern. `globalThis` caching prevents that.

### Type Exports (`index.ts`)

```typescript
export type * from '@prisma/client';
export { db } from './client';
export type * from './generated/prisma';
```

## Data Model

| Model | Description |
|-------|-------------|
| `User` | Admin users |
| `Source` | Content sources (RSS, Web, API) |
| `Article` | Raw articles fetched from sources |
| `SystemPrompt` | LLM system prompts |
| `RewrittenArticle` | AI-rewritten content |
| `Setting` | Key-value system settings |

### Data Flow

```
Source → Article (PENDING) → Article (PROCESSING) → RewrittenArticle
              ↑                      ↑
         Explorer Engine        Rewriter Engine
                                (uses SystemPrompt)
```

## Usage Patterns

### Basic CRUD

```typescript
import { db } from '@rewriter/db';

// Create source
const source = await db.source.create({
  data: { name: 'TechCrunch', url: 'https://techcrunch.com/feed/', type: 'RSS' },
});

// Find pending articles
const pending = await db.article.findMany({
  where: { status: 'PENDING', source: { isActive: true } },
  include: { source: true },
  orderBy: { fetchedAt: 'asc' },
  take: 10,
});

// Mark as processing + create rewritten result
const result = await db.$transaction(async (tx) => {
  await tx.article.update({
    where: { id: articleId },
    data: { status: 'COMPLETED' },
  });

  const rewritten = await tx.rewrittenArticle.create({
    data: {
      title: llmResponse.title,
      content: llmResponse.content,
      llmModel: 'gpt-4o-mini',
      tokensUsed: llmResponse.usage.totalTokens,
      processingTime: elapsed,
      originalArticleId: articleId,
      systemPromptId: promptId,
    },
  });

  return rewritten;
});
```

### Error Handling

```typescript
import { Prisma } from '@rewriter/db';

try {
  await db.article.create({ data: { url: duplicateUrl, ... } });
} catch (e) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    if (e.code === 'P2002') {
      // Unique constraint violation (duplicate URL)
    }
  }
}
```

## Commands

All commands run from project root:

```bash
bun run db:generate      # Regenerate Prisma client after schema changes
bun run db:push          # Push schema to DB (dev — no migration file)
bun run db:migrate       # Create + apply migration (prod-ready)
bun run db:migrate:deploy # Apply migrations only (production/CI)
bun run db:seed          # Seed database with initial data
bun run db:studio        # Open Prisma Studio GUI
```

## Adding a New Model

1. Edit `prisma/schema.prisma`:

```prisma
model Example {
  id        String   @id @default(uuid())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("examples")
}
```

2. Generate client:

```bash
bun run db:generate
```

3. Push or migrate:

```bash
bun run db:push                                    # Quick dev iteration
bun run db:migrate --name add_example_table        # Production-ready migration
```

4. Use in code:

```typescript
import { db } from '@rewriter/db';
const examples = await db.example.findMany();
```

## Environment

Requires `DATABASE_URL` in `.env`:

```
DATABASE_URL="postgresql://rewriter:rewriter_secret@localhost:5432/rewriter"
```

## Generated Client

- **Location:** `packages/db/src/generated/prisma/`
- **Committed to git:** Yes — avoids requiring every developer to run `db:generate` on pull
- **Regenerate after:** Any schema change (`bun run db:generate`)
