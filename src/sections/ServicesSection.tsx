'use client';

import { useEffect, useRef, useState } from 'react';
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Fade in on scroll
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="capabilities-section"
      style={{
        width: '100%',
        backgroundColor: 'var(--bg)',
        padding: '80px 48px',
        position: 'relative',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .capabilities-header {
          max-width: 600px;
          margin: 0 auto 60px;
          text-align: center;
        }

        .slider-container {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }

        .slider-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 24px;
        }

        .slider-track {
          display: flex;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.3, 1);
        }

        .service-card {
          flex: 0 0 100%;
          padding: 60px 48px;
          background: linear-gradient(135deg, var(--surface) 0%, rgba(59, 130, 246, 0.05) 100%);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 24px;
          min-height: 400px;
        }

        .tag-group {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #3b82f6;
          text-transform: uppercase;
          padding: 4px 10px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 100px;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .service-card h2 {
          font-family: 'Syne', sans-serif;
          font-size: 40px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          margin: 0;
        }

        .service-card p {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 16px;
          color: var(--secondary);
          line-height: 1.6;
          margin: 0;
          max-width: 600px;
        }

        .slider-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 40px;
          gap: 24px;
        }

        .arrow-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--surface);
          border: 1px solid var(--border-color);
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .arrow-btn:hover {
          background: var(--text);
          color: var(--bg);
          border-color: var(--text);
          transform: scale(1.05);
        }

        .arrow-btn:active {
          transform: scale(0.95);
        }

        .dots-container {
          display: flex;
          gap: 8px;
          justify-content: center;
          flex: 1;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot.active {
          background: #3b82f6;
          border-color: #3b82f6;
          width: 24px;
          border-radius: 100px;
        }

        .dot:hover {
          background: rgba(59, 130, 246, 0.5);
        }

        .counter {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: var(--secondary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          flex-shrink: 0;
        }

        @media (max-width: 900px) {
          .capabilities-section {
            padding: 60px 24px !important;
          }
          .service-card {
            padding: 40px 32px;
            min-height: 350px;
          }
          .service-card h2 {
            font-size: 32px;
          }
          .service-card p {
            font-size: 15px;
          }
        }

        @media (max-width: 640px) {
          .capabilities-section {
            padding: 50px 20px !important;
          }
          .service-card {
            padding: 32px 24px;
            min-height: 320px;
            gap: 16px;
          }
          .service-card h2 {
            font-size: 26px;
          }
          .service-card p {
            font-size: 14px;
          }
          .slider-controls {
            margin-top: 32px;
            gap: 16px;
          }
          .arrow-btn {
            width: 40px;
            height: 40px;
          }
          .counter {
            font-size: 11px;
          }
        }
      `}} />

      {/* Header */}
      <div className="capabilities-header">
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--secondary)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '16px',
          opacity: 0.6
        }}>
          What We Do
        </div>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
          margin: '0 0 16px 0',
          lineHeight: 1.2
        }}>
          Our Capabilities
        </h2>
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '16px',
          color: 'var(--secondary)',
          lineHeight: 1.6,
          margin: 0
        }}>
          Explore our core services and expertise
        </p>
      </div>

      {/* Slider */}
      <div className="slider-container">
        <div className="slider-wrapper">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
            }}
          >
            {services.map((svc, i) => (
              <div key={i} className="service-card">
                <div className="tag-group">
                  {svc.tags.map(tag => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2>{svc.title}</h2>
                <p>{svc.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="slider-controls">
          <button
            className="arrow-btn"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="dots-container">
            {services.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === activeIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="counter">
            {String(activeIndex + 1).padStart(2, '0')} / {String(services.length).padStart(2, '0')}
          </div>

          <button
            className="arrow-btn"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
