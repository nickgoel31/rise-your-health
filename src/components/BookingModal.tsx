"use client";

import React, { useState, useEffect } from "react";
import { useBookingModal } from "@/context/BookingModalContext";

/* ─── Step Options & Metadata ─────────────────────────────────────────── */

const PRIMARY_GOALS = [
  {
    id: "cycles",
    title: "Irregular or Missing Cycles",
    desc: "Long cycles, missed periods, unpredictable bleeding or ovulation challenges.",
  },
  {
    id: "weight",
    title: "Stubborn Weight & Cravings",
    desc: "Belly fat, insulin resistance, slow metabolism, and severe sugar/carb crashes.",
  },
  {
    id: "androgens",
    title: "Hormonal Acne & Hair Fall",
    desc: "Cystic facial breakouts, excess facial/body hair, or noticeable scalp thinning.",
  },
  {
    id: "energy",
    title: "Chronic Fatigue & Brain Fog",
    desc: "Waking up exhausted, afternoon crashes, anxiety, and high cortisol levels.",
  },
  {
    id: "fertility",
    title: "Fertility & Conception Prep",
    desc: "Preparing your body for natural conception with regulated ovulatory cycles.",
  },
];

const TIMELINE_OPTIONS = [
  { id: "under-1", label: "Less than 1 year", detail: "Recently diagnosed or noticing new symptoms" },
  { id: "1-3-yrs", label: "1 to 3 years", detail: "Managing symptoms with inconsistent results" },
  { id: "3-5-yrs", label: "3 to 5+ years", detail: "Long-term journey seeking sustainable resolution" },
  { id: "unsure", label: "Not officially diagnosed", detail: "Suspecting PCOS and seeking clarity" },
];

const PREVIOUS_METHODS = [
  "Birth Control / OCPs",
  "Metformin or Rx Meds",
  "Crash / Restrictive Diets",
  "Random Supplements",
  "Excessive Cardio / HIIT",
  "Ayurvedic / Herbal Herbs",
  "None yet / Just starting",
];

const TIME_SLOTS = [
  "10:30 AM – 11:45 AM",
  "11:45 AM – 1:00 PM",
  "1:00 PM – 2:15 PM",
  "3:00 PM – 4:15 PM",
  "4:15 PM – 5:30 PM",
  "5:30 PM – 6:45 PM",
  "Flexible / Any of these slots",
];

// Indian Phone Number Validator
function validateIndianPhone(phone: string): { isValid: boolean; formatted: string; error?: string } {
  const cleaned = phone.trim().replace(/[\s\-()]/g, "");
  const indianMobileRegex = /^(?:\+91|91|0)?[6-9]\d{9}$/;

  if (!cleaned) {
    return { isValid: false, formatted: phone, error: "Please enter your WhatsApp / phone number" };
  }

  if (!indianMobileRegex.test(cleaned)) {
    return {
      isValid: false,
      formatted: phone,
      error: "Please enter a valid 10-digit Indian mobile number (e.g. 98765 43210 or +91 98765 43210)",
    };
  }

  const match = cleaned.match(/([6-9]\d{9})$/);
  const core10 = match ? match[1] : cleaned;
  const formatted = `+91 ${core10.slice(0, 5)} ${core10.slice(5)}`;

  return { isValid: true, formatted };
}

export default function BookingModal() {
  const { isOpen, closeBookingModal } = useBookingModal();

  // Form states
  const [step, setStep] = useState(1);
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("");
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    preferredSlot: TIME_SLOTS[0],
    notes: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset on open/close & handle background Lenis scroll freeze
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
      // Reset state after animation completes
      const timer = setTimeout(() => {
        setStep(1);
        setSelectedGoal("");
        setSelectedTimeline("");
        setSelectedMethods([]);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          preferredSlot: TIME_SLOTS[0],
          notes: "",
        });
        setErrors({});
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeBookingModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeBookingModal]);

  const toggleMethod = (method: string) => {
    if (selectedMethods.includes(method)) {
      setSelectedMethods(selectedMethods.filter((m) => m !== method));
    } else {
      setSelectedMethods([...selectedMethods, method]);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!selectedGoal) {
        setErrors({ goal: "Please select your primary health goal" });
        return;
      }
    }
    if (step === 2) {
      if (!selectedTimeline) {
        setErrors({ timeline: "Please select your symptom timeline" });
        return;
      }
    }
    setErrors({});
    setStep((prev) => Math.min(4, prev + 1));
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name";
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    const phoneValidation = validateIndianPhone(formData.phone);
    if (!phoneValidation.isValid) {
      newErrors.phone = phoneValidation.error || "Please enter a valid 10-digit Indian phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const goalObj = PRIMARY_GOALS.find((g) => g.id === selectedGoal);
      const timelineObj = TIMELINE_OPTIONS.find((t) => t.id === selectedTimeline);

      await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: phoneValidation.formatted,
          goal: selectedGoal,
          goalTitle: goalObj ? `${goalObj.title} (${goalObj.desc})` : selectedGoal,
          timeline: selectedTimeline,
          timelineLabel: timelineObj ? `${timelineObj.label} (${timelineObj.detail})` : selectedTimeline,
          methods: selectedMethods,
          preferredSlot: formData.preferredSlot,
          notes: formData.notes.trim(),
        }),
      });

      setIsSubmitting(false);
      setStep(5); // Success confirmation step
    } catch (err) {
      console.error("Booking submission error:", err);
      // Still proceed to success step so client experience is seamless
      setIsSubmitting(false);
      setStep(5);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-lenis-prevent="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 overflow-hidden"
    >
      {/* ── Backdrop with Blur ── */}
      <div
        onClick={closeBookingModal}
        className="fixed inset-0 bg-[#022342]/70 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
      />

      {/* ── Modal Container (Full-screen on mobile, rounded card on sm+) ── */}
      <div
        data-lenis-prevent="true"
        className="relative w-full h-full sm:h-auto sm:max-h-[90vh] max-w-xl bg-[#F8FAF8] sm:border sm:border-[#DCE7DF] rounded-none sm:rounded-[36px] shadow-2xl overflow-hidden text-[#022342] z-10 flex flex-col transition-all duration-300 transform animate-modalScale"
        style={{
          animation: "modalSpring 380ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Top Header Bar */}
        <div className="shrink-0 px-6 sm:px-8 pt-5 sm:pt-7 pb-4 border-b border-[#E2EBE4] flex items-center justify-between bg-[#F8FAF8]">
          <div className="flex items-center gap-2.5">
            <div
              className="w-4 h-4 bg-[#287417]"
              style={{
                maskImage: "url(/logo.png)",
                WebkitMaskImage: "url(/logo.png)",
                maskSize: "contain",
                WebkitMaskSize: "contain",
                maskRepeat: "no-repeat",
                WebkitMaskRepeat: "no-repeat",
                maskPosition: "center",
                WebkitMaskPosition: "center",
              }}
              aria-hidden="true"
            />
            <span className="font-sans text-[11px] sm:text-xs uppercase tracking-widest text-[#55695A] font-semibold">
              The PCOS Reset Method · Discovery
            </span>
          </div>

          <button
            type="button"
            onClick={closeBookingModal}
            className="w-9 h-9 rounded-full bg-[#EEF4EF] hover:bg-[#E0EBE2] text-[#022342] flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            aria-label="Close modal"
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

        {/* Progress Bar (Visible for Steps 1-4) */}
        {step <= 4 && (
          <div className="shrink-0 w-full bg-[#E2EBE4] h-1.5 overflow-hidden">
            <div
              className="bg-[#287417] h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Modal Body Area */}
        <div
          data-lenis-prevent="true"
          className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8 py-6 sm:py-8"
        >
          {/* ════ STEP 1: Primary Health Goal ════ */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-sans text-xs font-semibold text-[#287417] uppercase tracking-wider">
                  Step 1 of 4
                </span>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#022342] tracking-tight">
                  What is your primary PCOS health priority?
                </h3>
                <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                  Select the core symptom or goal you want our clinical team to address first.
                </p>
              </div>

              {errors.goal && (
                <p className="text-xs font-sans text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {errors.goal}
                </p>
              )}

              <div className="flex flex-col gap-3">
                {PRIMARY_GOALS.map((goal) => {
                  const isSelected = selectedGoal === goal.id;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => {
                        setSelectedGoal(goal.id);
                        setErrors({});
                      }}
                      className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-[#EAF2EC] border-[#287417] shadow-xs ring-1 ring-[#287417]"
                          : "bg-white border-[#DCE7DF] hover:bg-[#F0F5F2] hover:border-[#CADBD0]"
                      }`}
                    >
                      <div className="flex-1">
                        <p className="font-sans text-sm sm:text-[15px] font-semibold text-[#022342]">
                          {goal.title}
                        </p>
                        <p className="mt-1 font-sans text-xs text-[#475569] font-light leading-relaxed">
                          {goal.desc}
                        </p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#287417] border-[#287417] text-white"
                            : "border-[#BACCC0] bg-white"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="2 6 5 9 10 3" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav */}
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-7 rounded-full bg-[#287417] hover:bg-[#216113] text-white font-sans text-sm font-medium tracking-wide shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ════ STEP 2: Duration / Timeline ════ */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-sans text-xs font-semibold text-[#287417] uppercase tracking-wider">
                  Step 2 of 4
                </span>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#022342] tracking-tight">
                  How long have you navigated PCOS or these symptoms?
                </h3>
                <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                  This helps our care team assess your metabolic baseline and timeline expectations.
                </p>
              </div>

              {errors.timeline && (
                <p className="text-xs font-sans text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {errors.timeline}
                </p>
              )}

              <div className="flex flex-col gap-3">
                {TIMELINE_OPTIONS.map((item) => {
                  const isSelected = selectedTimeline === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setSelectedTimeline(item.id);
                        setErrors({});
                      }}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer ${
                        isSelected
                          ? "bg-[#EAF2EC] border-[#287417] shadow-xs ring-1 ring-[#287417]"
                          : "bg-white border-[#DCE7DF] hover:bg-[#F0F5F2] hover:border-[#CADBD0]"
                      }`}
                    >
                      <div>
                        <p className="font-sans text-sm sm:text-[15px] font-semibold text-[#022342]">
                          {item.label}
                        </p>
                        <p className="font-sans text-xs text-[#475569] font-light mt-0.5">
                          {item.detail}
                        </p>
                      </div>

                      <div
                        className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#287417] border-[#287417] text-white"
                            : "border-[#BACCC0] bg-white"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="2 6 5 9 10 3" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav */}
              <div className="mt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="py-2.5 px-5 rounded-full border border-[#DCE7DF] text-[#475569] hover:bg-[#EEF4EF] text-xs sm:text-sm font-medium font-sans transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 py-3 px-7 rounded-full bg-[#287417] hover:bg-[#216113] text-white font-sans text-sm font-medium tracking-wide shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ════ STEP 3: Past Interventions (Multi-Select) ════ */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-sans text-xs font-semibold text-[#287417] uppercase tracking-wider">
                  Step 3 of 4
                </span>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#022342] tracking-tight">
                  What have you tried in the past?
                </h3>
                <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                  Select all that apply so we can tailor non-repetitive strategies for you.
                </p>
              </div>

              {errors.methods && (
                <p className="text-xs font-sans text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
                  {errors.methods}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PREVIOUS_METHODS.map((method) => {
                  const isSelected = selectedMethods.includes(method);
                  return (
                    <button
                      key={method}
                      type="button"
                      onClick={() => toggleMethod(method)}
                      className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? "bg-[#EAF2EC] border-[#287417] text-[#022342] font-medium"
                          : "bg-white border-[#DCE7DF] text-[#334155] hover:bg-[#F0F5F2]"
                      }`}
                    >
                      <span className="font-sans text-xs sm:text-[13px]">
                        {method}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-md border shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "bg-[#287417] border-[#287417] text-white"
                            : "border-[#BACCC0] bg-white"
                        }`}
                      >
                        {isSelected && (
                          <svg
                            width="9"
                            height="9"
                            viewBox="0 0 12 12"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="2 6 5 9 10 3" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav */}
              <div className="mt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="py-2.5 px-5 rounded-full border border-[#DCE7DF] text-[#475569] hover:bg-[#EEF4EF] text-xs sm:text-sm font-medium font-sans transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-2 py-3 px-7 rounded-full bg-[#287417] hover:bg-[#216113] text-white font-sans text-sm font-medium tracking-wide shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  Continue
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ════ STEP 4: Contact & Schedule Discovery Call ════ */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <span className="font-sans text-xs font-semibold text-[#287417] uppercase tracking-wider">
                  Final Step (4 of 4)
                </span>
                <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-normal text-[#022342] tracking-tight">
                  Where should we send your roadmap?
                </h3>
                <p className="mt-1.5 font-sans text-xs sm:text-sm text-[#475569] font-light leading-relaxed">
                  Enter your details below to schedule your complimentary 1:1 discovery call with our Care Squad.
                </p>
              </div>

              <div className="flex flex-col gap-3.5 mt-1">
                {/* Full Name */}
                <div>
                  <label className="block font-sans text-xs font-medium text-[#334155] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-[#DCE7DF] text-[#022342] text-sm font-sans placeholder:text-[#94A3B8] focus:outline-none focus:border-[#287417] focus:ring-1 focus:ring-[#287417] transition-colors"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-sans text-xs font-medium text-[#334155] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-[#DCE7DF] text-[#022342] text-sm font-sans placeholder:text-[#94A3B8] focus:outline-none focus:border-[#287417] focus:ring-1 focus:ring-[#287417] transition-colors"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-sans text-xs font-medium text-[#334155]">
                      WhatsApp / Phone Number *
                    </label>
                    <span className="text-[10.5px] text-[#64748B] font-sans">
                      🇮🇳 10-Digit Indian Mobile
                    </span>
                  </div>
                  <input
                    type="tel"
                    required
                    maxLength={16}
                    placeholder="e.g. 98765 43210 or +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className={`w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border text-[#022342] text-sm font-sans placeholder:text-[#94A3B8] focus:outline-none transition-colors ${
                      errors.phone
                        ? "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 bg-red-50/20"
                        : "border-[#DCE7DF] focus:border-[#287417] focus:ring-1 focus:ring-[#287417]"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-600 mt-1 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* Preferred Consultation Time */}
                <div>
                  <label className="block font-sans text-xs font-medium text-[#334155] mb-1">
                    Preferred Consultation Timing
                  </label>
                  <select
                    value={formData.preferredSlot}
                    onChange={(e) =>
                      setFormData({ ...formData, preferredSlot: e.target.value })
                    }
                    className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white border border-[#DCE7DF] text-[#022342] text-sm font-sans focus:outline-none focus:border-[#287417] focus:ring-1 focus:ring-[#287417] transition-colors"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Note */}
                <div>
                  <label className="block font-sans text-xs font-medium text-[#334155] mb-1">
                    Anything specific you want us to know? (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Current medications, specific symptom concerns..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#DCE7DF] text-[#022342] text-sm font-sans placeholder:text-[#94A3B8] focus:outline-none focus:border-[#287417] focus:ring-1 focus:ring-[#287417] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="mt-3 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBack}
                  className="py-2.5 px-5 rounded-full border border-[#DCE7DF] text-[#475569] hover:bg-[#EEF4EF] text-xs sm:text-sm font-medium font-sans transition-colors cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 py-3 px-8 rounded-full bg-[#287417] hover:bg-[#216113] text-white font-sans text-sm font-medium tracking-wide shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <>
                      Book Discovery Call
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ════ STEP 5: Success Confirmation ════ */}
          {step === 5 && (
            <div className="py-6 sm:py-8 flex flex-col items-center text-center">
              {/* Pulsing Checkmark Ring */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EAF2EC] flex items-center justify-center text-[#287417] mb-6 shadow-inner animate-pulse">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>

              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#287417] mb-2">
                Assessment Received
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#022342] font-normal tracking-tight">
                You&apos;re on your way,{" "}
                <span className="font-serif italic text-[#287417]">
                  {formData.fullName.split(" ")[0]}!
                </span>
              </h3>

              <p className="mt-3 font-sans text-sm sm:text-base text-[#475569] font-light leading-relaxed max-w-md">
                Our clinical coordinator has received your health profile and is preparing your personalized 16-week transformation roadmap.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-[#EAF2EC] border border-[#DCE7DF] w-full text-left">
                <p className="font-sans text-xs font-semibold text-[#022342] uppercase tracking-wider mb-1">
                  What happens next?
                </p>
                <ul className="text-xs sm:text-[13px] text-[#334155] space-y-1.5 font-sans leading-relaxed">
                  <li>• We will reach out via WhatsApp / Email within 24 hours.</li>
                  <li>• We will confirm your preferred timing: <strong className="text-[#022342]">{formData.preferredSlot}</strong>.</li>
                  <li>• You will receive your preliminary 16-Week Assessment Scorecard.</li>
                </ul>
              </div>

              <button
                type="button"
                onClick={closeBookingModal}
                className="mt-8 py-3.5 px-8 rounded-full bg-[#287417] hover:bg-[#216113] text-white font-sans text-sm font-medium tracking-wide shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
