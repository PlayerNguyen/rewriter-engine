import type { SidebarConfigItem } from '@rewriter/ui';
import { Newspaper, FileText, Link, Bot, Settings, ScrollText } from '@rewriter/ui';

export function configureSidebar(): SidebarConfigItem[] {
  return [
    {
      icon: Newspaper,
      label: 'Content',
      defaultExpanded: true,
      children: [
        { icon: Newspaper, label: 'Articles', active: true },
        { icon: FileText, label: 'Rewrites' },
      ],
    },
    {
      icon: Link,
      label: 'Configuration',
      children: [
        { icon: Link, label: 'Sources' },
        { icon: Bot, label: 'Prompts' },
      ],
    },
    {
      icon: Settings,
      label: 'System',
      children: [
        { icon: Settings, label: 'Settings' },
        { icon: ScrollText, label: 'Logs' },
      ],
    },
  ];
}
