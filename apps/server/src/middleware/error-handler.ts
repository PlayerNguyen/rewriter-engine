import { PrismaClientKnownRequestError } from '@rewriter/db';
import { HandlerNotFoundError } from '@rewriter/table-core';
import type { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { AppEnv } from '../types/env';

export const errorHandler: ErrorHandler<AppEnv> = (err, c) => {
  const logger = c.var.logger;

  if (err instanceof HTTPException) {
    logger.warn({ status: err.status, message: err.message }, 'HTTP exception');
    return err.getResponse();
  }

  if (err instanceof PrismaClientKnownRequestError) {
    const mapped = mapPrismaError(err);
    logger.warn(
      { prismaCode: err.code, status: mapped.status, message: mapped.message },
      'Prisma error',
    );
    return c.json({ error: mapped.message }, mapped.status as ContentfulStatusCode);
  }

  if (err instanceof HandlerNotFoundError) {
    logger.warn({ tableId: err.tableId, message: err.message }, 'Handler not found');
    return c.json({ error: err.message }, 404);
  }

  logger.error({ err, message: err.message }, 'Unhandled error');
  return c.json({ error: 'Internal Server Error' }, 500);
};

function mapPrismaError(err: PrismaClientKnownRequestError): { status: number; message: string } {
  switch (err.code) {
    case 'P2025':
      return { status: 404, message: 'Record not found' };
    case 'P2002':
      return { status: 409, message: `Conflict: ${String(err.meta?.target ?? 'duplicate value')}` };
    case 'P2003':
      return { status: 400, message: 'Related record not found' };
    case 'P2014':
      return { status: 400, message: 'Invalid relation' };
    default:
      return { status: 500, message: 'Database error' };
  }
}
