"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

type FAQCategory = "all" | "pcos" | "program" | "getting-started";

interface FAQItem {
  id: number;
  category: FAQCategory;
  categoryLabel: string;
  number: string;
  question: string;
  answer: string;
}

const CATEGORIES: { id: FAQCategory; label: string }[] = [
  { id: "all", label: "All Questions" },
  { id: "pcos", label: "About PCOS / PCOD" },
  { id: "program", label: "About Our Program" },
  { id: "getting-started", label: "Getting Started" },
];

const FAQS: FAQItem[] = [
  // ── Category 1: About PCOS / PCOD ──
  {
    id: 1,
    category: "pcos",
    categoryLabel: "About PCOS / PCOD",
    number: "01",
    question: "What is PCOS / PCOD?",
    answer:
      "PCOS (Polycystic Ovary Syndrome) and PCOD (Polycystic Ovarian Disease) are hormonal conditions where the ovaries produce higher-than-normal levels of androgens. This can lead to irregular periods, stubborn weight gain, cystic acne, excess facial/body hair growth, hair thinning, and difficulty conceiving.",
  },
  {
    id: 2,
    category: "pcos",
    categoryLabel: "About PCOS / PCOD",
    number: "02",
    question: "Is PCOS the same as PCOD?",
    answer:
      "They're related but not identical. PCOD is generally considered a milder condition where the ovaries release immature or partially mature eggs, often linked to lifestyle and diet. PCOS is a more complex endocrine and metabolic disorder that can affect fertility, insulin levels, and long-term health if left unmanaged.",
  },
  {
    id: 3,
    category: "pcos",
    categoryLabel: "About PCOS / PCOD",
    number: "03",
    question: "What causes PCOS / PCOD?",
    answer:
      "There is no single cause. Insulin resistance, genetics, chronic low-grade inflammation, and lifestyle factors like diet, circadian disruption, stress, and lack of physical activity all play a role. It varies significantly from person to person.",
  },
  {
    id: 4,
    category: "pcos",
    categoryLabel: "About PCOS / PCOD",
    number: "04",
    question: "Can PCOS / PCOD be reversed?",
    answer:
      "Every body responds differently, but many women see substantial symptom improvement — regular cycles, balanced energy, clearer skin, and easier weight management — through sustained lifestyle and nutritional changes. We offer a 100% money back guarantee in case you follow the protocol diligently and still don't see any results.",
  },

  // ── Category 2: About Our Program ──
  {
    id: 5,
    category: "program",
    categoryLabel: "Our Program",
    number: "05",
    question: "What does the Rise Your Health program actually include?",
    answer:
      "It helps you identify genetic and metabolic root causes and work naturally across our 4 continuous pillars: 1) Clinical Assessment & baseline scorecard, 2) Root-Cause Nutrition, 3) Progressive Movement & Exercise, and 4) Sleep, Stress & Mental Wellbeing — supported by weekly tracking and dedicated coaching.",
  },
  {
    id: 6,
    category: "program",
    categoryLabel: "Our Program",
    number: "06",
    question: "How is this different from just \"dieting\"?",
    answer:
      "We strictly avoid restriction, calorie counting, or crash diets. The program is built around hormone-friendly nutrition, pocket kitchen-friendly whole foods, and addressing root drivers like insulin resistance and inflammation for sustainable, lifetime results.",
  },
  {
    id: 7,
    category: "program",
    categoryLabel: "Our Program",
    number: "07",
    question: "How long does the program run?",
    answer:
      "The program runs for 4 full months (16 weeks). Hormone and metabolic pathways require consistent biological time to regulate: Month 1 (Stabilize), Month 2 (Build), Month 3 (Optimize), and Month 4 (Consolidate).",
  },
  {
    id: 8,
    category: "program",
    categoryLabel: "Our Program",
    number: "08",
    question: "How soon will I see results?",
    answer:
      "This varies by individual — many notice shifts in energy, digestion, bloating, and skin clarity within the first 2–3 weeks, while cycle regularity, ovulation, and body composition changes typically consolidate within 6 to 8 weeks. Consistency matters far more than speed.",
  },
  {
    id: 9,
    category: "program",
    categoryLabel: "Our Program",
    number: "09",
    question: "Do I need to take medicine or supplements?",
    answer:
      "No. Our approach is lifestyle-based, so you won’t rely on pills for weight management or hormonal balance. If supplements are recommended, we'll explain their specific function. We do not replace medications prescribed by your physician — please continue any prescribed medical treatments.",
  },
  {
    id: 10,
    category: "program",
    categoryLabel: "Our Program",
    number: "10",
    question: "Is this suitable if I'm already on medication (birth control, metformin, etc.)?",
    answer:
      "Yes, many members join us while on medication. We recommend informing your doctor about your lifestyle improvements, especially if you're managing PCOS alongside other conditions like thyroid or glucose regulation.",
  },
  {
    id: 11,
    category: "program",
    categoryLabel: "Our Program",
    number: "11",
    question: "Will this help with weight loss?",
    answer:
      "Yes, definitely. For many women, symptom improvement and healthy weight management go hand-in-hand because insulin resistance drives both. By balancing your blood sugar and cortisol, sustainable fat loss follows naturally without starvation.",
  },
  {
    id: 12,
    category: "program",
    categoryLabel: "Our Program",
    number: "12",
    question: "Can this help me get pregnant?",
    answer:
      "Regulating your cycle and improving ovulatory health strongly supports fertility. While we are a metabolic lifestyle program and not a fertility clinic, many of our clients successfully optimize their hormonal markers to prepare for natural conception.",
  },
  {
    id: 13,
    category: "program",
    categoryLabel: "Our Program",
    number: "13",
    question: "Who is on my Care Squad and managing my protocol?",
    answer:
      "Every woman is supported by a dedicated 4-person Care Squad: our Clinical/Medical team for oversight and lab reviews, a dedicated Nutritionist for whole-food cycle syncing, a Lifestyle Coach for movement and habit adherence, and a Psychologist for mental wellbeing and stress management.",
  },
  {
    id: 14,
    category: "program",
    categoryLabel: "Our Program",
    number: "14",
    question: "What if I’ve tried other programs and failed?",
    answer:
      "Most generic programs fail because they prescribe extreme restriction or intense HIIT workouts that spike cortisol. We focus on the root cause, not just symptoms. Our science-backed framework is clinically approved and ensures lasting, real-world results.",
  },

  // ── Category 3: Getting Started ──
  {
    id: 15,
    category: "getting-started",
    categoryLabel: "Getting Started",
    number: "15",
    question: "Who is this program for?",
    answer:
      "Women who have been diagnosed with PCOS/PCOD, or who suspect hormonal imbalance and want a structured, scientifically grounded, and sustainable way to manage their symptoms and regain vitality.",
  },
  {
    id: 16,
    category: "getting-started",
    categoryLabel: "Getting Started",
    number: "16",
    question: "Do I need a formal diagnosis to join?",
    answer:
      "No formal diagnosis is required to start. If you are experiencing irregular cycles, stubborn weight, acne, hair fall, or chronic fatigue, our 25+ point baseline health intake will help assess your baseline and tailor your protocol.",
  },
  {
    id: 17,
    category: "getting-started",
    categoryLabel: "Getting Started",
    number: "17",
    question: "What information do you need from me to get started?",
    answer:
      "Typically your medical history, current symptoms, lifestyle and sleep patterns, and any recent lab reports (if available), so our clinical team can build your personalized roadmap.",
  },
  {
    id: 18,
    category: "getting-started",
    categoryLabel: "Getting Started",
    number: "18",
    question: "Is my health information kept confidential?",
    answer:
      "Yes, 100%. All your health intakes, medical logs, and private discussions are strictly confidential and only accessible by your assigned Care Squad.",
  },
  {
    id: 19,
    category: "getting-started",
    categoryLabel: "Getting Started",
    number: "19",
    question: "What happens after the program ends?",
    answer:
      "In Month 4, you receive your personalized lifetime PCOS Maintenance Blueprint containing your Non-Negotiables, Early Warning Signs, and Travel/Stress Recovery Protocols so you thrive independently. Optional alumni care is also available.",
  },
];

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("all");
  const [openIds, setOpenIds] = useState<{ [key: number]: boolean }>({ 1: true });

  const toggleFAQ = (id: number) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFAQS =
    activeCategory === "all"
      ? FAQS
      : FAQS.filter((faq) => faq.category === activeCategory);

  // Distribute into 2 balanced columns for large screens
  const leftColFAQs = filteredFAQS.filter((_, idx) => idx % 2 === 0);
  const rightColFAQs = filteredFAQS.filter((_, idx) => idx % 2 === 1);

  return (
    <section
      id="faq"
      className="relative w-full bg-[#F4F7F4] text-[#022342] py-24 sm:py-32 px-6 sm:px-10 md:px-14 lg:px-20 border-t border-[#DCE7DF]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <ScrollReveal delay={100} duration={800} distance={20}>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E5EFE7] text-[#022342] text-[12px] font-sans font-medium tracking-wide mb-5">
              Frequently Asked Questions
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200} duration={900} distance={24}>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-tight text-[#022342]">
              Everything you need to know
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={300} duration={800} distance={18}>
            <p className="mt-4 text-[#475569] text-sm sm:text-base md:text-[1.05rem] font-light leading-relaxed">
              Clear, evidence-backed answers on PCOS/PCOD, our 4-month protocol, and how our Care Squad supports your health journey.
            </p>
          </ScrollReveal>

          {/* Category Filter Pills */}
          <ScrollReveal delay={400} duration={700} distance={16}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 sm:px-5 py-2 rounded-full font-sans text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#287417] text-white shadow-sm"
                        : "bg-white text-[#475569] hover:text-[#022342] hover:bg-[#EAF2EC] border border-[#DCE7DF]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* ── 2-Column Responsive Accordion Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 items-start">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {leftColFAQs.map((faq, index) => {
              const isOpen = !!openIds[faq.id];

              return (
                <ScrollReveal
                  key={faq.id}
                  delay={index * 50 + 100}
                  duration={600}
                  distance={16}
                >
                  <div
                    className={`rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "bg-white border-[#287417]/30 shadow-xs"
                        : "bg-white/80 hover:bg-white border-[#DCE7DF]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-5 sm:p-6 flex items-start justify-between gap-4 text-left cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-sans text-xs font-semibold text-[#287417] bg-[#EAF2EC] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                          {faq.number}
                        </span>
                        <span className="font-sans text-[15px] sm:text-[16.5px] font-semibold text-[#022342] tracking-tight group-hover:text-[#287417] transition-colors leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      <div
                        className={`shrink-0 w-7 h-7 rounded-full bg-[#F4F7F4] flex items-center justify-center text-[#64748B] transition-transform duration-300 mt-0.5 ${
                          isOpen ? "rotate-180 text-[#287417] bg-[#EAF2EC]" : "group-hover:text-[#022342]"
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#F0F4F1]">
                        <p className="font-sans text-[13.5px] sm:text-sm leading-relaxed text-[#475569] font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {rightColFAQs.map((faq, index) => {
              const isOpen = !!openIds[faq.id];

              return (
                <ScrollReveal
                  key={faq.id}
                  delay={index * 50 + 120}
                  duration={600}
                  distance={16}
                >
                  <div
                    className={`rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "bg-white border-[#287417]/30 shadow-xs"
                        : "bg-white/80 hover:bg-white border-[#DCE7DF]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-5 sm:p-6 flex items-start justify-between gap-4 text-left cursor-pointer group"
                    >
                      <div className="flex items-start gap-3">
                        <span className="font-sans text-xs font-semibold text-[#287417] bg-[#EAF2EC] px-2 py-0.5 rounded-md mt-0.5 shrink-0">
                          {faq.number}
                        </span>
                        <span className="font-sans text-[15px] sm:text-[16.5px] font-semibold text-[#022342] tracking-tight group-hover:text-[#287417] transition-colors leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      <div
                        className={`shrink-0 w-7 h-7 rounded-full bg-[#F4F7F4] flex items-center justify-center text-[#64748B] transition-transform duration-300 mt-0.5 ${
                          isOpen ? "rotate-180 text-[#287417] bg-[#EAF2EC]" : "group-hover:text-[#022342]"
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#F0F4F1]">
                        <p className="font-sans text-[13.5px] sm:text-sm leading-relaxed text-[#475569] font-normal">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Clinical Disclaimer Box */}
        <ScrollReveal delay={300} duration={800} distance={18}>
          <div className="mt-14 sm:mt-16 p-6 sm:p-7 rounded-2xl bg-[#EAF2EC] border border-[#DCE7DF] text-center max-w-4xl mx-auto">
            <p className="font-sans text-xs sm:text-[13px] text-[#334155] leading-relaxed">
              <strong className="text-[#022342]">Medical Disclaimer:</strong> This program is a lifestyle-based wellness and educational protocol designed to support hormonal and metabolic health. It does not replace professional medical diagnosis, prescription, or clinical treatment. Please consult your primary physician before starting any new diet or exercise regimen, especially if managing existing health conditions.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
