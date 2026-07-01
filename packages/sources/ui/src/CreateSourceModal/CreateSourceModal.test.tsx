import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CreateSourceModal } from './CreateSourceModal';

const mockFetch = mock<typeof fetch>();

describe('CreateSourceModal', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    globalThis.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    cleanup();
    mockFetch.mockReset();
  });

  it('renders form fields', () => {
    render(<CreateSourceModal open onClose={() => {}} />);

    expect(screen.getByLabelText(/name/i)).toBeDefined();
    expect(screen.getByLabelText(/url/i)).toBeDefined();
  });

  it('calls fetch with correct body on submit', async () => {
    mockFetch.mockResolvedValue({ ok: true } as Response);

    render(<CreateSourceModal open onClose={() => {}} />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const urlInput = screen.getByLabelText(/url/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'TechCrunch' } });
    fireEvent.change(urlInput, { target: { value: 'https://techcrunch.com/feed/' } });

    const createButtons = screen.getAllByText('Create');
    const createBtn = createButtons[createButtons.length - 1] as HTMLButtonElement;
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/v1/sources', {
        method: 'POST',
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

  it('calls onCreated after success', async () => {
    mockFetch.mockResolvedValue({ ok: true } as Response);
    let created = false;

    render(
      <CreateSourceModal
        open
        onClose={() => {}}
        onCreated={() => {
          created = true;
        }}
      />,
    );

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const urlInput = screen.getByLabelText(/url/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(urlInput, { target: { value: 'https://example.com/feed' } });

    const createButtons = screen.getAllByText('Create');
    const createBtn = createButtons[createButtons.length - 1] as HTMLButtonElement;
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(created).toBe(true);
    });
  });

  it('calls onClose after success', async () => {
    mockFetch.mockResolvedValue({ ok: true } as Response);
    let closed = false;

    render(
      <CreateSourceModal
        open
        onClose={() => {
          closed = true;
        }}
      />,
    );

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const urlInput = screen.getByLabelText(/url/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(urlInput, { target: { value: 'https://example.com/feed' } });

    const createButtons = screen.getAllByText('Create');
    const createBtn = createButtons[createButtons.length - 1] as HTMLButtonElement;
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(closed).toBe(true);
    });
  });

  it('shows error on failed request', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ message: 'Duplicate URL' }),
    } as Response);

    render(<CreateSourceModal open onClose={() => {}} />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const urlInput = screen.getByLabelText(/url/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'Test' } });
    fireEvent.change(urlInput, { target: { value: 'https://example.com/feed' } });

    const createButtons = screen.getAllByText('Create');
    const createBtn = createButtons[createButtons.length - 1] as HTMLButtonElement;
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(screen.getByText('Duplicate URL')).toBeDefined();
    });
  });

  it('disables create button when fields are empty', () => {
    render(<CreateSourceModal open onClose={() => {}} />);

    const createButtons = screen.getAllByText('Create');
    const createBtn = createButtons[createButtons.length - 1] as HTMLButtonElement;
    expect(createBtn.disabled).toBe(true);
  });

  it('renders nothing when open is false', () => {
    const { container } = render(<CreateSourceModal open={false} onClose={() => {}} />);
    expect(container.textContent).toBe('');
  });
});
