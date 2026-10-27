import { fetchTerms } from "@/lib/api";
import { loadContentPage } from "@/lib/content-page";
import type { LangSearchParams } from "@/lib/request-lang";
import ContentPage from "@/components/ContentPage";

export default async function TermsAndConditionsPage({ searchParams }: LangSearchParams) {
  const page = await loadContentPage(searchParams, fetchTerms, (data) => data.terms, "terms");
  return <ContentPage {...page} />;
}
