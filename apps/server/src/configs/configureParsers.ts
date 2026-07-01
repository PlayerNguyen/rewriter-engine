import { GenericRSSParser, ParserRegistry, TuoiTreNormalParser } from '@rewriter/parser';

/**
 * App-wide singleton parser registry with all parsers pre-registered.
 * Used by the parsers API route and available for other server-side consumers.
 */
export const parserRegistry = createParserRegistry();

function createParserRegistry(): ParserRegistry {
  const registry = new ParserRegistry();
  registry.register(new TuoiTreNormalParser());
  registry.register(new GenericRSSParser());
  return registry;
}
