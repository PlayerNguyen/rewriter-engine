import type { ModalBaseProps } from '@rewriter/modal';
import { Button, Checkbox, Modal, Select, Stack, TextInput } from '@rewriter/ui';
import { useCallback, useState } from 'react';

export interface EditSourceModalCustomProps {
  sourceId: string;
  currentName: string;
  currentUrl: string;
  currentType: string;
  currentIsActive: boolean;
  onSaved?: () => void;
}

const SOURCE_TYPE_OPTIONS = [
  { value: 'RSS', label: 'RSS' },
  { value: 'WEB', label: 'Web' },
  { value: 'API', label: 'API' },
];

/**
 * Modal form for editing an existing content source.
 *
 * Pre-fills all fields from current values. PATCHes `/api/v1/sources/:id` on submit.
 *
 * @example
 * ```tsx
 * const { open } = useModal();
 * open('edit-source', {
 *   sourceId: 'abc-123',
 *   currentName: 'TechCrunch',
 *   currentUrl: 'https://techcrunch.com/feed/',
 *   currentType: 'RSS',
 *   currentIsActive: true,
 *   onSaved: () => setRefreshKey((k) => k + 1),
 * });
 * ```
 */
export function EditSourceModal({
  open,
  onClose,
  sourceId,
  currentName,
  currentUrl,
  currentType,
  currentIsActive,
  onSaved,
}: ModalBaseProps & EditSourceModalCustomProps) {
  const [name, setName] = useState(currentName);
  const [url, setUrl] = useState(currentUrl);
  const [type, setType] = useState(currentType);
  const [isActive, setIsActive] = useState(currentIsActive);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`/api/v1/sources/${sourceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url, type, isActive }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.message ?? 'Request failed');
        setSaving(false);
        return;
      }

      onSaved?.();
      onClose();
    } catch {
      setError('Request failed');
    } finally {
      setSaving(false);
    }
  }, [sourceId, name, url, type, isActive, onSaved, onClose]);

  return (
    <Modal open={open} onClose={onClose} size="md" title="Edit Source">
      <Stack gap="md">
        <TextInput
          label="Name"
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          required
        />

        <TextInput
          label="URL"
          value={url}
          onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
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
        <Button variant="ghost" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={saving || !name.trim() || !url.trim()}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </Modal>
  );
}
