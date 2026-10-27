import { fetchAbout } from "@/lib/api";
import { loadContentPage } from "@/lib/content-page";
import type { LangSearchParams } from "@/lib/request-lang";
import ContentPage from "@/components/ContentPage";

export default async function AboutUsPage({ searchParams }: LangSearchParams) {
  const page = await loadContentPage(searchParams, fetchAbout, (data) => data.about, "about");
  return <ContentPage {...page} />;
}
