'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Loader from '@/components/Loader';
import HeroSection from '@/sections/HeroSection';
import IntroductionSection from '@/sections/IntroductionSection';
import VisualImpactSection from '@/sections/VisualImpactSection';
import AboutSection from '@/sections/AboutSection';
import PortfolioSection from '@/sections/PortfolioSection';
import GallerySection from '@/sections/GallerySection';
import ServicesSection from '@/sections/ServicesSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import FinalActionSection from '@/sections/FinalActionSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  // null   → not yet determined (waiting for useEffect / sessionStorage check)
  // true   → first visit this session → show loader
  // false  → return visit → skip loader
  const [showLoader, setShowLoader] = useState<boolean | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  // ── Check sessionStorage on mount to decide loader visibility ────────────
  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem('cithub_loaded');

    if (alreadyLoaded) {
      // Return visit (logo click, back button, etc.) — skip loader immediately
      setShowLoader(false);
      setLoaderDone(true);
    } else {
      // Genuine first visit this session — show loader
      sessionStorage.setItem('cithub_loaded', '1');
      setShowLoader(true);

      // Lock scroll while loader plays
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  // ── Unlock scroll + boot Lenis once loader finishes ──────────────────────
  useEffect(() => {
    if (!loaderDone) return;

    document.body.style.overflow = '';
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 0.75,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 1.8,
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
      {/*
        Loader logic:
        - showLoader === null  → still checking sessionStorage, render loader as
          a cover so there's no flash of page content (it will be dismissed
          instantly if it turns out to be a return visit)
        - showLoader === true  → first visit, play full animation
        - showLoader === false → return visit, loader already dismissed above
      */}
      {(showLoader === null || (showLoader === true && !loaderDone)) && (
        <Loader onComplete={() => setLoaderDone(true)} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        <IntroductionSection />
        <VisualImpactSection />
        <AboutSection />
        <PortfolioSection />
        <GallerySection />
        <ServicesSection />
        <TestimonialsSection />
        <FinalActionSection />
        <Footer />
      </div>
    </>
  );
}
