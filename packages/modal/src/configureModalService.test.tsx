import { describe, expect, it } from 'bun:test';
import { fireEvent, render, screen } from '@testing-library/react';
import { configureModalService } from './configureModalService';
import type { ModalBaseProps, ModalFactory } from './types';

function testFactory(id: string): ModalFactory<{ label: string }> {
  return (p: ModalBaseProps & { label: string }) =>
    p.open ? <div data-testid={`modal-${id}`}>{p.label}</div> : null;
}

const registry = {
  a: testFactory('a'),
  b: testFactory('b'),
};

const { ModalProvider, useModal, service } = configureModalService(registry);

function TestButton({ onAction }: { onAction: (modal: ReturnType<typeof useModal>) => void }) {
  const modal = useModal();
  return (
    <button data-testid="btn" onClick={() => onAction(modal)}>
      Open
    </button>
  );
}

describe('configureModalService', () => {
  it('returns ModalProvider, useModal, and service', () => {
    expect(ModalProvider).toBeDefined();
    expect(useModal).toBeDefined();
    expect(service).toBeDefined();
  });

  it('renders top modal factory output', async () => {
    render(
      <ModalProvider>
        <TestButton onAction={({ open }) => open('a', { label: 'hello' })} />
      </ModalProvider>,
    );

    fireEvent.click(screen.getByTestId('btn'));
    expect(screen.getByTestId('modal-a')).toBeDefined();
    expect(screen.getByTestId('modal-a').textContent).toBe('hello');
  });

  it('top modal gets open: true, non-top gets open: false', async () => {
    render(
      <ModalProvider>
        <TestButton
          onAction={({ open }) => {
            open('a', { label: 'first' });
            open('b', { label: 'second' });
          }}
        />
      </ModalProvider>,
    );

    fireEvent.click(screen.getByTestId('btn'));
    // Only top modal (b) should be visible; a should not be rendered
    expect(() => screen.getByTestId('modal-a')).toThrow();
    expect(screen.getByTestId('modal-b')).toBeDefined();
    expect(screen.getByTestId('modal-b').textContent).toBe('second');
  });

  it('close() removes modal from DOM', async () => {
    render(
      <ModalProvider>
        <TestButton
          onAction={({ open, close }) => {
            open('a', { label: 'hello' });
            setTimeout(close, 10);
          }}
        />
      </ModalProvider>,
    );

    fireEvent.click(screen.getByTestId('btn'));
    // Wait for timeout + render cycle
    await new Promise((r) => setTimeout(r, 20));
    expect(() => screen.getByTestId('modal-a')).toThrow();
  });

  it('closeAll() removes all modals', async () => {
    render(
      <ModalProvider>
        <TestButton
          onAction={({ open, closeAll }) => {
            open('a', { label: 'a' });
            open('b', { label: 'b' });
            setTimeout(closeAll, 10);
          }}
        />
      </ModalProvider>,
    );

    fireEvent.click(screen.getByTestId('btn'));
    await new Promise((r) => setTimeout(r, 20));
    expect(() => screen.getByTestId('modal-a')).toThrow();
    expect(() => screen.getByTestId('modal-b')).toThrow();
  });

  it('useModal throws outside provider', () => {
    function BadComponent() {
      useModal();
      return null;
    }
    expect(() => render(<BadComponent />)).toThrow(
      'useModal must be used within the ModalProvider',
    );
  });

  it('getStack returns empty initially', () => {
    expect(service.getStack().length).toBe(0);
  });
});
