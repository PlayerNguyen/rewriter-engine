# Explorer App — Implementation Plan

## Summary

Create a standalone Explorer app (`apps/explorer`) that periodically fetches RSS feeds from configured sources, parses articles using a strategy pattern (parser registry), creates `Article` records for new content, and performs recursive deep exploration of URLs found within article content — storing discovered links in a new `ExploredUrl` model with anti-cycle detection.

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| App location | Standalone `apps/explorer` | Separation of concerns, independent scaling |
| Parser definition | Code-based registry in `packages/parser` | Parsers are logic-heavy; code > config |
| Parser assignment | Hybrid: auto-detect by URL pattern + manual override per source | Best of both worlds |
| Deep exploration | Recursive with configurable depth + anti-cycle | Thorough but safe |
| ExploredUrl storage | Separate Prisma model | Clean lifecycle separation from Article |

---

## 1. Database Schema Changes (`prisma/schema.prisma`)

### 1a. Add `parserKey` to Source model

```prisma
model Source {
  // ... existing fields ...
  parserKey String?   // Override parser key (e.g. "tuoitre-normal"). Null = auto-detect.
  articles Article[]
  exploredUrls ExploredUrl[]   // NEW relation
  @@map("sources")
}
```

### 1b. New `ExploredUrl` model

```prisma
model ExploredUrl {
  id            String             @id @default(uuid())
  url           String             @unique
  title         String?
  depth         Int                @default(0)   // 0 = found in article content, 1 = found in explored page, etc.
  status        ExploredUrlStatus  @default(PENDING)
  errorMessage  String?            @db.Text
  parentUrl     String?            // URL of the page that contained this link
  sourceId      String
  source        Source             @relation(fields: [sourceId], references: [id], onDelete: Cascade)
  createdAt     DateTime           @default(now())
  updatedAt     DateTime           @updatedAt

  @@index([sourceId, status])
  @@index([status])
  @@index([url])
  @@map("explored_urls")
}

enum ExploredUrlStatus {
  PENDING
  PROCESSING
  EXPLORED
  FAILED
  SKIPPED       // Already exists as Article or ExploredUrl (cycle detection)
}
```

### 1c. Update seed data

- Change `explorer.interval_minutes` setting → `explorer.period` with ISO-8601 value (e.g. `"PT30M"`)
- Add `explorer.max_depth` setting (default: `2`)
- Add `explorer.cron_pattern` setting (default: `"*/1 * * * *"`)

**Migration**: `bun run db:migrate --name add_explored_urls_and_parser_key`

---

## 2. Parser Package (`packages/parser/`)

New shared package: `@rewriter/parser`

### Structure

```
packages/parser/
├── src/
│   ├── index.ts                    # Barrel exports
│   ├── types.ts                    # ParsedArticle, Parser interfaces
│   ├── registry.ts                 # ParserRegistry class
│   ├── parsers/
│   │   ├── index.ts                # Barrel of all parsers
│   │   ├── tuoitre-normal.ts       # TuoiTreNormalParser
│   │   └── generic-rss.ts          # GenericRSSParser (fallback)
│   └── registry.test.ts
├── package.json
└── tsconfig.json
```

### Interfaces (`types.ts`)

```typescript
export interface ParsedArticle {
  title: string;
  content: string;       // Cleaned HTML or plain text
  url: string;           // Canonical article URL
  author?: string;
  publishedAt?: Date;
}

export interface Parser {
  /** Unique key for this parser (e.g. "tuoitre-normal") */
  readonly key: string;
  /** Human-readable name */
  readonly name: string;
  /** URL patterns this parser can handle (regex strings) */
  readonly urlPatterns: string[];
  /** Check if this parser can handle the given URL */
  canHandle(url: string): boolean;
  /** Parse raw HTML/content into structured articles */
  parse(html: string, sourceUrl: string): Promise<ParsedArticle[]>;
  /** Extract URLs from article content for deep exploration */
  extractLinks(html: string, articleUrl: string): string[];
}
```

### ParserRegistry (`registry.ts`)

```typescript
export class ParserRegistry {
  private parsers: Parser[] = [];

  register(parser: Parser): void;
  /** Find parser by key */
  getByKey(key: string): Parser | undefined;
  /** Auto-detect parser by URL pattern matching */
  detectByUrl(url: string): Parser | undefined;
  /** Resolve parser: explicit key first, then auto-detect, fallback to generic */
  resolve(source: { url: string; parserKey?: string | null }): Parser;
  /** List all registered parsers (for dashboard display) */
  list(): Array<{ key: string; name: string; urlPatterns: string[] }>;
}
```

### Parsers

**TuoiTreNormalParser** — handles `https://tuoitre.vn/` URLs:
- Parses RSS XML to extract article links
- Fetches each article page, extracts title/content/author/publishedAt
- `extractLinks()` finds `<a>` tags in article body content

**GenericRSSParser** — fallback for any RSS source:
- Standard RSS/Atom XML parsing
- No deep link extraction (RSS already provides article URLs)

### Dependencies

```json
{
  "dependencies": {
    "@rewriter/logger": "workspace:*",
    "fast-xml-parser": "^4.x",
    "cheerio": "^1.x"
  }
}
```

---

## 3. Explorer App (`apps/explorer/`)

### Structure

```
apps/explorer/
├── src/
│   ├── index.ts                    # Entry point — starts scheduler
│   ├── app.ts                      # Optional Hono app for health/trigger API
│   ├── config.ts                   # Reads settings from DB
│   ├── scheduler.ts                # Cron scheduler using ISO-8601 period
│   ├── services/
│   │   ├── explorer.service.ts     # Main exploration orchestration
│   │   ├── rss-fetcher.service.ts  # RSS feed fetching
│   │   └── deep-explorer.service.ts # Recursive URL exploration
│   ├── routes/
│   │   ├── index.ts
│   │   ├── health.ts
│   │   └── explore.ts              # Manual trigger / status endpoints
│   └── types/
│       └── env.ts
├── package.json
├── tsconfig.json
└── Dockerfile
```

### 3a. Scheduler (`scheduler.ts`)

- Reads `explorer.period` (ISO-8601 duration, e.g. `P30S`, `PT5M`, `P1H`) and `explorer.cron_pattern` from DB settings
- Converts ISO-8601 duration to milliseconds for internal use
- Uses `croner` (or Bun's native `setInterval`) to run `ExplorerService.explore()` on the cron schedule
- The cron pattern is the tick; the period setting controls which sources are eligible based on their `lastFetched` timestamp

### 3b. ExplorerService (`services/explorer.service.ts`)

Main orchestration flow:

```
1. Fetch all active sources from DB
2. For each source:
   a. Check if enough time has elapsed since lastFetched (based on period setting)
   b. Resolve parser (parserKey on source → auto-detect by URL → generic fallback)
   c. Fetch RSS/content from source URL
   d. Parse content using resolved parser → ParsedArticle[]
   e. For each ParsedArticle:
      - Check if article.url already exists in Article table (unique constraint)
      - If not exists → create Article with status=PENDING
      - If exists → skip
   f. Update source.lastFetched
3. If deep exploration enabled:
   a. Fetch all Articles with status=PENDING that haven't been deep-explored
   b. For each article, call parser.extractLinks()
   c. For each extracted URL:
      - Check cycle: exists in Article.url OR ExploredUrl.url?
      - If exists → skip (mark as SKIPPED)
      - If new AND depth < maxDepth → create ExploredUrl with status=PENDING
4. For pending ExploredUrls with depth < maxDepth:
   a. Fetch the URL content
   b. Parse with resolved parser
   c. Create Article if new content found
   d. Recursively extract links → create child ExploredUrls (depth+1)
   e. Mark ExploredUrl as EXPLORED
```

### 3c. DeepExplorerService (`services/deep-explorer.service.ts`)

Handles recursive URL exploration with anti-cycle detection:

```typescript
class DeepExplorerService {
  constructor(
    private parserRegistry: ParserRegistry,
    private maxDepth: number,
  ) {}

  async exploreArticle(article: Article, source: Source): Promise<void>;
  async exploreUrl(exploredUrl: ExploredUrl, source: Source): Promise<void>;
  private async extractAndStoreLinks(
    html: string,
    parentUrl: string,
    sourceId: string,
    currentDepth: number,
  ): Promise<string[]>;
  private async isCycle(url: string): Promise<boolean>;
}
```

Anti-cycle detection:
- Before creating any ExploredUrl, check if `url` exists in `Article.url` OR `ExploredUrl.url`
- If exists → mark as `SKIPPED`, don't process
- Track visited URLs in-memory within a single exploration run to avoid DB lookups for same URL

### 3d. API Routes (`routes/`)

Optional Hono API for operational control:

```
GET  /api/v1/health          — Health check
POST /api/v1/explore/trigger — Manually trigger an exploration run
GET  /api/v1/explore/status  — Current explorer status (last run, next run, stats)
GET  /api/v1/explore/stats   — Exploration statistics (articles found, URLs explored, etc.)
```

### 3e. Entry Point (`index.ts`)

```typescript
import { logger } from '@rewriter/logger';
import { createApp } from './app';
import { ExplorerConfig } from './config';
import { Scheduler } from './scheduler';
import { ExplorerService } from './services/explorer.service';
import { ParserRegistry } from '@rewriter/parser';

const config = await ExplorerConfig.load();
const parserRegistry = ParserRegistry.createDefault();
const explorer = new ExplorerService(parserRegistry, config);
const scheduler = new Scheduler(config, () => explorer.explore());

scheduler.start();

// Optional API for health/trigger
const app = createApp(explorer, scheduler);
export default { port: 3002, fetch: app.fetch };
```

### Dependencies

```json
{
  "dependencies": {
    "@rewriter/db": "workspace:*",
    "@rewriter/logger": "workspace:*",
    "@rewriter/parser": "workspace:*",
    "hono": "^4",
    "croner": "^9.x"
  }
}
```

---

## 4. Dashboard Changes

### 4a. Parser List in Sources Tab

Add a "Parsers" sub-route under `/sources`:

```
apps/dashboard/src/routes/
├── sources.tsx           # Existing — add parserKey dropdown to create/edit modals
└── parsers.tsx           # NEW — read-only list of available parsers
```

Update `configureSidebar.tsx` to add Parsers under Configuration:

```typescript
{
  icon: Link,
  label: t('sidebar.configuration'),
  children: [
    { icon: Link, label: t('sidebar.sources'), to: '/sources' },
    { icon: Puzzle, label: t('sidebar.parsers'), to: '/parsers' },  // NEW
    { icon: Bot, label: t('sidebar.prompts'), to: '/parsers' },
  ],
},
```

### 4b. ParserKey in Source Forms

Update `CreateSourceModal` and `EditSourceModal` to include:
- A dropdown for parser selection (fetched from `GET /api/v1/parsers`)
- "Auto (detect by URL)" as default option
- Display the matched parser name when auto-detected

### 4c. Parsers Page (`@rewriter/parser-ui/` or inline)

New route component showing:
- Table of available parsers: key, name, URL patterns
- Read-only — parsers are defined in code, not CRUD-managed

### 4d. API Endpoint for Parser List

Add to server:

```
GET /api/v1/parsers — Returns list of registered parsers from ParserRegistry
```

This requires the server to have access to the parser registry (import `@rewriter/parser`).

### 4e. i18n Keys

```json
{
  "parsers": {
    "title": "Parsers",
    "key": "Key",
    "name": "Name",
    "urlPatterns": "URL Patterns",
    "autoDetect": "Auto (detect by URL)"
  },
  "sidebar": {
    "parsers": "Parsers"
  },
  "explorer": {
    "trigger": "Trigger Exploration",
    "status": "Explorer Status",
    "lastRun": "Last Run",
    "nextRun": "Next Run",
    "articlesFound": "Articles Found",
    "urlsExplored": "URLs Explored"
  }
}
```

---

## 5. Settings Changes

### New/Updated Settings

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `explorer.period` | string (ISO-8601) | `"PT30M"` | Minimum interval between source fetches |
| `explorer.cron_pattern` | string | `"*/1 * * * *"` | Cron tick pattern for scheduler |
| `explorer.max_depth` | number | `2` | Max recursion depth for deep exploration |
| `explorer.enabled` | boolean | `true` | Enable/disable the explorer |

Update seed data in `prisma/seed/stage2-config.ts`.

---

## 6. Root Config Changes

### `package.json` — Add dev script

```json
{
  "scripts": {
    "dev": "concurrently --names server,dashboard,explorer -c blue,green,yellow \"bun run dev:server\" \"bun run dev:dashboard\" \"bun run dev:explorer\"",
    "dev:explorer": "bun run --filter @rewriter/explorer dev"
  }
}
```

### `tsconfig.json` — Add parser path alias

```json
{
  "compilerOptions": {
    "paths": {
      "@rewriter/parser": ["./packages/parser/src/index.ts"],
      "@rewriter/parser/*": ["./packages/parser/src/*"]
    }
  }
}
```

### `docker-compose.yml` — No changes (explorer runs locally or in deployment compose)

### Deployment — Add explorer service to `tools/deployment/compose.yaml`

---

## 7. Implementation Order

| Step | What | Files |
|------|------|-------|
| 1 | Schema migration: add `parserKey` to Source, create `ExploredUrl` model | `prisma/schema.prisma`, seed updates |
| 2 | Create `packages/parser/` with types, registry, GenericRSSParser, TuoiTreNormalParser | `packages/parser/src/*` |
| 3 | Create `apps/explorer/` scaffold: package.json, tsconfig, index.ts | `apps/explorer/*` |
| 4 | Implement Scheduler + Config | `apps/explorer/src/scheduler.ts`, `config.ts` |
| 5 | Implement ExplorerService (RSS fetch + Article creation) | `apps/explorer/src/services/explorer.service.ts` |
| 6 | Implement DeepExplorerService (recursive URL exploration) | `apps/explorer/src/services/deep-explorer.service.ts` |
| 7 | Add explorer API routes (health, trigger, status) | `apps/explorer/src/routes/*` |
| 8 | Add parser list endpoint to server | `apps/server/src/routes/parsers.ts` |
| 9 | Update dashboard: parser dropdown in source forms, parsers page | `apps/dashboard/src/*`, `packages/sources/ui/*` |
| 10 | Update sidebar, i18n, seed data | `configureSidebar.tsx`, locale files, seed |
| 11 | Tests: parser registry, explorer service, deep explorer | `*.test.ts` files |
| 12 | Run typecheck + lint, verify end-to-end | `bun typecheck`, `bun lint` |

---

## 8. Testing Strategy

| Component | Test Type | What to Test |
|-----------|-----------|--------------|
| ParserRegistry | Unit | register, getByKey, detectByUrl, resolve (hybrid logic) |
| TuoiTreNormalParser | Unit | canHandle, parse (mock HTML), extractLinks |
| GenericRSSParser | Unit | parse (RSS XML), extractLinks |
| ExplorerService | Unit | explore() with mocked DB + parser (article dedup, source update) |
| DeepExplorerService | Unit | cycle detection, depth limit, recursive extraction |
| Scheduler | Unit | ISO-8601 → ms conversion, cron pattern validation |
| Explorer API | E2E | health, trigger, status endpoints |

---

## 9. File Tree Summary

```
prisma/
├── schema.prisma                          # MODIFY: add parserKey, ExploredUrl model
├── seed/stage2-config.ts                  # MODIFY: update explorer settings

packages/parser/                           # NEW
├── src/
│   ├── index.ts
│   ├── types.ts
│   ├── registry.ts
│   ├── registry.test.ts
│   └── parsers/
│       ├── index.ts
│       ├── tuoitre-normal.ts
│       └── generic-rss.ts
├── package.json
└── tsconfig.json

apps/explorer/                             # NEW
├── src/
│   ├── index.ts
│   ├── app.ts
│   ├── config.ts
│   ├── scheduler.ts
│   ├── services/
│   │   ├── explorer.service.ts
│   │   ├── rss-fetcher.service.ts
│   │   └── deep-explorer.service.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── health.ts
│   │   └── explore.ts
│   └── types/
│       └── env.ts
├── package.json
├── tsconfig.json
└── Dockerfile

apps/server/                               # MODIFY
├── src/routes/parsers.ts                  # NEW: GET /api/v1/parsers
├── src/routes/index.ts                    # MODIFY: mount parsers route

apps/dashboard/                            # MODIFY
├── src/routes/parsers.tsx                 # NEW: parsers page
├── src/configs/configureSidebar.tsx       # MODIFY: add parsers nav item
├── src/configs/configureModals.tsx        # MODIFY: parser-related modals if any

packages/sources/ui/                       # MODIFY
├── src/CreateSourceModal/CreateSourceModal.tsx  # MODIFY: add parserKey dropdown
├── src/EditSourceModal/EditSourceModal.tsx      # MODIFY: add parserKey dropdown
├── src/SourcesPage/SourcesPage.tsx              # MODIFY: show parser column

package.json                               # MODIFY: add dev:explorer script
tsconfig.json                              # MODIFY: add @rewriter/parser path alias
```
