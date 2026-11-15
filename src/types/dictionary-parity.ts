import type en from '@/dictionary/en.json';
import type fa from '@/dictionary/fa.json';

/** Compiles only when `Actual` has every key of `Expected`, at every depth. */
type HasKeysOf<Actual extends Expected, Expected> = Actual;

/**
 * Message keys are typed from `fa.json` alone, so a key missing from `en.json`
 * would only fail at runtime on the English pages. These two aliases turn a key
 * that exists in one dictionary but not in the other into a compile error.
 */
export type EnglishCoversPersian = HasKeysOf<typeof en, typeof fa>;
export type PersianCoversEnglish = HasKeysOf<typeof fa, typeof en>;
