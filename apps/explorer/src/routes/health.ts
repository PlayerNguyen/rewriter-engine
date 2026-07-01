import { Hono } from 'hono';
import type { AppEnv } from '../types/env';

const healthRoute = new Hono<AppEnv>();

healthRoute.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'explorer' });
});

export default healthRoute;
