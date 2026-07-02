import { cookies } from "next/headers";
import { fetchSiteData } from "@/lib/api";
import { Lang } from "@/lib/dictionaries";
import HomeClient from "./HomeClient";

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const cookieStore = await cookies();
  const lang = (resolvedParams.lang === "en" || resolvedParams.lang === "ar")
    ? resolvedParams.lang as Lang
    : (cookieStore.get("tanal_lang")?.value === "en" || cookieStore.get("tanal_lang")?.value === "ar")
      ? cookieStore.get("tanal_lang")?.value as Lang
      : "ar";

  let siteData = null;
  try {
    siteData = await fetchSiteData(lang);
  } catch (error) {
    console.error("Failed to prefetch site data server-side:", error);
  }

  return <HomeClient initialSiteData={siteData} initialLang={lang} />;
}
