'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Loader from '@/components/Loader';
import HeroSection from '@/sections/HeroSection';
import IntroductionSection from '@/sections/IntroductionSection';
import VisualImpactSection from '@/sections/VisualImpactSection';
import PortfolioSection from '@/sections/PortfolioSection';
import GallerySection from '@/sections/GallerySection';
import HorizontalCarouselSection from '@/sections/HorizontalCarouselSection';
import ServicesSection from '@/sections/ServicesSection';
import FinalActionSection from '@/sections/FinalActionSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);

  // 1. Initial Scroll Lock & Top Reset
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Prevent scrolling or bleeding while loader operates
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
  }, []);

  // 2. Unlock & Initialize Lenis Post-Loader
  useEffect(() => {
    if (!loaderDone) return;

    // Safety reset to exact top right before smooth-scroll hijack
    document.body.style.overflow = '';
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [loaderDone]);

  return (
    <>
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        <IntroductionSection />
        <VisualImpactSection />
        <PortfolioSection />
        <GallerySection />
        <HorizontalCarouselSection />
        <ServicesSection />
        <FinalActionSection />
        {/* sections will be added here one by one */}
        <Footer />
      </div>
    </>
  );
}
