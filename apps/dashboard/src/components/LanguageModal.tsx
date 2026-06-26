import { Check, Modal } from '@rewriter/ui';
import clsx from 'clsx';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageModalProps {
  open: boolean;
  onClose: () => void;
}

const LANGUAGES = [
  { code: 'en', labelKey: 'languageSwitcher.en' },
  { code: 'vi', labelKey: 'languageSwitcher.vi' },
] as const;

export function LanguageModal({ open, onClose }: LanguageModalProps) {
  const { t, i18n } = useTranslation();

  const handleSelect = useCallback(
    (code: string) => {
      i18n.changeLanguage(code);
      onClose();
    },
    [i18n, onClose],
  );

  return (
    <Modal open={open} onClose={onClose} size="sm" title={t('languageSwitcher.label')}>
      <div className="space-y-1 mt-2">
        {LANGUAGES.map((lang) => {
          const isActive = i18n.language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={clsx(
                'flex items-center w-full px-3 py-2.5 rounded-md text-sm transition-colors',
                isActive ? 'bg-primary/20 text-primary' : 'text-ink hover:bg-surface-3',
              )}
            >
              <span className="flex-1 text-left">{t(lang.labelKey)}</span>
              {isActive && <Check className="w-4 h-4 shrink-0" />}
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
