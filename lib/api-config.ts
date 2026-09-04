/**
 * Single source of truth for where the backend lives.
 *
 * `NEXT_PUBLIC_API_BASE_URL` overrides it — set it in `.env.local`, which is
 * gitignored. The default points at production so a fresh checkout with no env
 * file still renders: previously the server-side value was the raw env var with
 * no fallback, so an unset variable made every SSR fetch request the literal
 * URL `"undefined/site"` and throw.
 *
 * `next.config.ts` imports this too, so the rewrite destination, the CSP and
 * `images.remotePatterns` all follow the same value. Those were three separate
 * hardcoded copies of the host before.
 *
 * Keep this module dependency-free and free of browser/Node-only globals: it is
 * evaluated by the Next config loader, on the server, and in the browser bundle.
 */

/** Production API. Used whenever `NEXT_PUBLIC_API_BASE_URL` is unset or blank. */
export const DEFAULT_API_BASE_URL = 'https://portal.tanalevents.com/api/v1';

/**
 * In the browser the site calls itself and lets the `rewrites()` proxy in
 * `next.config.ts` forward to the API. That keeps requests same-origin, so
 * there is no CORS preflight and the API host stays out of the page's network
 * traffic. Must stay in step with the `source` of that rewrite.
 */
export const BROWSER_API_BASE_PATH = '/api/v1';

/** Trailing slashes are stripped so `${base}${endpoint}` never doubles up. */
function normalise(value: string | undefined): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed.replace(/\/+$/, '') : '';
}

/**
 * A malformed value fails loudly rather than quietly falling back to production:
 * silently talking to the wrong backend is worse than not booting.
 */
function parse(baseUrl: string): URL {
  try {
    return new URL(baseUrl);
  } catch {
    throw new Error(
      `NEXT_PUBLIC_API_BASE_URL is not a valid absolute URL: "${baseUrl}". ` +
      `Expected something like "${DEFAULT_API_BASE_URL}".`
    );
  }
}

/**
 * Absolute base, e.g. `https://portal.tanalevents.com/api/v1`. Used for
 * server-side fetches and as the rewrite destination — never in the browser,
 * which goes through `BROWSER_API_BASE_PATH`.
 */
export const API_BASE_URL =
  normalise(process.env.NEXT_PUBLIC_API_BASE_URL) || DEFAULT_API_BASE_URL;

const apiUrl = parse(API_BASE_URL);

/** Scheme + host only, e.g. `https://portal.tanalevents.com` — for the CSP. */
export const API_ORIGIN = apiUrl.origin;

/** Split out for `images.remotePatterns`, which wants the parts separately. */
export const API_PROTOCOL = apiUrl.protocol.replace(':', '') as 'http' | 'https';
export const API_HOSTNAME = apiUrl.hostname;

/**
 * Base for the current runtime: relative in the browser, absolute on the server.
 * Called per request rather than resolved once at module scope so it is correct
 * regardless of which bundle the module ends up in.
 */
export function resolveApiBase(): string {
  return typeof window === 'undefined' ? API_BASE_URL : BROWSER_API_BASE_PATH;
}
