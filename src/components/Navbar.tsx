"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import { useBookingModal } from "@/context/BookingModalContext";

const NAV_LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#signs", label: "Signs" },
  { href: "/#services", label: "4 Pillars" },
  { href: "/#roadmap", label: "16-Week Roadmap" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openBookingModal } = useBookingModal();

  useEffect(() => {
    const handleScroll = () => {
      // Triggers once user has scrolled past ~75% of viewport height (past the hero)
      const threshold = window.innerHeight * 0.75;
      setIsPastHero(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Handle smooth scroll on in-page navigation clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") || href.startsWith("#")) {
      const id = href.replace("/#", "").replace("#", "");
      setMobileMenuOpen(false);

      if (!id) {
        e.preventDefault();
        const lenis = (window as unknown as { lenis?: Lenis }).lenis;
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.4 });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const elem = document.getElementById(id);
      if (elem) {
        e.preventDefault();
        const lenis = (window as unknown as { lenis?: Lenis }).lenis;
        if (lenis) {
          lenis.scrollTo(elem, {
            offset: -70,
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          const top = elem.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top, behavior: "smooth" });
        }
        window.history.pushState(null, "", `#${id}`);
      }
    }
  };

  return (
    <>
      {/* ── 1. Hero Natural Top Navbar (scrolls naturally with page) ── */}
      <header className="absolute top-0 left-0 right-0 z-30 bg-transparent py-4 sm:py-6">
        <div className="w-full px-5 sm:px-10 md:px-14 lg:px-16 flex items-center justify-between">
          {/* Left Logo (White on Dark Hero) */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/#home")}
            aria-label="Rise Your Health"
            className="group flex items-center shrink-0 cursor-pointer"
          >
            <Image
              src="/logo-full.png"
              alt="Rise Your Health"
              width={260}
              height={98}
              className="h-8 sm:h-10 md:h-12 lg:h-[3.35rem] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Right Navigation Links & CTA */}
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <nav className="hidden md:flex items-center gap-6 sm:gap-8 text-[13px] sm:text-sm font-medium tracking-wide text-white/90">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-[#FE8600] transition-colors cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={openBookingModal}
              className="hidden sm:inline-flex px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide shadow-sm bg-[#287417] hover:bg-[#216113] text-white backdrop-blur-md border border-white/20 transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
            >
              Begin Your Journey
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-transform active:scale-90"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── 2. Floating Sticky Navbar (When scrolled past hero) ── */}
      <header
        className={`fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[85%] md:w-[75%] lg:w-[60%] max-w-5xl bg-white/95 backdrop-blur-md shadow-lg shadow-[#022342]/5 border border-[#DCE7DF] rounded-full px-4 sm:px-7 py-2 sm:py-2.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
          isPastHero
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-12 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full flex items-center justify-between">
          {/* Left Logo (Full-Color on White Background) */}
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, "/#home")}
            aria-label="Rise Your Health"
            className="group flex items-center shrink-0 cursor-pointer"
          >
            <Image
              src="/logo-color.png"
              alt="Rise Your Health"
              width={220}
              height={82}
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Right Navigation Links & CTA */}
          <div className="flex items-center gap-3 sm:gap-6 md:gap-7">
            <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-[13px] sm:text-sm font-medium tracking-wide text-[#022342]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-[#287417] transition-colors cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={openBookingModal}
              className="hidden sm:inline-flex px-4 sm:px-5 py-2 rounded-full text-xs sm:text-[13px] font-medium tracking-wide shadow-sm bg-[#287417] hover:bg-[#216113] text-white transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
            >
              Begin Your Journey
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-full bg-[#EEF4EF] text-[#022342] hover:bg-[#E0EBE2] flex items-center justify-center transition-transform active:scale-90"
              aria-label="Open Navigation Menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ── 3. Dedicated Mobile Menu Overlay ── */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[90] flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-[#022342]/70 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          />

          {/* Drawer Card */}
          <div
            className="relative w-full max-w-md bg-[#F8FAF8] border border-[#DCE7DF] rounded-[28px] p-6 shadow-2xl z-10 mt-2 flex flex-col gap-6 animate-modalScale"
            style={{
              animation: "modalSpring 340ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
            }}
          >
            {/* Header with Logo + Close Button */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E2EBE4]">
              <Link
                href="/"
                onClick={(e) => handleNavClick(e, "/#home")}
                aria-label="Rise Your Health"
                className="flex items-center cursor-pointer"
              >
                <Image
                  src="/logo-color.png"
                  alt="Rise Your Health"
                  width={180}
                  height={67}
                  className="h-7 w-auto object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 rounded-full bg-[#EEF4EF] hover:bg-[#E0EBE2] text-[#022342] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                aria-label="Close menu"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between px-4 py-3 rounded-2xl font-sans text-[15px] font-medium text-[#022342] hover:bg-[#EEF4EF] hover:text-[#287417] transition-colors cursor-pointer"
                >
                  {link.label}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#889B8D]"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              ))}
            </nav>

            {/* Bottom CTA Button */}
            <div className="pt-2 border-t border-[#E2EBE4] flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openBookingModal();
                }}
                className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#287417] hover:bg-[#216113] text-white font-sans text-sm font-medium tracking-wide shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Begin Your Journey
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <div className="text-center font-sans text-[11px] text-[#55695A] tracking-wider uppercase">
                The PCOS Reset Method · 16 Weeks
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
