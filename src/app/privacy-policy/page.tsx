import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Rise Your Health — Learn how we securely handle, protect, and process health intake and personal data.",
  alternates: {
    canonical: "https://riseyourhealthh.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Rise Your Health",
    description: "Learn how Rise Your Health safeguards your personal and health consultation data.",
    url: "https://riseyourhealthh.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-3 text-xs sm:text-sm text-[#64748B]">
            Last Updated: August 20, 2026
          </p>
        </div>

        <div className="space-y-10 text-[#334155] text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              1. Overview & Commitment
            </h2>
            <p>
              At Rise Your Health (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), we deeply respect your personal privacy. This Privacy Policy explains how we collect, store, utilize, and protect your personal information when you visit our website, schedule consultations, or participate in our wellness programs.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              2. Information We Collect
            </h2>
            <p>
              We collect information that you directly provide to us, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#475569]">
              <li>Contact details such as your name, email address, and phone number.</li>
              <li>Health intake notes, consultation questionnaires, and wellness background information you choose to share.</li>
              <li>Billing and transaction details processed securely via our third-party payment providers.</li>
              <li>Technical usage data including IP address, browser type, and site navigation metrics.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              3. How We Use Your Information
            </h2>
            <p>
              Your information is used strictly to:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-[#475569]">
              <li>Deliver tailored holistic wellness and hormone coaching programs.</li>
              <li>Communicate scheduling updates, session recordings, and educational resources.</li>
              <li>Process payments and maintain administrative records.</li>
              <li>Improve website functionality, user experience, and security.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              4. Confidentiality & Security
            </h2>
            <p>
              We maintain strict confidentiality regarding all client discussions, health intakes, and private coaching notes. We implement standard encryption and access safeguards. We never sell, rent, or lease your personal data to third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#022342]">
              5. Your Rights & Contact Information
            </h2>
            <p>
              You have the right to request access to, correction of, or deletion of your personal data at any time. For questions regarding our privacy practices or to exercise your rights, please reach out to us directly at{" "}
              <a
                href="mailto:admin@riseyourhealthh.com"
                className="font-medium text-[#287417] hover:underline"
              >
                admin@riseyourhealthh.com
              </a>{" "}
              or{" "}
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
