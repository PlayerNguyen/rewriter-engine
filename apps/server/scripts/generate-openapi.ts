import fs from 'node:fs';
import path from 'node:path';
import { generateSpecs } from 'hono-openapi';
import { createApp } from '../src/app';

async function main() {
  const app = createApp();

  const specs = await generateSpecs(app, {
    documentation: {
      info: {
        title: 'Rewriter API',
        version: '0.0.1',
        description: 'API for the content rewriter pipeline',
      },
      servers: [{ url: 'http://localhost:3001', description: 'Local Dev' }],
    },
  });

  const outputPath = path.resolve(import.meta.dirname!, '../openapi.json');
  fs.writeFileSync(outputPath, JSON.stringify(specs, null, 2));
  console.log(`OpenAPI spec written to ${outputPath}`);
  console.log(`  Paths: ${Object.keys(specs.paths ?? {}).length}`);
}

main();
