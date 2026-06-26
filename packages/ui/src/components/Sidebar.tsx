import clsx from 'clsx';
import {
  ChevronDown,
  type LucideIcon,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';
import { type ElementType, forwardRef, useCallback, useEffect, useMemo, useState } from 'react';
import { CommandInput } from './CommandInput';
import { Tooltip } from './Tooltip';

export interface SidebarLeaf {
  icon: LucideIcon;
  label: string;
  to?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarGroup {
  icon: LucideIcon;
  label: string;
  children: SidebarLeaf[];
  defaultExpanded?: boolean;
}

export type SidebarConfigItem = SidebarGroup | SidebarLeaf;

export interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
  items: SidebarConfigItem[];
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  footer?: React.ReactNode;
  className?: string;
  linkComponent?: ElementType<{ to: string; className?: string; children: React.ReactNode }>;
}

function isGroup(item: SidebarConfigItem): item is SidebarGroup {
  return 'children' in item;
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      expanded,
      onToggle,
      items,
      searchPlaceholder = 'Search...',
      onSearch,
      footer,
      className,
      linkComponent,
    },
    ref,
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
      const initial = new Set<string>();
      items.forEach((item) => {
        if (isGroup(item) && item.defaultExpanded) {
          initial.add(item.label);
        }
      });
      return initial;
    });

    useEffect(() => {
      setExpandedGroups((prev) => {
        const next = new Set<string>();
        items.forEach((item) => {
          if (isGroup(item) && item.defaultExpanded) {
            next.add(item.label);
          }
        });
        if (prev.size === next.size && [...prev].every((k) => next.has(k))) {
          return prev;
        }
        return next;
      });
    }, [items]);

    const filteredItems = useMemo(() => {
      if (!searchQuery.trim()) return items;

      const q = searchQuery.toLowerCase();
      return items
        .map((item) => {
          if (isGroup(item)) {
            const matchedChildren = item.children.filter((child) =>
              child.label.toLowerCase().includes(q),
            );
            return matchedChildren.length > 0 ? { ...item, children: matchedChildren } : null;
          }
          return item.label.toLowerCase().includes(q) ? item : null;
        })
        .filter(Boolean) as SidebarConfigItem[];
    }, [items, searchQuery]);

    const toggleGroup = useCallback((label: string) => {
      setExpandedGroups((prev) => {
        const next = new Set(prev);
        if (next.has(label)) {
          next.delete(label);
        } else {
          next.add(label);
        }
        return next;
      });
    }, []);

    const handleSearchChange = useCallback(
      (value: string) => {
        setSearchQuery(value);
        onSearch?.(value);
      },
      [onSearch],
    );

    const isSearching = searchQuery.trim().length > 0;

    return (
      <div
        ref={ref}
        className={clsx(
          'flex flex-col h-full bg-surface-1 border-r border-hairline',
          'transition-all duration-200 ease-in-out',
          expanded ? 'w-60' : 'w-16',
          className,
        )}
      >
        {/* Search / Toggle Row */}
        <div className="flex items-center gap-1 p-2 border-b border-hairline">
          {expanded ? (
            <>
              <CommandInput
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                className="flex-1"
              />
              <Tooltip content="Collapse sidebar" placement="right">
                <button
                  onClick={onToggle}
                  className={clsx(
                    'flex items-center justify-center w-8 h-8 rounded-md',
                    'text-ink-subtle hover:text-ink hover:bg-surface-2',
                    'transition-colors duration-150',
                  )}
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              </Tooltip>
            </>
          ) : (
            <Tooltip content="Expand sidebar" placement="right">
              <button
                onClick={onToggle}
                className={clsx(
                  'flex items-center justify-center w-8 h-8 rounded-md',
                  'text-ink-subtle hover:text-ink hover:bg-surface-2',
                  'transition-colors duration-150',
                )}
                aria-label="Expand sidebar"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>
            </Tooltip>
          )}
        </div>

        {/* Navigation */}
        <nav
          className={clsx(
            'flex-1 overflow-y-auto p-2 space-y-0.5',
            !expanded && 'flex flex-col items-center',
          )}
        >
          {filteredItems.map((item) => {
            if (isGroup(item)) {
              const groupExpanded = isSearching || expandedGroups.has(item.label);
              const GroupIcon = item.icon;

              if (!expanded) {
                return (
                  <Tooltip key={item.label} content={item.label} placement="right">
                    <button
                      onClick={onToggle}
                      className={clsx(
                        'flex items-center justify-center w-12 h-9 rounded-md',
                        'text-ink-subtle hover:text-ink hover:bg-surface-2',
                        'transition-colors duration-150',
                      )}
                      aria-label={item.label}
                    >
                      <GroupIcon className="w-4 h-4" />
                    </button>
                  </Tooltip>
                );
              }

              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleGroup(item.label)}
                    className={clsx(
                      'flex items-center w-full h-8 px-2 rounded-md',
                      'text-ink-subtle hover:text-ink hover:bg-surface-2',
                      'transition-colors duration-150',
                    )}
                  >
                    <GroupIcon className="w-4 h-4 shrink-0" />
                    <span className="flex-1 ml-2.5 text-xs font-medium text-left truncate">
                      {item.label}
                    </span>
                    <ChevronDown
                      className={clsx(
                        'w-3.5 h-3.5 shrink-0 transition-transform duration-150',
                        groupExpanded && 'rotate-180',
                      )}
                    />
                  </button>
                  {groupExpanded && (
                    <div className="ml-2 mt-0.5 space-y-0.5">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon;
                        const childClassName = clsx(
                          'flex items-center w-full h-8 px-2 rounded-md',
                          'transition-colors duration-150',
                          child.active
                            ? 'bg-surface-2 text-primary'
                            : 'text-ink-subtle hover:text-ink hover:bg-surface-2',
                        );
                        if (linkComponent && child.to) {
                          const Link = linkComponent;
                          return (
                            <Link key={child.label} to={child.to} className={childClassName}>
                              <ChildIcon className="w-4 h-4 shrink-0" />
                              <span className="ml-2.5 text-sm truncate">{child.label}</span>
                            </Link>
                          );
                        }
                        return (
                          <button
                            key={child.label}
                            onClick={child.onClick}
                            className={childClassName}
                          >
                            <ChildIcon className="w-4 h-4 shrink-0" />
                            <span className="ml-2.5 text-sm truncate">{child.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const LeafIcon = item.icon;
            const leafClassName = clsx(
              'flex items-center w-full h-8 px-2 rounded-md',
              'transition-colors duration-150',
              item.active
                ? 'bg-surface-2 text-primary'
                : 'text-ink-subtle hover:text-ink hover:bg-surface-2',
            );

            if (!expanded) {
              const collapsedClassName = clsx(
                'flex items-center justify-center w-12 h-9 rounded-md',
                'transition-colors duration-150',
                item.active
                  ? 'bg-surface-2 text-primary'
                  : 'text-ink-subtle hover:text-ink hover:bg-surface-2',
              );
              if (linkComponent && item.to) {
                const Link = linkComponent;
                return (
                  <Tooltip key={item.label} content={item.label} placement="right">
                    <Link to={item.to} className={collapsedClassName} aria-label={item.label}>
                      <LeafIcon className="w-4 h-4" />
                    </Link>
                  </Tooltip>
                );
              }
              return (
                <Tooltip key={item.label} content={item.label} placement="right">
                  <button
                    onClick={item.onClick}
                    className={collapsedClassName}
                    aria-label={item.label}
                  >
                    <LeafIcon className="w-4 h-4" />
                  </button>
                </Tooltip>
              );
            }

            if (linkComponent && item.to) {
              const Link = linkComponent;
              return (
                <Link key={item.label} to={item.to} className={leafClassName}>
                  <LeafIcon className="w-4 h-4 shrink-0" />
                  <span className="ml-2.5 text-sm truncate">{item.label}</span>
                </Link>
              );
            }
            return (
              <button key={item.label} onClick={item.onClick} className={leafClassName}>
                <LeafIcon className="w-4 h-4 shrink-0" />
                <span className="ml-2.5 text-sm truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {footer && (
          <div className={clsx('border-t border-hairline p-2', !expanded && 'flex justify-center')}>
            {footer}
          </div>
        )}
      </div>
    );
  },
);

Sidebar.displayName = 'Sidebar';
