"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useSearchParams } from "next/navigation";
import {
  Sparkles,
  PenTool,
  Users,
  CheckCircle,
  Share2,
  Smartphone,
  Instagram,
  Phone,
  MapPin,
  ChevronRight,
  Globe,
  MessageCircle,
  QrCode,
  Settings,
  LayoutDashboard,
  Download,
} from "lucide-react";
import { dictionaries, Lang } from "../lib/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const icons = {
  Sparkles,
  PenTool,
  Users,
  CheckCircle,
  Share2,
  Smartphone,
  MessageCircle,
  QrCode,
  Settings,
  LayoutDashboard,
  Download,
  MapPin,
};

function HomeComponent() {
  const searchParams = useSearchParams();
  const langQuery = searchParams.get("lang") as Lang;
  const initialLang =
    langQuery === "en" || langQuery === "ar" ? langQuery : "en";

  const [lang, setLang] = useState<Lang>(initialLang);
  const [showSuccess, setShowSuccess] = useState(false);

  const d = dictionaries[lang];
  const isRtl = lang === "ar";

  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang, isRtl]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "ar" : "en"));
  };

  const fontClass = isRtl ? "font-arabic" : "font-sans";
  const headingFontClass = isRtl ? "font-arabic font-bold" : "font-serif";

  const handleReservationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSuccess(true);
    e.currentTarget.reset();
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className={`min-h-screen bg-[#faf9f8] text-[#362d23] ${fontClass} overflow-x-hidden`}
    >
      {/* Decorative Gradients */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#857363]/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#bbb2aa]/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-[#857363]/5 blur-[100px]" />
      </div>

      {/* Navbar */}
      <Suspense fallback={<div className="h-20" />}>
        <Header
          lang={lang}
          d={d}
          isRtl={isRtl}
          headingFontClass={headingFontClass}
          toggleLanguage={toggleLanguage}
        />
      </Suspense>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pb-12 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative w-full z-10 text-center flex flex-col items-center pt-32 pb-12 md:pt-48 md:pb-16 px-6 overflow-hidden"
        >
          {/* Background Image localized to Text Block */}
          <div className="absolute inset-0 z-0">
            {/* Desktop Background */}
            <div className="hidden md:block absolute inset-0">
              <Image
                src="https://raiyansoft.com/wp-content/uploads/2026/05/878787.png"
                alt="Hero Description Background"
                fill
                className="object-cover opacity-40"
                referrerPolicy="no-referrer"
                priority
              />
            </div>
            {/* Mobile Background */}
            <div className="block md:hidden absolute inset-0">
              <Image
                src="https://raiyansoft.com/wp-content/uploads/2026/05/44334.png"
                alt="Hero Description Background Mobile"
                fill
                className="object-cover opacity-40 md:opacity-30"
                referrerPolicy="no-referrer"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f8]/80 via-[#faf9f8]/30 to-[#faf9f8]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f8] via-transparent to-[#faf9f8]" />
          </div>

          {/* Abstract magical background shapes */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] pointer-events-none z-0">
            <div
              className="absolute top-0 right-0 w-64 h-64 border border-[#bbb2aa]/40 rounded-full blur-[2px] opacity-40 animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <div
              className="absolute bottom-10 left-10 w-96 h-96 border border-[#857363]/30 rounded-full blur-[4px] opacity-30 animate-pulse"
              style={{ animationDuration: "6s" }}
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#857363]" />
              <Sparkles className="w-5 h-5 text-[#857363] animate-pulse" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#857363]" />
            </div>

            <h1
              className={`${headingFontClass} text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.2] crystal-text pb-2`}
            >
              {d.hero.title}
            </h1>

            <p className="text-lg md:text-2xl text-[#362d23]/70 font-light mb-12 max-w-2xl leading-relaxed">
              {d.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a
                href="#reservation"
                className="relative group px-8 py-4 bg-gradient-to-r from-[#857363] to-[#705e4e] text-white rounded-full overflow-hidden shadow-[0_8px_30px_rgb(133,115,99,0.3)] transition-transform hover:scale-105 active:scale-95 inline-block cursor-pointer"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 font-medium tracking-wide flex items-center justify-center gap-2">
                  {d.hero.primaryCta}
                  <ChevronRight
                    className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`}
                  />
                </span>
              </a>
              <a
                href="#portfolio"
                className="px-8 py-4 rounded-full border border-[#bbb2aa] text-[#362d23] hover:border-[#857363] hover:bg-white/50 glass-panel transition-all hover:shadow-[0_4px_20px_rgb(187,178,170,0.3)] font-medium tracking-wide inline-block cursor-pointer"
              >
                {d.hero.secondaryCta}
              </a>
            </div>
          </div>
        </motion.div>

        {/* Hero Image Mockup (Abstracted nicely) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-0 px-6 pt-4 relative w-full flex justify-center perspective-[2000px]"
        >
          <div className="relative w-[300px] h-[450px] md:w-[400px] md:h-[600px] rounded-2xl glass-panel-dark overflow-hidden transform rotate-x-[5deg] rotate-y-[-5deg] rotate-z-[2deg] hover:rotate-x-0 hover:rotate-y-0 hover:rotate-z-0 transition-transform duration-700 ease-out crystal-glow shadow-2xl">
            {/* Inner frame */}
            <div className="absolute inset-3 border border-[#bbb2aa]/30 rounded-xl overflow-hidden bg-white/5">
              <Image
                src="https://raiyansoft.com/wp-content/uploads/2026/05/invitation-design-1.png"
                alt="Luxury Wedding Invitation"
                fill
                className="object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Shimmer effect overlay */}
            <div className="absolute inset-0 bg-shimmer opacity-20 pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-6 relative bg-[#362d23] text-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`${headingFontClass} text-3xl md:text-5xl font-medium`}
            >
              {d.howItWorks.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div
              className={`hidden md:block absolute top-[48px] ${isRtl ? "right-1/4 left-1/4" : "left-1/4 right-1/4"} h-0.5 bg-white/20 -z-0`}
            />
            {d.howItWorks.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative z-10 bg-[#362d23]/20 rounded-2xl p-8 border border-white/10 text-center backdrop-blur-sm shadow-xl"
              >
                <div className="w-12 h-12 rounded-full bg-white text-[#857363] flex items-center justify-center text-xl font-bold mb-6 mx-auto shadow-lg">
                  {i + 1}
                </div>
                <h3 className={`${headingFontClass} text-xl font-medium mb-3`}>
                  {step.title}
                </h3>
                <p className="text-white/80 font-light leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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
              {d.features.title}
            </h2>
            <p className="text-[#362d23]/60 text-lg max-w-2xl mx-auto">
              {d.features.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {d.features.items.map((feature, i) => {
              const Icon =
                icons[feature.icon as keyof typeof icons] || Sparkles;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative glass-panel rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-500 overflow-hidden text-center sm:text-start"
                >
                  {/* Hover glow */}
                  <div className="absolute -inset-px bg-gradient-to-br from-[#857363]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                  <div
                    className={`w-14 h-14 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 border border-[#bbb2aa]/20 mx-auto sm:mx-0`}
                  >
                    <Icon className="w-6 h-6 text-[#857363]" />
                  </div>
                  <h3
                    className={`${headingFontClass} text-xl font-medium text-[#362d23] mb-3`}
                  >
                    {feature.title}
                  </h3>
                  <p className="text-[#362d23]/70 font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
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
              {d.portfolio.title}
            </h2>
            <p className="text-[#bbb2aa]/70 text-lg max-w-2xl mx-auto font-light">
              {d.portfolio.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://raiyansoft.com/wp-content/uploads/2026/05/invitation-design-1.png",
              "https://raiyansoft.com/wp-content/uploads/2026/05/2.png",
              "https://raiyansoft.com/wp-content/uploads/2026/05/1.png",
              "https://raiyansoft.com/wp-content/uploads/2026/05/4.png",
              "https://raiyansoft.com/wp-content/uploads/2026/05/5.png",
              "https://raiyansoft.com/wp-content/uploads/2026/05/1.png",
              "https://raiyansoft.com/wp-content/uploads/2026/05/3.png",
            ].map((imgSrc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative group rounded-xl overflow-hidden aspect-[3/4] ${i === 0 || i === 3 ? "md:col-span-2 lg:col-span-1 lg:row-span-2 aspect-[3/4] lg:aspect-[3/8.2]" : ""}`}
              >
                <Image
                  src={imgSrc}
                  alt={`Portfolio item ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#362d23]/90 via-[#362d23]/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0 border border-white/10 rounded-xl m-4 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-10 h-px bg-[#bbb2aa] mb-4" />
                  <p className="text-white text-lg tracking-widest font-light uppercase">
                    Collection {i + 1}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section id="reservation" className="py-10 px-6 relative">
        <div className="absolute inset-0 z-0">
          {/* Desktop Background */}
          <div className="hidden md:block absolute inset-0">
            <Image
              src="https://raiyansoft.com/wp-content/uploads/2026/05/bg2.png"
              alt="Reservation Background Desktop"
              fill
              className="object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Mobile Background */}
          <div className="block md:hidden absolute inset-0">
            <Image
              src="https://raiyansoft.com/wp-content/uploads/2026/05/bg3.png"
              alt="Reservation Background Mobile"
              fill
              className="object-cover opacity-50"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f8]/90 via-[#faf9f8]/60 to-[#faf9f8]/90" />
        </div>
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#bbb2aa]/30"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#362d23]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#bbb2aa]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center mb-10">
              <h2
                className={`${headingFontClass} text-3xl md:text-4xl mb-4 font-medium text-[#362d23]`}
              >
                {d.reservationForm.title}
              </h2>
              <p className="text-[#857363] text-lg font-light">
                {d.reservationForm.subtitle}
              </p>
            </div>

            <form
              className="relative z-10 flex flex-col gap-6"
              onSubmit={handleReservationSubmit}
            >
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#362d23] text-start">
                  {d.reservationForm.nameLabel}
                </label>
                <input
                  type="text"
                  placeholder={d.reservationForm.namePlaceholder}
                  className="w-full bg-[#faf9f8] border border-[#bbb2aa]/30 text-[#362d23] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#857363]/50 focus:border-[#857363]/50 transition-all placeholder:text-[#bbb2aa]"
                  required
                />
              </div>

              {/* Phone Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#362d23] text-start">
                  {d.reservationForm.phoneLabel}
                </label>
                <input
                  type="tel"
                  placeholder={d.reservationForm.phonePlaceholder}
                  dir="ltr"
                  className={`w-full bg-[#faf9f8] border border-[#bbb2aa]/30 text-[#362d23] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#857363]/50 focus:border-[#857363]/50 transition-all placeholder:text-[#bbb2aa] ${isRtl ? "text-end" : ""}`}
                  required
                />
              </div>

              {/* Event Type Select */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#362d23] text-start">
                  {d.reservationForm.eventTypeLabel}
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-[#faf9f8] border border-[#bbb2aa]/30 text-[#362d23] rounded-xl px-4 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-[#857363]/50 focus:border-[#857363]/50 transition-all leading-tight"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {d.reservationForm.eventTypePlaceholder}
                    </option>
                    <option value="wedding">
                      {d.reservationForm.eventTypes.wedding}
                    </option>
                    <option value="graduation">
                      {d.reservationForm.eventTypes.graduation}
                    </option>
                    <option value="party">
                      {d.reservationForm.eventTypes.party}
                    </option>
                    <option value="other">
                      {d.reservationForm.eventTypes.other}
                    </option>
                  </select>
                  <div
                    className={`absolute inset-y-0 ${isRtl ? "left-0" : "right-0"} flex items-center px-4 pointer-events-none text-[#857363]`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Event Date Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-[#362d23] text-start">
                  {d.reservationForm.eventDateLabel}
                </label>
                <input
                  type="date"
                  className={`w-full bg-[#faf9f8] border border-[#bbb2aa]/30 text-[#362d23] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#857363]/50 focus:border-[#857363]/50 transition-all ${isRtl ? "[&::-webkit-calendar-picker-indicator]:ml-[-0.5rem] [&::-webkit-calendar-picker-indicator]:mr-auto" : ""}`}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 w-full bg-[#362d23] text-[#bbb2aa] rounded-xl px-8 py-5 font-bold tracking-widest uppercase hover:bg-[#2a231b] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {d.reservationForm.submitButton}
                <ChevronRight
                  className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`}
                />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
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
              {d.contact.title}
            </h2>
            <p className="text-[#362d23]/70 text-lg mb-12 font-light relative z-10">
              {d.contact.subtitle}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10 text-start">
              {/* Map Column */}
              <div className="w-full h-[280px] sm:h-[350px] rounded-[1.5rem] overflow-hidden glass-panel-dark border border-[#bbb2aa]/30 shadow-lg relative p-2">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d111244.38313170703!2d47.9048039868779!3d29.375859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9c83ce455983%3A0xc3ebaef5af09b90e!2sKuwait%20City%2C%20Kuwait!5e0!3m2!1sen!2sus!4v1716301321035!5m2!1sen!2sus"
                    className="absolute inset-0 w-full h-full border-0 filter opacity-90 transition-opacity hover:opacity-100"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Content Column */}
              <div className="flex flex-col items-center lg:items-start text-center lg:text-start px-2">
                <h3
                  className={`${headingFontClass} text-2xl font-medium text-[#362d23] mb-4`}
                >
                  {d.contact.address}
                </h3>
                <p className="text-[#362d23]/70 mb-8 max-w-md">
                  {d.contact.addressValue}
                </p>

                <a
                  href="https://wa.me/96512345678"
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
                  {d.contact.cta}
                </a>

                <div className="w-full h-px bg-[#bbb2aa]/30 mb-8" />

                <h4 className="font-medium text-[#362d23] mb-6 uppercase tracking-widest text-sm">
                  {d.contact.social}
                </h4>
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#857363] hover:text-[#362d23] hover:-translate-y-1 transition-all duration-300"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#857363] hover:text-[#362d23] hover:-translate-y-1 transition-all duration-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#857363] hover:text-[#362d23] hover:-translate-y-1 transition-all duration-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.95v7.45c-.01 1.94-.69 3.89-1.93 5.39-1.28 1.53-3.14 2.47-5.14 2.82-1.99.35-4.1-.03-5.83-1.07-1.74-1.05-3.04-2.67-3.66-4.6-.62-1.92-.51-4.05.3-5.89.81-1.85 2.22-3.35 4.01-4.24 1.78-.89 3.88-1.13 5.81-.66V11.4c-1.29-.35-2.66-.41-3.96-.13-1.3.28-2.49.97-3.4 1.95-.9.99-1.46 2.3-1.61 3.65-.16 1.35.1 2.75.76 3.95.65 1.19 1.69 2.12 2.94 2.6 1.25.48 2.66.45 3.9-.07 1.23-.52 2.25-1.44 2.84-2.61.59-1.17.89-2.5.86-3.83V0h3.84v.02z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[#857363] hover:text-[#362d23] hover:-translate-y-1 transition-all duration-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12.115 1.493c-2.31-.05-4.664.832-6.19 2.666-1.076 1.293-1.637 2.96-1.558 4.636.035 1.543.14 3.093.58 4.58.118.4-.1.884-.467 1.09-1.222.684-2.585 1.157-3.926.85-.306-.057-.597.108-.66.417-.03.116-.015.228.026.333.327.76 1.106 1.517 1.848 1.956 1.545.918 3.393 1.2 5.094 1.79.167.06.31.144.385.312.27 1.07.72 2.105 1.34 3.036.216.327.606.505.992.51l.89-.004c.15-.008.286-.062.404-.158.4-.336.75-.724 1.205-.986.305-.183.7-.098.922.18l.707.828c.174.204.423.323.682.327.4.015.8-.016 1.2-.07.64-.09 1.25-.326 1.77-.73.2-.15.42-.15.617.004.46.338 1.08.435 1.534.82.164.14.382.167.585.117.2-.05.352-.164.442-.326.696-1.252.885-2.658 1.196-4.043.084-.366.45-.633.82-.6.38.03.765.01 1.143-.053 1.29-.214 2.373-.832 2.87-2.072.1-.22-.054-.48-.288-.518-1.52-.255-2.923-1.01-4.086-1.924-.13-.11-.2-.28-.184-.45.197-1.203.49-2.392.544-3.606.1-2.28-.908-4.48-2.68-5.83C15.49 2.062 13.805 1.54 12.115 1.493z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer lang={lang} d={d} isRtl={isRtl} />

      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#362d23] text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 w-[max-content] min-w-[300px] max-w-[90vw] justify-center"
          >
            <CheckCircle className="w-5 h-5 text-[#25D366] shrink-0" />
            <p className="font-medium text-sm md:text-base text-center line-clamp-2">
              {d.reservationForm.successMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf9f8]" />}>
      <HomeComponent />
    </Suspense>
  );
}
