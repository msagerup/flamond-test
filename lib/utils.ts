import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isClientSide() {
  return typeof window !== 'undefined';
}



/**
 * Constructs a complete URL using either the current domain or a specified external domain,
 * with an optional slug appended to the end of the URL.
 *
 * @param {boolean | undefined} isExternalPath - Determines the base URL. If true, the base URL
 *   is the domain deployed development / production environment.
 *   If false, the base URL is set to the localhost.
 *
 * @param {string | null} slug - An optional slug to append to the base URL. Default is null.
 * @returns {string} - The constructed URL | ''.
 *
 * @example
 * // Assuming the function is called on 'http://localhost:{port}'
 * getDomainUrl(true, 'thanks');  // Returns 'https://{domainname}.{subdomain}/{thanks}'
 * getDomainUrl(false, 'costumers'); // Returns 'http://localhost:{port}/{costumers}'
 * getDomainUrl(); // Returns 'http://localhost:{port}'
 *
 */
export function getDomainUrl(
  isExternalPath?: boolean,
  slug: string | null = null
): string {
  if (isClientSide()) {
    const baseUrl = isExternalPath
      ? `${window.location.protocol}//${window.location.hostname}`
      : 'http://localhost:3000';

    const urlSlug = slug || '';

    return `${baseUrl}/${urlSlug}`;
  }
  return '';
}
