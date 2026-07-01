"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { SiteHowItWorks } from "@/lib/types";

interface HowItWorksSectionProps {
  data: SiteHowItWorks;
  isRtl: boolean;
  headingFontClass: string;
}

export default function HowItWorksSection({
  data,
  isRtl,
  headingFontClass,
}: HowItWorksSectionProps) {
  return (
    <section
      id="how-it-works"
      className="py-20 px-6 relative bg-[#362d23] text-white"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`${headingFontClass} text-3xl md:text-5xl font-medium`}
          >
            {data.heading.title}
          </h2>
          {data.heading.subtitle && (
            <p className="text-white/60 mt-3 text-lg font-light">
              {data.heading.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div
            className={`hidden md:block absolute top-[48px] ${isRtl ? "right-1/4 left-1/4" : "left-1/4 right-1/4"} h-0.5 bg-white/20 -z-0`}
          />
          {data.steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative z-10 bg-[#362d23]/20 rounded-2xl p-8 border border-white/10 text-center backdrop-blur-sm shadow-xl"
            >
              {step.icon_url ? (
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 mx-auto shadow-lg overflow-hidden">
                  <Image
                    src={step.icon_url}
                    alt={step.title}
                    width={28}
                    height={28}
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      const parent = img.parentElement;
                      img.style.display = "none";
                    }}
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-white text-[#857363] flex items-center justify-center text-xl font-bold mb-6 mx-auto shadow-lg">
                  {i + 1}
                </div>
              )}
              <h3 className={`${headingFontClass} text-xl font-medium mb-3`}>
                {step.title}
              </h3>
              <p className="text-white/80 font-light leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
