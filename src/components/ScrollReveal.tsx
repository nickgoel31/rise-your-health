"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in milliseconds
  duration?: number; // in milliseconds
  direction?: "up" | "down" | "left" | "right" | "scale" | "fade";
  distance?: number; // in pixels
  blur?: boolean;
  threshold?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 850,
  direction = "up",
  distance = 56,
  blur = true,
  threshold = 0.1,
  once = true,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = domRef.current;
    if (!currentRef) return;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, once]);

  // Compute transform with distinct motion depth and subtle scale transition
  const getTransform = () => {
    if (isVisible) return "translate3d(0, 0, 0) scale(1)";

    const effectiveDistance = Math.max(distance, 48);

    switch (direction) {
      case "up":
        return `translate3d(0, ${effectiveDistance}px, 0) scale(0.95)`;
      case "down":
        return `translate3d(0, -${effectiveDistance}px, 0) scale(0.95)`;
      case "left":
        return `translate3d(${effectiveDistance}px, 0, 0) scale(0.95)`;
      case "right":
        return `translate3d(-${effectiveDistance}px, 0, 0) scale(0.95)`;
      case "scale":
        return "scale(0.88) translate3d(0, 36px, 0)";
      case "fade":
      default:
        return "translate3d(0, 32px, 0) scale(0.96)";
    }
  };

  return (
    <div
      ref={domRef}
      suppressHydrationWarning
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        filter: blur ? (isVisible ? "blur(0px)" : "blur(10px)") : "none",
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform, filter",
      }}
      className={className}
    >
      {children}
    </div>
  );
}
