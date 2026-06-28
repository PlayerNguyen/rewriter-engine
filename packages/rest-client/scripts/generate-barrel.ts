import fs from 'node:fs';
import path from 'node:path';

const apiDir = path.resolve(import.meta.dirname!, '../src/generated/api');

if (!fs.existsSync(apiDir)) {
  console.log('No generated API directory yet — skipping barrel generation.');
  process.exit(0);
}

const entries = fs.readdirSync(apiDir, { withFileTypes: true });
const dirs = entries
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

if (dirs.length === 0) {
  console.log('No API tag directories found — skipping barrel generation.');
  process.exit(0);
}

const lines = dirs.map((dir) => `export * from './${dir}/${dir}';`);
fs.writeFileSync(path.join(apiDir, 'index.ts'), `${lines.join('\n')}\n`);

console.log(`Generated barrel for ${dirs.length} API tags: ${dirs.join(', ')}`);
