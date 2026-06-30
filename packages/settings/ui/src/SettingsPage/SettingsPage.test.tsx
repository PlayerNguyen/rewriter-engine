import { describe, expect, it, mock } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { SettingsPage } from './SettingsPage';

mock.module('@rewriter/table-ui', () => ({
  DataTable: ({ tableId }: { tableId: string }) => <div data-testid="datatable">{tableId}</div>,
}));

describe('SettingsPage', () => {
  it('renders heading', () => {
    render(<SettingsPage />);
    expect(screen.getByText('Settings')).toBeDefined();
  });

  it('renders DataTable with tableId="settings"', () => {
    const { container } = render(<SettingsPage />);
    const dt = container.querySelector('[data-testid="datatable"]');
    expect(dt).toBeDefined();
    expect(dt!.textContent).toBe('settings');
  });

  it('remounts on refreshKey change', () => {
    const { rerender, container } = render(<SettingsPage refreshKey={1} />);
    const first = container.querySelector('[data-testid="datatable"]');
    rerender(<SettingsPage refreshKey={2} />);
    const second = container.querySelector('[data-testid="datatable"]');
    // With remount (key change), elements should be different instances
    expect(first !== second).toBe(true);
  });
});
