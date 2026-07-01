import { Hono } from 'hono';
import type { Scheduler } from '../scheduler';
import type { AppEnv } from '../types/env';
import { createExploreRoutes } from './explore';
import health from './health';

export function createRoutes(scheduler: Scheduler) {
  const routes = new Hono<AppEnv>();

  routes.route('/', health);
  routes.route('/explore', createExploreRoutes(scheduler));

  return routes;
}
