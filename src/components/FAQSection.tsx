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
    question: "Do I need to take medicine or artificial pills?",
    answer:
      "No. Our approach is lifestyle-based, so you won’t rely on pills for weight management or hormonal balance. If you are already prescribed medication by your doctor, our protocol works safely alongside your medical care.",
  },
  {
    id: 3,
    number: "3.",
    question: "What is PCOS/PCOD and how are they different?",
    answer:
      "PCOD is generally a milder condition where the ovaries release immature eggs, often closely linked to lifestyle and diet. PCOS is a more complex endocrine and metabolic disorder involving elevated androgens, insulin resistance, and cycle irregularities. Both respond exceptionally well to our structured clinical lifestyle interventions.",
  },
  {
    id: 4,
    number: "4.",
    question: "How is this different from just \"dieting\" or restrictive plans?",
    answer:
      "We don't focus on restriction, calorie counting, or crash diets. The PCOS Rebalance Protocol is built around pocket-kitchen-friendly, cycle-synced nutrition and sustainable habit shifts that address underlying metabolic drivers like insulin resistance, chronic inflammation, and elevated cortisol.",
  },
  {
    id: 5,
    number: "5.",
    question: "What if I’ve tried other programs and failed?",
    answer:
      "We focus on underlying metabolic mechanisms, not just surface symptoms. Our science-backed framework which is clinically approved, ensures lasting, real-world results tailored specifically to your unique metabolic profile.",
  },
  {
    id: 6,
    number: "6.",
    question: "How soon can I expect to see tangible results?",
    answer:
      "Many women notice improvements in daily energy, digestion, and skin within 2 to 4 weeks. Menstrual cycle regularity, waist reduction, and metabolic shifts typically show significant measurable progress by months 2 and 3. Consistency matters most.",
  },
  {
    id: 7,
    number: "7.",
    question: "Is this suitable if I'm already on medication (birth control, metformin, thyroid)?",
    answer:
      "Yes, many of our members join while taking prescribed medications. Our lifestyle changes support your body's natural insulin sensitivity and metabolic health harmoniously alongside your physician's guidance.",
  },
  {
    id: 8,
    number: "8.",
    question: "Will this program help with sustainable weight loss?",
    answer:
      "Definitely. For many women with PCOS/PCOD, stubborn weight and cravings are directly driven by underlying insulin resistance. By stabilizing blood sugar and cortisol levels naturally, healthy weight loss occurs without starvation or exhausting cardio.",
  },
  {
    id: 9,
    number: "9.",
    question: "Can this program help me get pregnant / support fertility?",
    answer:
      "Yes. Restoring ovulatory cycle regularity and reducing chronic inflammation creates an optimal environment for reproductive health. While we are a lifestyle program and not a fertility clinic, balanced hormonal health significantly enhances conception readiness.",
  },
  {
    id: 10,
    number: "10.",
    question: "Do I need a formal diagnosis to join?",
    answer:
      "No formal diagnosis is required. Whether you have an existing diagnosis or are experiencing common symptoms like irregular periods, stubborn belly fat, acne, hair thinning, or chronic fatigue, you can start your reset right away.",
  },
  {
    id: 11,
    number: "11.",
    question: "Who is on my Care Squad and managing my protocol?",
    answer:
      "Every woman is supported by our dedicated Care Squad: our Clinical/Medical team for oversight and lab reviews, a dedicated Nutritionist for whole-food cycle syncing, a Lifestyle Coach for movement and habits, and a Psychologist for mental wellbeing and stress management.",
  },
  {
    id: 12,
    number: "12.",
    question: "Why is the program structured across 4 full months (16 weeks)?",
    answer:
      "Hormone and metabolic pathways require consistent biological time to regulate. Month 1: Stabilize foundations, Month 2: Build metabolic resilience, Month 3: Optimize lingering bottlenecks, and Month 4: Consolidate habits with a personal maintenance plan so you build permanent self-reliance.",
  },
  {
    id: 13,
    number: "13.",
    question: "What happens after Month 4? Will I be dependent on a coach?",
    answer:
      "Our core mission in Month 4 is teaching you self-sufficiency. You receive a personalized lifetime Hormonal Maintenance Framework containing your non-negotiables, early warning signs, and recovery protocols for stress or travel so you thrive independently for life.",
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
        <ScrollReveal delay={100} duration={800} distance={24} className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
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
            Everything you need to know about PCOS/PCOD, our 4-month clinical rebalance protocol, and what to expect.
          </p>
        </ScrollReveal>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 flex flex-col gap-2.5">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <ScrollReveal
                key={faq.id}
                delay={index * 40 + 60}
                duration={600}
                distance={14}
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
                    <span className="font-sans text-base sm:text-[1.15rem] font-medium text-[#022342] tracking-tight group-hover:text-[#287417] transition-colors leading-snug">
                      <span className="text-[#287417] font-semibold mr-1.5">{faq.number}</span>
                      {faq.question}
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
                    <div className="mt-4 pt-2 border-t border-[#EEF4EF]">
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
