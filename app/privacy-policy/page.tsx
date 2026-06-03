"use client";

import { useSearchParams } from "next/navigation";
import { dictionaries, Lang } from "@/lib/dictionaries";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function PageContent() {
  const searchParams = useSearchParams();
  const langQuery = searchParams.get("lang") as Lang;
  const lang = langQuery === "en" || langQuery === "ar" ? langQuery : "en";

  const d = dictionaries[lang];
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

      <Header lang={lang} d={d} isRtl={isRtl} headingFontClass={headingFontClass} />

      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 mt-16 w-full relative z-10">
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-3 rounded-[2.2rem] border border-[#bbb2aa]/30 pointer-events-none" />
          <h1
            className={`${headingFontClass} text-4xl md:text-5xl font-medium tracking-tight mb-8 text-[#362d23] text-center crystal-text pb-2`}
          >
            {d.pages.privacyPolicy.title}
          </h1>
          <div className="w-20 h-px bg-[#857363]/50 mx-auto mb-10" />
          <div className="text-lg text-[#362d23]/80 leading-relaxed font-light space-y-6">
            {d.pages.privacyPolicy.content}
          </div>
        </div>
      </main>

      <Footer lang={lang} d={d} isRtl={isRtl} />
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f8]" />}>
      <PageContent />
    </Suspense>
  );
}
