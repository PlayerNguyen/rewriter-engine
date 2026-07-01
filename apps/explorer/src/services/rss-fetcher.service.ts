import { logger } from '@rewriter/logger';

const USER_AGENT = 'RewriterExplorer/1.0';
const DEFAULT_TIMEOUT_MS = 10_000;

/**
 * Simple HTTP fetch wrapper for RSS feeds and web pages.
 *
 * Uses Bun native `fetch` with configurable timeout and custom User-Agent.
 * Errors bubble up to the caller.
 */
export class RssFetcher {
  constructor(private timeoutMs: number = DEFAULT_TIMEOUT_MS) {}

  /**
   * Fetch content from a URL.
   * @returns The response body as text
   * @throws On non-2xx responses or network errors
   */
  async fetch(url: string): Promise<string> {
    logger.debug({ url }, 'Fetching URL');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': USER_AGENT,
        },
        signal: controller.signal,
        redirect: 'follow',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${String(response.status)} ${response.statusText}`);
      }

      return await response.text();
    } finally {
      clearTimeout(timeout);
    }
  }
}
