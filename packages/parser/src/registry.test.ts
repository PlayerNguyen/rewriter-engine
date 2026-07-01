import { beforeEach, describe, expect, it } from 'bun:test';
import { GenericRSSParser } from './parsers/generic-rss';
import { TuoiTreNormalParser } from './parsers/tuoitre-normal';
import { ParserRegistry } from './registry';

describe('ParserRegistry', () => {
  let registry: ParserRegistry;

  beforeEach(() => {
    registry = new ParserRegistry();
    registry.register(new TuoiTreNormalParser());
    registry.register(new GenericRSSParser());
  });

  describe('getByKey', () => {
    it('returns parser by key', () => {
      const parser = registry.getByKey('tuoitre-normal');
      expect(parser).toBeDefined();
      expect(parser?.key).toBe('tuoitre-normal');
    });

    it('returns undefined for unknown key', () => {
      expect(registry.getByKey('unknown')).toBeUndefined();
    });
  });

  describe('detectByUrl', () => {
    it('detects tuoitre parser by URL', () => {
      const parser = registry.detectByUrl('https://tuoitre.vn/home.rss');
      expect(parser).toBeDefined();
      expect(parser?.key).toBe('tuoitre-normal');
    });

    it('returns undefined for non-matching URL', () => {
      const parser = registry.detectByUrl('https://example.com/feed');
      expect(parser).toBeUndefined();
    });
  });

  describe('resolve', () => {
    it('uses explicit key when provided', () => {
      const parser = registry.resolve({
        url: 'https://example.com/feed',
        parserKey: 'tuoitre-normal',
      });
      expect(parser.key).toBe('tuoitre-normal');
    });

    it('auto-detects by URL when no key provided', () => {
      const parser = registry.resolve({ url: 'https://tuoitre.vn/home.rss' });
      expect(parser.key).toBe('tuoitre-normal');
    });

    it('falls back to generic-rss when no match', () => {
      const parser = registry.resolve({ url: 'https://example.com/feed' });
      expect(parser.key).toBe('generic-rss');
    });

    it('prefers explicit key over URL detection', () => {
      const parser = registry.resolve({
        url: 'https://tuoitre.vn/home.rss',
        parserKey: 'generic-rss',
      });
      expect(parser.key).toBe('generic-rss');
    });

    it('falls back to URL detection when key not found', () => {
      const parser = registry.resolve({
        url: 'https://tuoitre.vn/home.rss',
        parserKey: 'nonexistent',
      });
      expect(parser.key).toBe('tuoitre-normal');
    });
  });

  describe('list', () => {
    it('returns all registered parsers', () => {
      const list = registry.list();
      expect(list).toHaveLength(2);
      expect(list.map((p) => p.key)).toContain('tuoitre-normal');
      expect(list.map((p) => p.key)).toContain('generic-rss');
    });

    it('includes key, name, and urlPatterns', () => {
      const list = registry.list();
      const tuoitre = list.find((p) => p.key === 'tuoitre-normal');
      expect(tuoitre).toEqual({
        key: 'tuoitre-normal',
        name: 'Tuổi Trẻ',
        urlPatterns: ['https?://tuoitre\\.vn/'],
      });
    });
  });
});
