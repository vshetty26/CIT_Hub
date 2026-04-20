'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);
  const text4Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    const lines = [text1Ref, text2Ref, text3Ref, text4Ref];
    
    // Configure aggressive overlap for confident pacing
    const stepDuration = 0.65;
    
    lines.forEach((ref, index) => {
      const isLast = index === lines.length - 1;
      const startTime = index * stepDuration;

      // 1. Enter (Fade up + expand tracking)
      tl.fromTo(ref.current, 
        { opacity: 0, y: 30, letterSpacing: '-0.04em' },
        { opacity: 1, y: 0, letterSpacing: '0.02em', duration: 0.8, ease: 'power3.out' },
        startTime
      );

      if (!isLast) {
        // 2. Clear out smoothly right as next line prepares to surface
        tl.to(ref.current, 
          { opacity: 0, y: -25, filter: 'blur(8px)', duration: 0.4, ease: 'power2.inOut' },
          startTime + stepDuration // Triggers flush right before next sequence
        );
      } else {
        // 3. Final Frame (Creative IT Hub) holds slightly, scales and dissolves
        tl.to(ref.current, { 
          scale: 1.08, 
          letterSpacing: '0.06em', 
          duration: 0.9, 
          ease: 'power2.inOut' 
        }, startTime + 0.8);
        
        tl.to(containerRef.current, { 
          opacity: 0, 
          duration: 0.8, 
          ease: 'power2.inOut',
          onComplete: () => {
             if (onComplete) onComplete();
          }
        }, startTime + 0.8);
      }
    });

  }, [onComplete]);

  const textStyle: React.CSSProperties = {
    position: 'absolute',
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(32px, 6vw, 96px)',
    fontWeight: 800,
    color: 'var(--text)',
    textAlign: 'center',
    opacity: 0,
    margin: 0,
    willChange: 'transform, opacity, filter, letter-spacing',
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: 'var(--bg)', 
        zIndex: 9999, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1 ref={text1Ref} style={textStyle}>
          Crafting Clarity.
        </h1>
        <h1 ref={text2Ref} style={textStyle}>
          Engineering Experiences.
        </h1>
        <h1 ref={text3Ref} style={textStyle}>
          Designing What Matters.
        </h1>
        <h1 ref={text4Ref} style={{ ...textStyle, letterSpacing: '-0.02em' }}>
          Creative IT Hub
        </h1>
      </div>
    </div>
  );
}
