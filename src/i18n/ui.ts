export type Lang = 'ru' | 'en';

export const languages: Record<Lang, string> = {
  ru: 'RU',
  en: 'EN',
};

export const ui = {
  ru: {
    brand: 'Ihar Nestsiarenia',
    nav_home: 'Главная',
    nav_posts: 'Заметки',
    nav_about: 'Об авторе',
    recent: 'Недавнее',
    all_posts: 'Все заметки',
    originally_on_telegram: 'Изначально в Telegram',
    rss: 'RSS',
    no_posts: 'Пока ничего нет.',
  },
  en: {
    brand: 'Ihar Nestsiarenia',
    nav_home: 'Home',
    nav_posts: 'Notes',
    nav_about: 'About',
    recent: 'Recent',
    all_posts: 'All notes',
    originally_on_telegram: 'Originally on Telegram',
    rss: 'RSS',
    no_posts: 'Nothing here yet.',
  },
} as const;

export const dateLocale: Record<Lang, string> = {
  ru: 'ru-RU',
  en: 'en-GB',
};

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(dateLocale[lang], {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
