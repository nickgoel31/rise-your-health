"use client";

import React, { useState } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { useBookingModal } from "@/context/BookingModalContext";

/* ─── Data ────────────────────────────────────────────────────────────── */

interface PhaseWeek {
  title: string;
  points: string[];
}

interface Phase {
  id: string;
  month: string;
  label: string;
  days: string;
  tagline: string;
  objective: string;
  weeks: PhaseWeek[];
}

const PHASES: Phase[] = [
  {
    id: "month-0",
    month: "00",
    label: "Pre-Onboarding",
    days: "7–10 Days Before Day 1",
    tagline: "Understand the woman before prescribing a generic PCOS plan.",
    objective:
      "Establish your clinical and lifestyle baseline through a comprehensive 25+ point intake before starting any protocol.",
    weeks: [
      {
        title: "25+ Point Health Intake",
        points: [
          "Menstrual history, cycle regularity, flow & ovulation signs",
          "Androgen symptoms — acne, hair fall, hirsutism",
          "Metabolic markers, waist, weight history & energy crashes",
          "Sleep quality, stress levels & exercise history",
          "Medical history, labs, medications & fertility goals",
        ],
      },
      {
        title: "Baseline Scorecard Creation",
        points: [
          "Record cycle length, energy, sleep quality & stress levels",
          "Establish baseline androgen & craving severity scores",
          "Holistic multi-dimensional tracking beyond blood levels",
        ],
      },
    ],
  },
  {
    id: "month-1",
    month: "01",
    label: "Assess & Stabilize",
    days: "Days 1–30",
    tagline:
      "Establish the foundations. No rush to fix everything in week one.",
    objective:
      "Build calm, steady foundations in nutrition, gentle movement, and sleep habits with zero crash diets.",
    weeks: [
      {
        title: "Week 1 — Understand & Onboard",
        points: [
          "1:1 Onboarding call & clinical intake review",
          "Lifestyle, sleep, and nutrition assessment",
          "Clarity on exact goals and personal roadmap",
        ],
      },
      {
        title: "Week 2 — Nutrition Foundations",
        points: [
          "Adequate protein & fibre-rich whole food meals",
          "Meal timing tailored to schedule and metabolism",
          "Reducing ultra-processed foods without deprivation",
        ],
      },
      {
        title: "Week 3 — Sustainable Movement",
        points: [
          "Daily walking targets for current fitness level",
          "Gentle resistance training & mobility routines",
          "Focus on consistency, enjoyment & metabolic support",
        ],
      },
      {
        title: "Week 4 — Sleep, Stress & Review",
        points: [
          "Consistent sleep/wake timing & screen/caffeine audit",
          "End-of-month review: cycle, energy, cravings & waist",
          "Refining plan based on your body's initial response",
        ],
      },
    ],
  },
  {
    id: "month-2",
    month: "02",
    label: "Correct & Build",
    days: "Days 31–60",
    tagline: "Move from following a plan to my lifestyle is changing.",
    objective:
      "Address your unique metabolic drivers, identify emotional and lifestyle triggers, and progress physical fitness.",
    weeks: [
      {
        title: "Weeks 5–6 — Nutrition Personalization",
        points: [
          "Identify overeating triggers & difficult meal timings",
          "Solve weekend inconsistency without restrictive rules",
          "Personalized cycle-syncing food framework",
        ],
      },
      {
        title: "Week 7 — Exercise Progression",
        points: [
          "Structured 3–4 weekly resistance routines",
          "Strength-focused training for insulin sensitivity",
          "Post-workout recovery & energy balance",
        ],
      },
      {
        title: "Week 8 — Metabolic & Clinical Review",
        points: [
          "Review weight trend, waist, energy & cycle shifts",
          "Assess acne and hair fall response",
          "Clinical check-in with doctor for lab follow-up",
        ],
      },
    ],
  },
  {
    id: "month-3",
    month: "03",
    label: "Optimize & Progress",
    days: "Days 61–90",
    tagline: "The highest-touch phase. Solving individual bottlenecks.",
    objective:
      "Tailor specific intervention pathways for your remaining symptom drivers across four key categories.",
    weeks: [
      {
        title: "4-Category Deep-Dive Optimization",
        points: [
          "Menstrual Health — cycle length, regularity & ovulation",
          "Metabolic Health — insulin, waist trend, energy & cravings",
          "Androgen Symptoms — acne, hair thinning or hirsutism",
          "Lifestyle Adherence — high-stress work & travel routines",
        ],
      },
      {
        title: "Botanical & Habit Refinement",
        points: [
          "Adjust botanical formulations & nutrient co-factors",
          "Advanced stress & cortisol downshifting tools",
          "Preparing the foundation for long-term sustainability",
        ],
      },
    ],
  },
  {
    id: "month-4",
    month: "04",
    label: "Consolidate & Sustain",
    days: "Days 91–120",
    tagline:
      "Teaching you how to maintain this for life without depending on a coach.",
    objective:
      "Consolidate all gains and create your personalized lifetime PCOS Maintenance Blueprint.",
    weeks: [
      {
        title: "Weeks 13–14 — Trajectory & Trigger Lock-In",
        points: [
          "Identify your biggest improvements & remaining sensitivities",
          "Lock in sustainable, enjoyable lifetime habits",
          "Recognize personal stress and lifestyle triggers",
        ],
      },
      {
        title: "Week 15 — PCOS Maintenance Blueprint",
        points: [
          "My Non-Negotiables: sleep target, movement, nutrition",
          "My Warning Signs: early indicators when balance slips",
          "My Recovery Protocol: action plan for travel & stress",
        ],
      },
      {
        title: "Week 16 — Final Transformation Review",
        points: [
          "Complete baseline vs. final health scorecard review",
          "Celebration of measurable physical & metabolic shifts",
          "Handover of maintenance plan & alumni check-ins",
        ],
      },
    ],
  },
];

const SCORECARD_ITEMS = [
  {
    metric: "Cycle Length",
    before: "48 days",
    after: "34 days",
    tag: "Regulated",
  },
  {
    metric: "Daily Energy",
    before: "4 / 10",
    after: "8.5 / 10",
    tag: "+112%",
  },
  {
    metric: "Waist",
    before: "92 cm",
    after: "86 cm",
    tag: "−6 cm",
  },
  {
    metric: "Cravings",
    before: "8 / 10",
    after: "3.5 / 10",
    tag: "Controlled",
  },
  {
    metric: "Acne",
    before: "7 / 10",
    after: "3 / 10",
    tag: "Soothed",
  },
  {
    metric: "Sleep",
    before: "5 / 10",
    after: "8.5 / 10",
    tag: "Restored",
  },
];

/* ─── Tiny Chevron Icon ───────────────────────────────────────────────── */
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ─── Component ───────────────────────────────────────────────────────── */

export default function RoadmapSection() {
  const [openPhase, setOpenPhase] = useState(1); // Month 1 open by default
  const { openBookingModal } = useBookingModal();

  return (
    <section
      id="roadmap"
      className="relative w-full border-t border-[#DCE7DF]"
    >
      {/* ── TOP: Dark editorial intro ──────────────────────────────── */}
      <div className="relative bg-gradient-to-b from-[#01162b] via-[#022342] to-[#01162b] overflow-hidden">
        {/* Decorative watermark */}
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <span
            className="font-serif italic text-white/[0.03] whitespace-nowrap"
            style={{ fontSize: "clamp(100px, 20vw, 260px)", lineHeight: 1 }}
          >
            16 Weeks
          </span>
        </div>

        {/* Soft radial glow */}
        <div
          aria-hidden
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[450px] rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, #287417 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 pt-24 sm:pt-32 pb-20 sm:pb-28 text-center">
          <ScrollReveal delay={100} duration={800} distance={18}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 text-white/80 text-[11px] font-sans font-medium tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FE8600] inline-block animate-pulse" />
              Your 16-Week Roadmap
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} duration={900} distance={28}>
            <h2
              className="font-serif font-normal text-white leading-[1.06] tracking-tight max-w-3xl mx-auto"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 4.2rem)" }}
            >
              From first assessment to{" "}
              <span className="font-serif italic text-[#48BB78]">
                lasting self-reliance
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={320} duration={800} distance={18}>
            <p className="mt-5 font-sans text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-xl mx-auto">
              Five phases. Four months. A structured clinical and lifestyle
              protocol — backed by measurable health scorecards at every step.
            </p>
          </ScrollReveal>

          {/* Phase number indicators */}
          <ScrollReveal delay={420} duration={700} distance={14}>
            <div className="mt-12 flex items-center justify-center gap-3 sm:gap-4">
              {PHASES.map((phase, idx) => {
                const isOpen = openPhase === idx;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() =>
                      setOpenPhase(isOpen ? -1 : idx)
                    }
                    className={`group flex flex-col items-center gap-1.5 transition-all duration-300 cursor-pointer ${
                      isOpen ? "opacity-100" : "opacity-40 hover:opacity-70"
                    }`}
                  >
                    <span
                      className={`font-sans font-medium text-2xl sm:text-3xl leading-none transition-colors duration-300 ${
                        isOpen ? "text-[#FE8600]" : "text-white"
                      }`}
                    >
                      {phase.month}
                    </span>
                    <span className="font-sans text-[9px] sm:text-[10px] tracking-widest uppercase text-white/50 hidden sm:block">
                      {phase.label.split(" ")[0]}
                    </span>
                    {/* Dot indicator */}
                    <span
                      className={`w-1 h-1 rounded-full transition-all duration-300 ${
                        isOpen
                          ? "bg-[#FE8600] scale-125"
                          : "bg-white/20 scale-100"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ── MIDDLE: Accordion timeline ─────────────────────────────── */}
      <div className="bg-[#F4F7F4] px-6 sm:px-10 md:px-14 lg:px-20 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col">
            {PHASES.map((phase, idx) => {
              const isOpen = openPhase === idx;

              return (
                <div key={phase.id} className="relative">
                  {/* Timeline connector line */}
                  {idx < PHASES.length - 1 && (
                    <div className="absolute left-[23px] sm:left-[27px] top-[60px] bottom-0 w-px bg-[#DCE7DF] pointer-events-none" />
                  )}

                  {/* Phase header row */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenPhase(isOpen ? -1 : idx)
                    }
                    className="group w-full flex items-start gap-5 sm:gap-7 py-7 sm:py-8 cursor-pointer text-left"
                  >
                    {/* Circle number */}
                    <div
                      className={`relative z-10 shrink-0 w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] rounded-full flex items-center justify-center font-sans font-medium text-base sm:text-lg transition-all duration-300 ${
                        isOpen
                          ? "bg-[#287417] text-white shadow-lg shadow-[#287417]/20"
                          : "bg-[#E5EFE7] text-[#022342] group-hover:bg-[#D8E6DB]"
                      }`}
                    >
                      {phase.month}
                    </div>

                    {/* Label + meta */}
                    <div className="flex-1 min-w-0 pt-1.5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3
                          className={`font-sans text-lg sm:text-xl md:text-[1.35rem] font-semibold tracking-tight transition-colors duration-300 ${
                            isOpen
                              ? "text-[#022342]"
                              : "text-[#1E293B] group-hover:text-[#022342]"
                          }`}
                        >
                          {phase.label}
                        </h3>
                        <span className="font-sans text-[10px] sm:text-[11px] tracking-wider uppercase text-[#287417] font-medium">
                          {phase.days}
                        </span>
                      </div>
                      <p className="mt-1 font-sans text-[13px] sm:text-sm text-[#475569] font-light leading-relaxed line-clamp-1">
                        {phase.tagline}
                      </p>
                    </div>

                    {/* Chevron */}
                    <div className="shrink-0 mt-2 text-[#287417]/70">
                      <ChevronDown open={isOpen} />
                    </div>
                  </button>

                  {/* Expandable content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-[68px] sm:pl-[83px] pb-8 sm:pb-10">
                      {/* Objective banner */}
                      <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#EAF2EC] border border-[#DCE7DF]">
                        <p className="font-sans text-[10px] uppercase tracking-widest text-[#287417] font-semibold mb-1.5">
                          Core Objective
                        </p>
                        <p className="font-sans text-[13px] sm:text-sm text-[#022342] leading-relaxed">
                          {phase.objective}
                        </p>
                      </div>

                      {/* Week cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {phase.weeks.map((week, wIdx) => (
                          <div
                            key={wIdx}
                            className="p-6 sm:p-7 rounded-2xl bg-white border border-[#DCE7DF] transition-colors duration-200"
                          >
                            <h4 className="font-sans text-[14px] sm:text-[15px] font-semibold text-[#022342] tracking-tight mb-3">
                              {week.title}
                            </h4>
                            <ul className="space-y-2">
                              {week.points.map((pt, pIdx) => (
                                <li
                                  key={pIdx}
                                  className="flex items-start gap-2.5"
                                >
                                  <span className="mt-1.5 w-1 h-1 rounded-full bg-[#287417] shrink-0" />
                                  <span className="font-sans text-[12.5px] sm:text-[13px] text-[#334155] leading-relaxed">
                                    {pt}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Separator between closed items */}
                  {!isOpen && idx < PHASES.length - 1 && (
                    <div className="ml-[68px] sm:ml-[83px] border-b border-[#DCE7DF]" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Divider between Timeline and Scorecard */}
          <div className="my-16 sm:my-20 border-t border-[#DCE7DF]" />

          {/* ── Objective Health Scorecard ────────────────────────────── */}
          <ScrollReveal delay={100} duration={800} distance={20}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-12">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-[#287417] font-semibold mb-2">
                  Objective Health Scorecard
                </p>
                <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[#022342] leading-tight">
                  Measurable progress,{" "}
                  <span className="font-sans italic font-medium text-[#287417]">not</span>{" "}
                  empty promises
                </h3>
              </div>
              <p className="font-sans text-[12px] sm:text-[13px] text-[#475569] font-light leading-relaxed max-w-xs">
                We record your exact Day 1 baseline and systematically measure
                improvement by Day 120.
              </p>
            </div>
          </ScrollReveal>

          {/* Scorecard grid - clean white cards matching the timeline style */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {SCORECARD_ITEMS.map((item, idx) => (
              <ScrollReveal
                key={idx}
                delay={80 + idx * 50}
                duration={600}
                distance={14}
              >
                <div className="bg-white border border-[#DCE7DF] rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center h-full justify-between gap-3 transition-colors duration-200">
                  <p className="font-sans text-[11px] uppercase tracking-wider text-[#287417] font-semibold">
                    {item.metric}
                  </p>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-sans text-[11px] text-[#94A3B8] line-through">
                      {item.before}
                    </span>
                    <span className="font-sans font-semibold text-xl sm:text-2xl text-[#022342] leading-none">
                      {item.after}
                    </span>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold bg-[#287417]/10 text-[#287417] tracking-wide">
                    {item.tag}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA */}
          <ScrollReveal delay={400} duration={700} distance={16}>
            <div className="mt-12 sm:mt-14 text-center">
              <button
                type="button"
                onClick={openBookingModal}
                className="group inline-flex items-center gap-3 py-3.5 px-8 rounded-full bg-[#287417] hover:bg-[#216113] text-white font-sans text-sm font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-[#287417]/25 active:scale-[0.97] cursor-pointer"
              >
                Start Your Transformation
                <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
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
                    <line x1="2" y1="6" x2="10" y2="6" />
                    <polyline points="7 3 10 6 7 9" />
                  </svg>
                </span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
