import type { Setting } from '@rewriter/db';
import { db, type Prisma } from '@rewriter/db';

export class SettingsService {
  async update(key: string, value: unknown): Promise<Setting> {
    return db.setting.update({
      where: { key },
      data: { value: value as Prisma.InputJsonValue },
    });
  }
}
