import { Hono } from 'hono';
import type { AppEnv } from '../types/env';
import health from './health';
import settings from './settings';

const routes = new Hono<AppEnv>();

routes.route('/', health);
routes.route('/', settings);

export default routes;
