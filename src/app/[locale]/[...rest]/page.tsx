import { notFound } from 'next/navigation';

/** Catches unknown paths under a locale so they render the localized not-found page. */
export default function CatchAllPage() {
  notFound();
}
