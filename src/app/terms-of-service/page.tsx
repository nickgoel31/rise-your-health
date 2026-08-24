import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms of Service | Rise Your Health",
  description: "Terms of Service for Rise Your Health - Understanding our terms, coaching agreements, and health disclaimers.",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#F4F7F4] text-[#022342] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 sm:px-10 py-32 sm:py-36 md:py-40">
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#287417] hover:text-[#216113] transition-colors mb-6"
          >
            ← Back to Home
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.08] tracking-tight text-[#022342]">
            Terms of Service
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#64748B]">
            Last Updated: August 20, 2026
          </p>
        </div>

        <div className="space-y-10 text-[#334155] text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing our website, booking discovery sessions, or purchasing any programs from Rise Your Health (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of our site and services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              2. Health & Medical Disclaimer
            </h2>
            <p className="p-4 rounded-2xl bg-[#EAF2EC] border border-[#DCE7DF] text-[#022342]">
              <strong>Important Notice:</strong> Our coaching, educational resources, meal guidelines, and botanical suggestions are intended for informational, educational, and holistic support purposes only. They do not constitute medical diagnosis, treatment, or prescription. Always consult with your primary licensed physician or healthcare specialist before beginning any new health, supplement, or nutrition protocol.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              3. Client Commitments & Cancellations
            </h2>
            <p>
              Coaching sessions are collaborative partnerships. We ask clients to attend scheduled calls punctually and provide at least 24 hours notice for rescheduling. Missed sessions without prior notice may be forfeited depending on the enrolled program tier.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              4. Intellectual Property
            </h2>
            <p>
              All program materials, workbooks, guides, videos, recipes, and website content provided by Rise Your Health are protected by intellectual property laws. These materials are for your personal, non-commercial use and may not be distributed or reproduced without prior written permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              5. Governing Law & Modifications
            </h2>
            <p>
              These Terms shall be governed by and interpreted in accordance with applicable laws. We reserve the right to revise or modify these Terms at any time with immediate effect upon posting to this page.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              6. Contact Information
            </h2>
            <p>
              For any questions regarding these Terms of Service or our coaching agreements, please reach out to us at{" "}
              <a
                href="mailto:admin@riseyourhealthh.com"
                className="font-medium text-[#287417] hover:underline"
              >
                admin@riseyourhealthh.com
              </a>{" "}
              or call us at{" "}
              <a
                href="tel:+917091899035"
                className="font-medium text-[#287417] hover:underline"
              >
                +91 70918 99035
              </a>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
