import type { ModalBaseProps } from '@rewriter/modal';
import {
  type GetApiV1Parsers200Item,
  getApiV1Parsers,
  type PostApiV1SourcesBodyType,
  postApiV1Sources,
} from '@rewriter/rest-client';
import { Button, Checkbox, Modal, Select, Stack, TextInput } from '@rewriter/ui';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
 * Fields: name, url, type (dropdown), isActive (checkbox), parser (dropdown), requestDelayMs.
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
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<PostApiV1SourcesBodyType>('RSS');
  const [isActive, setIsActive] = useState(true);
  const [parserKey, setParserKey] = useState<string | null>(null);
  const [requestDelayMs, setRequestDelayMs] = useState(1000);
  const [parsers, setParsers] = useState<GetApiV1Parsers200Item[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      getApiV1Parsers()
        .then(setParsers)
        .catch(() => {});
    }
  }, [open]);

  const resetForm = useCallback(() => {
    setName('');
    setUrl('');
    setType('RSS');
    setIsActive(true);
    setParserKey(null);
    setRequestDelayMs(1000);
    setError(null);
  }, []);

  const handleSubmit = useCallback(async () => {
    setSaving(true);
    setError(null);
    try {
      await postApiV1Sources({ name, url, type, isActive, parserKey, requestDelayMs });
      resetForm();
      onCreated?.();
      onClose();
    } catch (e: unknown) {
      const err = e as { body?: { message?: string } };
      setError(err?.body?.message ?? 'Request failed');
    } finally {
      setSaving(false);
    }
  }, [name, url, type, isActive, parserKey, requestDelayMs, onCreated, onClose, resetForm]);

  const parserOptions = [
    { value: '', label: t('sources.autoDetect') },
    ...parsers.map((p) => ({ value: p.key, label: `${p.name} (${p.key})` })),
  ];

  return (
    <Modal
      open={open}
      onClose={() => {
        resetForm();
        onClose();
      }}
      size="md"
      title={t('sources.addSource')}
    >
      <Stack gap="md">
        <TextInput
          label={t('sources.name')}
          value={name}
          onChange={(e) => setName((e.target as HTMLInputElement).value)}
          placeholder="e.g. TechCrunch RSS"
          required
        />

        <TextInput
          label={t('sources.url')}
          value={url}
          onChange={(e) => setUrl((e.target as HTMLInputElement).value)}
          placeholder="https://example.com/feed.xml"
          required
        />

        <Select
          label={t('sources.type')}
          value={type}
          onChange={(v) => setType(v as PostApiV1SourcesBodyType)}
          options={SOURCE_TYPE_OPTIONS}
        />

        <Select
          label={t('sources.parser')}
          value={parserKey ?? ''}
          onChange={(v) => setParserKey(v === '' ? null : v)}
          options={parserOptions}
        />

        <TextInput
          label={t('sources.requestDelay')}
          value={String(requestDelayMs)}
          onChange={(e) => setRequestDelayMs(Number((e.target as HTMLInputElement).value) || 0)}
          placeholder="1000"
          type="number"
        />

        <Checkbox
          label={t('sources.active')}
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
          {t('sources.cancel')}
        </Button>
        <Button onClick={handleSubmit} disabled={saving || !name.trim() || !url.trim()}>
          {saving ? t('sources.creating') : t('sources.create')}
        </Button>
      </div>
    </Modal>
  );
}
