import { Pathnames } from 'next-intl/navigation';
 
export const locales = ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de'] as const;
export const defaultLocale = 'en' as const;
 
export const pathnames = {
  '/': '/',
  '/percentage/education': '/percentage/education',
  '/percentage/business': '/percentage/business',
  '/percentage/convert': '/percentage/convert',
  '/percentage/learn': '/percentage/learn',
} satisfies Pathnames<typeof locales>;
 
// Use the default: `always`
export const localePrefix = 'always';
 
export type AppPathnames = keyof typeof pathnames;