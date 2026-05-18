import type { CollectionEntry } from 'astro:content';

/** Astro's auto-slug for entries in `posts/{ru,en}/<file>.md` is `"<lang>/<file>"`.
 *  Strip the language prefix so we can build clean URLs like `/ru/posts/<file>/`. */
export function baseSlug(entry: CollectionEntry<'posts'>): string {
  return entry.slug.replace(/^(ru|en)\//, '');
}
