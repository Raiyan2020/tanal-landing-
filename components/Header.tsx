"use client";

import { Lang } from "@/lib/dictionaries";
import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// Nav labels per language (kept locally — no API call needed for nav)
const NAV_LABELS: Record<Lang, Record<string, string>> = {
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
  toggleLanguage?: () => void;
  /** Logo URL from API (footer.logo_url). Falls back to the static asset if not provided. */
  logoUrl?: string | null;
}

const FALLBACK_LOGO =
  "https://raiyansoft.com/wp-content/uploads/2026/05/logo-2.png";

export default function Header({
  lang,
  isRtl,
  headingFontClass,
  toggleLanguage,
  logoUrl,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const nav = NAV_LABELS[lang];

  const handleToggleLanguage = () => {
    if (toggleLanguage) {
      toggleLanguage();
    } else {
      const newLang = lang === "en" ? "ar" : "en";
      const params = new URLSearchParams(searchParams.toString());
      params.set("lang", newLang);
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href={`/?lang=${lang}`} className="flex items-center gap-4">
          <div className="relative w-28 h-10">
            <Image
              src={logoUrl || FALLBACK_LOGO}
              alt="Tanal Logo"
              fill
              className={`object-contain md:object-center ${isRtl ? "object-right" : "object-left"}`}
              referrerPolicy="no-referrer"
            />
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href={`/?lang=${lang}#how-it-works`}
            className={`${headingFontClass} text-lg hover:text-[#362d23] transition-colors ${isRtl ? "font-medium" : ""} text-[#857363]`}
          >
            {nav.howItWorks}
          </Link>
          <Link
            href={`/?lang=${lang}#features`}
            className={`${headingFontClass} text-lg hover:text-[#362d23] transition-colors ${isRtl ? "font-medium" : ""} text-[#857363]`}
          >
            {nav.features}
          </Link>
          <Link
            href={`/?lang=${lang}#portfolio`}
            className={`${headingFontClass} text-lg hover:text-[#362d23] transition-colors ${isRtl ? "font-medium" : ""} text-[#857363]`}
          >
            {nav.portfolio}
          </Link>
          <Link
            href={`/?lang=${lang}#contact`}
            className={`${headingFontClass} text-lg hover:text-[#362d23] transition-colors ${isRtl ? "font-medium" : ""} text-[#857363]`}
          >
            {nav.contact}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleLanguage}
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
