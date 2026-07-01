import { logger } from '@rewriter/logger';
import { Cron } from 'croner';
import type { ExplorerConfig } from './config';

/**
 * Cron-based scheduler with concurrency guard.
 *
 * Ticks on the configured cron pattern. On each tick, checks if
 * exploration should run (based on config.enabled) and prevents
 * overlapping runs via an in-memory lock.
 */
export class Scheduler {
  private job: Cron | null = null;
  private running = false;
  private lastRun: Date | null = null;
  private lastError: string | null = null;

  constructor(
    private config: ExplorerConfig,
    private onTick: () => Promise<void>,
  ) {}

  start(): void {
    if (!this.config.enabled) {
      logger.info('Explorer is disabled (explorer.enabled = false)');
      return;
    }

    logger.info(
      { cronPattern: this.config.cronPattern, period: this.config.period },
      'Starting explorer scheduler',
    );

    this.job = new Cron(this.config.cronPattern, async () => {
      if (this.running) {
        logger.debug('Exploration already in progress, skipping tick');
        return;
      }

      this.running = true;
      try {
        await this.onTick();
        this.lastRun = new Date();
        this.lastError = null;
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        this.lastError = message;
        logger.error({ err: message }, 'Exploration tick failed');
      } finally {
        this.running = false;
      }
    });

    logger.info('Explorer scheduler started');
  }

  stop(): void {
    if (this.job) {
      this.job.stop();
      this.job = null;
      logger.info('Explorer scheduler stopped');
    }
  }

  /** Manually trigger an exploration run (respects concurrency guard). */
  async trigger(): Promise<{ triggered: boolean; reason?: string }> {
    if (this.running) {
      return { triggered: false, reason: 'Exploration already in progress' };
    }

    this.running = true;
    try {
      await this.onTick();
      this.lastRun = new Date();
      this.lastError = null;
      return { triggered: true };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      this.lastError = message;
      logger.error({ err: message }, 'Manual exploration trigger failed');
      return { triggered: false, reason: message };
    } finally {
      this.running = false;
    }
  }

  getStatus(): {
    running: boolean;
    lastRun: string | null;
    lastError: string | null;
    enabled: boolean;
    cronPattern: string;
    period: string;
  } {
    return {
      running: this.running,
      lastRun: this.lastRun?.toISOString() ?? null,
      lastError: this.lastError,
      enabled: this.config.enabled,
      cronPattern: this.config.cronPattern,
      period: this.config.period,
    };
  }
}
