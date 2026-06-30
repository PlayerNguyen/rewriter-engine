import { afterEach, beforeEach, describe, expect, it, mock } from 'bun:test';
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { EditSettingModal } from './EditSettingModal';

const mockFetch = mock<typeof fetch>();

describe('EditSettingModal', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    globalThis.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    cleanup();
    mockFetch.mockReset();
  });

  it('renders key as read-only text', () => {
    render(
      <EditSettingModal open onClose={() => {}} settingKey="llm.provider" currentValue="openai" />,
    );

    expect(screen.getByText('llm.provider')).toBeDefined();
  });

  it('pre-fills textarea with stringified value', () => {
    render(<EditSettingModal open onClose={() => {}} settingKey="test" currentValue={42} />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(textarea.value).toBe('42');
  });

  it('shows JSON parse error for invalid input', async () => {
    mockFetch.mockResolvedValue({ ok: true } as Response);

    render(<EditSettingModal open onClose={() => {}} settingKey="test" currentValue="hello" />);

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: '{invalid json}' } });

    const buttons = screen.getAllByText('Save');
    const saveBtn = buttons[buttons.length - 1] as HTMLButtonElement;
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText('Invalid JSON')).toBeDefined();
    });
  });

  it('calls fetch with correct body', async () => {
    mockFetch.mockResolvedValue({ ok: true } as Response);

    render(
      <EditSettingModal open onClose={() => {}} settingKey="llm.provider" currentValue="openai" />,
    );

    const buttons = screen.getAllByText('Save');
    const saveBtn = buttons[buttons.length - 1] as HTMLButtonElement;
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/v1/settings/llm.provider', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: 'openai' }),
      });
    });
  });

  it('calls onSaved after success', async () => {
    mockFetch.mockResolvedValue({ ok: true } as Response);
    let saved = false;

    render(
      <EditSettingModal
        open
        onClose={() => {}}
        settingKey="test"
        currentValue="hello"
        onSaved={() => {
          saved = true;
        }}
      />,
    );

    const buttons = screen.getAllByText('Save');
    const saveBtn = buttons[buttons.length - 1] as HTMLButtonElement;
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(saved).toBe(true);
    });
  });

  it('calls onClose after success', async () => {
    mockFetch.mockResolvedValue({ ok: true } as Response);
    let closed = false;

    render(
      <EditSettingModal
        open
        onClose={() => {
          closed = true;
        }}
        settingKey="test"
        currentValue="hello"
      />,
    );

    const buttons = screen.getAllByText('Save');
    const saveBtn = buttons[buttons.length - 1] as HTMLButtonElement;
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(closed).toBe(true);
    });
  });

  it('disables buttons while saving', async () => {
    mockFetch.mockResolvedValue({ ok: true } as Response);

    render(<EditSettingModal open onClose={() => {}} settingKey="test" currentValue="hello" />);

    const buttons = screen.getAllByText('Save');
    const saveBtn = buttons[buttons.length - 1] as HTMLButtonElement;
    const cancelButtons = screen.getAllByText('Cancel');
    const cancelBtn = cancelButtons[cancelButtons.length - 1] as HTMLButtonElement;

    expect(saveBtn.disabled).toBe(false);
    expect(cancelBtn.disabled).toBe(false);

    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(saveBtn.disabled).toBe(true);
      expect(cancelBtn.disabled).toBe(true);
    });
  });

  it('renders nothing when open is false', () => {
    const { container } = render(
      <EditSettingModal open={false} onClose={() => {}} settingKey="test" currentValue="hello" />,
    );

    expect(container.textContent).toBe('');
  });
});
