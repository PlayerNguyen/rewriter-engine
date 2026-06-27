import { defineConfig } from 'orval';

export default defineConfig({
  rewriter: {
    input: '../../apps/server/openapi.json',
    output: {
      mode: 'tags-split',
      target: 'src/generated/api',
      schemas: 'src/generated/model',
      httpClient: 'fetch',
      clean: true,
      override: {
        mutator: {
          path: 'src/mutator/fetch-instance.ts',
          name: 'customFetchInstance',
        },
      },
    },
  },
});
