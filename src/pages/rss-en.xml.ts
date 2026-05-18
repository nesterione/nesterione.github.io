import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { baseSlug } from '../utils/posts';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', (p) => p.data.lang === 'en');
  return rss({
    title: 'Ihar Nestsiarenia — notes',
    description: 'Short notes on AI, engineering, and product thinking.',
    site: context.site ?? 'https://nesterione.com',
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description ?? '',
        link: `/en/posts/${baseSlug(post)}/`,
      })),
    customData: '<language>en</language>',
  });
}
