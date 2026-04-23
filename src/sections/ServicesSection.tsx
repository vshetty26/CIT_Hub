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

    let ctx = gsap.context(() => {

      // 1. Setup Stack Distribution
      wrappers.forEach((item, i) => {
        if (i === 0) {
          gsap.set(item, { scale: 1, opacity: 1, y: 0, filter: 'blur(0px)', zIndex: totalItems });
        } else {
          gsap.set(item, {
            scale: 0.85 - (i * 0.05),
            opacity: Math.max(0, 1 - (i * 0.25)), // Fades further back
            y: -(i * 60),  // Pushes up vertically
            filter: `blur(${i * 3}px)`,
            zIndex: totalItems - i
          });
        }
      });

      // 2. Timeline Mapping (Scroll Logic)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.5,
          start: 'top top',
          end: '+=4500',
        }
      });

      for (let i = 0; i < totalItems - 1; i++) {
        const currentItem = wrappers[i];

        // Push the active item towards camera, scale it heavily, blur and fade it out
        tl.to(currentItem, {
          scale: 1.3,
          opacity: 0,
          y: 100, // drops downwards as it passes the camera
          filter: 'blur(15px)',
          duration: 1,
          ease: 'power2.inOut',
        }, i * 1);

        // Bring all subsequent backing items entirely forward one slot in depth
        for (let j = i + 1; j < totalItems; j++) {
          const nextItem = wrappers[j];
          const slot = j - i - 1;

          tl.to(nextItem, {
            scale: slot === 0 ? 1 : 0.85 - (slot * 0.05),
            opacity: slot === 0 ? 1 : Math.max(0, 1 - (slot * 0.25)),
            y: slot === 0 ? 0 : -(slot * 60),
            filter: slot === 0 ? 'blur(0px)' : `blur(${slot * 3}px)`,
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
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
        perspective: '1200px', // Crucial for establishing 3D tilt effects
      }}
    >
      <div style={{
        position: 'absolute',
        top: '12vh',
        width: '100%',
        textAlign: 'center',
        zIndex: 50,
        pointerEvents: 'none', // Don't block interactions behind title
      }}>
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

      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {services.map((svc, i) => (
          <div
            key={i}
            ref={el => { wrapperRefs.current[i] = el; }}
            style={{
              position: 'absolute',
              willChange: 'transform, opacity, filter',
            }}
          >
            <div ref={el => { idleRefs.current[i] = el; }}>
              <div
                ref={el => { tiltRefs.current[i] = el; }}
                style={{
                  width: 'clamp(320px, 60vw, 750px)',
                  height: 'clamp(380px, 55vh, 550px)',
                  backgroundColor: 'var(--surface)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '64px',
                  boxShadow: '0px 40px 100px rgba(0,0,0,0.85)', // Deep shadowing for realism
                  transformStyle: 'preserve-3d', // Necessary for children to pop along Z-axis
                  cursor: 'crosshair',
                  backdropFilter: 'blur(10px)',
                }}
              >

                {/* 3D Pop Layer 1: Tags */}
                <div style={{
                  display: 'flex', gap: '16px', marginBottom: '40px', justifyContent: 'center', flexWrap: 'wrap',
                  transform: 'translateZ(30px)' // Pushes away from card background
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

                {/* 3D Pop Layer 2: Title */}
                <div style={{ transform: 'translateZ(60px)', transition: 'transform 0.2s', }}>
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

                {/* 3D Pop Layer 3: Description */}
                <div style={{ transform: 'translateZ(20px)' }}>
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
