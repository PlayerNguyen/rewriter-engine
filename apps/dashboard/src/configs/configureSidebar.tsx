import type { SidebarConfigItem } from '@rewriter/ui';
import { Bot, FileText, Link, Newspaper, ScrollText, Settings } from '@rewriter/ui';
import type { TFunction } from 'i18next';

export function configureSidebar(t: TFunction): SidebarConfigItem[] {
  return [
    {
      icon: Newspaper,
      label: t('sidebar.content'),
      defaultExpanded: true,
      children: [
        { icon: Newspaper, label: t('sidebar.articles'), to: '/articles' },
        { icon: FileText, label: t('sidebar.rewrites'), to: '/rewrites' },
      ],
    },
    {
      icon: Link,
      label: t('sidebar.configuration'),
      children: [
        { icon: Link, label: t('sidebar.sources'), to: '/sources' },
        { icon: Bot, label: t('sidebar.prompts'), to: '/prompts' },
      ],
    },
    {
      icon: Settings,
      label: t('sidebar.system'),
      children: [
        { icon: Settings, label: t('sidebar.settings'), to: '/settings' },
        { icon: ScrollText, label: t('sidebar.logs'), to: '/logs' },
      ],
    },
  ];
}
