import type { Source, SourceType } from '@rewriter/db';
import { db } from '@rewriter/db';

/**
 * CRUD operations for content sources.
 *
 * Wraps Prisma calls for the `Source` model — create, update, delete, and getById.
 *
 * @example
 * ```ts
 * const service = new SourcesService();
 * const source = await service.create({ name: 'TechCrunch', url: 'https://techcrunch.com/feed/' });
 * ```
 */
export class SourcesService {
  async create(data: {
    name: string;
    url: string;
    type?: SourceType;
    isActive?: boolean;
  }): Promise<Source> {
    return db.source.create({
      data: {
        name: data.name,
        url: data.url,
        ...(data.type !== undefined && { type: data.type }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });
  }

  async update(
    id: string,
    data: Partial<{ name: string; url: string; type: SourceType; isActive: boolean }>,
  ): Promise<Source> {
    return db.source.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Source> {
    return db.source.delete({
      where: { id },
    });
  }

  async getById(id: string): Promise<Source | null> {
    return db.source.findUnique({
      where: { id },
    });
  }
}
