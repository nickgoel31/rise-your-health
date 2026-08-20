"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

interface SignCard {
  id: number;
  text: string;
  image: string;
  alt: string;
}

const CARDS: SignCard[] = [
  {
    id: 1,
    text: "Irregular or missed cycles, painful cramps, and unpredictable PMS",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=320&q=80",
    alt: "Woman resting peacefully dealing with cycle discomfort",
  },
  {
    id: 2,
    text: "Stubborn weight gain & belly fat despite clean eating and workouts",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=320&q=80",
    alt: "Woman in workout wear reflecting on her wellness journey",
  },
  {
    id: 3,
    text: "Waking up exhausted with brain fog & chronic afternoon fatigue",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=320&q=80",
    alt: "Woman experiencing fatigue and brain fog",
  },
  {
    id: 4,
    text: "Persistent hormonal acne along the jawline & sudden cystic breakouts",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=320&q=80",
    alt: "Woman gently touching her facial skin",
  },
  {
    id: 5,
    text: "Hair thinning on your scalp or unwanted facial and body hair",
    image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=320&q=80",
    alt: "Woman touching and caring for her hair",
  },
  {
    id: 6,
    text: "Intense sugar cravings, mood swings, and feeling chronically inflamed",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=320&q=80",
    alt: "Woman sitting thoughtfully with tea by window",
  },
];

export default function SignsSection() {
  const [angle, setAngle] = useState(-Math.PI / 2); // Start with Card 1 at top center
  const [isPaused, setIsPaused] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [orbitRadii, setOrbitRadii] = useState({ rx: 480, ry: 180 });
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Responsive orbit dimension calculation (Tablet / Desktop)
  const updateDimensions = useCallback(() => {
    if (typeof window === "undefined") return;
    const width = window.innerWidth;
    if (width >= 1280) {
      setOrbitRadii({ rx: 480, ry: 180 });
    } else if (width >= 1024) {
      setOrbitRadii({ rx: 420, ry: 160 });
    } else if (width >= 768) {
      setOrbitRadii({ rx: 330, ry: 140 });
    } else {
      setOrbitRadii({ rx: 240, ry: 120 });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  // Smooth continuous rotation loop for desktop orbit
  useEffect(() => {
    // 45 seconds per full revolution (clockwise)
    const speed = (2 * Math.PI) / 45000;

    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = time - lastTimeRef.current;
        if (!isPaused) {
          setAngle((prev) => (prev + speed * delta) % (2 * Math.PI));
        }
      }
      lastTimeRef.current = time;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused]);

  // Interactive mouse drag / rotate support on desktop
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (window.innerWidth < 640) return;
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startAngleRef.current = angle;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientX - startXRef.current;
    setAngle(startAngleRef.current + diff * 0.005);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Track mobile scroll index
  const handleMobileScroll = () => {
    if (!mobileCarouselRef.current) return;
    const scrollLeft = mobileCarouselRef.current.scrollLeft;
    const width = mobileCarouselRef.current.offsetWidth * 0.8;
    const index = Math.round(scrollLeft / width);
    setMobileActiveIndex(Math.min(Math.max(0, index), CARDS.length - 1));
  };

  return (
    <section
      id="signs"
      className="relative w-full bg-[#F4F7F4] text-[#022342] overflow-hidden py-14 sm:py-16 md:py-20 px-4 sm:px-6 select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Subtle organic background aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[750px] h-[400px] sm:h-[750px] rounded-full bg-gradient-to-tr from-[#287417]/8 via-[#E2EBE4]/50 to-transparent blur-3xl" />
      </div>

      {/* ── MOBILE VIEW (< sm) ── */}
      <div className="sm:hidden w-full flex flex-col items-center">
        {/* Decorative top icon */}
        <ScrollReveal delay={100} duration={700} distance={14}>
          <div className="mb-3 flex items-center justify-center opacity-80">
            <svg
              width="26"
              height="26"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#287417]"
            >
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <path
                d="M16 8V24M8 16H24M10.343 10.343L21.657 21.657M10.343 21.657L21.657 10.343"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <circle cx="16" cy="16" r="3.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.8" />
            </svg>
          </div>
        </ScrollReveal>

        {/* Central Headline */}
        <ScrollReveal delay={200} duration={800} distance={18} className="text-center px-2 mb-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-[1.12] tracking-tight text-[#022342]">
            The signs that something
            <br />
            <span className="font-serif italic text-[#287417]">needs</span> to change.
          </h2>
          <p className="mt-2.5 font-sans text-xs text-[#55695A] font-light">
            Swipe through common hormonal & metabolic patterns
          </p>
        </ScrollReveal>

        {/* Swipeable Snap Carousel */}
        <div
          ref={mobileCarouselRef}
          onScroll={handleMobileScroll}
          data-lenis-prevent="true"
          className="w-full flex gap-3 overflow-x-auto snap-x snap-mandatory px-4 pb-4 pt-1 no-scrollbar overscroll-contain"
          style={{ scrollbarWidth: "none" }}
        >
          {CARDS.map((card, idx) => (
            <div
              key={card.id}
              className="snap-center shrink-0 w-[84vw] max-w-[310px] p-4 rounded-2xl bg-white border border-[#DCE7DF] shadow-sm flex items-center gap-3.5 transition-transform duration-200"
            >
              {/* Thumbnail */}
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-[#E2EBE4]">
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  sizes="70px"
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#287417] block mb-1">
                  Pattern 0{idx + 1}
                </span>
                <p className="font-sans text-[13px] leading-snug font-medium text-[#022342]">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5 mt-3">
          {CARDS.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                mobileActiveIndex === i
                  ? "w-5 bg-[#287417]"
                  : "w-1.5 bg-[#DCE7DF]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP & TABLET VIEW (sm+) ── */}
      <div className="hidden sm:flex flex-col items-center justify-center min-h-[500px] md:min-h-[560px] lg:min-h-[620px] w-full">
        {/* Decorative top icon */}
        <ScrollReveal delay={100} duration={800} distance={16}>
          <div className="relative z-10 mb-3 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#287417]"
            >
              <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
              <path
                d="M16 8V24M8 16H24M10.343 10.343L21.657 21.657M10.343 21.657L21.657 10.343"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <circle cx="16" cy="16" r="3.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.8" />
            </svg>
          </div>
        </ScrollReveal>

        {/* Orbit Arena Container */}
        <div
          ref={containerRef}
          className="relative w-full max-w-6xl h-[460px] md:h-[520px] lg:h-[560px] flex items-center justify-center"
        >
          {/* Central Headline */}
          <ScrollReveal delay={250} duration={800} distance={20} className="relative z-10 text-center max-w-3xl lg:max-w-4xl px-4 pointer-events-auto">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-normal leading-[1.08] tracking-tight text-[#022342]">
              <span className="sm:whitespace-nowrap">The signs that something</span>
              <br />
              <span className="sm:whitespace-nowrap">
                <span className="font-serif italic text-[#287417]">needs</span>{" "}
                to change.
              </span>
            </h2>
          </ScrollReveal>

          {/* Orbiting Cards Layer */}
          <div className="absolute inset-0 pointer-events-none z-30">
            {CARDS.map((card, index) => {
              const cardAngle = angle + (index * 2 * Math.PI) / CARDS.length;

              const x = Math.cos(cardAngle) * orbitRadii.rx;
              const y = Math.sin(cardAngle) * orbitRadii.ry;

              const normalizedY = (y + orbitRadii.ry) / (2 * orbitRadii.ry);
              const scale = 0.94 + normalizedY * 0.12;
              const opacity = 0.90 + normalizedY * 0.10;

              const isHovered = activeCardIndex === index;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => {
                    setIsPaused(true);
                    setActiveCardIndex(index);
                  }}
                  onMouseLeave={() => {
                    setIsPaused(false);
                    setActiveCardIndex(null);
                  }}
                  style={{
                    transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${isHovered ? scale * 1.05 : scale})`,
                    zIndex: isHovered ? 50 : 30,
                    opacity: isHovered ? 1 : opacity,
                  }}
                  className="absolute top-1/2 left-1/2 pointer-events-auto transition-transform duration-200 ease-out will-change-transform cursor-pointer"
                >
                  <div
                    className={`flex items-center gap-3.5 p-2.5 sm:p-3 pr-4 rounded-2xl sm:rounded-[20px] bg-white hover:bg-[#F8FAF8] backdrop-blur-md border border-[#DCE7DF] shadow-[0_8px_24px_rgba(2,35,66,0.06)] hover:shadow-[0_14px_34px_rgba(40,116,23,0.18)] transition-all duration-300 w-[270px] md:w-[310px] lg:w-[330px] ${
                      isHovered ? "ring-2 ring-[#287417]/35 border-[#287417]/50" : ""
                    }`}
                  >
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 bg-[#E2EBE4]">
                      <Image
                        src={card.image}
                        alt={card.alt}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>

                    <p className="font-sans text-[13px] sm:text-[13.5px] md:text-[14px] leading-snug font-medium text-[#022342] text-left">
                      {card.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Orbit Pause / Drag Indicator */}
        <div className="relative z-20 mt-4 text-[11px] font-sans tracking-wider uppercase text-[#55695A] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#287417] animate-pulse" />
          <span>Hover or drag cards to pause & explore</span>
        </div>
      </div>
    </section>
  );
}
