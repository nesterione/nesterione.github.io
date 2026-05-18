import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { baseSlug } from '../utils/posts';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', (p) => p.data.lang === 'ru');
  return rss({
    title: 'Ihar Nestsiarenia — заметки',
    description: 'Короткие заметки об ИИ, инженерии и продуктовом мышлении.',
    site: context.site ?? 'https://nesterione.com',
    items: posts
      .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description ?? '',
        link: `/ru/posts/${baseSlug(post)}/`,
      })),
    customData: '<language>ru-RU</language>',
  });
}
