import type { ParsedArticle, Parser } from '../types';

/**
 * Generic RSS/Atom parser — fallback for any feed source.
 *
 * Handles both RSS 2.0 `<item>` and Atom `<entry>` elements.
 * Uses `fast-xml-parser` for XML parsing.
 *
 * @example
 * ```ts
 * const parser = new GenericRSSParser();
 * const articles = await parser.parse(rssXml, 'https://example.com/feed');
 * ```
 */
export class GenericRSSParser implements Parser {
  readonly key = 'generic-rss';
  readonly name = 'Generic RSS/Atom';
  readonly urlPatterns: string[] = []; // Fallback — matches nothing explicitly

  canHandle(_url: string): boolean {
    return false; // This is the fallback, never auto-detected
  }

  async parse(xml: string, sourceUrl: string): Promise<ParsedArticle[]> {
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
        const article = this.parseRssItem(item, sourceUrl);
        if (article) articles.push(article);
      }
    }

    // Atom
    if (parsed.feed?.entry) {
      const entries = Array.isArray(parsed.feed.entry) ? parsed.feed.entry : [parsed.feed.entry];

      for (const entry of entries) {
        const article = this.parseAtomEntry(entry, sourceUrl);
        if (article) articles.push(article);
      }
    }

    return articles;
  }

  extractLinks(_html: string, _articleUrl: string): string[] {
    // RSS feeds provide article URLs directly; no deep link extraction needed
    return [];
  }

  private parseRssItem(item: Record<string, unknown>, _sourceUrl: string): ParsedArticle | null {
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

  private parseAtomEntry(entry: Record<string, unknown>, _sourceUrl: string): ParsedArticle | null {
    const title = String(entry.title ?? '');

    // Atom link can be a string or an array of objects with @href
    let link = '';
    if (typeof entry.link === 'string') {
      link = entry.link;
    } else if (Array.isArray(entry.link)) {
      const altLink = entry.link.find(
        (l: Record<string, unknown>) => l['@_rel'] === 'alternate' || !l['@_rel'],
      );
      link = altLink ? String(altLink['@_href'] ?? '') : '';
    } else if (entry.link && typeof entry.link === 'object') {
      link = String((entry.link as Record<string, unknown>)['@_href'] ?? '');
    }

    const content = String(entry.content ?? entry.summary ?? '');
    const published = entry.published ?? entry.updated;
    const publishedAt = published ? new Date(String(published)) : undefined;

    if (!title || !link) return null;

    return {
      title: this.stripHtml(title),
      content,
      url: link,
      publishedAt: publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt : undefined,
    };
  }

  private stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }
}
