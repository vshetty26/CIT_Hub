'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
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
      className="visual-impact-section"
      style={{
        width: '100%',
        backgroundColor: 'var(--bg)',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .visual-impact-section {
          padding: 80px 48px;
        }
        .visual-grid {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 64px;
        }
        .visual-left {
          width: 40%;
          position: sticky;
          top: 20vh;
          height: fit-content;
          z-index: 10;
        }
        .visual-right {
          width: 60%;
          display: flex;
          flex-direction: column;
          gap: 64px;
        }
        .visual-img-container {
          width: 100%;
          height: 70vh;
          background-color: var(--surface);
          border: 1px solid var(--border-color);
          overflow: hidden;
          position: relative;
        }

        @media (max-width: 768px) {
          .visual-impact-section {
            padding: 60px 20px !important;
          }
          .visual-grid {
            flex-direction: column;
            gap: 40px;
          }
          .visual-left {
            width: 100%;
            position: relative !important;
            top: 0 !important;
            text-align: center;
          }
          .visual-right {
            width: 100%;
            gap: 40px;
          }
          .visual-img-container {
            height: 55vw !important;
            min-height: 220px;
          }
          .visual-left-label {
            justify-content: center;
          }
        }
        @media (min-width: 769px) and (max-width: 900px) {
          .visual-impact-section {
            padding: 60px 24px;
          }
          .visual-grid {
            flex-direction: column;
            gap: 48px;
          }
          .visual-left {
            width: 100%;
            position: relative;
            top: 0;
            text-align: center;
          }
          .visual-right {
            width: 100%;
            gap: 48px;
          }
          .visual-img-container {
            height: 55vh;
          }
          .visual-left-label {
            justify-content: center;
          }
        }
      `}} />

      <div className="visual-grid">
        {/* LEFT COLUMN (TEXT) */}
        <div className="visual-left">
          <div ref={leftContentRef} style={{ opacity: 0 }}>
            <div className="visual-left-label" style={{
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

        {/* RIGHT COLUMN (IMAGES) */}
        <div ref={rightContentRef} className="visual-right">
          {images.map((item, idx) => (
            <div
              key={idx}
              ref={el => { imageRefs.current[idx] = el; }}
              style={{ opacity: 0 }}
            >
              <div className="visual-img-container">
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  sizes="(max-width: 900px) 100vw, 60vw"
                  quality={75}
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    filter: 'contrast(1.05) brightness(0.95)'
                  }}
                />
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
