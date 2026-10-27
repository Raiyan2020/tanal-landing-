"use client";

import { LANG_STORAGE_KEY, type Lang } from "@/lib/dictionaries";
import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import logo from "@/public/logo.webp";

const NAV_ITEMS = [
  { anchor: "how-it-works", label: "howItWorks" },
  { anchor: "features", label: "features" },
  { anchor: "portfolio", label: "portfolio" },
  { anchor: "contact", label: "contact" },
] as const;

// Nav labels per language (kept locally — no API call needed for nav)
const NAV_LABELS: Record<Lang, Record<(typeof NAV_ITEMS)[number]["label"], string>> = {
  ar: {
    howItWorks: "كيف يعمل؟",
    features: "المميزات",
    portfolio: "أعمالنا",
    contact: "تواصل معنا",
  },
  en: {
    howItWorks: "How It Works",
    features: "Features",
    portfolio: "Portfolio",
    contact: "Contact",
  },
};

interface HeaderProps {
  lang: Lang;
  isRtl: boolean;
  headingFontClass: string;
}

export default function Header({ lang, isRtl, headingFontClass }: HeaderProps) {
  const nav = NAV_LABELS[lang];

  const handleToggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    if (typeof window !== "undefined") {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
      const params = new URLSearchParams(window.location.search);
      params.set("lang", newLang);
      window.location.href = `${window.location.pathname}?${params.toString()}`;
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href={`/?lang=${lang}`} className="flex items-center gap-4">
          <div className="relative w-28 h-10">
            <Image
              src={logo}
              alt="Tanal Logo"
              fill
              className={`object-contain md:object-center ${isRtl ? "object-right" : "object-left"}`}
              referrerPolicy="no-referrer"
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(({ anchor, label }) => (
            <Link
              key={anchor}
              href={`/?lang=${lang}#${anchor}`}
              className={`${headingFontClass} text-lg hover:text-[#362d23] transition-colors ${isRtl ? "font-medium" : ""} text-[#857363]`}
            >
              {nav[label]}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleLanguage}
            aria-label={lang === "en" ? "Switch to Arabic" : "Switch to English"}
            className="px-3 py-2 rounded-full hover:bg-black/5 transition-colors text-sm uppercase tracking-wider flex items-center gap-2 font-medium"
          >
            <Globe className="w-4 h-4 text-[#857363]" />
            {lang === "en" ? "عربي" : "EN"}
          </button>
        </div>
      </div>
    </nav>
  );
}
