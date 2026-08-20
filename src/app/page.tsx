import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SignsSection from "@/components/SignsSection";
import ServicesSection from "@/components/ServicesSection";
import RoadmapSection from "@/components/RoadmapSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-black">
      <Navbar />
      <Hero />
      <SignsSection />
      <ServicesSection />
      <RoadmapSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
