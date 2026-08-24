import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "System Test | Rise Your Health",
  description: "Live system health test page for Rise Your Health deployment.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TestPage() {
  const serverTime = new Date().toUTCString();

  return (
    <div className="min-h-screen bg-[#F4F7F4] text-[#022342] flex flex-col justify-between">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 sm:px-10 py-32 sm:py-36 md:py-40 w-full">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#287417] hover:text-[#216113] transition-colors mb-6"
          >
            ? Back to Home
          </Link>
          <span className="block font-sans text-xs font-semibold uppercase tracking-widest text-[#287417] mb-2">
            Deployment Diagnostic
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal leading-[1.08] tracking-tight text-[#022342]">
            System Status: Operational
          </h1>
        </div>

        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-emerald-800 uppercase tracking-wide">
              All Systems Normal
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#EDF2F7]">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">
                Server Mode
              </div>
              <div className="font-medium text-[#022342]">
                Next.js Standalone (Node.js)
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#EDF2F7]">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">
                Live Deployment
              </div>
              <div className="font-medium text-emerald-700">
                Active & Serving Traffic
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#EDF2F7] sm:col-span-2">
              <div className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-1">
                Render Timestamp (UTC)
              </div>
              <div className="font-mono text-xs text-[#334155]">
                {serverTime}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#F1F5F9] flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#287417] text-white text-xs font-medium hover:bg-[#216113] transition-colors"
            >
              Visit Homepage
            </Link>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#F1F5F9] text-[#022342] text-xs font-medium hover:bg-[#E2E8F0] transition-colors"
            >
              View Legal Pages
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
