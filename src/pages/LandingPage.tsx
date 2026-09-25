import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { Showcase } from '@/components/sections/Showcase';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Features } from '@/components/sections/Features';
import { WhyNearbyPay } from '@/components/sections/WhyNearbyPay';
import { Download } from '@/components/sections/Download';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-night">
      <Navbar />
      <main>
        <Hero />
        <Showcase />
        <HowItWorks />
        <Features />
        <WhyNearbyPay />
        <Download />
      </main>
      <Footer />
    </div>
  );
}
