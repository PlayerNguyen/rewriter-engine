import { Hono } from 'hono';
import type { AppEnv } from '../types/env';
import health from './health';

const routes = new Hono<AppEnv>();

routes.route('/', health);

export default routes;
