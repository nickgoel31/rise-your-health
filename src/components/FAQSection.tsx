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
    question: "Do you guarantee PCOS reversal or quick weight loss?",
    answer:
      "No. PCOS is a chronic endocrine and metabolic condition, and outcomes vary for every woman. Our defensible, evidence-based promise is measurable symptom and metabolic health improvement through personalized lifestyle, non-restrictive nutrition, clinical assessment, and continuous coaching — never false promises.",
  },
  {
    id: 2,
    number: "2.",
    question: "Why is the program structured across 4 full months (16 weeks)?",
    answer:
      "Hormone and metabolic pathways require consistent biological time to regulate. Month 1 stabilizes foundations, Month 2 corrects individual drivers, Month 3 optimizes lingering bottlenecks, and Month 4 consolidates habits so you build permanent self-reliance.",
  },
  {
    id: 3,
    number: "3.",
    question: "Who is on my Care Squad and managing my protocol?",
    answer:
      "Every woman is supported by four specialized roles: our Clinical/Medical team for medical oversight and lab reviews, a dedicated Nutritionist for whole-food cycle syncing, a Lifestyle Coach for movement and cortisol management, and a Client Coordinator for swift support.",
  },
  {
    id: 4,
    number: "4.",
    question: "What happens after Month 4? Will I be dependent on a coach?",
    answer:
      "Our core mission in Month 4 is teaching you self-sufficiency. You receive a personalized lifetime PCOS Maintenance Blueprint containing your non-negotiables, early warning signs, and recovery protocols for stress or travel so you thrive independently.",
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
        <ScrollReveal delay={100} duration={800} distance={24} className="lg:col-span-5 flex flex-col items-start">
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
            Everything you need to know before starting your wellness journey with us.
          </p>
        </ScrollReveal>

        {/* Right Column: Accordion List */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <ScrollReveal
                key={faq.id}
                delay={index * 100 + 150}
                duration={700}
                distance={18}
              >
                <div
                  className={`transition-all duration-300 ${
                    isOpen
                      ? "bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-[#DCE7DF]"
                      : "border-b border-[#DCE7DF] py-6 px-3 hover:bg-[#EAF2EC]/60 rounded-xl"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <span className="font-sans text-lg sm:text-[1.25rem] font-medium text-[#022342] tracking-tight group-hover:text-[#287417] transition-colors">
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
