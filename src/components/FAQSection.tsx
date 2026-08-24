"use client";

import React, { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

interface FAQItem {
  id: number;
  number: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: 1,
    number: "1.",
    question: "Do you guarantee PCOS reversal?",
    answer:
      "Yes, 100% money back guarantee in case you follow the protocol diligently and still don’t see any results.",
  },
  {
    id: 2,
    number: "2.",
    question: "What is PCOS/PCOD and what causes it?",
    answer:
      "PCOS (Polycystic Ovary Syndrome) and PCOD are hormonal and metabolic conditions where the ovaries produce higher-than-normal levels of androgens. Driven by root factors like insulin resistance, chronic inflammation, genetics, and high cortisol, they can lead to irregular cycles, stubborn weight, acne, hair thinning, and fertility challenges.",
  },
  {
    id: 3,
    number: "3.",
    question: "Do I need to take medicine or supplements?",
    answer:
      "No. Our approach is lifestyle-based, so you won’t rely on pills for weight management or hormonal balance. If you are already taking medications prescribed by your doctor (such as Metformin, thyroid medication, or birth control), you can safely continue them alongside our lifestyle protocol.",
  },
  {
    id: 4,
    number: "4.",
    question: "How is this different from regular \"dieting\" or other programs?",
    answer:
      "We focus on the root cause, not just symptoms. We don't do restrictive or crash diets. The program is built around pocket-kitchen friendly, whole-food nutrition, cycle-syncing, sustainable movement, and addressing insulin resistance — creating clinically approved, lasting results.",
  },
  {
    id: 5,
    number: "5.",
    question: "Will this program help with weight loss?",
    answer:
      "Yes, absolutely. For many women with PCOS, stubborn weight gain and cravings are driven directly by insulin resistance and hormonal imbalance. By addressing these metabolic root causes rather than starving your body, sustainable weight loss follows naturally.",
  },
  {
    id: 6,
    number: "6.",
    question: "Why is the program structured across 4 full months (16 weeks)?",
    answer:
      "Hormone and metabolic pathways require consistent biological time to regulate. Month 1: Stabilize foundations, Month 2: Build metabolic resilience, Month 3: Optimize lingering bottlenecks, and Month 4: Consolidate habits with a personal maintenance plan so you build permanent self-reliance.",
  },
  {
    id: 7,
    number: "7.",
    question: "Who is on my Care Squad and managing my protocol?",
    answer:
      "Every woman is supported by our dedicated multi-disciplinary Care Squad: our Clinical/Medical team for oversight and lab reviews, a dedicated Nutritionist for whole-food cycle syncing, a Lifestyle Coach for movement and habit adherence, and a Psychologist for mental wellbeing and stress management.",
  },
  {
    id: 8,
    number: "8.",
    question: "Can this help me get pregnant and support fertility?",
    answer:
      "Regulating your ovulatory cycles, balancing insulin, and lowering chronic inflammation naturally builds a healthy foundation for fertility. While we are not a fertility clinic and work alongside your gynecologist, restoring natural hormonal balance significantly improves reproductive health.",
  },
  {
    id: 9,
    number: "9.",
    question: "Do I need a formal diagnosis or lab tests to join?",
    answer:
      "No formal prior diagnosis is required. If you are experiencing symptoms like irregular periods, stubborn weight, acne, hair fall, or chronic fatigue, our 25+ point baseline intake and clinical review will thoroughly evaluate your symptoms and establish your starting scorecard.",
  },
  {
    id: 10,
    number: "10.",
    question: "What happens after Month 4? Will I be dependent on a coach?",
    answer:
      "Our core mission in Month 4 is teaching you self-sufficiency. You receive a personalized lifetime PCOS Maintenance Blueprint containing your non-negotiables, early warning signs, and recovery protocols for stress or travel so you thrive independently for life.",
  },
  {
    id: 11,
    number: "11.",
    question: "Is my health information kept confidential?",
    answer:
      "Yes, 100%. All your health intakes, medical history, lab reports, coaching discussions, and personal logs are strictly confidential and accessible only by your dedicated clinical Care Squad.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#F4F7F4] text-[#022342] py-24 sm:py-32 px-6 sm:px-10 md:px-14 lg:px-20 border-t border-[#DCE7DF]"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Title & Intro */}
        <ScrollReveal delay={100} duration={800} distance={24} className="lg:col-span-5 flex flex-col items-start sticky top-28">
          {/* Pill Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E5EFE7] text-[#022342] text-[12px] font-sans font-medium tracking-wide mb-6">
            Common Questions
          </div>

          {/* Heading */}
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-normal leading-[1.08] tracking-tight text-[#022342]">
            Your Questions
            <br />
            Answered
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-[#475569] text-sm sm:text-base md:text-[1.05rem] font-light leading-relaxed max-w-sm">
            Everything you need to know about PCOS/PCOD, our 16-week clinical protocol, and your transformation journey.
          </p>
        </ScrollReveal>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <ScrollReveal
                key={faq.id}
                delay={Math.min(index * 60 + 80, 500)}
                duration={700}
                distance={18}
              >
                <div
                  className={`transition-all duration-300 ${
                    isOpen
                      ? "bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-[#DCE7DF]"
                      : "border-b border-[#DCE7DF] py-5 px-3 hover:bg-[#EAF2EC]/60 rounded-xl"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="font-sans text-base sm:text-lg md:text-[1.15rem] font-medium text-[#022342] tracking-tight group-hover:text-[#287417] transition-colors">
                      {faq.number} {faq.question}
                    </span>
                    <div
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[#64748B] transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#287417]" : "group-hover:text-[#022342]"
                      }`}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="mt-4 pt-2">
                      <p className="font-sans text-sm sm:text-[14.5px] leading-relaxed text-[#475569] font-normal">
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
    </section>
  );
}
