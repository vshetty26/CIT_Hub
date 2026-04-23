'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalActionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    let ctx = gsap.context(() => {

      // Initialize centered glow position
      gsap.set(glowRef.current, {
        x: window.innerWidth / 2 - 400,
        y: window.innerHeight / 2 - 400
      });

      // On mobile: skip pin + scrub, just fade in on scroll
      if (isMobile) {
        gsap.fromTo(ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' }
          }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=1800',
        }
      });

      // Enter CTA
      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.92, y: 60, filter: 'blur(12px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power2.out' },
        0
      );

      // Fade in glow
      tl.fromTo(glowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'power2.inOut' },
        0
      );

      // Subtle scale
      tl.to(ctaRef.current,
        { scale: 1.05, duration: 2.0, ease: 'none' },
        1.8
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!glowRef.current || !sectionRef.current) return;
    const { clientX, clientY } = e;

    // Smooth trailing physics behind the cursor natively bound to viewport
    gsap.to(glowRef.current, {
      x: clientX - 400, // Offset the 800px width radius
      y: clientY - 400, // Offset the 800px height radius
      duration: 1.2,
      ease: 'power3.out'
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="final-action-section"
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .final-cta-group {
          display: flex;
          gap: 24px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
        }
        .btn-primary {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--bg);
          background-color: var(--text);
          padding: 24px 56px;
          border-radius: 100px;
          text-decoration: none;
          transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .btn-secondary {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text);
          background-color: transparent;
          border: 1px solid var(--border-dark-color);
          padding: 24px 56px;
          border-radius: 100px;
          text-decoration: none;
          transition: transform 0.3s ease, border-color 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        @media (max-width: 768px) {
          .final-action-section {
            height: auto !important;
            min-height: 100vh;
            padding: 100px 20px 80px !important;
            flex-direction: column;
            justify-content: center;
          }
          .final-action-section .cta-block {
            position: relative !important;
            opacity: 1 !important;
          }
          .final-cta-group {
            gap: 16px;
            width: 100%;
            flex-direction: column;
            align-items: center;
          }
          .btn-primary, .btn-secondary {
            padding: 16px 32px;
            font-size: 13px;
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
          .cta-title {
            gap: 40px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 900px) {
          .final-action-section {
            padding: 0 24px;
          }
          .final-cta-group {
            gap: 16px;
            width: 100%;
          }
          .btn-primary, .btn-secondary {
            padding: 18px 32px;
            font-size: 13px;
            width: 100%;
            max-width: 320px;
            text-align: center;
          }
          .cta-title {
            gap: 40px !important;
          }
        }
      `}} />

      {/* Absolute Cinematic Glow Orb */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '800px',
          height: '800px',
          background: 'var(--highlight-gradient)',
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      />

      {/* Power CTA */}
      <div
        ref={ctaRef}
        className="cta-title cta-block"
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '56px',
          opacity: 0,
          padding: '0 24px',
          width: '100%',
        }}
      >
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(36px, 8vw, 120px)',
          fontWeight: 800,
          color: 'var(--text)',
          letterSpacing: '-0.04em',
          textAlign: 'center',
          lineHeight: 1.1,
          maxWidth: '1400px'
        }}>
          Let’s Build Something That Matters.
        </h2>

        <div className="final-cta-group">
          <a href="#contact" className="btn-primary"
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = 'var(--secondary)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = 'var(--text)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start a Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>

          <a href="#work" className="btn-secondary"
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById('work');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'var(--text)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-dark-color)';
            }}
          >
            View Work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
