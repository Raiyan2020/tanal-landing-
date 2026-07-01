"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { SiteFeatures } from "@/lib/types";

interface FeaturesSectionProps {
  data: SiteFeatures;
  headingFontClass: string;
}

export default function FeaturesSection({
  data,
  headingFontClass,
}: FeaturesSectionProps) {
  return (
    <section id="features" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-6 relative z-10">
            <Image
              src="https://raiyansoft.com/wp-content/uploads/2026/05/11.png"
              alt="Crystal Decoration"
              width={150}
              height={150}
              className="object-contain drop-shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>
          <h2
            className={`${headingFontClass} text-3xl md:text-5xl mb-4 crystal-text pb-2 font-medium`}
          >
            {data.heading.title}
          </h2>
          <p className="text-[#362d23]/60 text-lg max-w-2xl mx-auto">
            {data.heading.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((feature, i) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative glass-panel rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-500 overflow-hidden text-center sm:text-start"
            >
              {/* Hover glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-[#857363]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 border border-[#bbb2aa]/20 mx-auto sm:mx-0 overflow-hidden">
                {feature.icon_url ? (
                  <Image
                    src={feature.icon_url}
                    alt={feature.title}
                    width={28}
                    height={28}
                    className="object-cover w-full h-full"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-6 h-6 bg-[#857363]/20 rounded-full" />
                )}
              </div>

              <h3
                className={`${headingFontClass} text-xl font-medium text-[#362d23] mb-3`}
              >
                {feature.title}
              </h3>
              <p className="text-[#362d23]/70 font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
