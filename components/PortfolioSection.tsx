"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { SitePortfolio } from "@/lib/types";

const BASE_STORAGE_URL =
  "https://portal.tanalevents.com/storage/images/landing/portfolio/";

/**
 * Cleans the image URL returned by the API.
 *
 * The backend sometimes produces a doubled path like:
 *   https://portal.tanalevents.com/storage/images/landing/portfolio/https://portal.tanalevents.com/storage/images/landing/portfolio/file.webp
 *
 * This function extracts the real filename and rebuilds a clean URL.
 * Returns null when the URL is empty / truly invalid.
 */
function cleanImageUrl(url: string | null | undefined): string | null {
  if (!url) return null;

  // Strip any leading/trailing whitespace
  const trimmed = url.trim();
  if (!trimmed) return null;

  // Detect the doubled-path pattern: pathname contains "http"
  try {
    const parsed = new URL(trimmed);
    if (parsed.pathname.includes("http")) {
      // The real URL starts at the second "http" occurrence inside the string
      const secondHttp = trimmed.indexOf("http", 4); // skip the first "http"
      if (secondHttp !== -1) {
        const real = trimmed.slice(secondHttp);
        // Validate the extracted URL
        new URL(real);
        return real;
      }
      // Can't recover – discard
      return null;
    }
    return trimmed;
  } catch {
    // Not even a valid URL – try prepending base storage URL if it looks like a filename
    if (!trimmed.startsWith("http") && trimmed.length > 0) {
      return `${BASE_STORAGE_URL}${trimmed}`;
    }
    return null;
  }
}

interface PortfolioSectionProps {
  data: SitePortfolio;
  headingFontClass: string;
}

export default function PortfolioSection({
  data,
  headingFontClass,
}: PortfolioSectionProps) {
  // Only render items that have a valid API image – no mock fallbacks
  const validItems = data.items
    .map((item) => ({ item, src: cleanImageUrl(item.image_url) }))
    .filter((entry): entry is { item: typeof entry.item; src: string } =>
      entry.src !== null
    );

  return (
    <section
      id="portfolio"
      className="py-24 px-6 relative overflow-hidden bg-[#362d23] text-white"
    >
      <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-[#857363]/10 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2
            className={`${headingFontClass} text-4xl md:text-5xl mb-4 font-medium tracking-tight text-[#bbb2aa]`}
          >
            {data.heading.title}
          </h2>
          <p className="text-[#bbb2aa]/70 text-lg max-w-2xl mx-auto font-light">
            {data.heading.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validItems.map(({ item, src }, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative group rounded-xl overflow-hidden aspect-[3/4] ${
                i === 0 || i === 3
                  ? "md:col-span-2 lg:col-span-1 lg:row-span-2 aspect-[3/4] lg:aspect-[3/8.2]"
                  : ""
              }`}
            >
              <Image
                src={src}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#362d23]/90 via-[#362d23]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute inset-0 border border-white/10 rounded-xl m-4 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="w-10 h-px bg-[#bbb2aa] mb-4" />
                <p className="text-white text-lg tracking-widest font-light">
                  {item.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
