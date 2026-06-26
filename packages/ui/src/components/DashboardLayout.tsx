import clsx from 'clsx';
import { type ReactNode, forwardRef } from 'react';

export interface DashboardLayoutProps {
  sidebar: ReactNode;
  header?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const DashboardLayout = forwardRef<HTMLDivElement, DashboardLayoutProps>(
  ({ sidebar, header, children, className }, ref) => {
    return (
      <div ref={ref} className={clsx('flex h-screen bg-canvas', className)}>
        {/* Sidebar */}
        {sidebar}

        {/* Main Content Area */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {header && (
            <header className="shrink-0 border-b border-hairline bg-surface-1">
              {header}
            </header>
          )}
          <main className="flex-1 overflow-auto p-lg">{children}</main>
        </div>
      </div>
    );
  },
);

DashboardLayout.displayName = 'DashboardLayout';
