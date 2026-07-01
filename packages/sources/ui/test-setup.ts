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
