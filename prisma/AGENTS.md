# prisma/ — Database Schema & Migrations

PostgreSQL schema defined in Prisma ORM. Single source of truth for all database structure in rewriter-engine.

## Quick Reference

```bash
bun run db:generate      # Regenerate Prisma client (packages/db/src/generated/prisma)
bun run db:push          # Push schema to DB directly (dev only — no migration file)
bun run db:migrate       # Create + apply migration (prod-ready)
bun run db:migrate:deploy # Apply pending migrations (production/CI)
bun run db:seed          # Seed initial data
bun run db:studio        # Open Prisma Studio GUI
```

## Architecture

```
prisma/
├── schema.prisma          ← Schema (models, relations, indexes)
├── config.ts              ← Prisma config
├── seed.ts                ← Seed entry point
├── seed/
│   └── ...                ← Seed data files
└── migrations/            ← Migration history (committed)
```

### Schema → Generated Client flow

```
prisma/schema.prisma
  ↓ generator output = "../packages/db/src/generated/prisma"
packages/db/src/generated/prisma/   ← auto-generated types
  ↓ re-exported by
packages/db/src/index.ts            ← import { db } from '@rewriter/db'
```

## Key Models

### Users

| Model | Table | Description |
|-------|-------|-------------|
| `User` | `users` | Admin users with email/password |

### Content Pipeline

| Model | Table | Description |
|-------|-------|-------------|
| `Source` | `sources` | RSS/Web/API content sources |
| `Article` | `articles` | Raw fetched articles, status: PENDING → PROCESSING → COMPLETED/FAILED |
| `SystemPrompt` | `system_prompts` | LLM prompts for rewriting |
| `RewrittenArticle` | `rewritten_articles` | AI-rewritten output, linked to original article + prompt |

### Settings

| Model | Table | Description |
|-------|-------|-------------|
| `Setting` | `settings` | Key-value JSON config store |

## Relation Patterns

### Source → Articles (one-to-many)

```prisma
model Source {
  articles Article[]
}

model Article {
  sourceId String
  source   Source @relation(fields: [sourceId], references: [id], onDelete: Cascade)
}
```

### Article → RewrittenArticle (one-to-one)

```prisma
model Article {
  rewrittenArticle RewrittenArticle?
}

model RewrittenArticle {
  originalArticleId String  @unique
  originalArticle   Article @relation(fields: [originalArticleId], references: [id], onDelete: Cascade)
}
```

### SystemPrompt → RewrittenArticle (one-to-many)

```prisma
model SystemPrompt {
  rewrittenArticles RewrittenArticle[]
}

model RewrittenArticle {
  systemPromptId String
  systemPrompt   SystemPrompt @relation(fields: [systemPromptId], references: [id])
}
```

## Conventions

- All models use `@@map("snake_case")` for table names
- IDs: `String @id @default(uuid())`
- Timestamps: `createdAt DateTime @default(now())` + `updatedAt DateTime @updatedAt`
- Relations: always named
- Enums: `PascalCase` with `UPPER_CASE` values
- Long text fields: `@db.Text`
