import { Lang } from "@/lib/dictionaries";
import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  lang: Lang;
  d: any;
  isRtl: boolean;
}

export default function Footer({ lang, d, isRtl }: FooterProps) {
  return (
    <>
      <footer className="bg-[#362d23] text-[#bbb2aa] py-16 px-6 relative border-t border-white/10">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="mb-8">
            <Link href={`/?lang=${lang}`}>
              <Image
                src="https://raiyansoft.com/wp-content/uploads/2026/05/Tanal-noshadow-scaled.png"
                alt="Tanal Logo"
                width={180}
                height={60}
                className="opacity-70 saturate-0 brightness-200 object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>

          <p className="text-[#bbb2aa]/80 font-light max-w-lg mb-10 leading-relaxed text-sm md:text-base">
            {d.footer.bio}
          </p>

          <div
            className={`flex flex-wrap justify-center gap-6 md:gap-10 mb-12 ${isRtl ? "font-medium" : ""}`}
          >
            <Link
              href={`/about-us?lang=${lang}`}
              className="text-sm uppercase tracking-widest hover:text-white transition-colors"
            >
              {d.footer.aboutUs}
            </Link>
            <Link
              href={`/privacy-policy?lang=${lang}`}
              className="text-sm uppercase tracking-widest hover:text-white transition-colors"
            >
              {d.footer.privacyPolicy}
            </Link>
            <Link
              href={`/terms-and-conditions?lang=${lang}`}
              className="text-sm uppercase tracking-widest hover:text-white transition-colors"
            >
              {d.footer.terms}
            </Link>
          </div>

          <div className="w-full h-px bg-white/10 mb-8 max-w-3xl mx-auto" />
          <p className="font-light tracking-wide text-xs md:text-sm text-[#bbb2aa]/60">
            {d.footer.rights}
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/96512345678"
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-4 md:bottom-6 ${isRtl ? "left-4 md:left-6" : "right-4 md:right-6"} z-50 w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 drop-shadow-xl`}
      >
        <Image
          src="https://raiyansoft.com/wp-content/uploads/2026/05/whatsapp-1.png"
          alt="WhatsApp Settings"
          width={36}
          height={36}
          className="w-7 h-7 md:w-9 md:h-9 object-contain"
          referrerPolicy="no-referrer"
        />
      </a>
    </>
  );
}
