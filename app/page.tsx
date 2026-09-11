import { cookies } from "next/headers";
import { fetchSiteData } from "@/lib/api";
import { resolveLang } from "@/lib/dictionaries";
import HomeClient from "./HomeClient";

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const cookieStore = await cookies();
  const lang = resolveLang(resolvedParams.lang, cookieStore.get("tanal_lang")?.value);

  let siteData = null;
  try {
    siteData = await fetchSiteData(lang);
  } catch (error) {
    console.error("Failed to prefetch site data server-side:", error);
  }

  return <HomeClient initialSiteData={siteData} initialLang={lang} />;
}
