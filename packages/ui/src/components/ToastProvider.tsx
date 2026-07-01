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
          background: 'var(--colors-surface-2)',
          color: 'var(--colors-ink)',
          border: '1px solid var(--colors-hairline)',
          borderRadius: 'var(--rounded-md)',
          fontSize: '14px',
          lineHeight: '1.5',
        },
        success: {
          iconTheme: {
            primary: 'var(--colors-semantic-success)',
            secondary: 'var(--colors-surface-2)',
          },
        },
        error: {
          iconTheme: {
            primary: 'var(--colors-semantic-error)',
            secondary: 'var(--colors-surface-2)',
          },
        },
      }}
    />
  );
}

export { toast };
