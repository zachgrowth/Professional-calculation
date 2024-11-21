import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'zh', 'ja', 'ko', 'es', 'fr', 'de'],
 
  // Used when no locale matches
  defaultLocale: 'en',

  // Detect locale from browser settings
  localeDetection: true,

  // Store the preferred locale in a cookie
  localePrefix: 'always'
});
 
export const config = {
  // Match all pathnames except for
  // - ... (e.g. files in /public or /_next)
  // - /_next
  // - /_vercel
  // - /_static
  // - /favicon.ico, /sitemap.xml, /robots.txt
  matcher: ['/((?!api|_next|_vercel|_static|.*\\..*).*)']
};