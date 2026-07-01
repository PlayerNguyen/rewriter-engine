import { mock } from 'bun:test';
import { Window } from 'happy-dom';

const window = new Window();
const document = window.document;

for (const key of Object.getOwnPropertyNames(window)) {
  if (key in globalThis) continue;
  try {
    (globalThis as Record<string, unknown>)[key] = (window as Record<string, unknown>)[key];
  } catch {
    // Silently skip if not assignable
  }
}

(globalThis as Record<string, unknown>).document = document;
(globalThis as Record<string, unknown>).window = window;

const translations: Record<string, string> = {
  'sidebar.sources': 'Sources',
  'sources.addSource': 'Add Source',
  'sources.editSource': 'Edit Source',
  'sources.delete': 'Delete',
  'sources.deleteSource': 'Delete Source',
  'sources.deleteConfirm': 'Are you sure you want to delete "{{name}}"?',
  'sources.name': 'Name',
  'sources.url': 'URL',
  'sources.type': 'Type',
  'sources.active': 'Active',
  'sources.lastFetched': 'Last Fetched',
  'sources.create': 'Create',
  'sources.cancel': 'Cancel',
  'sources.save': 'Save',
  'sources.creating': 'Creating...',
  'sources.saving': 'Saving...',
};

const useTranslation = () => ({
  t: (key: string) => translations[key] ?? key,
  i18n: { language: 'en', changeLanguage: () => Promise.resolve() },
});

const Trans = ({ children }: { children: React.ReactNode }) => children;

mock.module('react-i18next', () => ({
  useTranslation,
  Trans,
}));

mock.module('@rewriter/rest-client', () => ({
  postApiV1Sources: mock(() => Promise.resolve({})),
  patchApiV1SourcesById: mock(() => Promise.resolve({})),
  deleteApiV1SourcesById: mock(() => Promise.resolve({})),
  getApiV1Table: mock(() =>
    Promise.resolve({ data: [], total: 0, page: 1, limit: 20, totalPages: 0 }),
  ),
  getApiV1Health: mock(() => Promise.resolve({ status: 'ok' })),
  customFetchInstance: mock((opts: { url: string }) => Promise.resolve(opts)),
}));
