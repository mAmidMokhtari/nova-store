import type { StateStorage } from 'zustand/middleware';

function readItem(name: string): string | null {
  try {
    return window.localStorage.getItem(name);
  } catch {
    return null;
  }
}

function removeItem(name: string): void {
  try {
    window.localStorage.removeItem(name);
  } catch {
    // Nothing to clean up when storage is unavailable.
  }
}

/**
 * `localStorage` that never throws. Storage can be unavailable (private mode,
 * blocked site data), in which case the app keeps working with in-memory state.
 */
export const safeLocalStorage: StateStorage = {
  getItem: readItem,
  setItem(name, value) {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      // Persisting is best effort.
    }
  },
  removeItem,
};

/**
 * `safeLocalStorage` for values that must be JSON. A value that does not parse is
 * removed and reported as missing. Without this, the persist middleware fails while
 * reading it and never reports that hydration finished.
 */
export const safeJsonLocalStorage: StateStorage = {
  ...safeLocalStorage,
  getItem(name) {
    const raw = readItem(name);
    if (raw === null) return null;

    try {
      JSON.parse(raw);
      return raw;
    } catch {
      removeItem(name);
      return null;
    }
  },
};
