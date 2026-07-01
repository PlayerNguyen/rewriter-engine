import { Toaster, toast } from 'react-hot-toast';

/**
 * Styled toast provider for the dashboard.
 *
 * Renders toast notifications using the Linear-inspired dark theme from DESIGN.md.
 * Mount once at the app root (inside ThemeProvider).
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="dark">
 *   <ToastProvider />
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--color-surface-2)',
          color: 'var(--color-ink)',
          border: '1px solid var(--color-hairline)',
          borderRadius: '8px',
          fontSize: '14px',
          lineHeight: '1.5',
        },
        success: {
          iconTheme: {
            primary: 'var(--color-semantic-success)',
            secondary: 'var(--color-surface-2)',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--color-semantic-error)',
            secondary: 'var(--color-surface-2)',
          },
        },
      }}
    />
  );
}

export { toast };
