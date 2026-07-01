import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { EditSourceModal } from './EditSourceModal';

const mockFetch = mock<typeof fetch>();

describe('EditSourceModal', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    globalThis.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    cleanup();
    mockFetch.mockReset();
  });

  it('pre-fills fields with current values', () => {
    render(
      <EditSourceModal
        open
        onClose={() => {}}
        sourceId="abc-123"
        currentName="TechCrunch"
        currentUrl="https://techcrunch.com/feed/"
        currentType="RSS"
        currentIsActive={true}
      />,
    );

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const urlInput = screen.getByLabelText(/url/i) as HTMLInputElement;

    expect(nameInput.value).toBe('TechCrunch');
    expect(urlInput.value).toBe('https://techcrunch.com/feed/');
  });

  it('calls fetch with correct body on submit', async () => {
    mockFetch.mockResolvedValue({ ok: true } as Response);

    render(
      <EditSourceModal
        open
        onClose={() => {}}
        sourceId="abc-123"
        currentName="TechCrunch"
        currentUrl="https://techcrunch.com/feed/"
        currentType="RSS"
        currentIsActive={true}
      />,
    );

    const saveButtons = screen.getAllByText('Save');
    const saveBtn = saveButtons[saveButtons.length - 1] as HTMLButtonElement;
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/v1/sources/abc-123', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'TechCrunch',
          url: 'https://techcrunch.com/feed/',
          type: 'RSS',
          isActive: true,
        }),
      });
    });
  });

  it('calls onSaved after success', async () => {
    mockFetch.mockResolvedValue({ ok: true } as Response);
    let saved = false;

    render(
      <EditSourceModal
        open
        onClose={() => {}}
        sourceId="abc-123"
        currentName="Test"
        currentUrl="https://example.com"
        currentType="RSS"
        currentIsActive={true}
        onSaved={() => {
          saved = true;
        }}
      />,
    );

    const saveButtons = screen.getAllByText('Save');
    const saveBtn = saveButtons[saveButtons.length - 1] as HTMLButtonElement;
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(saved).toBe(true);
    });
  });

  it('calls onClose after success', async () => {
    mockFetch.mockResolvedValue({ ok: true } as Response);
    let closed = false;

    render(
      <EditSourceModal
        open
        onClose={() => {
          closed = true;
        }}
        sourceId="abc-123"
        currentName="Test"
        currentUrl="https://example.com"
        currentType="RSS"
        currentIsActive={true}
      />,
    );

    const saveButtons = screen.getAllByText('Save');
    const saveBtn = saveButtons[saveButtons.length - 1] as HTMLButtonElement;
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(closed).toBe(true);
    });
  });

  it('shows error on failed request', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Not found' }),
    } as Response);

    render(
      <EditSourceModal
        open
        onClose={() => {}}
        sourceId="abc-123"
        currentName="Test"
        currentUrl="https://example.com"
        currentType="RSS"
        currentIsActive={true}
      />,
    );

    const saveButtons = screen.getAllByText('Save');
    const saveBtn = saveButtons[saveButtons.length - 1] as HTMLButtonElement;
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeDefined();
    });
  });

  it('renders nothing when open is false', () => {
    const { container } = render(
      <EditSourceModal
        open={false}
        onClose={() => {}}
        sourceId="abc-123"
        currentName="Test"
        currentUrl="https://example.com"
        currentType="RSS"
        currentIsActive={true}
      />,
    );
    expect(container.textContent).toBe('');
  });
});
