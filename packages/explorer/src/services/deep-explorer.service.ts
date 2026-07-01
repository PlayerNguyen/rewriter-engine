import type { Article } from '@rewriter/db';
import { db } from '@rewriter/db';
import { logger } from '@rewriter/logger';
import type { ParserRegistry } from '@rewriter/parser';
import { RssFetcher } from './rss-fetcher.service';

/**
 * Recursive URL exploration service with anti-cycle detection.
 *
 * Extracts URLs from article content, stores them as ExploredUrl records,
 * and recursively follows links up to the configured max depth.
 *
 * Anti-cycle: checks both Article.url and ExploredUrl.url tables,
 * plus an in-memory visited set within a single run.
 */
export class DeepExplorerService {
  private fetcher: RssFetcher;
  private visited = new Set<string>();

  constructor(
    private parserRegistry: ParserRegistry,
    private maxDepth: number,
  ) {
    this.fetcher = new RssFetcher();
  }

  /**
   * Explore all PENDING articles that haven't been deep-explored yet.
   * Extracts links from article content and creates ExploredUrl records.
   */
  async explorePendingArticles(): Promise<void> {
    this.visited.clear();

    const pendingArticles = await db.article.findMany({
      where: { status: 'PENDING' },
      include: { source: true },
    });

    logger.info({ count: pendingArticles.length }, 'Deep exploring pending articles');

    for (const article of pendingArticles) {
      try {
        await this.exploreArticle(article);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        logger.warn({ articleId: article.id, err: message }, 'Article deep exploration failed');
      }
    }

    // Now process pending ExploredUrls recursively
    await this.processPendingExploredUrls();

    this.visited.clear();
  }

  private async exploreArticle(
    article: Article & { source: { id: string; url: string; parserKey: string | null } },
  ): Promise<void> {
    const parser = this.parserRegistry.resolve({
      url: article.source.url,
      parserKey: article.source.parserKey,
    });

    const links = parser.extractLinks(article.content, article.url);

    if (links.length === 0) return;

    logger.debug(
      { articleId: article.id, linkCount: links.length },
      'Links extracted from article',
    );

    for (const link of links) {
      await this.storeIfNew(link, article.url, article.sourceId, 0);
    }
  }

  private async processPendingExploredUrls(): Promise<void> {
    let hasMore = true;

    while (hasMore) {
      const pending = await db.exploredUrl.findMany({
        where: {
          status: 'PENDING',
          depth: { lt: this.maxDepth },
        },
        include: { source: true },
        take: 50, // Process in batches
      });

      if (pending.length === 0) {
        hasMore = false;
        break;
      }

      for (const exploredUrl of pending) {
        try {
          await db.exploredUrl.update({
            where: { id: exploredUrl.id },
            data: { status: 'PROCESSING' },
          });

          // Fetch the URL content
          const content = await this.fetcher.fetch(exploredUrl.url);

          // Try to create an Article from this URL
          const parser = this.parserRegistry.resolve({
            url: exploredUrl.source.url,
            parserKey: exploredUrl.source.parserKey,
          });

          const articles = await parser.parse(content, exploredUrl.url);

          for (const article of articles) {
            const existing = await db.article.findUnique({
              where: { url: article.url },
              select: { id: true },
            });

            if (!existing) {
              await db.article.create({
                data: {
                  title: article.title,
                  content: article.content,
                  url: article.url,
                  author: article.author ?? null,
                  publishedAt: article.publishedAt ?? null,
                  sourceId: exploredUrl.sourceId,
                  status: 'PENDING',
                },
              });
            }
          }

          // Extract links from the fetched content for further exploration
          const links = parser.extractLinks(content, exploredUrl.url);
          for (const link of links) {
            await this.storeIfNew(
              link,
              exploredUrl.url,
              exploredUrl.sourceId,
              exploredUrl.depth + 1,
            );
          }

          await db.exploredUrl.update({
            where: { id: exploredUrl.id },
            data: { status: 'EXPLORED' },
          });
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : String(err);
          logger.warn(
            { exploredUrlId: exploredUrl.id, err: message },
            'ExploredUrl processing failed',
          );
          await db.exploredUrl.update({
            where: { id: exploredUrl.id },
            data: { status: 'FAILED', errorMessage: message },
          });
        }
      }
    }
  }

  /**
   * Store a URL as ExploredUrl if it's new (anti-cycle check).
   */
  private async storeIfNew(
    url: string,
    parentUrl: string,
    sourceId: string,
    depth: number,
  ): Promise<void> {
    // In-memory cycle check
    if (this.visited.has(url)) return;
    this.visited.add(url);

    // Check if URL already exists as Article
    const existingArticle = await db.article.findUnique({
      where: { url },
      select: { id: true },
    });
    if (existingArticle) {
      await this.markSkipped(url, sourceId, parentUrl, depth);
      return;
    }

    // Check if URL already exists as ExploredUrl
    const existingExplored = await db.exploredUrl.findUnique({
      where: { url },
      select: { id: true },
    });
    if (existingExplored) {
      return; // Already tracked, skip silently
    }

    // Depth check
    if (depth >= this.maxDepth) {
      await this.markSkipped(url, sourceId, parentUrl, depth);
      return;
    }

    // Store as new pending ExploredUrl
    await db.exploredUrl.create({
      data: {
        url,
        sourceId,
        parentUrl,
        depth,
        status: 'PENDING',
      },
    });
  }

  private async markSkipped(
    url: string,
    sourceId: string,
    parentUrl: string,
    depth: number,
  ): Promise<void> {
    // Only create SKIPPED record if it doesn't exist yet
    const existing = await db.exploredUrl.findUnique({
      where: { url },
      select: { id: true },
    });

    if (!existing) {
      await db.exploredUrl.create({
        data: {
          url,
          sourceId,
          parentUrl,
          depth,
          status: 'SKIPPED',
        },
      });
    }
  }
}
