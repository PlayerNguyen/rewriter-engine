/**
 * Structured article extracted by a parser.
 */
export interface ParsedArticle {
  /** Article title */
  title: string;
  /** Article content (cleaned HTML or plain text) */
  content: string;
  /** Canonical article URL */
  url: string;
  /** Author name (if available) */
  author?: string;
  /** Publication date (if available) */
  publishedAt?: Date;
}

/**
 * Strategy interface for parsing content from a specific source.
 *
 * Each parser declares URL patterns it can handle and provides
 * methods to parse content and extract links for deep exploration.
 *
 * @example
 * ```ts
 * const parser: Parser = new TuoiTreNormalParser();
 * if (parser.canHandle('https://tuoitre.vn/article.rss')) {
 *   const articles = await parser.parse(rssXml, 'https://tuoitre.vn/home.rss');
 * }
 * ```
 */
export interface Parser {
  /** Unique key for this parser (e.g. "tuoitre-normal") */
  readonly key: string;
  /** Human-readable name */
  readonly name: string;
  /** URL patterns this parser can handle (regex strings) */
  readonly urlPatterns: string[];
  /** Check if this parser can handle the given URL */
  canHandle(url: string): boolean;
  /** Parse raw HTML/content into structured articles */
  parse(html: string, sourceUrl: string): Promise<ParsedArticle[]>;
  /** Extract URLs from article content for deep exploration */
  extractLinks(html: string, articleUrl: string): string[];
}
