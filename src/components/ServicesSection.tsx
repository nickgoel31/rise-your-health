"use client";

import React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
}

// Custom decorative botanical / organic SVG icons with logo Emerald color
function CloverIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#287417]">
      <path
        d="M12 7.5C12 5.5 10.5 4 8.5 4C6.5 4 5 5.5 5 7.5C5 9.5 6.5 11 8.5 11C9.8 11 11 10.2 11.6 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="8" cy="15" r="3.5" fill="currentColor" opacity="0.9" />
      <circle cx="15.5" cy="15" r="3.5" fill="currentColor" opacity="0.9" />
      <circle cx="11.75" cy="8.5" r="3.5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function StarBlossomIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#287417]">
      <path
        d="M12 3V21M3 12H21M5.636 5.636L18.364 18.364M5.636 18.364L18.364 5.636"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TulipPetalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#287417]">
      <path
        d="M7 6C7 10 9 14 12 17C15 14 17 10 17 6C15 7.5 13 8 12 8C11 8 9 7.5 7 6Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M12 17V20M8 7C6 11 8 16 12 17M16 7C18 11 16 16 12 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FourPetalIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-[#287417]">
      <rect x="5" y="5" width="5.5" height="5.5" rx="2.5" fill="currentColor" />
      <rect x="13.5" y="5" width="5.5" height="5.5" rx="2.5" fill="currentColor" />
      <rect x="5" y="13.5" width="5.5" height="5.5" rx="2.5" fill="currentColor" />
      <rect x="13.5" y="13.5" width="5.5" height="5.5" rx="2.5" fill="currentColor" />
    </svg>
  );
}

// The 4 Continuous Foundations of the 4-Month Transformation Program
const SERVICES: ServiceItem[] = [
  {
    id: "clinical-assessment",
    title: "1. Clinical Assessment & Health Baseline",
    description:
      "Comprehensive 25+ marker intake, medical history, baseline health scorecard, lab reviews, and clinical escalation safeguards to understand your unique physiology.",
    href: "/#roadmap",
    icon: <CloverIcon />,
  },
  {
    id: "nutrition-protocol",
    title: "2. Integrative Metabolic Nutrition",
    description:
      "Personalized food frameworks focused on blood sugar balance, adequate protein, fibre, and cycle syncing — strictly avoiding restrictive or unsustainable diets.",
    href: "/#roadmap",
    icon: <StarBlossomIcon />,
  },
  {
    id: "movement-exercise",
    title: "3. Progressive Movement & Exercise",
    description:
      "Sustainable walking targets, resistance training, and progressive cardiovascular routines designed for hormonal health, strength, and insulin sensitivity.",
    href: "/#roadmap",
    icon: <TulipPetalIcon />,
  },
  {
    id: "sleep-stress",
    title: "4. Sleep, Stress & Mental Wellbeing",
    description:
      "Circadian rhythm alignment, psychologist-led nervous system soothing, and recovery tools to calm chronic adrenal stress and support emotional wellbeing.",
    href: "/#roadmap",
    icon: <FourPetalIcon />,
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full bg-[#F4F7F4] text-[#022342] py-20 sm:py-28 px-6 sm:px-10 md:px-14 lg:px-20 border-t border-[#DCE7DF]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollReveal delay={100} duration={800} distance={24} className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 sm:pb-16">
          <div className="max-w-2xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#E5EFE7] text-[#022342] text-[12px] font-sans font-medium tracking-wide mb-5">
              The 4 Care Foundations
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-normal leading-[1.08] tracking-tight text-[#022342]">
              How we help you heal
            </h2>
            <p className="mt-4 text-[#475569] text-sm sm:text-base md:text-[1.05rem] font-light leading-relaxed">
              Four clinical and lifestyle dimensions running continuously throughout your 4-month transformation to address underlying hormonal drivers, not just symptoms.
            </p>
          </div>

          <div>
            <Link
              href="/#roadmap"
              className="inline-flex items-center justify-center px-6 py-2.5 sm:py-3 rounded-full bg-[#287417] hover:bg-[#216113] text-white text-xs sm:text-sm font-medium tracking-wide shadow-sm transition-all duration-200 hover:shadow-md active:scale-95"
            >
              View 16-Week Roadmap
            </Link>
          </div>
        </ScrollReveal>

        {/* Services List Table / Rows */}
        <div className="flex flex-col">
          {SERVICES.map((service, index) => (
            <ScrollReveal
              key={service.id}
              delay={index * 120}
              duration={700}
              distance={20}
            >
              <Link
                href={service.href}
                className="group relative border-t border-[#DCE7DF] py-10 sm:py-12 md:py-14 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-12 transition-all duration-300 hover:bg-[#EAF2EC]/80 -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-2xl"
              >
                {/* Left Column: Icon + Title */}
                <div className="flex items-center gap-4 sm:gap-6 min-w-[280px] lg:w-[42%]">
                  <div className="shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    {service.icon}
                  </div>
                  <h3 className="font-sans text-2xl sm:text-3xl md:text-[2rem] font-medium text-[#022342] tracking-tight group-hover:text-[#287417] transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>

                {/* Middle Column: Description */}
                <div className="lg:flex-1 lg:max-w-xl">
                  <p className="text-[#475569] text-sm sm:text-[15px] md:text-[15.5px] leading-relaxed font-light">
                    {service.description}
                  </p>
                </div>

                {/* Right Column: Circular Arrow Button */}
                <div className="flex items-center self-end lg:self-center">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white group-hover:bg-[#287417] text-[#022342] group-hover:text-white border border-[#DCE7DF] group-hover:border-[#287417] flex items-center justify-center shadow-xs transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
