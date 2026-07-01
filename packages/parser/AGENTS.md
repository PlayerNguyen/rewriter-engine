# @rewriter/parser — Parser Registry Package

Code-based parser registry with hybrid URL resolution for the rewriter-engine pipeline. Parsers extract structured articles from RSS/Atom feeds and HTML pages.

## Architecture

```
packages/parser/
├── src/
│   ├── index.ts              — Barrel re-exports
│   ├── types.ts              — ParsedArticle, Parser interfaces
│   ├── registry.ts           — ParserRegistry class
│   ├── registry.test.ts      — Registry unit tests
│   └── parsers/
│       ├── index.ts           — Barrel of all parsers
│       ├── tuoitre-normal.ts  — TuoiTreNormalParser (tuoitre.vn)
│       └── generic-rss.ts     — GenericRSSParser (RSS 2.0 + Atom fallback)
├── package.json
└── tsconfig.json
```

## Exports

| Export | Kind | Description |
|--------|------|-------------|
| `ParsedArticle` | interface | Structured article: title, content, url, author?, publishedAt? |
| `Parser` | interface | Strategy: key, name, urlPatterns, canHandle(), parse(), extractLinks() |
| `ParserRegistry` | class | Registry with hybrid resolution (key → URL pattern → fallback) |
| `TuoiTreNormalParser` | class | tuoitre.vn RSS parser with cheerio link extraction |
| `GenericRSSParser` | class | RSS 2.0 + Atom fallback parser |

## Resolution Order

`ParserRegistry.resolve(source)`:
1. Explicit `parserKey` on the source → `getByKey()`
2. URL pattern matching → `detectByUrl()`
3. Fallback to `generic-rss`

## Adding a New Parser

1. Create `src/parsers/my-parser.ts` implementing `Parser`
2. Export from `src/parsers/index.ts`
3. Register in `apps/server/src/configs/configureParsers.ts` and `apps/explorer/src/index.ts`

## Dependencies

| Package | Purpose |
|---------|---------|
| `fast-xml-parser` | RSS/Atom XML parsing |
| `cheerio` | HTML link extraction for deep exploration |
| `@rewriter/logger` | Structured logging |

## Commands

```bash
bun run --filter @rewriter/parser typecheck
bun run --filter @rewriter/parser test
```
