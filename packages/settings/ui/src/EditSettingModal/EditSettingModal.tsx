import type { ModalBaseProps } from '@rewriter/modal';
import type { PatchApiV1SettingsByKeyBody } from '@rewriter/rest-client';
import { patchApiV1SettingsByKey } from '@rewriter/rest-client';
import { Button, Modal, TextArea } from '@rewriter/ui';
import { useCallback, useState } from 'react';

export interface EditSettingModalCustomProps {
  settingKey: string;
  currentValue: unknown;
  onSaved?: () => void;
}

/**
 * Modal form for editing a single system setting's value.
 *
 * Displays the setting key as read-only text and the value as a JSON
 * textarea. PATCHes `/api/v1/settings/:key` on submit.
 *
 * Designed to be registered in the modal registry and opened via
 * `useModal().open('edit-setting', { settingKey, currentValue, onSaved })`.
 *
 * @example
 * ```tsx
 * // In modal registry (configureModals.ts):
 * 'edit-setting': (p: ModalBaseProps & EditSettingModalCustomProps) => (
 *   <EditSettingModal {...p} />
 * )
 *
 * // In a component:
 * const { open } = useModal();
 * open('edit-setting', {
 *   settingKey: 'llm.provider',
 *   currentValue: 'openai',
 *   onSaved: () => console.log('saved'),
 * });
 * ```
 */
export function EditSettingModal({
  open,
  onClose,
  settingKey,
  currentValue,
  onSaved,
}: ModalBaseProps & EditSettingModalCustomProps) {
  const [value, setValue] = useState(() => JSON.stringify(currentValue, null, 2));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      let parsed: unknown;
      try {
        parsed = JSON.parse(value);
      } catch {
        setError('Invalid JSON');
        setSaving(false);
        return;
      }

      await patchApiV1SettingsByKey(settingKey, {
        value: parsed as PatchApiV1SettingsByKeyBody['value'],
      });

      onSaved?.();
      onClose();
    } catch (_e) {
      setError('Request failed');
    } finally {
      setSaving(false);
    }
  }, [value, settingKey, onSaved, onClose]);

  return (
    <Modal open={open} onClose={onClose} size="md" title="Edit Setting">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-ink-subtle mb-1">Key</label>
          <p className="text-sm text-ink">{settingKey}</p>
        </div>

        <div>
          <TextArea
            label="Value (JSON)"
            value={value}
            onChange={(e) => setValue((e.target as HTMLTextAreaElement).value)}
            rows={8}
            className="font-mono text-sm"
          />
        </div>

        {error && <p className="text-sm text-semantic-error">{error}</p>}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="ghost" onClick={onClose} disabled={saving}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </Modal>
  );
}
