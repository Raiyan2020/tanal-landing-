"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Lang } from "../lib/dictionaries";
import type { SiteData } from "@/lib/types";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";

// ─── Lazy-load all below-fold sections ──────────────────────────────────────
// This defers the motion library, date-fns, @daypicker/react from initial load
const HowItWorksSection = dynamic(() => import("@/components/HowItWorksSection"), { ssr: false });
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"), { ssr: false });
const PortfolioSection = dynamic(() => import("@/components/PortfolioSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/ContactSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

const LANG_STORAGE_KEY = "tanal_lang";

interface HomeClientProps {
  initialSiteData: SiteData | null;
  initialLang: Lang;
}

export default function HomeClient({ initialSiteData, initialLang }: HomeClientProps) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [siteData] = useState<SiteData | null>(initialSiteData);

  const isRtl = lang === "ar";
  const fontClass = isRtl ? "font-arabic" : "font-sans";
  const headingFontClass = isRtl ? "font-arabic font-bold" : "font-serif";

  // Sync document direction & persist lang
  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    document.cookie = `tanal_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  }, [lang, isRtl]);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    setLang(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
      document.cookie = `tanal_lang=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      const params = new URLSearchParams(window.location.search);
      params.set("lang", newLang);
      window.location.href = `${window.location.pathname}?${params.toString()}`;
    }
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#faf9f8] text-[#362d23] ${fontClass} overflow-x-hidden`}
    >
      {/* Decorative Gradients — using will-change:transform for GPU compositing */}
      <div className="fixed inset-0 pointer-events-none z-[-1]" style={{ willChange: "transform" }}>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#857363]/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#bbb2aa]/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#857363]/5 blur-[100px]" />
      </div>

      {/* Navbar */}
      <Header
        lang={lang}
        isRtl={isRtl}
        headingFontClass={headingFontClass}
        toggleLanguage={toggleLanguage}
      />

      {/* Page sections */}
      {siteData ? (
        <>
          {/* Hero is server-rendered and above the fold — keep eager */}
          <HeroSection
            data={siteData.hero}
            isRtl={isRtl}
            headingFontClass={headingFontClass}
          />

          {/* Below-fold sections load lazily */}
          <HowItWorksSection
            data={siteData.how_it_works}
            isRtl={isRtl}
            headingFontClass={headingFontClass}
          />

          <FeaturesSection
            data={siteData.features}
            headingFontClass={headingFontClass}
          />

          <PortfolioSection
            data={siteData.portfolio}
            headingFontClass={headingFontClass}
          />

          {/* The reservation form is intentionally absent: the backend endpoint
              it posted to was removed with the service-requests module. */}

          <ContactSection
            data={siteData.contact}
            headingFontClass={headingFontClass}
          />

          <Footer
            lang={lang}
            isRtl={isRtl}
            data={siteData.footer}
            whatsappUrl={siteData.contact?.settings?.whatsapp_url}
          />
        </>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-secondary/50">
            {isRtl ? "حدث خطأ في تحميل البيانات." : "Failed to load content."}
          </p>
        </div>
      )}

    </div>
  );
}
