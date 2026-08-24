"use client";

import React from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useBookingModal } from "@/context/BookingModalContext";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  gender: "female" | "male";
  colorScheme: {
    bg: string;
    text: string;
    border: string;
  };
}

const TESTIMONIALS_COL_1: Testimonial[] = [
  {
    id: 1,
    quote:
      "After years of irregular cycles and stubborn weight, Rise Your Health's 16-week protocol addressed my insulin resistance. My periods are now regular on a 30-day cycle.",
    name: "Pooja Sharma",
    gender: "female",
    colorScheme: {
      bg: "bg-[#E5EFE7]",
      text: "text-[#287417]",
      border: "border border-[#CCE0D0]",
    },
  },
  {
    id: 4,
    quote:
      "Pichle 3 saal se extreme fatigue aur severe PMS se pareshan thi. Cycle ekdum on-track ho gaya aur afternoon energy crashes ab bilkul nahi hote!",
    name: "Ritu Agarwal",
    gender: "female",
    colorScheme: {
      bg: "bg-[#FFF0E0]",
      text: "text-[#D97706]",
      border: "border border-[#FDE3C8]",
    },
  },
];

const TESTIMONIALS_COL_2: Testimonial[] = [
  {
    id: 2,
    quote:
      "डॉक्टरों ने कहा था कि पीसीओएस सिर्फ दवाइयों से ठीक होगा। लेकिन यहाँ के 16-वीक लाइफस्टाइल व न्यूट्रिशन प्रोटोकॉल से मेरी ब्लड रिपोर्ट्स नॉर्मल आ गईं। मैं अब खुद को बहुत एक्टिव, हल्का और पूरी तरह से हेल्दी महसूस करती हूँ।",
    name: "डॉ. मीनाक्षी जोशी",
    gender: "female",
    colorScheme: {
      bg: "bg-[#EEF2F6]",
      text: "text-[#022342]",
      border: "border border-[#D4E0EC]",
    },
  },
  {
    id: 5,
    quote:
      "Enrolled for chronic metabolic fatigue. The daily scorecards and circadian habits reversed my energy crashes. Lost 9 kgs in 14 weeks without extreme dieting!",
    name: "Aditya Singhania",
    gender: "male",
    colorScheme: {
      bg: "bg-[#E0F2FE]",
      text: "text-[#0369A1]",
      border: "border border-[#BAE6FD]",
    },
  },
];

const TESTIMONIALS_COL_3: Testimonial[] = [
  {
    id: 3,
    quote:
      "Mujhe lagta tha PCOS ke sath belly fat loss impossible hai. But here no crash diets, sirf root-cause habits. Lost 8 kgs in 3 months!",
    name: "Sneha Verma",
    gender: "female",
    colorScheme: {
      bg: "bg-[#FEF3C7]",
      text: "text-[#B45309]",
      border: "border border-[#FDE68A]",
    },
  },
  {
    id: 6,
    quote:
      "मेरी वाइफ के सीवियर पीसीओएस और मूड स्विंग्स के लिए जॉइन किया था। अमन और टीम की गाइडेंस से उनकी पीरियड्स साइकल फिक्स हुई और पूरी लाइफस्टाइल सुधर गई।",
    name: "रोहित मेहरा",
    gender: "male",
    colorScheme: {
      bg: "bg-[#EAEFF5]",
      text: "text-[#0A2540]",
      border: "border border-[#D2DEEB]",
    },
  },
];

function QuoteIcon() {
  return (
    <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 22V13.6C0 10.1 0.9 7.1 2.7 4.6C4.5 2.1 7.2 0.5 10.8 0L11.6 1.4C9.2 1.9 7.4 3.1 6.1 4.9C4.8 6.7 4.2 8.6 4.2 10.6H8.4V22H0ZM16.4 22V13.6C16.4 10.1 17.3 7.1 19.1 4.6C20.9 2.1 23.6 0.5 27.2 0L28 1.4C25.6 1.9 23.8 3.1 22.5 4.9C21.2 6.7 20.6 8.6 20.6 10.6H24.8V22H16.4Z"
        fill="#287417"
        fillOpacity="0.3"
      />
    </svg>
  );
}

function ProfileAvatarPlaceholder({
  gender,
  colorScheme,
}: {
  gender: "female" | "male";
  colorScheme: { bg: string; text: string; border: string };
}) {
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colorScheme.bg} ${colorScheme.text} ${colorScheme.border}`}
      aria-hidden="true"
    >
      {gender === "female" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
          <path d="M12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
          <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        </svg>
      )}
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <div className="flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white border border-[#DCE7DF]">
      {/* Quote icon */}
      <div className="mb-4">
        <QuoteIcon />
      </div>

      {/* Quote text */}
      <p className="font-sans text-[14px] sm:text-[14.5px] leading-[1.7] text-[#334155] font-normal flex-1">
        {item.quote}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3.5 mt-7">
        <ProfileAvatarPlaceholder
          gender={item.gender}
          colorScheme={item.colorScheme}
        />
        <div>
          <p className="font-sans text-[13.5px] font-semibold text-[#022342] leading-tight">
            {item.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const { openBookingModal } = useBookingModal();

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#F4F7F4] text-[#022342] py-20 sm:py-28 px-6 sm:px-10 md:px-14 lg:px-20 overflow-hidden border-t border-[#DCE7DF]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Pill Badge */}
        <ScrollReveal delay={100} duration={800} distance={18}>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#DCE7DF] bg-white text-[#022342] text-[12px] font-sans font-medium tracking-wide mb-6">
            Client Transformations
          </div>
        </ScrollReveal>

        {/* Main Heading */}
        <ScrollReveal delay={200} duration={800} distance={24}>
          <h2 className="text-center font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-normal leading-[1.08] tracking-tight text-[#022342] max-w-2xl">
            You are{" "}
            <span className="font-serif italic text-[#287417]">not</span>{" "}
            alone in this.
          </h2>
        </ScrollReveal>

        {/* Subtitle */}
        <ScrollReveal delay={300} duration={800} distance={20}>
          <p className="mt-4 text-center text-[#475569] text-sm sm:text-base md:text-[1.05rem] font-light leading-relaxed max-w-md">
            Hear from people across India who&apos;ve transformed their hormonal health, metabolism, and energy.
          </p>
        </ScrollReveal>

        {/* CTA Button */}
        <ScrollReveal delay={400} duration={800} distance={18}>
          <div className="mt-7">
            <button
              type="button"
              onClick={openBookingModal}
              className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#287417] hover:bg-[#216113] text-white font-sans text-[13px] sm:text-sm font-medium tracking-wide transition-all duration-200 active:scale-95 cursor-pointer shadow-sm hover:shadow-md"
            >
              Begin Your Journey
            </button>
          </div>
        </ScrollReveal>

        {/* 3-Column Staggered Masonry Grid - Flat, White Cards with Brand Borders */}
        <div className="w-full mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-start">
          {/* Column 1 */}
          <ScrollReveal delay={200} duration={750} distance={24} className="flex flex-col gap-5 lg:gap-6">
            {TESTIMONIALS_COL_1.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </ScrollReveal>

          {/* Column 2 */}
          <ScrollReveal delay={320} duration={750} distance={24} className="flex flex-col gap-5 lg:gap-6">
            {TESTIMONIALS_COL_2.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </ScrollReveal>

          {/* Column 3 */}
          <ScrollReveal delay={440} duration={750} distance={24} className="flex flex-col gap-5 lg:gap-6">
            {TESTIMONIALS_COL_3.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </ScrollReveal>
        </div>

        {/* Clinical Care Commitment & Vision Section */}
        <ScrollReveal delay={200} duration={850} distance={28} className="w-full mt-20 sm:mt-24 max-w-5xl">
          <div className="rounded-3xl bg-white border border-[#DCE7DF] p-8 sm:p-12 md:p-14 text-center flex flex-col items-center shadow-xs">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#287417]/10 text-[#287417] text-[11.5px] font-sans font-semibold uppercase tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#287417]" />
              Our Vision & Philosophy
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-[2.25rem] text-[#022342] leading-snug font-normal max-w-3xl">
              &ldquo;Lasting health transformation is not about quick fixes, restrictive diets, or treating symptoms in isolation.&rdquo;
            </h3>

            <p className="mt-5 text-[#475569] text-sm sm:text-base md:text-[1.05rem] font-light leading-relaxed max-w-3xl text-center">
              At Rise Your Health, we believe in understanding root causes, building sustainable habits, and providing continuous guidance at every stage of your journey. Our flagship <strong className="text-[#022342] font-semibold">4-Month PCOS Reset Method</strong> helps women resolve hormonal and metabolic concerns—such as irregular cycles, weight-management challenges, insulin resistance, and lifestyle fatigue—through a structured, personalized roadmap.
            </p>

            <div className="mt-8 pt-8 border-t border-[#EEF4EF] w-full grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAF8] border border-[#E2EBE4]">
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#287417] mb-2 flex items-center gap-2">
                  <span>👩‍⚕️</span> A Multidisciplinary Approach
                </p>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light">
                  Depending on individual needs, our ecosystem brings together nutrition, medical guidance, coaching, lifestyle support, and accountability, so clients aren&apos;t left trying to figure everything out on their own.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-[#F8FAF8] border border-[#E2EBE4]">
                <p className="font-sans text-xs font-semibold uppercase tracking-wider text-[#287417] mb-2 flex items-center gap-2">
                  <span>🌱</span> Our Long-Term Vision
                </p>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-light">
                  To make personalized, evidence-informed health support more accessible and practical for people who are tired of temporary solutions and want to take meaningful ownership of their health.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
