"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis with smooth lerp inertia
    const lenis = new Lenis({
      lerp: 0.08, // Linear interpolation factor for buttery smooth momentum
      duration: 1.3,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Make lenis globally accessible
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Global smooth scroll interceptor for hash links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("#") ||
        (href.startsWith("/#") && (window.location.pathname === "/" || window.location.pathname === ""))
      ) {
        const id = href.replace("/#", "").replace("#", "");
        if (!id) {
          e.preventDefault();
          lenis.scrollTo(0, { duration: 1.4 });
          return;
        }

        const elem = document.getElementById(id);
        if (elem) {
          e.preventDefault();
          lenis.scrollTo(elem, {
            offset: -70,
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
          window.history.pushState(null, "", `#${id}`);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // If loaded with a hash in URL
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) {
          lenis.scrollTo(elem, { offset: -70, duration: 1.2 });
        }
      }, 300);
    }

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
