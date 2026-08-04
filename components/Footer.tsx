import Image from "next/image";
import Link from "next/link";
import { Lang } from "@/lib/dictionaries";
import type { SiteFooter } from "@/lib/types";

// Static fallback labels per language for footer links
const FOOTER_LABELS: Record<Lang, Record<string, string>> = {
  ar: { aboutUs: "من نحن", privacyPolicy: "سياسة الخصوصية", terms: "الشروط والأحكام" },
  en: { aboutUs: "About Us", privacyPolicy: "Privacy Policy", terms: "Terms & Conditions" },
};

interface FooterProps {
  lang: Lang;
  isRtl: boolean;
  data: SiteFooter;
  /** WhatsApp URL from API (contact.settings.whatsapp_url) for the floating button */
  whatsappUrl?: string | null;
}

export default function Footer({ lang, isRtl, data, whatsappUrl }: FooterProps) {
  const labels = FOOTER_LABELS[lang];
  const logoSrc =
    data.logo_url ||
    "https://raiyansoft.com/wp-content/uploads/2026/05/Tanal-noshadow-scaled.png";

  return (
    <>
      <footer className="bg-[#362d23] text-[#bbb2aa] py-16 px-6 relative border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8">
            <Link href={`/?lang=${lang}`}>
              <Image
                src={logoSrc}
                alt={data.brand_name || "Tanal Logo"}
                width={180}
                height={60}
                className="object-contain mx-auto"
              />
            </Link>
          </div>

          {data.description && (
            <p className="text-[#bbb2aa]/80 font-light max-w-lg mb-10 leading-relaxed text-sm md:text-base">
              {data.description}
            </p>
          )}

          <div
            className={`flex flex-wrap justify-center gap-6 md:gap-10 mb-12 ${isRtl ? "font-medium" : ""}`}
          >
            <Link
              href={`/about-us?lang=${lang}`}
              className="text-sm uppercase tracking-widest hover:text-white transition-colors"
            >
              {labels.aboutUs}
            </Link>
            <Link
              href={`/privacy-policy?lang=${lang}`}
              className="text-sm uppercase tracking-widest hover:text-white transition-colors"
            >
              {labels.privacyPolicy}
            </Link>
            <Link
              href={`/terms-and-conditions?lang=${lang}`}
              className="text-sm uppercase tracking-widest hover:text-white transition-colors"
            >
              {labels.terms}
            </Link>
          </div>

          <div className="w-full h-px bg-white/10 mb-8 max-w-3xl mx-auto" />
          <p className="font-light tracking-wide text-xs md:text-sm text-[#bbb2aa]/60">
            {data.copyright}
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button — shown via ContactSection settings ideally;
          here we use a static fallback href that ContactSection will override */}
      <a
        href={whatsappUrl || "https://wa.me/"}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className={`fixed bottom-4 md:bottom-6 ${isRtl ? "left-4 md:left-6" : "right-4 md:right-6"} z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 drop-shadow-xl`}
      >
        <Image
          src="https://raiyansoft.com/wp-content/uploads/2026/05/whatsapp-1.png"
          alt="WhatsApp"
          width={36}
          height={36}
          className="w-7 h-7 md:w-9 md:h-9 object-contain"
          referrerPolicy="no-referrer"
        />
      </a>
    </>
  );
}
