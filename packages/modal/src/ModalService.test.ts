import { describe, expect, it } from 'bun:test';
import { ModalService } from './ModalService';
import type { ModalFactory, ModalRegistry } from './types';

const testFactory: ModalFactory<{ label: string }> = (p) => p.label;

const registry = {
  test: testFactory,
} satisfies ModalRegistry;

describe('ModalService', () => {
  describe('open()', () => {
    it('pushes onto stack', () => {
      const service = new ModalService(registry);
      service.open('test', { label: 'hello' });
      expect(service.getStack().length).toBe(1);
      expect(service.getStack()[0]?.key).toBe('test');
    });

    it('notifies subscribers', () => {
      const service = new ModalService(registry);
      let called = false;
      service.subscribe(() => {
        called = true;
      });
      service.open('test', { label: 'hello' });
      expect(called).toBe(true);
    });
  });

  describe('close()', () => {
    it('pops the top modal', () => {
      const service = new ModalService(registry);
      service.open('test', { label: 'a' });
      expect(service.getStack().length).toBe(1);
      service.close();
      expect(service.getStack().length).toBe(0);
    });

    it('is safe on empty stack', () => {
      const service = new ModalService(registry);
      expect(() => service.close()).not.toThrow();
    });

    it('notifies subscribers', () => {
      const service = new ModalService(registry);
      let called = false;
      service.open('test', { label: 'a' });
      service.subscribe(() => {
        called = true;
      });
      service.close();
      expect(called).toBe(true);
    });
  });

  describe('closeTop()', () => {
    it('is alias for close()', () => {
      const service = new ModalService(registry);
      service.open('test', { label: 'a' });
      service.closeTop();
      expect(service.getStack().length).toBe(0);
    });
  });

  describe('closeAll()', () => {
    it('clears the entire stack', () => {
      const service = new ModalService(registry);
      service.open('test', { label: 'a' });
      service.open('test', { label: 'b' });
      service.open('test', { label: 'c' });
      service.closeAll();
      expect(service.getStack().length).toBe(0);
    });

    it('is safe on empty stack', () => {
      const service = new ModalService(registry);
      expect(() => service.closeAll()).not.toThrow();
    });
  });

  describe('resolveProps()', () => {
    it('gives open: true to top entry', () => {
      const service = new ModalService(registry);
      service.open('test', { label: 'top' });
      const entry = service.getStack()[0]!;
      const props = service.resolveProps(entry, true);
      expect(props.open).toBe(true);
      expect(typeof props.onClose).toBe('function');
    });

    it('gives open: false to non-top entry', () => {
      const service = new ModalService(registry);
      service.open('test', { label: 'bottom' });
      service.open('test', { label: 'top' });
      const entry = service.getStack()[0]!;
      const props = service.resolveProps(entry, false);
      expect(props.open).toBe(false);
      expect(typeof props.onClose).toBe('function');
    });

    it('merges custom props', () => {
      const service = new ModalService(registry);
      service.open('test', { label: 'custom' });
      const entry = service.getStack()[0]!;
      const props = service.resolveProps(entry, true);
      expect(props.label).toBe('custom');
    });
  });

  describe('subscribe()', () => {
    it('returns unsubscribe function', () => {
      const service = new ModalService(registry);
      let count = 0;
      const unsub = service.subscribe(() => {
        count++;
      });
      service.open('test', { label: 'a' });
      expect(count).toBe(1);
      unsub();
      service.open('test', { label: 'b' });
      expect(count).toBe(1);
    });
  });
});
