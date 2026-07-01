import type { Parser } from './types';

/**
 * Registry of available parsers with hybrid resolution.
 *
 * Resolution order:
 * 1. Explicit `parserKey` match on the source
 * 2. Auto-detect by URL pattern matching
 * 3. Fallback to generic RSS parser
 *
 * @example
 * ```ts
 * const registry = new ParserRegistry();
 * registry.register(new TuoiTreNormalParser());
 * registry.register(new GenericRSSParser());
 *
 * const parser = registry.resolve({ url: 'https://tuoitre.vn/home.rss' });
 * // → TuoiTreNormalParser (auto-detected by URL pattern)
 *
 * const parser2 = registry.resolve({ url: 'https://example.com/feed', parserKey: 'generic-rss' });
 * // → GenericRSSParser (explicit key)
 * ```
 */
export class ParserRegistry {
  private parsers: Parser[] = [];

  register(parser: Parser): void {
    this.parsers.push(parser);
  }

  /** Find parser by explicit key. */
  getByKey(key: string): Parser | undefined {
    return this.parsers.find((p) => p.key === key);
  }

  /** Auto-detect parser by URL pattern matching. */
  detectByUrl(url: string): Parser | undefined {
    return this.parsers.find((p) => p.canHandle(url));
  }

  /**
   * Resolve parser using hybrid strategy:
   * 1. Explicit key (if provided)
   * 2. Auto-detect by URL pattern
   * 3. Fallback to generic-rss
   */
  resolve(source: { url: string; parserKey?: string | null }): Parser {
    if (source.parserKey) {
      const byKey = this.getByKey(source.parserKey);
      if (byKey) return byKey;
    }

    const byUrl = this.detectByUrl(source.url);
    if (byUrl) return byUrl;

    const fallback = this.getByKey('generic-rss');
    if (fallback) return fallback;

    throw new Error(`No parser found for URL: ${source.url}`);
  }

  /** List all registered parsers (for dashboard display). */
  list(): Array<{ key: string; name: string; urlPatterns: string[] }> {
    return this.parsers.map((p) => ({
      key: p.key,
      name: p.name,
      urlPatterns: p.urlPatterns,
    }));
  }
}
