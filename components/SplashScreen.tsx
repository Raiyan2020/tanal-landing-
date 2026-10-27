"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import logo from "@/public/logo.webp";

export default function SplashScreen() {
  // Start hidden — only show after client hydration to not block LCP paint
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show only on the very first visit in the session
    const hasVisited = sessionStorage.getItem("tanal_visited");
    if (!hasVisited) {
      setMounted(true);
      setIsVisible(true);
      sessionStorage.setItem("tanal_visited", "1");
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#faf9f8]"
        >
          {/* Decorative luxury gradient background */}
          <div className="absolute inset-0 pointer-events-none z-[-1]">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#857363]/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#bbb2aa]/20 blur-[100px]" />
          </div>

          {/* Centered logo container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center justify-center p-8 relative"
          >
            {/* Elegant luxury framing borders */}
            <div className="absolute -inset-4 rounded-3xl border border-[#bbb2aa]/30 pointer-events-none" />
            <div className="absolute -inset-2 rounded-2xl border border-[#857363]/10 pointer-events-none" />

            <div className="relative w-48 h-20">
              <Image
                src={logo}
                alt="Tanal Logo"
                fill
                priority
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Shimmer/Pulse indicator */}
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="mt-6 text-xs tracking-[0.2em] text-[#857363] uppercase font-light"
            >
              Loading / جاري التحميل
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
