'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contentLines = [
  { text: "We are a design studio focused on clarity, craft, and real-world execution.", color: '#ffffff' },
  { text: "Our work spans brand systems, digital experiences, and physical products —", color: '#a1a1aa' },
  { text: "all shaped through thoughtful design decisions and precise 3D.", color: '#a1a1aa' }
];

export default function IntroductionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const lines = lineRefs.current.filter(Boolean);
    if (!lines.length) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',     // Starts animating nicely when text is coming into view
          end: 'bottom 75%',    // Finishes before text leaves view
          scrub: 1,             // Smooth scrub tied precisely to user scroll
        }
      });

      lines.forEach((line, index) => {
        // Animate current line to active state
        tl.to(line, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power1.out',
        }, index * 1);

        // Darken previous line as current line becomes active
        if (index > 0) {
          tl.to(lines[index - 1], {
            opacity: 0.5,
            duration: 1,
            ease: 'power1.out'
          }, index * 1);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
      }}
    >
      <p
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(28px, 4vw, 56px)',
          fontWeight: 600,
          lineHeight: 1.35,
          color: '#ffffff',
          textAlign: 'center',
          maxWidth: '1200px',
          letterSpacing: '-0.01em',
          display: 'flex',
          flexDirection: 'column', // Ensures natural line breaks without <br/> overrides
          gap: '12px'
        }}
      >
        {contentLines.map((line, idx) => (
          <span
            key={idx}
            ref={el => { lineRefs.current[idx] = el; }}
            style={{
              opacity: 0.25, // Initial state
              transform: 'translateY(20px)', // Initial physical offset
              color: line.color,
            }}
          >
            {line.text}
          </span>
        ))}
      </p>
    </section>
  );
}
