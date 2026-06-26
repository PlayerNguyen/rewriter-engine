import type { User, Role, Permission } from '../../packages/db/src/generated/prisma';

export interface SeedContext {
  users: Record<string, User>;
  roles: Record<string, Role>;
  permissions: Record<string, Permission>;
}

export function createContext(): SeedContext {
  return { users: {}, roles: {}, permissions: {} };
}
