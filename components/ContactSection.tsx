"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import type { SiteContact, SiteSocialLink } from "@/lib/types";

// Map platform name → icon
function SocialIcon({ link }: { link: SiteSocialLink }) {
  const cls = "w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#857363] hover:text-[#362d23] hover:-translate-y-1 transition-all duration-300";

  const inner = (() => {
    switch (link.platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "whatsapp":
        return (
          <Image
            src="https://raiyansoft.com/wp-content/uploads/2026/05/whatsapp-1.png"
            alt="WhatsApp"
            width={22}
            height={22}
            className="object-contain"
          />
        );
      case "twitter":
      case "x":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case "tiktok":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.95v7.45c-.01 1.94-.69 3.89-1.93 5.39-1.28 1.53-3.14 2.47-5.14 2.82-1.99.35-4.1-.03-5.83-1.07-1.74-1.05-3.04-2.67-3.66-4.6-.62-1.92-.51-4.05.3-5.89.81-1.85 2.22-3.35 4.01-4.24 1.78-.89 3.88-1.13 5.81-.66V11.4c-1.29-.35-2.66-.41-3.96-.13-1.3.28-2.49.97-3.4 1.95-.9.99-1.46 2.3-1.61 3.65-.16 1.35.1 2.75.76 3.95.65 1.19 1.69 2.12 2.94 2.6 1.25.48 2.66.45 3.9-.07 1.23-.52 2.25-1.44 2.84-2.61.59-1.17.89-2.5.86-3.83V0h3.84v.02z" />
          </svg>
        );
      case "snapchat":
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12.115 1.493c-2.31-.05-4.664.832-6.19 2.666-1.076 1.293-1.637 2.96-1.558 4.636.035 1.543.14 3.093.58 4.58.118.4-.1.884-.467 1.09-1.222.684-2.585 1.157-3.926.85-.306-.057-.597.108-.66.417-.03.116-.015.228.026.333.327.76 1.106 1.517 1.848 1.956 1.545.918 3.393 1.2 5.094 1.79.167.06.31.144.385.312.27 1.07.72 2.105 1.34 3.036.216.327.606.505.992.51l.89-.004c.15-.008.286-.062.404-.158.4-.336.75-.724 1.205-.986.305-.183.7-.098.922.18l.707.828c.174.204.423.323.682.327.4.015.8-.016 1.2-.07.64-.09 1.25-.326 1.77-.73.2-.15.42-.15.617.004.46.338 1.08.435 1.534.82.164.14.382.167.585.117.2-.05.352-.164.442-.326.696-1.252.885-2.658 1.196-4.043.084-.366.45-.633.82-.6.38.03.765.01 1.143-.053 1.29-.214 2.373-.832 2.87-2.072.1-.22-.054-.48-.288-.518-1.52-.255-2.923-1.01-4.086-1.924-.13-.11-.2-.28-.184-.45.197-1.203.49-2.392.544-3.606.1-2.28-.908-4.48-2.68-5.83C15.49 2.062 13.805 1.54 12.115 1.493z" />
          </svg>
        );
      default:
        return null;
    }
  })();

  if (!inner) return null;
  return (
    <a href={link.url} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  );
}

interface ContactSectionProps {
  data: SiteContact;
  headingFontClass: string;
}

export default function ContactSection({
  data,
  headingFontClass,
}: ContactSectionProps) {
  const { heading, settings, social_links } = data;

  // Build embed URL from google_maps_url or fall back to a default embed
  const mapEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111244.38313170703!2d47.9048039868779!3d29.375859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9c83ce455983%3A0xc3ebaef5af09b90e!2sKuwait%20City%2C%20Kuwait!5e0!3m2!1sen!2sus!4v1716301321035!5m2!1sen!2sus";

  return (
    <section id="contact" className="py-10 px-6 relative">
      <div className="absolute inset-0 z-0">
        {/* Desktop Background */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src="https://raiyansoft.com/wp-content/uploads/2026/05/bg4.png"
            alt="Contact Background Desktop"
            fill
            className="object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Mobile Background */}
        <div className="block md:hidden absolute inset-0">
          <Image
            src="https://raiyansoft.com/wp-content/uploads/2026/05/bg5.png"
            alt="Contact Background Mobile"
            fill
            className="object-cover opacity-50"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f8]/90 via-[#faf9f8]/60 to-[#faf9f8]/90" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-center shadow-2xl">
          {/* Inner decorative borders */}
          <div className="absolute inset-3 rounded-[2.2rem] border border-[#bbb2aa]/30 pointer-events-none" />
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/60 blur-[80px] rounded-full pointer-events-none" />

          <div className="flex justify-center mb-6 relative z-10">
            <Image
              src="https://raiyansoft.com/wp-content/uploads/2026/05/crystal.png"
              alt="Crystal Decoration"
              width={80}
              height={80}
              className="object-contain drop-shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>

          <h2
            className={`${headingFontClass} text-3xl md:text-5xl mb-4 font-medium crystal-text pb-1 relative z-10`}
          >
            {heading.title}
          </h2>
          <p className="text-[#362d23]/70 text-lg mb-12 font-light relative z-10">
            {heading.subtitle}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10 text-start">
            {/* Map */}
            <div className="w-full h-[280px] sm:h-[350px] rounded-[1.5rem] overflow-hidden glass-panel-dark border border-[#bbb2aa]/30 shadow-lg relative p-2">
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <iframe
                  src={mapEmbed}
                  className="absolute inset-0 w-full h-full border-0 opacity-90 hover:opacity-100 transition-opacity"
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-start px-2">
              <h3
                className={`${headingFontClass} text-2xl font-medium text-[#362d23] mb-4`}
              >
                {settings.office_address}
              </h3>

              <a
                href={settings.whatsapp_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full sm:w-auto px-4 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-full text-sm sm:text-base font-medium tracking-wide shadow-[0_8px_30px_rgba(37,211,102,0.3)] hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 sm:gap-3 mb-10 whitespace-nowrap"
              >
                <Image
                  src="https://raiyansoft.com/wp-content/uploads/2026/05/whatsapp-1.png"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                {settings.whatsapp_full_number}
              </a>

              {social_links.length > 0 && (
                <>
                  <div className="w-full h-px bg-[#bbb2aa]/30 mb-8" />
                  <div className="flex items-center gap-4 justify-center lg:justify-start">
                    {[...social_links]
                      .sort((a, b) => a.sort - b.sort)
                      .map((link, idx) => (
                        <SocialIcon key={`${link.platform}-${idx}`} link={link} />
                      ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
