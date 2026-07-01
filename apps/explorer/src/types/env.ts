import type { Logger } from '@rewriter/logger';

export type AppEnv = {
  Bindings: {
    PORT: number;
  };
  Variables: {
    requestId: string;
    logger: Logger;
  };
};
