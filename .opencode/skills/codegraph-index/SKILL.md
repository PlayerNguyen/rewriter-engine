---
name: codegraph-index
description: Manages the CodeGraph knowledge graph index — initializing, verifying status, rebuilding, and diagnosing issues. USE WHEN: codegraph init, codegraph index, codegraph status, codegraph rebuild, codegraph is broken, codegraph not working, check codegraph, verify codegraph, index the project, knowledge graph setup. Also triggers after `codegraph init` completes to verify the index is healthy.
---

## What I Do

- Run `codegraph init -i` to build or rebuild the CodeGraph knowledge graph index
- Check index health via `codegraph_status`
- Diagnose and fix common CodeGraph issues (stale index, missing nodes, parse errors)
- Ensure the `.codegraph/` directory exists and is properly gitignored
- Verify the index covers the expected file count and node types

## When to Use Me

- The user asks to initialize or rebuild the CodeGraph index
- After running `codegraph init` — verify the index is healthy
- CodeGraph tools return errors, empty results, or stale data
- The user mentions "codegraph" in any capacity (setup, status, fix, rebuild)
- The project is cloned fresh and codegraph needs initialization

## Workflow

### Step 1 — Ensure Directory Exists

```bash
mkdir -p .codegraph
```

The `.codegraph/` directory must exist. Its `.gitignore` excludes the SQLite database files (`*.db`, `*.db-wal`, `*.db-shm`, `cache/`, `*.log`, `.dirty`) from version control.

### Step 2 — Initialize the Index

```bash
codegraph init -i
```

This tree-sitter-parses every file in the project and builds the knowledge graph. Wait for it to complete — it will report how many files were indexed.

### Step 3 — Verify the Index

```bash
codegraph_status
```

Check the output for:
- **Files indexed**: should roughly match the project's source file count
- **Nodes**: should be in the hundreds for a medium project
- **Edges**: should be nonzero (relationship graph is populated)
- **Parse errors**: should be zero or negligible

Expected healthy output example:
```
Indexed files: 100+
Nodes: 700+
Edges: 1000+
Languages: TypeScript, TSX, JavaScript, YAML
Parse errors: 0
```

### Step 4 — Smoke Test

Run a quick symbolic search to confirm the index is usable:

```
codegraph_search query="createApp" kind="function"
```

Should return at least one result. If it returns nothing but `codegraph_status` shows healthy numbers, the index may need a few seconds to warm up (file watcher debounce).

### Troubleshooting

#### "No CodeGraph project is loaded" / codegraph tools error

Run `codegraph init -i` from the project root. Ensure the `.codegraph/` directory exists.

#### Stale results after editing files

The file watcher has a ~500ms debounce. Wait a second after saving before re-querying. Or pass the correct `projectPath` to tool calls.

#### Index is empty after init

Check for parse errors in `codegraph_status`. Tree-sitter grammars for the project's languages must be installed (CodeGraph bundles grammars for TS, TSX, JS, JSON, YAML, etc. automatically).

#### Database locked / WAL errors

Delete `.codegraph/codegraph.db*` and re-initialize:
```bash
rm -f .codegraph/codegraph.db .codegraph/codegraph.db-wal .codegraph/codegraph.db-shm
codegraph init -i
```

## Important Rules

1. **Always run `codegraph init -i` — never just `codegraph init`** (the `-i` flag builds the index immediately)
2. **Always verify with `codegraph_status`** after initialization
3. **Do not commit `.codegraph/*.db`** — the `.codegraph/.gitignore` handles this
4. **After init, confirm codegraph tools work** with a quick `codegraph_search` smoke test
5. **If the user already has a healthy index, do not reinitialize** — just verify and move on
