"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ChevronRight, Loader2 } from "lucide-react";
import { fetchEventTypes } from "@/lib/api";
import type { EventType, ServiceRequestPayload } from "@/lib/types";
import { Lang } from "@/lib/dictionaries";

// Static labels per language
const LABELS: Record<Lang, Record<string, string>> = {
  ar: {
    title: "احجز تجربتك",
    subtitle: "نحن هنا لجعل مناسبتك استثنائية",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "أدخل اسمك الكريم",
    countryCodeLabel: "رمز الدولة",
    phoneLabel: "رقم الجوال",
    phonePlaceholder: "أدخل رقم جوالك",
    eventTypeLabel: "نوع المناسبة",
    eventTypePlaceholder: "اختر نوع المناسبة",
    eventDateLabel: "تاريخ المناسبة",
    submitButton: "أرسل الطلب",
    submitting: "جاري الإرسال...",
  },
  en: {
    title: "Book Your Experience",
    subtitle: "We're here to make your event exceptional",
    nameLabel: "Full Name",
    namePlaceholder: "Enter your name",
    countryCodeLabel: "Country Code",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter your phone number",
    eventTypeLabel: "Event Type",
    eventTypePlaceholder: "Select event type",
    eventDateLabel: "Event Date",
    submitButton: "Send Request",
    submitting: "Sending...",
  },
};

interface ReservationSectionProps {
  lang: Lang;
  isRtl: boolean;
  headingFontClass: string;
  onSubmit: (payload: ServiceRequestPayload) => Promise<void>;
  submitError: string | null;
}

export default function ReservationSection({
  lang,
  isRtl,
  headingFontClass,
  onSubmit,
  submitError,
}: ReservationSectionProps) {
  const labels = LABELS[lang];
  const formRef = useRef<HTMLFormElement>(null);

  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setLoadingTypes(true);
    fetchEventTypes(lang)
      .then(setEventTypes)
      .catch(console.error)
      .finally(() => setLoadingTypes(false));
  }, [lang]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload: ServiceRequestPayload = {
      name: (fd.get("name") as string) ?? "",
      country_code: (fd.get("country_code") as string) ?? "+965",
      phone: (fd.get("phone") as string) ?? "",
      landing_event_type_id: Number(fd.get("landing_event_type_id")),
      event_date: (fd.get("event_date") as string) ?? "",
    };

    setSubmitting(true);
    try {
      await onSubmit(payload);
      formRef.current?.reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#362d23]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#bbb2aa]/20 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 text-center mb-10">
            <h2
              className={`${headingFontClass} text-3xl md:text-4xl mb-4 font-medium text-[#362d23]`}
            >
              {labels.title}
            </h2>
            <p className="text-[#857363] text-lg font-light">
              {labels.subtitle}
            </p>
          </div>

          <form
            ref={formRef}
            className="relative z-10 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            {/* Name */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#362d23] text-start">
                {labels.nameLabel}
              </label>
              <input
                name="name"
                type="text"
                placeholder={labels.namePlaceholder}
                className="w-full bg-[#faf9f8] border border-[#bbb2aa]/30 text-[#362d23] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#857363]/50 focus:border-[#857363]/50 transition-all placeholder:text-[#bbb2aa]"
                required
              />
            </div>

            {/* Country Code + Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#362d23] text-start">
                {labels.phoneLabel}
              </label>
              <div className="flex gap-2" dir="ltr">
                <input
                  name="country_code"
                  type="text"
                  defaultValue="+965"
                  className="w-24 bg-[#faf9f8] border border-[#bbb2aa]/30 text-[#362d23] rounded-xl px-3 py-4 focus:outline-none focus:ring-2 focus:ring-[#857363]/50 focus:border-[#857363]/50 transition-all text-center"
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder={labels.phonePlaceholder}
                  className={`flex-1 bg-[#faf9f8] border border-[#bbb2aa]/30 text-[#362d23] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#857363]/50 focus:border-[#857363]/50 transition-all placeholder:text-[#bbb2aa]`}
                  required
                />
              </div>
            </div>

            {/* Event Type */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#362d23] text-start">
                {labels.eventTypeLabel}
              </label>
              <div className="relative">
                <select
                  name="landing_event_type_id"
                  className="w-full bg-[#faf9f8] border border-[#bbb2aa]/30 text-[#362d23] rounded-xl px-4 py-4 appearance-none focus:outline-none focus:ring-2 focus:ring-[#857363]/50 focus:border-[#857363]/50 transition-all leading-tight"
                  required
                  defaultValue=""
                  disabled={loadingTypes}
                >
                  <option value="" disabled>
                    {loadingTypes ? "..." : labels.eventTypePlaceholder}
                  </option>
                  {eventTypes.map((et) => (
                    <option key={et.id} value={et.id}>
                      {et.name}
                    </option>
                  ))}
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
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Event Date */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#362d23] text-start">
                {labels.eventDateLabel}
              </label>
              <input
                name="event_date"
                type="date"
                className={`w-full bg-[#faf9f8] border border-[#bbb2aa]/30 text-[#362d23] rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#857363]/50 focus:border-[#857363]/50 transition-all ${isRtl ? "[&::-webkit-calendar-picker-indicator]:ml-[-0.5rem] [&::-webkit-calendar-picker-indicator]:mr-auto" : ""}`}
                required
              />
            </div>

            {/* Error message */}
            {submitError && (
              <p className="text-red-500 text-sm text-center">{submitError}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-4 w-full bg-[#362d23] text-[#bbb2aa] rounded-xl px-8 py-5 font-bold tracking-widest uppercase hover:bg-[#2a231b] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {labels.submitting}
                </>
              ) : (
                <>
                  {labels.submitButton}
                  <ChevronRight
                    className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`}
                  />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
