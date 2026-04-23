'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Branding',
    description: 'We craft distinctive brand identities that communicate clearly and stand out — from logos to complete visual systems built for long-term impact.',
    tags: ['Strategy', 'Identity', 'Systems']
  },
  {
    title: 'Marketing',
    description: 'We design high-performing marketing creatives and campaigns that capture attention, increase engagement, and drive measurable growth.',
    tags: ['Social', 'Campaigns', 'Performance']
  },
  {
    title: 'Web',
    description: 'We build modern, fast, and conversion-focused websites that deliver seamless user experiences and elevate your digital presence.',
    tags: ['UI/UX', 'Development', 'Performance']
  },
  {
    title: 'Application Security',
    description: 'We ensure your platforms are secure, scalable, and built with reliability at every layer.',
    tags: ['Security', 'Systems', 'Scalability']
  }
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const idleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tiltRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrappers = wrapperRefs.current.filter(Boolean);
    const totalItems = wrappers.length;
    if (!totalItems) return;

    // Depth slot helpers — slot 0 = active/front, slot 1 = mid, slot 2+ = back
    const slotScale   = (slot: number) => slot === 0 ? 1 : Math.max(0.7, 0.88 - slot * 0.06);
    const slotOpacity = (slot: number) => slot === 0 ? 1 : Math.max(0, 1 - slot * 0.28);
    const slotY       = (slot: number) => slot === 0 ? 0 : slot * 28;   // stack slightly downward (behind)
    const slotBlur    = (slot: number) => slot === 0 ? 0 : slot * 4;

    let ctx = gsap.context(() => {

      // 1. Setup Stack Distribution
      wrappers.forEach((item, i) => {
        gsap.set(item, {
          scale:   slotScale(i),
          opacity: slotOpacity(i),
          y:       slotY(i),
          filter:  `blur(${slotBlur(i)}px)`,
          zIndex:  totalItems - i,
        });
      });

      // 2. Timeline Mapping (Scroll Logic)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=3000',
        }
      });

      for (let i = 0; i < totalItems - 1; i++) {
        const currentItem = wrappers[i];

        // Exit: active card scales up slightly, blurs, and fades out upward
        tl.to(currentItem, {
          scale: 1.15,
          opacity: 0,
          y: -80,
          filter: 'blur(20px)',
          duration: 1,
          ease: 'power2.inOut',
        }, i * 1);

        // Advance all backing cards one slot forward
        for (let j = i + 1; j < totalItems; j++) {
          const nextItem = wrappers[j];
          const slot = j - i - 1;

          tl.to(nextItem, {
            scale:   slotScale(slot),
            opacity: slotOpacity(slot),
            y:       slotY(slot),
            filter:  `blur(${slotBlur(slot)}px)`,
            zIndex:  totalItems - slot,
            duration: 1,
            ease: 'power2.inOut',
          }, i * 1);
        }
      }

      // 3. Infinite Idle Floats!
      idleRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: (i % 2 === 0) ? -15 : 15,
          x: (i % 2 !== 0) ? 10 : -10,
          rotationZ: (i % 2 === 0) ? 1 : -1,
          duration: 3.5 + i * 0.3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut"
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 4. Mouse Move Tilt Mechanics
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 2; // Range -1 to 1
    const yPos = (clientY / window.innerHeight - 0.5) * 2;

    tiltRefs.current.forEach((el) => {
      if (!el) return;
      gsap.to(el, {
        rotateX: -yPos * 8, // slight upward/downward angles
        rotateY: xPos * 8,  // left/right sway
        x: xPos * 15,       // slight parallax shifts
        y: yPos * 15,
        duration: 1.2,
        ease: 'power2.out'
      });
    });
  };

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="capabilities-section"
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .capabilities-header {
          position: absolute;
          top: 12vh;
          width: 100%;
          text-align: center;
          z-index: 50;
          pointer-events: none;
          padding: 0 24px;
        }
        .service-card {
          width: clamp(320px, 60vw, 750px);
          height: clamp(380px, 55vh, 550px);
          padding: 64px;
          background-color: var(--surface);
          border: 1px solid var(--border-color);
          border-radius: 32px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0px 20px 60px rgba(0,0,0,0.35);
          cursor: crosshair;
          backdrop-filter: blur(10px);
        }
        
        @media (max-width: 900px) {
          .capabilities-header {
            top: 10vh;
          }
          .service-card {
            width: clamp(280px, 85vw, 600px);
            height: clamp(350px, 60vh, 500px);
            padding: 40px 24px;
            border-radius: 24px;
          }
          .service-card h2 {
            font-size: clamp(32px, 8vw, 48px) !important;
            margin-bottom: 20px !important;
          }
          .service-card p {
            font-size: 15px !important;
            line-height: 1.5 !important;
          }
          .service-card .tag-group {
            margin-bottom: 24px !important;
            gap: 10px !important;
          }
        }
      `}} />

      <div className="capabilities-header">
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(24px, 3vw, 40px)',
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '0.2em',
          opacity: 0.15,
          textTransform: 'uppercase'
        }}>
          Capabilities
        </h2>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '12px',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--secondary)',
          opacity: 0.4,
          marginTop: '10px',
        }}>
          Explore our core capabilities
        </p>
      </div>

      {/* Perspective wrapper so 3D tilt works correctly and is isolated per card */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
      }}>
        {services.map((svc, i) => (
          <div
            key={i}
            ref={el => { wrapperRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              willChange: 'transform, opacity, filter',
              // Isolate each card so blur doesn't bleed inner translateZ content
              isolation: 'isolate',
            }}
          >
            <div ref={el => { idleRefs.current[i] = el; }}>
              <div
                ref={el => { tiltRefs.current[i] = el; }}
                className="service-card"
                style={{ transformStyle: 'preserve-3d' }}
              >

                {/* Tags */}
                <div className="tag-group" style={{
                  display: 'flex', gap: '16px', marginBottom: '40px', justifyContent: 'center', flexWrap: 'wrap',
                }}>
                  {svc.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.24em',
                      color: 'var(--secondary)',
                      textTransform: 'uppercase',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <div>
                  <h2 style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: 'clamp(40px, 6vw, 85px)',
                    fontWeight: 700,
                    color: 'var(--text)',
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                    marginBottom: '32px',
                    lineHeight: 1.1,
                  }}>
                    {svc.title}
                  </h2>
                </div>

                {/* Description */}
                <div>
                  <p style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(16px, 2vw, 20px)',
                    color: 'var(--secondary)',
                    maxWidth: '500px',
                    textAlign: 'center',
                    lineHeight: 1.6
                  }}>
                    {svc.description}
                  </p>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
