'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const carouselItems = [
  {
    title: 'THE RECEIVER',
    label: 'PRODUCT / AUDIO',
    src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'TACTILE BASE',
    label: 'EXPERIENCE / INTERFACE',
    src: '/interface.png',
  },
  {
    title: 'ANALOG LENS',
    label: 'PRODUCT / OPTICS',
    src: '/camera.png',
  },
  {
    title: 'MACHINED DIALS',
    label: 'UI / HARDWARE',
    src: '/knobs.png',
  },
  {
    title: 'STUDIO DECK',
    label: 'EXPERIENCE / MIXING',
    src: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1200',
  },
  {
    title: 'STUDIO MIC',
    label: 'PRODUCT / RECORDING',
    src: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1200',
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
        backgroundColor: '#000000',
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
          background-color: #09090b;
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
      ` }} />

      <div className="carousel-track" ref={trackRef}>
        {carouselItems.map((item, idx) => (
          <div key={idx} className="carousel-card-wrap">
            <div className="carousel-card">
              <div className="hover-zoom-wrapper">
                <img className="carousel-parallax-bg" src={item.src} alt={item.title} />
              </div>

              <div className="carousel-content">
                <div className="card-label">
                  <span className="card-label-line" />
                  {item.label}
                </div>
                <h3 className="card-title">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
