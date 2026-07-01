import { load as cheerioLoad } from 'cheerio';
import type { ParsedArticle, Parser } from '../types';

/**
 * Parser for tuoitre.vn articles.
 *
 * Handles RSS feeds from tuoitre.vn and extracts article content
 * from the full HTML page using cheerio.
 *
 * URL pattern: `https://tuoitre.vn/`
 *
 * @example
 * ```ts
 * const parser = new TuoiTreNormalParser();
 * const articles = await parser.parse(rssXml, 'https://tuoitre.vn/home.rss');
 * ```
 */
export class TuoiTreNormalParser implements Parser {
  readonly key = 'tuoitre-normal';
  readonly name = 'Tuổi Trẻ';
  readonly urlPatterns = ['https?://tuoitre\\.vn/'];

  canHandle(url: string): boolean {
    return /^https?:\/\/tuoitre\.vn\//.test(url);
  }

  async parse(xml: string, _sourceUrl: string): Promise<ParsedArticle[]> {
    const { XMLParser } = await import('fast-xml-parser');
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const parsed = parser.parse(xml);
    const articles: ParsedArticle[] = [];

    // RSS 2.0
    if (parsed.rss?.channel?.item) {
      const items = Array.isArray(parsed.rss.channel.item)
        ? parsed.rss.channel.item
        : [parsed.rss.channel.item];

      for (const item of items) {
        const article = this.parseRssItem(item);
        if (article) articles.push(article);
      }
    }

    return articles;
  }

  extractLinks(html: string, articleUrl: string): string[] {
    const $ = cheerioLoad(html);
    const links: string[] = [];
    const base = new URL(articleUrl);

    // Extract links from article body content
    $('article a, .content a, .detail-content a, .body-content a').each((_, el) => {
      const href = $(el).attr('href');
      if (!href) return;

      try {
        const resolved = new URL(href, base.origin);
        // Only internal tuoitre.vn links
        if (resolved.hostname.includes('tuoitre.vn') && this.isArticleUrl(resolved.href)) {
          links.push(resolved.href);
        }
      } catch {
        // Invalid URL, skip
      }
    });

    return [...new Set(links)];
  }

  private parseRssItem(item: Record<string, unknown>): ParsedArticle | null {
    const title = String(item.title ?? '');
    const link = String(item.link ?? '');
    const description = String(item.description ?? item['content:encoded'] ?? '');
    const pubDate = item.pubDate ? new Date(String(item.pubDate)) : undefined;

    if (!title || !link) return null;

    return {
      title: this.stripHtml(title),
      content: description,
      url: link,
      publishedAt: pubDate && !Number.isNaN(pubDate.getTime()) ? pubDate : undefined,
    };
  }

  /** Check if URL looks like an article page (not a category/section page) */
  private isArticleUrl(url: string): boolean {
    // tuoitre.vn article URLs typically have a numeric ID
    return /tuoitre\.vn\/[\w-]+-\d+\.htm/.test(url);
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }
}
