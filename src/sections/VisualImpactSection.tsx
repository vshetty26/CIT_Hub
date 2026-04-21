'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const images = [
  { src: '/branding_dark.png', label: 'Branding — Identity Systems' },
  { src: '/marketing_dark.png', label: 'Marketing — Campaigns & Growth' },
  { src: '/web_dark.png', label: 'Web — Digital Experiences' },
];

export default function VisualImpactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Fade in text from the left
    gsap.fromTo(
      leftContentRef.current,
      { opacity: 0, x: -40 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );

    // Fade and slide in images from the right systematically
    imageRefs.current.forEach((img, i) => {
      if (!img) return;
      gsap.fromTo(
        img,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        minHeight: '250vh', // Forces a massive section height to ensure plenty of scrolling
        backgroundColor: 'var(--bg)',
        padding: '160px 48px',
      }}
    >
      <div style={{
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',       // Pure 2-column flex layout guarantees parent-height stretching
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Critical: align-start lets the inner text block not stretch, enabling sticky!
        gap: '100px',
      }}>

        {/* LEFT COLUMN (TEXT) - ~40% width */}
        <div
          style={{
            width: '40%',
            position: 'sticky',
            top: '25vh',       // Sticks elegantly at exactly 25% of viewport
            height: 'fit-content', // Height tightly hugs the text
            zIndex: 10,
          }}
        >
          <div ref={leftContentRef} style={{ opacity: 0 }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.24em',
              color: 'var(--secondary)',
              textTransform: 'uppercase',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span style={{ width: '24px', height: '1px', backgroundColor: '#6b7280' }} />
              SELECTED WORK
            </div>
            <h2 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.2,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              maxWidth: '100%'
            }}>
              Our work is built on precision, clarity, and real-world impact.
            </h2>
          </div>
        </div>

        {/* RIGHT COLUMN (IMAGES) - ~60% width */}
        <div
          ref={rightContentRef}
          style={{
            width: '60%',
            display: 'flex',
            flexDirection: 'column',
            gap: '140px' // Expansive breathable spacing between images
          }}
        >
          {images.map((item, idx) => (
            <div
              key={idx}
              ref={el => { imageRefs.current[idx] = el; }}
              style={{ opacity: 0 }}
            >
              <div style={{
                width: '100%',
                height: '85vh', // High 85vh scale as requested
                backgroundColor: 'var(--surface)',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${item.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'contrast(1.05) brightness(0.95)' // Cinematic grading
                }} />
              </div>

              <div style={{
                marginTop: '20px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: 'var(--secondary)',
                textTransform: 'uppercase',
              }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
