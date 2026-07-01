import { logger } from '@rewriter/logger';

const USER_AGENT = 'RewriterExplorer/1.0';
const DEFAULT_TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 10 * 1024 * 1024; // 10 MB

/**
 * Simple HTTP fetch wrapper for RSS feeds and web pages.
 *
 * Uses Bun native `fetch` with configurable timeout, custom User-Agent,
 * and response size guard. Errors bubble up to the caller.
 */
export class RssFetcher {
  constructor(
    private timeoutMs: number = DEFAULT_TIMEOUT_MS,
    private maxBytes: number = MAX_RESPONSE_BYTES,
  ) {}

  /**
   * Fetch content from a URL.
   * @returns The response body as text
   * @throws On non-2xx responses, network errors, or oversized responses
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

      // Guard against oversized responses
      const contentLength = response.headers.get('content-length');
      if (contentLength && Number(contentLength) > this.maxBytes) {
        throw new Error(
          `Response too large: ${contentLength} bytes (max ${String(this.maxBytes)})`,
        );
      }

      const text = await response.text();
      if (text.length > this.maxBytes) {
        throw new Error(
          `Response too large: ${String(text.length)} bytes (max ${String(this.maxBytes)})`,
        );
      }

      return text;
    } finally {
      clearTimeout(timeout);
    }
  }
}
