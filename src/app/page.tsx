import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { HeroScrollProvider } from "@/contexts/HeroScrollContext";
import StatsBar from "@/components/StatsBar";
import WhatIsUCMAS from "@/components/WhatIsUCMAS";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Programs from "@/components/Programs";
import Achievements from "@/components/Achievements";
import { getResultsGalleryData } from "@/lib/get-results-showcase";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Teachers from "@/components/Teachers";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default async function HomePage() {
  const resultsGallery = await getResultsGalleryData();

  return (
    <HeroScrollProvider>
      <Navbar />
      <main className="relative">
        <Hero />
        <StatsBar />
        <WhatIsUCMAS />
        <HowItWorks />
        <Benefits />
        <Programs />
        <Achievements galleryData={resultsGallery} />
        <Gallery />
        <Testimonials />
        <Teachers />
        <FAQ />
        <Footer />
      </main>
      <WhatsAppButton />
    </HeroScrollProvider>
  );
}
