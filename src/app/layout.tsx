import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { BookingModalProvider } from "@/context/BookingModalContext";
import BookingModal from "@/components/BookingModal";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rise Your Health | The PCOS Reset Method — 16 Weeks to Better Hormonal & Metabolic Health",
  description:
    "The PCOS Reset Method: 16 weeks to better hormonal and metabolic health through personalized lifestyle, non-restrictive nutrition, clinical assessment, and ongoing coaching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans bg-black text-white selection:bg-[#287417] selection:text-white">
        <BookingModalProvider>
          <SmoothScroll>{children}</SmoothScroll>
          <BookingModal />
        </BookingModalProvider>
      </body>
    </html>
  );
}
