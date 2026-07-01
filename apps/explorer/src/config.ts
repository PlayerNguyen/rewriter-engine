import { db } from '@rewriter/db';

/**
 * Explorer configuration loaded from the database settings.
 * Reads `explorer.*` keys and provides typed access.
 */
export class ExplorerConfig {
  constructor(
    readonly period: string,
    readonly cronPattern: string,
    readonly maxDepth: number,
    readonly enabled: boolean,
  ) {}

  /** Load explorer config from DB settings, with sensible defaults. */
  static async load(): Promise<ExplorerConfig> {
    const keys = [
      'explorer.period',
      'explorer.cron_pattern',
      'explorer.max_depth',
      'explorer.enabled',
    ];
    const settings = await db.setting.findMany({
      where: { key: { in: keys } },
    });

    const map = new Map(settings.map((s) => [s.key, s.value]));

    return new ExplorerConfig(
      String(map.get('explorer.period') ?? 'PT30M'),
      String(map.get('explorer.cron_pattern') ?? '*/1 * * * *'),
      Number(map.get('explorer.max_depth') ?? 2),
      Boolean(map.get('explorer.enabled') ?? true),
    );
  }

  /**
   * Convert ISO-8601 duration to milliseconds.
   * Supports: PT30S, PT5M, PT1H, P1D, P30M (minutes without T prefix)
   */
  static durationToMs(duration: string): number {
    const match = duration.match(/^P(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?$/);
    if (!match) return 30 * 60 * 1000; // Default 30 minutes

    const days = Number(match[1] ?? 0);
    const hours = Number(match[2] ?? 0);
    const minutes = Number(match[3] ?? 0);
    const seconds = Number(match[4] ?? 0);

    return (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000;
  }

  /** Get the period as milliseconds. */
  get periodMs(): number {
    return ExplorerConfig.durationToMs(this.period);
  }
}
