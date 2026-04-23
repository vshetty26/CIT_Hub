'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Sequence perfectly aligns right as the loader dissolves (2.75s sequence length)
    const tl = gsap.timeline({ delay: 2.7 });

    tl.fromTo(
      title1Ref.current,
      { opacity: 0, y: 30, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
    )
      .fromTo(
        title2Ref.current,
        { opacity: 0, y: 30, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.8'
      );

    // Scroll-triggered upward fade
    gsap.to(contentRef.current, {
      y: -150,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg)',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .hero-section {
          padding: 0 48px;
        }
        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 32px;
          align-items: center;
          width: 100%;
        }
        .hero-title-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .hero-section {
            padding: 0 20px;
          }
          .hero-content {
            gap: 20px;
          }
          .hero-title-group {
            gap: 6px;
          }
          .hero-cta-btn {
            padding: 14px 28px !important;
            font-size: 13px !important;
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
          .hero-scroll-indicator {
            bottom: 24px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 900px) {
          .hero-section {
            padding: 0 24px;
          }
          .hero-content {
            gap: 24px;
          }
          .hero-title-group {
            gap: 8px;
          }
        }
      `}} />

      {/* Content */}
      <div ref={contentRef} className="hero-content">
        <div className="hero-title-group">
          <h1
            ref={title1Ref}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 8vw, 84px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--text)',
              opacity: 0,
            }}
          >
            We Don’t Just Design.
          </h1>
          <h1
            ref={title2Ref}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 8vw, 84px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              color: 'var(--text)',
              opacity: 0,
            }}
          >
            We Build{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4f46e5, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Identities
            </span>{' '}
            That{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4f46e5, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Stay.
            </span>
          </h1>
        </div>

        <p
          ref={subtextRef}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(12px, 2vw, 18px)',
            fontWeight: 400,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--secondary)',
            opacity: 0,
            maxWidth: '600px'
          }}
        >
          Branding. Marketing. Web.
        </p>

        <a
          ref={ctaRef}
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById('work');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            marginTop: '8px',
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.05em',
            color: 'var(--text)',
            backgroundColor: 'var(--surface)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            padding: '16px 40px',
            borderRadius: '100px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            opacity: 0,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.boxShadow = '0 0 15px rgba(59, 130, 246, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
            e.currentTarget.style.boxShadow = '0 0 0px rgba(0, 0, 0, 0)';
          }}
        >
          Explore Our Work
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="hero-scroll-indicator" style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        zIndex: 10,
      }}>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--secondary)',
          opacity: 0.6,
        }}>Scroll to explore</span>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes hero-bounce {
            0%, 100% { transform: translateY(0); opacity: 0.5; }
            50% { transform: translateY(6px); opacity: 1; }
          }
          .hero-scroll-arrow { animation: hero-bounce 1.6s ease-in-out infinite; }
        `}} />
        <div className="hero-scroll-arrow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--secondary)" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </div>
      </div>
    </section>
  );
}
