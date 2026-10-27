import { fetchSiteData } from "./api";
import type { Lang } from "./dictionaries";
import { requestLang, type LangSearchParams } from "./request-lang";
import type { SiteData } from "./types";

export interface ContentPageData {
  lang: Lang;
  content: string;
  site: SiteData | null;
}

export async function loadContentPage<T>(
  searchParams: LangSearchParams["searchParams"],
  fetchContent: (lang: Lang) => Promise<T>,
  select: (data: T) => string,
  label: string
): Promise<ContentPageData> {
  const lang = await requestLang(searchParams);

  // Both are independent reads, so they go out together rather than in series.
  const [contentResult, siteResult] = await Promise.allSettled([
    fetchContent(lang),
    fetchSiteData(lang),
  ]);

  if (contentResult.status === "rejected") {
    console.error(`Failed to fetch ${label} data on server:`, contentResult.reason);
  }
  if (siteResult.status === "rejected") {
    console.error("Failed to fetch site data on server:", siteResult.reason);
  }

  return {
    lang,
    content: contentResult.status === "fulfilled" ? select(contentResult.value) : "",
    site: siteResult.status === "fulfilled" ? siteResult.value : null,
  };
}
