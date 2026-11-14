import { defineConfig } from 'astro/config';

/**
 * The site's public address, used for SEO (canonical link) and social-share previews.
 * Priority:
 *   1. SITE_URL environment variable (set this in Vercel once you have a custom domain,
 *      e.g. https://www.yourbusiness.com.au), or edit the fallback below.
 *   2. The Vercel production URL (set automatically by Vercel during builds).
 *   3. A placeholder for local development.
 */
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'https://www.example.com');

// https://astro.build/config
export default defineConfig({
  site,
  devToolbar: { enabled: false },
});
