import { cookies } from "next/headers";
import { Lang } from "@/lib/dictionaries";
import { fetchPrivacy } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { SiteFooter } from "@/lib/types";

const EMPTY_FOOTER: SiteFooter = {
  brand_name: "Tanal",
  tagline: "",
  description: "",
  logo_url: "",
  about_url: "",
  privacy_url: "",
  terms_url: "",
  copyright: "© 2026 Tanal",
};

interface PageProps {
  searchParams: Promise<{ lang?: string }>;
}

export default async function PrivacyPolicyPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const cookieStore = await cookies();
  const lang = (resolvedParams.lang === "en" || resolvedParams.lang === "ar")
    ? resolvedParams.lang as Lang
    : (cookieStore.get("tanal_lang")?.value === "en" || cookieStore.get("tanal_lang")?.value === "ar")
      ? cookieStore.get("tanal_lang")?.value as Lang
      : "ar";

  let content = "";
  try {
    const data = await fetchPrivacy(lang);
    content = data.privacy;
  } catch (error) {
    console.error("Failed to fetch privacy policy data on server:", error);
  }

  const isRtl = lang === "ar";
  const fontClass = isRtl ? "font-arabic" : "font-sans";
  const headingFontClass = isRtl ? "font-arabic font-bold" : "font-serif";

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#faf9f8] text-[#362d23] ${fontClass} overflow-x-hidden flex flex-col`}
    >
      {/* Decorative Gradients */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#857363]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#bbb2aa]/20 blur-[100px]" />
      </div>

      <Header lang={lang} isRtl={isRtl} headingFontClass={headingFontClass} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 mt-16 w-full relative z-10">
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-3 rounded-[2.2rem] border border-[#bbb2aa]/30 pointer-events-none" />

          <div
            className={`${headingFontClass} text-lg text-[#362d23]/80 leading-relaxed font-light space-y-6`}
            dangerouslySetInnerHTML={{ __html: content || "" }}
          />
        </div>
      </main>

      <Footer lang={lang} isRtl={isRtl} data={EMPTY_FOOTER} />
    </div>
  );
}
