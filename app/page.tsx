import { fetchSiteData } from "@/lib/api";
import { requestLang, type LangSearchParams } from "@/lib/request-lang";
import HomeClient from "./HomeClient";

export default async function Page({ searchParams }: LangSearchParams) {
  const lang = await requestLang(searchParams);

  let siteData = null;
  try {
    siteData = await fetchSiteData(lang);
  } catch (error) {
    console.error("Failed to prefetch site data server-side:", error);
  }

  return <HomeClient initialSiteData={siteData} initialLang={lang} />;
}
