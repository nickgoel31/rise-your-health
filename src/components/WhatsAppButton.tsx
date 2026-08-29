"use client";

import React, { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "917091899035";
  const defaultMessage = encodeURIComponent(
    "Hi Rise Your Health, I would like to learn more about The PCOS Rebalance Protocol."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Hover Tooltip Bubble */}
      <div
        className={`hidden sm:flex items-center gap-2 bg-[#022342] text-white px-3.5 py-2 rounded-full text-xs font-medium shadow-xl border border-white/10 transition-all duration-300 pointer-events-none transform ${
          isHovered
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366] animate-ping inline-block" />
        <span>Chat with Care Squad</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat with Rise Your Health on WhatsApp"
        className="group relative w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg shadow-[#25D366]/35 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      >
        {/* Soft Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-pulse pointer-events-none" />

        {/* WhatsApp Vector Icon */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          <path d="M16 2C8.28 2 2 8.28 2 16C2 18.72 2.78 21.28 4.14 23.44L2 30L8.74 27.9C10.82 29.18 13.32 30 16 30C23.72 30 30 23.72 30 16C30 8.28 23.72 2 16 2ZM23.36 21.68C23.06 22.52 21.84 23.24 20.9 23.44C20.26 23.58 19.42 23.68 16.6 22.52C13 21.04 10.66 17.38 10.48 17.14C10.3 16.9 9.02 15.2 9.02 13.44C9.02 11.68 9.92 10.82 10.28 10.46C10.58 10.16 11.06 10.02 11.5 10.02C11.64 10.02 11.78 10.04 11.9 10.04C12.26 10.06 12.44 10.08 12.68 10.66C12.98 11.38 13.7 13.14 13.78 13.32C13.88 13.5 13.96 13.74 13.84 13.98C13.72 14.22 13.62 14.34 13.44 14.54C13.26 14.74 13.06 14.98 12.9 15.14C12.72 15.32 12.52 15.52 12.74 15.88C12.96 16.24 13.72 17.48 14.84 18.48C16.28 19.76 17.46 20.16 17.88 20.34C18.24 20.48 18.66 20.44 18.92 20.16C19.26 19.8 19.68 19.2 20.12 18.58C20.42 18.14 20.82 18.2 21.24 18.36C21.68 18.5 24.02 19.66 24.5 19.9C24.98 20.14 25.3 20.26 25.42 20.46C25.54 20.68 25.54 21.54 23.36 21.68Z" />
        </svg>
      </a>
    </div>
  );
}
