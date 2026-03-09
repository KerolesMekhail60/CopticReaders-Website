const FALLBACK_SITE_URL = 'https://coptic-readers-web.vercel.app';

export function getSiteUrl() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    FALLBACK_SITE_URL;

  return configuredUrl.replace(/\/$/, '');
}
