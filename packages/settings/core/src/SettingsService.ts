import { db } from '@rewriter/db';
import type { Setting } from '@rewriter/db';

export class SettingsService {
  async update(key: string, value: unknown): Promise<Setting> {
    return (db.setting as any).update({
      where: { key },
      data: { value },
    });
  }
}
