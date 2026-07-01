import type { ModalBaseProps } from '@rewriter/modal';
import { Button, Checkbox, Modal, Select, Stack, TextInput } from '@rewriter/ui';
import { useCallback, useState } from 'react';

export interface CreateSourceModalCustomProps {
  onCreated?: () => void;
}

const SOURCE_TYPE_OPTIONS = [
  { value: 'RSS', label: 'RSS' },
  { value: 'WEB', label: 'Web' },
  { value: 'API', label: 'API' },
];

/**
 * Modal form for creating a new content source.
 *
 * Fields: name, url, type (dropdown), isActive (checkbox).
 * POSTs `/api/v1/sources` on submit.
 *
 * @example
 * ```tsx
 * const { open } = useModal();
 * open('create-source', {
 *   onCreated: () => setRefreshKey((k) => k + 1),
 * });
 * ```
 */
export function CreateSourceModal({
  open,
  onClose,
  onCreated,
}: ModalBaseProps & CreateSourceModalCustomProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState('RSS');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setName('');
    setUrl('');
    setType('RSS');
    setIsActive(true);
    setError(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch('/api/v1/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url, type, isActive }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.message ?? 'Request failed');
        setSaving(false);
        return;
      }

      resetForm();
      onCreated?.();
      onClose();
    } catch {
      setError('Request failed');
    } finally {
      setSaving(false);
    }
  }, [name, url, type, isActive, onCreated, onClose, resetForm]);

  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
      size="md"
      title="Add Source"
    >
      <Stack gap="md">
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          placeholder="e.g. TechCrunch RSS"
          required
        />

        <TextInput
          label="URL"
          value={url}
          onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
          placeholder="https://example.com/feed.xml"
          required
        />

        <Select label="Type" value={type} onChange={setType} options={SOURCE_TYPE_OPTIONS} />

        <Checkbox
          label="Active"
          checked={isActive}
          onChange={(e) => setIsActive((e.target as HTMLInputElement).checked)}
        />

        {error && <p className="text-sm text-semantic-error">{error}</p>}
      </Stack>

      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="ghost"
          onClick={() => {
            resetForm();
            onClose();
          }}
          disabled={saving}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={saving || !name.trim() || !url.trim()}>
          {saving ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </Modal>
  );
}
