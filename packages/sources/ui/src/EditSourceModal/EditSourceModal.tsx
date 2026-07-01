import type { ModalBaseProps } from '@rewriter/modal';
import { type PatchApiV1SourcesByIdBodyType, patchApiV1SourcesById } from '@rewriter/rest-client';
import { Button, Checkbox, Modal, Select, Stack, TextInput } from '@rewriter/ui';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
      await patchApiV1SourcesById(sourceId, {
        name,
        url,
        type: type as PatchApiV1SourcesByIdBodyType,
        isActive,
      });
      onSaved?.();
      onClose();
    } catch (e: unknown) {
      const err = e as { body?: { message?: string } };
      setError(err?.body?.message ?? 'Request failed');
    } finally {
      setSaving(false);
    }
  }, [sourceId, name, url, type, isActive, onSaved, onClose]);

  return (
    <Modal open={open} onClose={onClose} size="md" title={t('sources.editSource')}>
      <Stack gap="md">
        <TextInput
          label={t('sources.name')}
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          required
        />

        <TextInput
          label={t('sources.url')}
          value={url}
          onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
          required
        />

        <Select
          label={t('sources.type')}
          value={type}
          onChange={setType}
          options={SOURCE_TYPE_OPTIONS}
        />

        <Checkbox
          label={t('sources.active')}
          checked={isActive}
          onChange={(e) => setIsActive((e.target as HTMLInputElement).checked)}
        />

        {error && <p className="text-sm text-semantic-error">{error}</p>}
      </Stack>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="ghost" onClick={onClose} disabled={saving}>
          {t('sources.cancel')}
        </Button>
        <Button onClick={handleSubmit} disabled={saving || !name.trim() || !url.trim()}>
          {saving ? t('sources.saving') : t('sources.save')}
        </Button>
      </div>
    </Modal>
  );
}
