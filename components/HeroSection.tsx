"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Sparkles, ChevronRight } from "lucide-react";
import type { SiteHero } from "@/lib/types";

interface HeroSectionProps {
  data: SiteHero;
  isRtl: boolean;
  headingFontClass: string;
}

export default function HeroSection({
  data,
  isRtl,
  headingFontClass,
}: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center pb-12 md:pb-20">
      {/* Hero text — no motion wrapper so h1 paints immediately for LCP */}
      <div
        className="relative w-full z-10 text-center flex flex-col items-center pt-32 pb-12 md:pt-48 md:pb-16 px-6 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="hidden md:block absolute inset-0">
            <Image
              src="https://raiyansoft.com/wp-content/uploads/2026/05/878787.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-40"
              referrerPolicy="no-referrer"
              priority
              fetchPriority="high"
            />
          </div>
          <div className="block md:hidden absolute inset-0">
            <Image
              src="https://raiyansoft.com/wp-content/uploads/2026/05/44334.png"
              alt=""
              fill
              sizes="100vw"
              className="object-cover opacity-40 md:opacity-30"
              referrerPolicy="no-referrer"
              priority
              fetchPriority="high"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f8]/80 via-[#faf9f8]/30 to-[#faf9f8]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f8] via-transparent to-[#faf9f8]" />
        </div>

        {/* Animated rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] pointer-events-none z-0">
          <div
            className="absolute top-0 right-0 w-64 h-64 border border-[#bbb2aa]/40 rounded-full blur-[2px] opacity-40"
            style={{ animationDuration: "4s", willChange: "opacity", animation: "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
          />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 border border-[#857363]/30 rounded-full blur-[4px] opacity-30"
            style={{ animationDuration: "6s", willChange: "opacity", animation: "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#857363]" />
            <Sparkles className="w-5 h-5 text-[#857363]" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#857363]" />
          </div>

          <h1
            className={`${headingFontClass} text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.2] crystal-text pb-2`}
          >
            {data.title}
          </h1>

          <p className="text-lg md:text-2xl text-[#362d23]/70 font-light mb-12 max-w-2xl leading-relaxed">
            {data.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* <a
              href={data.primary_cta.url}
              className="relative group px-8 py-4 bg-gradient-to-r from-[#857363] to-[#705e4e] text-white rounded-full overflow-hidden shadow-[0_8px_30px_rgb(133,115,99,0.3)] transition-transform hover:scale-105 active:scale-95 inline-block cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 font-medium tracking-wide flex items-center justify-center gap-2">
                {data.primary_cta.label}
                <ChevronRight
                  className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                />
              </span>
            </a> */}
            <a
              href={data.secondary_cta.url}
              className="px-8 py-4 rounded-full border border-[#bbb2aa] text-[#362d23] hover:border-[#857363] hover:bg-white/50 glass-panel transition-all hover:shadow-[0_4px_20px_rgb(187,178,170,0.3)] font-medium tracking-wide inline-block cursor-pointer"
            >
              {data.secondary_cta.label}
            </a>
          </div>
        </div>
      </div>

      {/* Hero Image Mockup */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="mt-0 px-6 pt-4 relative w-full flex justify-center perspective-[2000px]"
      >
        <div className="relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] rounded-2xl glass-panel-dark overflow-hidden transform rotate-x-[5deg] rotate-y-[-5deg] rotate-z-[2deg] hover:rotate-x-0 hover:rotate-y-0 hover:rotate-z-0 transition-transform duration-700 ease-out crystal-glow shadow-2xl">
          <div className="absolute inset-3 border border-[#bbb2aa]/30 rounded-xl overflow-hidden bg-white/5">
            <Image
              src={
                data.image_url ||
                "https://raiyansoft.com/wp-content/uploads/2026/05/invitation-design-1.png"
              }
              alt="Luxury Invitation"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 300px, 400px"
              className="object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-shimmer opacity-20 pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
