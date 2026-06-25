import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'dark' | 'light' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
}

export interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: 'dark' | 'light';
  setTheme: (mode: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const darkVariables: Record<string, string> = {
  '--color-canvas': '#010102',
  '--color-surface-1': '#0e0f11',
  '--color-surface-2': '#17181c',
  '--color-surface-3': '#1e2025',
  '--color-surface-4': '#272a2f',
  '--color-primary': '#5e6ad2',
  '--color-primary-hover': '#828fff',
  '--color-primary-focus': '#5e69d1',
  '--color-hairline': '#23252a',
  '--color-hairline-strong': '#2e3035',
  '--color-hairline-tertiary': '#3a3d43',
  '--color-ink': '#f7f8f8',
  '--color-ink-muted': '#d0d6e0',
  '--color-ink-subtle': '#8a8f98',
  '--color-ink-tertiary': '#62666d',
  '--color-inverse-canvas': '#ffffff',
  '--color-inverse-ink': '#010102',
  '--color-semantic-success': '#27a644',
  '--color-semantic-error': '#e5484d',
  '--color-semantic-warning': '#f5a623',
  '--color-semantic-overlay': '#000000',
};

const lightVariables: Record<string, string> = {
  '--color-canvas': '#ffffff',
  '--color-surface-1': '#f8f9fa',
  '--color-surface-2': '#f0f1f3',
  '--color-surface-3': '#e8eaed',
  '--color-surface-4': '#dee0e4',
  '--color-primary': '#5e6ad2',
  '--color-primary-hover': '#4a56b8',
  '--color-primary-focus': '#5e69d1',
  '--color-hairline': '#e0e2e6',
  '--color-hairline-strong': '#d0d3d8',
  '--color-hairline-tertiary': '#c0c4ca',
  '--color-ink': '#0a0a0b',
  '--color-ink-muted': '#4a4d52',
  '--color-ink-subtle': '#6b6f76',
  '--color-ink-tertiary': '#9a9ea5',
  '--color-inverse-canvas': '#010102',
  '--color-inverse-ink': '#f7f8f8',
  '--color-semantic-success': '#27a644',
  '--color-semantic-error': '#e5484d',
  '--color-semantic-warning': '#f5a623',
  '--color-semantic-overlay': '#000000',
};

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(mode: ThemeMode): 'dark' | 'light' {
  return mode === 'system' ? getSystemTheme() : mode;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'rewriter-theme',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return defaultTheme;
    const stored = localStorage.getItem(storageKey);
    return (stored as ThemeMode) || defaultTheme;
  });

  const resolvedTheme = resolveTheme(theme);

  const setTheme = useCallback(
    (mode: ThemeMode) => {
      setThemeState(mode);
      localStorage.setItem(storageKey, mode);
    },
    [storageKey],
  );

  useEffect(() => {
    const root = document.documentElement;
    const variables = resolvedTheme === 'dark' ? darkVariables : lightVariables;

    for (const [key, value] of Object.entries(variables)) {
      root.style.setProperty(key, value);
    }

    root.setAttribute('data-theme', resolvedTheme);
    root.classList.toggle('dark', resolvedTheme === 'dark');
    root.classList.toggle('light', resolvedTheme === 'light');
  }, [resolvedTheme]);

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setThemeState('system'); // triggers re-resolve
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
