import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Refund Policy | Rise Your Health",
  description: "Refund and payment policy for RISE YOUR HEALTH programs.",
};

export default function RefundPolicyPage() {
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
            Refund Policy
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#64748B]">
            Last Updated: August 20, 2026
          </p>
        </div>

        <div className="space-y-10 text-[#334155] text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              1. Lifetime Plan Structure
            </h2>
            <p>
              We work on just one payment module where you will never have to renew the same plan in your life if you enroll for 6 months.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              2. Intellectual Property & No-Refund Policy
            </h2>
            <p>
              The work that RISE YOUR HEALTH consulting does on behalf of our clients is a non-tangible piece of intellectual property. Once the work has started, we can never get that back and you can never return it to us. It’s yours forever. It’s for this reason that we do not offer refunds once the evaluation phase has completed.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              3. Receipts & Acknowledgments
            </h2>
            <p>
              You can take screenshot or download the receipt through online or payment gateway if needed and this online receipt is sufficient acknowledgment and no other receipt will be issued/ necessary.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              4. Instalments & Tokens
            </h2>
            <p>
              In case of non-payment of any instalment, the services will be stopped at immediate effect. Tokens are non-refundable.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              5. Outstanding Balances & Dispute Resolution
            </h2>
            <p>
              In the event that payment for the services rendered is not received within the specified time frame, we kindly reserve the right to pursue appropriate measures to ensure the resolution of any outstanding balances. This may include but is not limited to, the engagement of third-party assistance in accordance with applicable laws and regulations.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              6. Contact Information
            </h2>
            <p>
              If you have any questions or concerns about our refund policy, please contact us at{" "}
              <a
                href="mailto:aman@riseyourhealthh.com"
                className="font-medium text-[#287417] hover:underline"
              >
                aman@riseyourhealthh.com
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
