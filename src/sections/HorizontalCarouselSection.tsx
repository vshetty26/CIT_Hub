'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const carouselItems = [
  {
    title: 'MANRAJ MARHALA',
    label: 'Director — CIT HUB',
    src: '/team/manraj.jpg',
    subtext: '9+ Years in Branding & Marketing'
  },
  {
    title: 'RAJIV SINGH',
    label: 'Software & Solutions',
    src: '/team/rajiv.jpg',
    subtext: 'Software Development & Architecture'
  },
  {
    title: 'SOURABH ARORA',
    label: 'Creative Designer',
    src: '/team/sourabh.jpg',
    subtext: 'Design, VFX & Visual Systems'
  }
];

export default function HorizontalCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: 'top top',
          end: () => `+=${track.scrollWidth}`, // Scales section height proportionally
          scrub: 1.2, // Smooth scrubbing
          invalidateOnRefresh: true,
        }
      });

      // Target each card for peaking effect and parallax
      gsap.utils.toArray('.carousel-card-wrap').forEach((wrap: any) => {
        const inner = wrap.querySelector('.carousel-card');
        const bg = wrap.querySelector('.carousel-parallax-bg');

        // Scale and opacity peak in center of screen!
        gsap.fromTo(inner,
          { scale: 0.85, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            ease: "power2.inOut",
            yoyo: true, // Peaks midway and un-peaks
            repeat: 1,
            scrollTrigger: {
              trigger: wrap,
              containerAnimation: tween,
              start: "left right", // Card enters screen
              end: "right left",   // Card leaves screen
              scrub: true,
            }
          }
        );

        // Core parallax effect for the image inside
        gsap.fromTo(bg,
          { xPercent: -20 },
          {
            xPercent: 20, // Slowly pan horizontally
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        height: '100vh', // Pinned, GSAP extends virtual height
        backgroundColor: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .carousel-track {
          display: flex;
          align-items: center;
          height: 100vh;
          width: max-content;
          /* 25vw on each side so the first and last card start firmly in center of viewport */
          padding: 0 25vw;
        }

        .carousel-card-wrap {
          width: 50vw;
          height: 65vh;
          flex-shrink: 0;
          padding: 0 24px;
        }

        .carousel-card {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          background-color: var(--surface);
          cursor: pointer;
          
          /* starting states for GSAP overrides */
          transform: scale(0.85);
          opacity: 0.3;
        }

        .hover-zoom-wrapper {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          transition: transform 0.7s cubic-bezier(0.25, 1, 0.3, 1);
          overflow: hidden;
        }

        .carousel-card:hover .hover-zoom-wrapper {
          transform: scale(1.06); /* Slight interactive zoom purely inside CSS */
        }

        .carousel-parallax-bg {
          width: 140%; /* Lots of extra width for parallax travel */
          height: 100%;
          object-fit: cover;
          position: absolute;
          left: 0;
          top: 0;
          filter: brightness(0.65) contrast(1.05); /* editorial grade */
          transition: filter 0.6s ease;
        }

        .carousel-card:hover .carousel-parallax-bg {
          filter: brightness(0.9) contrast(1.15); /* Hover subtle highlight */
        }

        .carousel-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 40px;
          z-index: 10;
          pointer-events: none;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%);
        }

        .card-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.24em;
          color: #a1a1aa;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .card-label-line {
          width: 24px;
          height: 1px;
          background-color: #a1a1aa;
        }

        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
          transform: translateY(10px);
          opacity: 0.8;
          transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.25, 1, 0.3, 1);
        }

        .carousel-card:hover .card-title {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .carousel-card-wrap { width: 65vw; height: 50vh; }
          .carousel-track { padding: 0 17.5vw; }
          .card-title { font-size: 26px; }
        }
        
        @media (max-width: 768px) {
          .carousel-card-wrap { width: 85vw; height: 60vh; padding: 0 12px; }
          .carousel-track { padding: 0 7.5vw; }
        }

        .arrow-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--text);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .arrow-btn:hover {
          background: var(--text);
          color: var(--bg);
        }
      ` }} />

      <div style={{ position: 'absolute', top: '32px', left: '48px', zIndex: 20 }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          color: 'var(--secondary)',
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ width: '24px', height: '1px', backgroundColor: '#6b7280' }} />
          THE PEOPLE BEHIND THE WORK
        </div>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(32px, 4vw, 56px)',
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
          lineHeight: 1
        }}>
          ABOUT US
        </h2>
      </div>

      <div className="carousel-track" ref={trackRef}>
        {carouselItems.map((item, idx) => (
          <div key={idx} className="carousel-card-wrap">
            <div className="carousel-card">
              <div className="hover-zoom-wrapper">
                <Image
                  className="carousel-parallax-bg"
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 65vw, 50vw"
                  quality={75}
                  style={{ objectFit: 'cover' }}
                />
              </div>

              <div className="carousel-content">
                <div className="card-label">
                  <span className="card-label-line" />
                  {item.label}
                </div>
                {/* Wrap both in the card-title class so they transform consistently on hover */}
                <div className="card-title" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span>{item.title}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '13px', color: '#a1a1aa', fontWeight: 400, letterSpacing: '0.05em' }}>
                    {item.subtext}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ARROWS FOR MANUAL OR VISUAL QUEUE */}
      <div style={{ position: 'absolute', bottom: '10vh', right: '10vw', zIndex: 20, display: 'flex', gap: '16px' }}>
        <button className="arrow-btn" onClick={() => window.scrollBy({ top: -window.innerWidth * 0.5, behavior: 'smooth' })} aria-label="Previous">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button className="arrow-btn" onClick={() => window.scrollBy({ top: window.innerWidth * 0.5, behavior: 'smooth' })} aria-label="Next">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

    </section>
  );
}
