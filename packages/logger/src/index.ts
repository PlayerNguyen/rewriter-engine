import type { Logger, LoggerOptions } from 'pino';
import pino from 'pino';

const isProduction = process.env.NODE_ENV === 'production';

const defaultOptions: LoggerOptions = {
  level: process.env.LOG_LEVEL ?? (isProduction ? 'info' : 'debug'),
  transport: isProduction
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:HH:MM:ss',
          ignore: 'pid,hostname',
        },
      },
};

export function createLogger(options?: LoggerOptions): Logger {
  return pino({ ...defaultOptions, ...options });
}

export function createChildLogger(parent: Logger, bindings: Record<string, unknown>): Logger {
  return parent.child(bindings);
}

export const logger = createLogger();

export type { Logger, LoggerOptions } from 'pino';
