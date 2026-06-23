"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { Lang } from "../lib/dictionaries";
import { fetchSiteData, submitServiceRequest } from "@/lib/api";
import type { SiteData, ServiceRequestPayload } from "@/lib/types";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ReservationSection from "@/components/ReservationSection";
import ContactSection from "@/components/ContactSection";

const LANG_STORAGE_KEY = "tanal_lang";

function HomeComponent() {
  const searchParams = useSearchParams();
  const langQuery = searchParams.get("lang") as Lang;

  // Priority: URL param > localStorage > default (ar)
  const getInitialLang = (): Lang => {
    if (langQuery === "en" || langQuery === "ar") return langQuery;
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(LANG_STORAGE_KEY) as Lang;
      if (stored === "en" || stored === "ar") return stored;
    }
    return "ar";
  };

  const [lang, setLang] = useState<Lang>(getInitialLang);
  const [siteData, setSiteData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isRtl = lang === "ar";
  const fontClass = isRtl ? "font-arabic" : "font-sans";
  const headingFontClass = isRtl ? "font-arabic font-bold" : "font-serif";

  // Sync document direction & persist lang
  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  }, [lang, isRtl]);

  // Fetch site data whenever lang changes
  useEffect(() => {
    setLoading(true);
    fetchSiteData(lang)
      .then(setSiteData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [lang]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const handleReservationSubmit = async (
    payload: Omit<ServiceRequestPayload, never>
  ) => {
    setSubmitError(null);
    try {
      await submitServiceRequest(payload, lang);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  };

  // Minimal nav labels while data loads
  const navFallback = {
    nav: {
      howItWorks: "",
      features: "",
      portfolio: "",
      contact: "",
      reservation: "",
    },
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#faf9f8] text-[#362d23] ${fontClass} overflow-x-hidden`}
    >
      {/* Decorative Gradients */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#857363]/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#bbb2aa]/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#857363]/5 blur-[100px]" />
      </div>

      {/* Navbar */}
      <Suspense fallback={<div className="h-20" />}>
        <Header
          lang={lang}
          isRtl={isRtl}
          headingFontClass={headingFontClass}
          toggleLanguage={toggleLanguage}
        />
      </Suspense>

      {/* Loading skeleton */}
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#857363]/30 border-t-[#857363] rounded-full animate-spin" />
        </div>
      )}

      {/* Page sections (rendered once data is ready) */}
      {!loading && siteData && (
        <>
          <HeroSection
            data={siteData.hero}
            isRtl={isRtl}
            headingFontClass={headingFontClass}
          />

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

          <ReservationSection
            lang={lang}
            isRtl={isRtl}
            headingFontClass={headingFontClass}
            onSubmit={handleReservationSubmit}
            submitError={submitError}
          />

          <ContactSection
            data={siteData.contact}
            headingFontClass={headingFontClass}
          />

          <Footer
            lang={lang}
            isRtl={isRtl}
            data={siteData.footer}
          />
        </>
      )}

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#362d23] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 w-[max-content] min-w-[300px] max-w-[90vw] justify-center"
          >
            <CheckCircle className="w-5 h-5 text-[#25D366] shrink-0" />
            <p className="font-medium text-sm md:text-base text-center line-clamp-2">
              {lang === "ar"
                ? "تم إرسال طلبك بنجاح!"
                : "Your request was sent successfully!"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f8]" />}>
      <HomeComponent />
    </Suspense>
  );
}
