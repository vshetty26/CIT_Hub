'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalActionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {

      // Initialize centered glow position manually to offset standard 800x800 dimensions
      gsap.set(glowRef.current, {
        x: window.innerWidth / 2 - 400,
        y: window.innerHeight / 2 - 400
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          start: 'top top',
          end: '+=3500',
        }
      });

      // 1. Enter Testimonial (Slow cinematic fade up)
      tl.fromTo(testimonialRef.current,
        { opacity: 0, y: 50, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' },
        0
      );

      // 2. Exit Testimonial (Starts at 1.8 to afford the user adequate reading time)
      tl.to(testimonialRef.current,
        { opacity: 0, y: -40, filter: 'blur(10px)', duration: 1.2, ease: 'power2.inOut' },
        2.2
      );

      // 3. Enter CTA Sequence (Overlaps the exit for continuity)
      tl.fromTo(ctaRef.current,
        { opacity: 0, scale: 0.92, y: 60, filter: 'blur(12px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.4, ease: 'power2.out' },
        2.8
      );

      // Fade in the ambient cursor light behind the CTA specifically
      tl.fromTo(glowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.4, ease: 'power2.inOut' },
        2.8
      );

      // 4. Power Scale (Active subtle zoom extending to the end of the scroll bounds)
      tl.to(ctaRef.current,
        { scale: 1.05, duration: 2.0, ease: 'none' },
        4.2
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
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#000000',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Absolute Cinematic Glow Orb */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0) 60%)',
          borderRadius: '50%',
          pointerEvents: 'none', // Prevents interfering with hover hits on buttons
          opacity: 0,
          willChange: 'transform, opacity',
        }}
      />

      {/* Part 1: Emotional Quote */}
      <div
        ref={testimonialRef}
        style={{
          position: 'absolute',
          maxWidth: '860px',
          padding: '0 24px',
          textAlign: 'center',
          opacity: 0,
          pointerEvents: 'none', // Don't block background while rendering
        }}
      >
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(28px, 4.5vw, 56px)',
          fontWeight: 600,
          color: '#ffffff',
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          marginBottom: '40px'
        }}>
          "CIT Hub transformed our brand into something that truly stands out. The attention to detail and execution was exceptional."
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '18px',
            color: '#d4d4d8',
            fontWeight: 500,
            letterSpacing: '0.04em'
          }}>
            — Sarah Jenkins
          </span>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '14px',
            color: '#71717a', // Subtle gray
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}>
            Director of Vision, Nexus
          </span>
        </div>
      </div>

      {/* Part 2: Power CTA */}
      <div
        ref={ctaRef}
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
          fontSize: 'clamp(48px, 8vw, 120px)',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '-0.04em',
          textAlign: 'center',
          lineHeight: 1.1,
          maxWidth: '1400px'
        }}>
          Let’s Build Something That Matters.
        </h2>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#contact" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: '24px 56px',
            borderRadius: '100px',
            textDecoration: 'none',
            transition: 'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = '#f4f4f5';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,255,255,0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start a Project
          </a>

          <a href="#work" style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#ffffff',
            backgroundColor: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            padding: '24px 56px',
            borderRadius: '100px',
            textDecoration: 'none',
            transition: 'transform 0.3s ease, border-color 0.3s ease',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
          >
            View Work
          </a>
        </div>
      </div>
    </section>
  );
}
