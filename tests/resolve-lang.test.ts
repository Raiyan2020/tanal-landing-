import { describe, expect, it } from 'vitest';
import { resolveLang } from '@/lib/dictionaries';

describe('resolveLang', () => {
  it('prefers a valid ?lang= over the cookie', () => {
    expect(resolveLang('en', 'ar')).toBe('en');
    expect(resolveLang('ar', 'en')).toBe('ar');
  });

  it('falls back to the tanal_lang cookie when the query is missing or invalid', () => {
    expect(resolveLang(undefined, 'en')).toBe('en');
    expect(resolveLang('fr', 'en')).toBe('en');
    expect(resolveLang('', 'en')).toBe('en');
  });

  it('defaults to Arabic and is case-sensitive', () => {
    expect(resolveLang(undefined, undefined)).toBe('ar');
    expect(resolveLang('EN', 'Ar')).toBe('ar');
    expect(resolveLang('fr', 'de')).toBe('ar');
  });
});
