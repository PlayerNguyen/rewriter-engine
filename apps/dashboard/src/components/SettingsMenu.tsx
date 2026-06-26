import { Button, ChevronRight, Languages, LogOut, Popover, Settings } from '@rewriter/ui';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageModal } from './LanguageModal';

interface SettingsMenuProps {
  expanded: boolean;
}

export function SettingsMenu({ expanded }: SettingsMenuProps) {
  const { t } = useTranslation();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleLanguageClick = useCallback(() => {
    setPopoverOpen(false);
    setLanguageModalOpen(true);
  }, []);

  return (
    <>
      {expanded ? (
        <Button
          ref={buttonRef}
          variant="ghost"
          size="sm"
          fullWidth
          icon={<Settings className="w-4 h-4" />}
          onClick={() => setPopoverOpen(!popoverOpen)}
          aria-haspopup="menu"
          aria-expanded={popoverOpen}
        >
          {t('settings.label')}
        </Button>
      ) : (
        <Button
          ref={buttonRef}
          variant="ghost"
          size="sm"
          iconOnly
          icon={<Settings className="w-4 h-4" />}
          onClick={() => setPopoverOpen(!popoverOpen)}
          aria-haspopup="menu"
          aria-expanded={popoverOpen}
          aria-label={t('settings.label')}
        />
      )}

      <Popover
        open={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        anchorRef={buttonRef}
        placement="top-end"
      >
        <div className="py-1 min-w-[180px]">
          <button
            role="menuitem"
            onClick={handleLanguageClick}
            className="flex items-center w-full px-3 py-2 text-sm text-ink hover:bg-surface-3 transition-colors"
          >
            <Languages className="w-4 h-4 mr-2.5 shrink-0" />
            <span className="flex-1 text-left">{t('settings.language')}</span>
            <ChevronRight className="w-3.5 h-3.5 text-ink-tertiary" />
          </button>
          <button
            role="menuitem"
            onClick={() => setPopoverOpen(false)}
            className="flex items-center w-full px-3 py-2 text-sm text-ink hover:bg-surface-3 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2.5 shrink-0" />
            <span className="flex-1 text-left">{t('settings.logout')}</span>
          </button>
        </div>
      </Popover>

      <LanguageModal open={languageModalOpen} onClose={() => setLanguageModalOpen(false)} />
    </>
  );
}
