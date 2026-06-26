import { apiReference } from '@scalar/hono-api-reference';

export const scalarMiddleware = apiReference({
  url: '/api/v1/doc',
  pageTitle: 'Rewriter API Reference',
  theme: 'moon',
});
