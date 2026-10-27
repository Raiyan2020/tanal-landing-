import { fetchPrivacy } from "@/lib/api";
import { loadContentPage } from "@/lib/content-page";
import type { LangSearchParams } from "@/lib/request-lang";
import ContentPage from "@/components/ContentPage";

export default async function PrivacyPolicyPage({ searchParams }: LangSearchParams) {
  const page = await loadContentPage(searchParams, fetchPrivacy, (data) => data.privacy, "privacy policy");
  return <ContentPage {...page} />;
}
