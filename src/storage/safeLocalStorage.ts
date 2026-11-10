import type { StateStorage } from 'zustand/middleware';

/**
 * `localStorage` that never throws. Storage can be unavailable (private mode,
 * blocked site data), in which case the app keeps working with in-memory state.
 */
export const safeLocalStorage: StateStorage = {
  getItem(name) {
    try {
      return window.localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem(name, value) {
    try {
      window.localStorage.setItem(name, value);
    } catch {
      // Persisting is best effort.
    }
  },
  removeItem(name) {
    try {
      window.localStorage.removeItem(name);
    } catch {
      // Nothing to clean up when storage is unavailable.
    }
  },
};
