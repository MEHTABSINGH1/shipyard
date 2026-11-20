export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const SITE_ORIGIN = "https://mehtabsingh1.github.io";
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

/**
 * Prefix a /public asset path with the basePath. next/link adds basePath
 * automatically, but plain asset URLs (next/image src) need it added by hand.
 */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`;
}
