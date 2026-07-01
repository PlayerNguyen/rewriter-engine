import { afterEach, beforeEach, describe, expect, it, type mock } from 'bun:test';
import { postApiV1Sources } from '@rewriter/rest-client';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { CreateSourceModal } from './CreateSourceModal';

const mockPost = postApiV1Sources as ReturnType<typeof mock>;

describe('CreateSourceModal', () => {
  beforeEach(() => {
    mockPost.mockReset();
    mockPost.mockResolvedValue({});
  });

  afterEach(() => {
    cleanup();
  });

  it('renders form fields', () => {
    render(<CreateSourceModal open onClose={() => {}} />);

    expect(screen.getByLabelText(/name/i)).toBeDefined();
    expect(screen.getByLabelText(/url/i)).toBeDefined();
  });

  it('calls postApiV1Sources with correct body on submit', async () => {
    render(<CreateSourceModal open onClose={() => {}} />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const urlInput = screen.getByLabelText(/url/i) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: 'TechCrunch' } });
    fireEvent.change(urlInput, { target: { value: 'https://techcrunch.com/feed/' } });

    const createButtons = screen.getAllByText('Create');
    const createBtn = createButtons[createButtons.length - 1] as HTMLButtonElement;
    fireEvent.click(createBtn);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith({
        name: 'TechCrunch',
        url: 'https://techcrunch.com/feed/',
        type: 'RSS',
        isActive: true,
      });
    });
  });

  it('calls onCreated after success', async () => {
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
    mockPost.mockRejectedValue({ body: { message: 'Duplicate URL' } });

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
