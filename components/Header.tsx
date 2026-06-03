"use client";

import { Lang } from "@/lib/dictionaries";
import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface HeaderProps {
  lang: Lang;
  d: any; // Using any for simplicity here or import the type
  isRtl: boolean;
  headingFontClass: string;
  toggleLanguage?: () => void;
}

export default function Header({
  lang,
  d,
  isRtl,
  headingFontClass,
  toggleLanguage,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
              src="https://raiyansoft.com/wp-content/uploads/2026/05/logo-2.png"
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
            {d.nav.howItWorks}
          </Link>
          <Link
            href={`/?lang=${lang}#features`}
            className={`${headingFontClass} text-lg hover:text-[#362d23] transition-colors ${isRtl ? "font-medium" : ""} text-[#857363]`}
          >
            {d.nav.features}
          </Link>
          <Link
            href={`/?lang=${lang}#portfolio`}
            className={`${headingFontClass} text-lg hover:text-[#362d23] transition-colors ${isRtl ? "font-medium" : ""} text-[#857363]`}
          >
            {d.nav.portfolio}
          </Link>
          <Link
            href={`/?lang=${lang}#contact`}
            className={`${headingFontClass} text-lg hover:text-[#362d23] transition-colors ${isRtl ? "font-medium" : ""} text-[#857363]`}
          >
            {d.nav.contact}
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
