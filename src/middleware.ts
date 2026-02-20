import createMiddleware from 'next-intl/middleware';

// Create middleware with Arabic as default locale
const middleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['ar', 'en'],

  // Used when no locale matches (set Arabic as default)
  defaultLocale: 'ar',

  // Disable locale detection to always use Arabic as default
  localeDetection: false,
});

export default middleware;

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/',
    '/(ar|en)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|svg/|images/|videos/|sounds/|fonts/|gif|sitemap|server-sitemap|robots).*)',
  ],
};
