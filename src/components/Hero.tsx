"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useBookingModal } from "@/context/BookingModalContext";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted by browser until interaction
      });
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#022342] text-white">
      {/* Background Video with Poster Fallback */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center"
        >
          <source src="/hero-bg-new.mp4" type="video/mp4" />
        </video>

        {/* Lighter Gradient Overlays so the video is clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 pt-32 pb-16 sm:pt-36 md:pt-40 max-w-5xl">
        <ScrollReveal delay={100} duration={800} distance={20}>
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 w-fit px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/95 text-xs sm:text-[13px] font-sans font-medium tracking-wide shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FE8600] inline-block animate-pulse" />
            The PCOS Reset Method
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} duration={900} distance={28}>
          {/* Large Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[4.85rem] font-normal leading-[1.08] tracking-tight text-white drop-shadow-sm max-w-5xl">
            16 Weeks to Better
            <br />
            <span className="font-serif italic text-white/95">Hormonal & Metabolic</span> Health
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={350} duration={800} distance={24}>
          {/* Subtitle */}
          <p className="mt-6 text-white/90 text-base sm:text-lg md:text-[1.125rem] font-light leading-relaxed max-w-xl">
            PCOS symptom and metabolic health improvement through personalized lifestyle, non-restrictive nutrition, clinical assessment, and dedicated ongoing coaching.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={450} duration={800} distance={20}>
          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={openBookingModal}
              className="px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-white text-[#022342] hover:bg-[#F4F7F4] text-xs sm:text-sm font-semibold tracking-wide shadow-lg transition-all duration-200 hover:shadow-xl active:scale-95 cursor-pointer"
            >
              Begin Your Journey
            </button>

            <Link
              href="/#roadmap"
              className="px-7 py-3 sm:px-8 sm:py-3.5 rounded-full bg-[#287417]/90 hover:bg-[#287417] text-white text-xs sm:text-sm font-medium tracking-wide backdrop-blur-md border border-white/20 shadow-lg transition-all duration-200 active:scale-95"
            >
              Explore 4-Month Roadmap
            </Link>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom Stats Bar */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-16 pb-8 sm:pb-12 pt-6 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <ScrollReveal delay={550} duration={800} distance={20} className="w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          {/* Statistics Columns */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 md:gap-10">
            {/* Stat 1 */}
            <div>
              <div className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                4 Months
              </div>
              <div className="text-xs sm:text-sm text-white/75 font-light leading-tight mt-1">
                Structured 16-Week Protocol
              </div>
            </div>

            {/* Divider */}
            <div className="h-10 w-[1px] bg-white/20 hidden sm:block" />

            {/* Stat 2 */}
            <div>
              <div className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                4 Transformation Phases
              </div>
              <div className="text-xs sm:text-sm text-white/75 font-light leading-tight mt-1">
                Stabilize, Build, Optimize & Consolidate
              </div>
            </div>

            {/* Divider */}
            <div className="h-10 w-[1px] bg-white/20 hidden sm:block" />

            {/* Stat 3 */}
            <div>
              <div className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                100%
              </div>
              <div className="text-xs sm:text-sm text-white/75 font-light leading-tight mt-1">
                Personalized Scorecard & Care
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
