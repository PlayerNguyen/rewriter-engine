import clsx from 'clsx';
import {
  ChevronDown,
  type LucideIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  X,
} from 'lucide-react';
import { forwardRef, useCallback, useMemo, useState } from 'react';
import { Tooltip } from './Tooltip';

export interface SidebarLeaf {
  icon: LucideIcon;
  label: string;
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
}

function isGroup(item: SidebarConfigItem): item is SidebarGroup {
  return 'children' in item;
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  (
    { expanded, onToggle, items, searchPlaceholder = 'Search...', onSearch, footer, className },
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
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        onSearch?.(e.target.value);
      },
      [onSearch],
    );

    const clearSearch = useCallback(() => {
      setSearchQuery('');
      onSearch?.('');
    }, [onSearch]);

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
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-tertiary" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder={searchPlaceholder}
                  className={clsx(
                    'w-full h-8 pl-8 pr-8 text-sm bg-surface-2 text-ink border border-hairline rounded-md',
                    'outline-none transition-all duration-150',
                    'placeholder:text-ink-tertiary',
                    'focus:ring-2 focus:ring-primary-focus/50 focus:border-primary-focus',
                  )}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-tertiary hover:text-ink transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
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
                        return (
                          <button
                            key={child.label}
                            onClick={child.onClick}
                            className={clsx(
                              'flex items-center w-full h-8 px-2 rounded-md',
                              'transition-colors duration-150',
                              child.active
                                ? 'bg-surface-2 text-primary'
                                : 'text-ink-subtle hover:text-ink hover:bg-surface-2',
                            )}
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

            if (!expanded) {
              return (
                <Tooltip key={item.label} content={item.label} placement="right">
                  <button
                    onClick={item.onClick}
                    className={clsx(
                      'flex items-center justify-center w-12 h-9 rounded-md',
                      'transition-colors duration-150',
                      item.active
                        ? 'bg-surface-2 text-primary'
                        : 'text-ink-subtle hover:text-ink hover:bg-surface-2',
                    )}
                    aria-label={item.label}
                  >
                    <LeafIcon className="w-4 h-4" />
                  </button>
                </Tooltip>
              );
            }

            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className={clsx(
                  'flex items-center w-full h-8 px-2 rounded-md',
                  'transition-colors duration-150',
                  item.active
                    ? 'bg-surface-2 text-primary'
                    : 'text-ink-subtle hover:text-ink hover:bg-surface-2',
                )}
              >
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
