function modelDelegate(): ModelDelegate {
  return {
    findMany: () => Promise.resolve([]),
    count: () => Promise.resolve(0),
    create: () => Promise.resolve({}),
    update: () => Promise.resolve({}),
    delete: () => Promise.resolve({}),
    findUnique: () => Promise.resolve(null),
    findFirst: () => Promise.resolve(null),
  };
}

interface ModelDelegate {
  findMany(opts?: unknown): Promise<unknown[]>;
  count(opts?: unknown): Promise<number>;
  create(opts: unknown): Promise<unknown>;
  update(opts: unknown): Promise<unknown>;
  delete(opts: unknown): Promise<unknown>;
  findUnique(opts: unknown): Promise<unknown | null>;
  findFirst(opts?: unknown): Promise<unknown | null>;
}

export class PrismaClient {
  source = modelDelegate();
  article = modelDelegate();
  systemPrompt = modelDelegate();
  rewrittenArticle = modelDelegate();
  user = modelDelegate();
  role = modelDelegate();
  permission = modelDelegate();
  userHasRole = modelDelegate();
  roleHasPermission = modelDelegate();
  setting = modelDelegate();

  constructor(_opts?: unknown) {
    // stub — real Prisma client is generated via `bun run db:generate`
  }

  $connect(): Promise<void> {
    return Promise.resolve();
  }

  $disconnect(): Promise<void> {
    return Promise.resolve();
  }
}

export const Prisma: Record<string, unknown> = {};
