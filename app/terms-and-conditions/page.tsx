"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Lang } from "@/lib/dictionaries";
import { fetchTerms } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { SiteFooter } from "@/lib/types";

const LANG_STORAGE_KEY = "tanal_lang";

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

function PageContent() {
  const searchParams = useSearchParams();
  const langQuery = searchParams.get("lang") as Lang;

  const getInitialLang = (): Lang => {
    if (langQuery === "en" || langQuery === "ar") return langQuery;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LANG_STORAGE_KEY) as Lang;
      if (stored === "en" || stored === "ar") return stored;
    }
    return "ar";
  };

  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isRtl = lang === "ar";
  const fontClass = isRtl ? "font-arabic" : "font-sans";
  const headingFontClass = isRtl ? "font-arabic font-bold" : "font-serif";

  // Sync document direction & persist lang
  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  }, [lang, isRtl]);

  // Sync state when URL query parameter changes
  useEffect(() => {
    if (langQuery === "en" || langQuery === "ar") {
      setLang(langQuery);
    }
  }, [langQuery]);

  useEffect(() => {
    setLoading(true);
    fetchTerms(lang)
      .then((data) => setContent(data.terms))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [lang]);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#faf9f8] text-[#362d23] ${fontClass} overflow-x-hidden flex flex-col`}
    >
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#857363]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#bbb2aa]/20 blur-[100px]" />
      </div>

      <Header lang={lang} isRtl={isRtl} headingFontClass={headingFontClass} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 mt-16 w-full relative z-10">
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-3 rounded-[2.2rem] border border-[#bbb2aa]/30 pointer-events-none" />

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#857363]/30 border-t-[#857363] rounded-full animate-spin" />
            </div>
          ) : (
            <div
              className={`${headingFontClass} text-lg text-[#362d23]/80 leading-relaxed font-light space-y-6`}
              dangerouslySetInnerHTML={{ __html: content ?? "" }}
            />
          )}
        </div>
      </main>

      <Footer lang={lang} isRtl={isRtl} data={EMPTY_FOOTER} />
    </div>
  );
}

export default function TermsAndConditionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f8]" />}>
      <PageContent />
    </Suspense>
  );
}
