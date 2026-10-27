export type Lang = 'en' | 'ar';

export const LANG_STORAGE_KEY = 'tanal_lang';

export function langStyles(lang: Lang) {
  const isRtl = lang === 'ar';
  return {
    isRtl,
    fontClass: isRtl ? 'font-arabic' : 'font-sans',
    headingFontClass: isRtl ? 'font-arabic font-bold' : 'font-serif',
  };
}

/**
 * Resolves the page language from `?lang=` first, then the `tanal_lang` cookie,
 * defaulting to Arabic. Every page needs the same two-step lookup, and having
 * one copy per page invited them to drift.
 */
export function resolveLang(
  searchParamLang: string | undefined,
  cookieLang: string | undefined
): Lang {
  if (searchParamLang === 'en' || searchParamLang === 'ar') return searchParamLang;
  if (cookieLang === 'en' || cookieLang === 'ar') return cookieLang;
  return 'ar';
}
