import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['ru', 'en']),
    telegram_url: z.string().url().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { posts };
