"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const DELIVERABLES = [
  {
    number: "01",
    title: "25+ Point Health Intake & Baseline Scorecard",
    desc: "Deep-dive questionnaire capturing every relevant marker before Day 1 so nothing is generic.",
  },
  {
    number: "02",
    title: "4-Phase 16-Week Protocol",
    desc: "Assess → Reset → Transform → Sustain. Every week has a clear objective and measurable outcome.",
  },
  {
    number: "03",
    title: "Dedicated 4-Person Care Squad",
    desc: "Doctor, Nutritionist, Lifestyle Coach, and Psychologist — all working as one team for you.",
  },
  {
    number: "04",
    title: "Integrative Metabolic Nutrition",
    desc: "Non-restrictive, cycle-synced food frameworks built around blood sugar balance and hormonal health.",
  },
  {
    number: "05",
    title: "Progressive Movement Strategy",
    desc: "Strength, walking targets, and cardio scaled week-by-week for insulin sensitivity and body composition.",
  },
  {
    number: "06",
    title: "Sleep & Stress Recovery Toolkit",
    desc: "Circadian rhythm protocols, nervous system soothing tools, and adrenal stress recovery routines.",
  },
  {
    number: "07",
    title: "Weekly Check-Ins & Daily Habit Tracking",
    desc: "Structured health forms, 30-second daily logs, and real-time coaching feedback every step of the way.",
  },
  {
    number: "08",
    title: "Lifetime Hormonal Maintenance Framework",
    desc: "Your personal post-program SOP: Non-Negotiables, Warning Signs & a Recovery Protocol for travel and stress.",
  },
];

const STATS = [
  { value: "16", label: "Weeks" },
  { value: "4", label: "Phases" },
  { value: "100%", label: "Personalized" },
  { value: "1:1", label: "Program" },
];

export default function ProgramsSection() {
  return (
    <section
      id="programs"
      className="relative w-full text-[#022342] border-t border-[#DCE7DF]"
    >
      {/* ── HERO ZONE: Dark editorial panel ── */}
      <div className="relative bg-gradient-to-b from-[#01162b] via-[#022342] to-[#01162b] overflow-hidden px-6 sm:px-10 md:px-14 lg:px-20 pt-24 sm:pt-32 pb-20 sm:pb-28">
        {/* Decorative large italic text background watermark */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        >
          <span
            className="font-serif italic text-white/[0.03] whitespace-nowrap"
            style={{ fontSize: "clamp(80px, 18vw, 220px)", lineHeight: 1 }}
          >
            Rebalance Protocol
          </span>
        </div>

        {/* Subtle radial glow */}
        <div
          aria-hidden
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, #287417 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Top row: badge + stats */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-14 sm:mb-16">
            <ScrollReveal delay={100} duration={800} distance={18}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-white/80 text-[11.5px] font-sans font-medium tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FE8600] inline-block animate-pulse" />
                The PCOS Rebalance Protocol
              </div>
            </ScrollReveal>

            {/* Stat row */}
            <ScrollReveal delay={200} duration={700} distance={14} direction="left">
              <div className="flex items-center gap-6 sm:gap-8">
                {STATS.map((s, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <span className="font-serif text-2xl sm:text-3xl font-normal text-white leading-none">
                      {s.value}
                    </span>
                    <span className="font-sans text-[10px] tracking-widest uppercase text-white/50 mt-1">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Main editorial heading */}
          <ScrollReveal delay={200} duration={900} distance={30}>
            <h2
              className="font-serif font-normal text-white leading-[1.04] tracking-tight max-w-4xl"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
            >
              16 Weeks to Better{" "}
              <span className="font-serif italic text-[#48BB78]">
                Hormonal & Metabolic
              </span>{" "}
              Health
            </h2>
          </ScrollReveal>

          {/* Sub-line */}
          <ScrollReveal delay={320} duration={800} distance={20}>
            <p className="mt-6 font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-2xl">
              A structured, clinically-informed 4-phase protocol designed to
              take you from initial stabilization to permanent self-reliance —
              with a dedicated multi-disciplinary team beside you every step of
              the way.
            </p>
          </ScrollReveal>

          {/* Divider line */}
          <div className="mt-14 sm:mt-16 border-t border-white/10" />

          {/* Bottom hero row: program name + CTA */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <ScrollReveal delay={400} duration={700} distance={16}>
              <div>
                <p className="font-sans text-[11px] uppercase tracking-widest text-white/50 mb-2">
                  Program
                </p>
                <p className="font-sans text-xl sm:text-2xl font-medium text-white tracking-tight">
                  The PCOS Rebalance Protocol{" "}
                  <span className="text-white/50 font-light">(1:1 Program)</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={480} duration={700} distance={16} direction="left">
              <Link
                href="/#journey"
                className="group inline-flex items-center gap-3 py-3.5 px-7 rounded-full bg-[#287417] hover:bg-[#216113] text-white font-sans text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#287417]/30 active:scale-[0.97]"
              >
                Begin Your Journey
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="2" y1="10" x2="10" y2="2" />
                    <polyline points="2 2 10 2 10 10" />
                  </svg>
                </span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* ── DELIVERABLES ZONE: Light numbered grid ── */}
      <div className="bg-[#F4F7F4] px-6 sm:px-10 md:px-14 lg:px-20 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto">
          {/* Section label */}
          <ScrollReveal delay={100} duration={700} distance={18}>
            <p className="font-sans text-[11px] uppercase tracking-widest text-[#287417] mb-10 sm:mb-12">
              What&apos;s included in your 4-month protocol
            </p>
          </ScrollReveal>

          {/* 2-col numbered grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#DCE7DF] rounded-[24px] overflow-hidden border border-[#DCE7DF]">
            {DELIVERABLES.map((item, idx) => (
              <ScrollReveal
                key={item.number}
                delay={80 + idx * 60}
                duration={700}
                distance={18}
              >
                <div className="group relative bg-white hover:bg-[#F0F5F2] transition-colors duration-300 p-7 sm:p-9 flex flex-col gap-4 h-full">
                  {/* Number */}
                  <span className="font-serif italic text-[#BACCC0] text-4xl sm:text-5xl leading-none select-none transition-colors duration-300 group-hover:text-[#287417]">
                    {item.number}
                  </span>
                  {/* Title */}
                  <h3 className="font-sans text-base sm:text-[17px] font-semibold text-[#022342] leading-snug tracking-tight">
                    {item.title}
                  </h3>
                  {/* Desc */}
                  <p className="font-sans text-[13px] sm:text-[14px] text-[#475569] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom CTA strip */}
          <ScrollReveal delay={500} duration={800} distance={20}>
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 p-7 sm:p-9 rounded-[20px] bg-[#EAF2EC] border border-[#DCE7DF]">
              <div>
                <p className="font-serif italic text-[#287417] text-lg sm:text-xl">
                  Ready to start your reset?
                </p>
                <p className="font-sans text-[13px] text-[#475569] font-light mt-1 leading-relaxed">
                  Book a complimentary discovery call and we&apos;ll build your
                  personalised roadmap together.
                </p>
              </div>
              <Link
                href="/#journey"
                className="shrink-0 inline-flex items-center justify-center py-3 px-7 rounded-full bg-[#287417] hover:bg-[#216113] text-white font-sans text-sm font-medium tracking-wide transition-all duration-300 active:scale-[0.97]"
              >
                Book Discovery Call
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
