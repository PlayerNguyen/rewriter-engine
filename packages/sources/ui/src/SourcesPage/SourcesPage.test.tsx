import { describe, expect, it } from 'bun:test';
import { render, screen } from '@testing-library/react';
import { SourcesPage } from './SourcesPage';

describe('SourcesPage', () => {
  it('renders the heading', () => {
    render(<SourcesPage />);
    expect(screen.getByText('Sources')).toBeDefined();
  });

  it('renders the Add Source button', () => {
    render(<SourcesPage />);
    const buttons = screen.getAllByText('Add Source');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('calls onCreate when Add Source is clicked', () => {
    let called = false;
    render(
      <SourcesPage
        onCreate={() => {
          called = true;
        }}
      />,
    );

    const buttons = screen.getAllByText('Add Source');
    const addBtn = buttons[buttons.length - 1] as HTMLButtonElement;
    addBtn.click();

    expect(called).toBe(true);
  });
});
