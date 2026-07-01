import { db, PrismaClientKnownRequestError, type Source } from '@rewriter/db';
import { logger } from '@rewriter/logger';
import type { ParserRegistry } from '@rewriter/parser';
import type { ExplorerConfigLike } from '../types';
import { DeepExplorerService } from './deep-explorer.service';
import { RssFetcher } from './rss-fetcher.service';

/**
 * Main exploration orchestration service.
 *
 * Flow:
 * 1. Fetch all active sources from DB
 * 2. For each source, check if enough time has elapsed since lastFetched
 * 3. Resolve parser, fetch RSS, parse articles
 * 4. Create Article records for new (unique) URLs
 * 5. Run deep exploration on new articles
 */
export class ExplorerService {
  private fetcher: RssFetcher;
  private deepExplorer: DeepExplorerService;

  constructor(
    private parserRegistry: ParserRegistry,
    private config: ExplorerConfigLike,
  ) {
    this.fetcher = new RssFetcher();
    this.deepExplorer = new DeepExplorerService(parserRegistry, config.maxDepth);
  }

  /**
   * Run a full exploration cycle.
   * Called by the scheduler on each tick or manually via API trigger.
   */
  async explore(): Promise<void> {
    logger.info('Starting exploration cycle');

    const sources = await db.source.findMany({
      where: { isActive: true },
    });

    logger.info({ sourceCount: sources.length }, 'Active sources found');

    for (const source of sources) {
      try {
        await this.exploreSource(source);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        logger.error(
          { sourceId: source.id, sourceName: source.name, err: message },
          'Source exploration failed',
        );
        // Still update lastFetched to prevent endless retry on broken sources
        await this.updateLastFetched(source.id);
      }
    }

    // Deep exploration on new articles
    try {
      await this.deepExplorer.explorePendingArticles();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      logger.error({ err: message }, 'Deep exploration failed');
    }

    logger.info('Exploration cycle complete');
  }

  private async exploreSource(source: Source): Promise<void> {
    // Check if enough time has elapsed since last fetch
    if (source.lastFetched) {
      const elapsed = Date.now() - source.lastFetched.getTime();
      if (elapsed < this.config.periodMs) {
        logger.debug(
          { sourceId: source.id, elapsed, periodMs: this.config.periodMs },
          'Source fetched recently, skipping',
        );
        return;
      }
    }

    logger.info(
      { sourceId: source.id, sourceName: source.name, url: source.url },
      'Exploring source',
    );

    // Resolve parser
    const parser = this.parserRegistry.resolve({
      url: source.url,
      parserKey: source.parserKey,
    });

    logger.debug({ parserKey: parser.key }, 'Using parser');

    // Fetch and parse
    const content = await this.fetcher.fetch(source.url);
    const articles = await parser.parse(content, source.url);

    logger.info({ sourceId: source.id, articleCount: articles.length }, 'Articles parsed');

    // Create Article records for new URLs
    let newCount = 0;
    for (const article of articles) {
      try {
        const existing = await db.article.findUnique({
          where: { url: article.url },
          select: { id: true },
        });

        if (existing) {
          continue; // Already exists, skip
        }

        await db.article.create({
          data: {
            title: article.title,
            content: article.content,
            url: article.url,
            author: article.author ?? null,
            publishedAt: article.publishedAt ?? null,
            sourceId: source.id,
            status: 'PENDING',
          },
        });
        newCount++;

        // Rate limiting: delay between requests to the same source
        if (source.requestDelayMs > 0) {
          await this.sleep(source.requestDelayMs);
        }
      } catch (err: unknown) {
        // P2002 = unique constraint violation (duplicate URL)
        if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
          continue;
        }
        const message = err instanceof Error ? err.message : String(err);
        logger.warn({ url: article.url, err: message }, 'Failed to create article');
      }
    }

    logger.info({ sourceId: source.id, newArticles: newCount }, 'Source exploration complete');
    await this.updateLastFetched(source.id);
  }

  private async updateLastFetched(sourceId: string): Promise<void> {
    await db.source.update({
      where: { id: sourceId },
      data: { lastFetched: new Date() },
    });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
