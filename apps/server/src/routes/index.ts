import { Hono } from 'hono';
import type { AppEnv } from '../types/env';
import health from './health';
import settings from './settings';
import sources from './sources';

const routes = new Hono<AppEnv>();

routes.route('/', health);
routes.route('/', settings);
routes.route('/', sources);

export default routes;
