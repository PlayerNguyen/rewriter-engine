import { afterEach, beforeEach, describe, expect, it, type mock } from 'bun:test';
import { patchApiV1SourcesById } from '@rewriter/rest-client';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { EditSourceModal } from './EditSourceModal';

const mockPatch = patchApiV1SourcesById as ReturnType<typeof mock>;

const defaultProps = {
  sourceId: 'abc-123',
  currentName: 'TechCrunch',
  currentUrl: 'https://techcrunch.com/feed/',
  currentType: 'RSS',
  currentIsActive: true,
  currentParserKey: null as string | null,
  currentRequestDelayMs: 1000,
};

describe('EditSourceModal', () => {
  beforeEach(() => {
    mockPatch.mockReset();
    mockPatch.mockResolvedValue({});
  });

  afterEach(() => {
    cleanup();
  });

  it('pre-fills fields with current values', () => {
    render(<EditSourceModal open onClose={() => {}} {...defaultProps} />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const urlInput = screen.getByLabelText(/url/i) as HTMLInputElement;

    expect(nameInput.value).toBe('TechCrunch');
    expect(urlInput.value).toBe('https://techcrunch.com/feed/');
  });

  it('calls patchApiV1SourcesById with correct body on submit', async () => {
    render(<EditSourceModal open onClose={() => {}} {...defaultProps} />);

    const saveButtons = screen.getAllByText('Save');
    const saveBtn = saveButtons[saveButtons.length - 1] as HTMLButtonElement;
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(mockPatch).toHaveBeenCalledWith('abc-123', {
        name: 'TechCrunch',
        url: 'https://techcrunch.com/feed/',
        type: 'RSS',
        isActive: true,
        parserKey: null,
        requestDelayMs: 1000,
      });
    });
  });

  it('calls onSaved after success', async () => {
    let saved = false;

    render(
      <EditSourceModal
        open
        onClose={() => {}}
        {...defaultProps}
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
    let closed = false;

    render(
      <EditSourceModal
        open
        onClose={() => {
          closed = true;
        }}
        {...defaultProps}
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
    mockPatch.mockRejectedValue({ body: { message: 'Not found' } });

    render(<EditSourceModal open onClose={() => {}} {...defaultProps} />);

    const saveButtons = screen.getAllByText('Save');
    const saveBtn = saveButtons[saveButtons.length - 1] as HTMLButtonElement;
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeDefined();
    });
  });

  it('renders nothing when open is false', () => {
    const { container } = render(
      <EditSourceModal open={false} onClose={() => {}} {...defaultProps} />,
    );
    expect(container.textContent).toBe('');
  });
});
