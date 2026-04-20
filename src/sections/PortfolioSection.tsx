'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

import { projectsData } from '@/data/projects';

const categories = ['All', 'Branding', 'Web Design', 'UI/UX', 'Development'];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const filteredProjects = projectsData.filter(p => 
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  // Update scaling dynamics natively based on continuous scroll position
  useEffect(() => {
    const handleScroll = () => {
      const container = carouselRef.current;
      if (!container) return;

      const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;

      cardsRef.current.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        // Normalize distance based on container width
        const maxDist = container.clientWidth / 2;
        let progress = 1 - (distance / maxDist);
        progress = Math.max(0, Math.min(1, progress));

        // Scale maps from 0.85 (edges) to 1 (center)
        const scale = 0.85 + (0.15 * progress);
        // Opacity maps from 0.4 (edges) to 1 (center)
        const opacity = 0.4 + (0.6 * progress);

        card.style.transform = `scale(${scale})`;
        card.style.opacity = opacity.toString();
        
        // We can add a class to trigger active overlays cleanly
        if (progress > 0.8) {
          card.classList.add('is-center');
        } else {
          card.classList.remove('is-center');
        }
      });
    };

    const container = carouselRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      // Initial trigger
      handleScroll();
    }
    
    // Also re-trigger on resize
    window.addEventListener('resize', handleScroll);

    return () => {
      if (container) container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [filteredProjects]); // re-bind when array changes length

  const scrollPrev = () => {
    if (carouselRef.current) {
      const cardWidth = cardsRef.current[0]?.offsetWidth || 400;
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      const cardWidth = cardsRef.current[0]?.offsetWidth || 400;
      carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="work"
      style={{
        backgroundColor: 'var(--bg)',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Global CSS adjustments tailored for clean portfolio section */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        .cat-btn {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: var(--secondary);
          background: transparent;
          border: 1px solid var(--border-color);
          padding: 8px 24px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cat-btn:hover {
          color: var(--text);
          border-color: var(--border-dark-color);
        }
        .cat-btn.active {
          background: var(--text);
          color: var(--bg);
          border-color: var(--text);
        }

        .port-card {
          width: 80vw;
          max-width: 600px;
          flex-shrink: 0;
          scroll-snap-align: center;
          transition: transform 0.1s linear, opacity 0.1s linear;
          display: flex;
          flex-direction: column;
          gap: 24px;
          opacity: 0.4;
          transform: scale(0.85);
          will-change: transform, opacity;
        }

        .port-img-wrap {
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border: 1px solid var(--border-color);
        }

        .port-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .port-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .port-btn {
          background: #ffffff;
          color: #000000;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 14px 32px;
          border-radius: 100px;
          transform: translateY(20px);
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          border: none;
          pointer-events: auto; /* MUST BE CLICKABLE */
        }

        /* Hover only functions effectively when card is centrally active */
        .port-card.is-center .port-img-wrap:hover .port-img {
          transform: scale(1.05);
        }
        .port-card.is-center .port-img-wrap:hover .port-overlay {
          opacity: 1;
        }
        .port-card.is-center .port-img-wrap:hover .port-btn {
          transform: translateY(0);
        }

        .port-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .arrow-btn {
          background: var(--surface);
          border: 1px solid var(--border-color);
          color: var(--text);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .arrow-btn:hover {
          background: var(--text);
          color: var(--bg);
        }

        @media (max-width: 768px) {
          .port-card {
            width: 85vw;
          }
        }
        `
      }} />

      {/* HEADER SECTION */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 64px', textAlign: 'center' }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--secondary)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '16px'
        }}>
          Portfolio
        </div>
        
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 'clamp(36px, 5vw, 64px)',
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '-0.02em',
          marginBottom: '24px'
        }}>
          Explore Our Work
        </h2>
        
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '16px',
          color: 'var(--secondary)',
          lineHeight: 1.6,
          maxWidth: '500px',
          margin: '0 auto 48px'
        }}>
          A curated collection of branding, web, and digital experiences.
        </p>

        {/* CATEGORY TABS */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat);
                if (carouselRef.current) {
                  carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CAROUSEL WRAPPER WITH ARROWS */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        
        {/* CAROUSEL TRACK */}
        <div 
          ref={carouselRef}
          className="hide-scrollbar"
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            width: '100%',
            padding: '40px 50vw 80px', // Pushes the first and last card into the center comfortably
            boxSizing: 'border-box'
          }}
        >
          {filteredProjects.map((project, i) => (
            <div 
              key={project.id} 
              className="port-card"
              ref={(el) => { cardsRef.current[i] = el; }}
            >
              <div className="port-img-wrap">
                <img src={project.thumbnail} alt={project.title} className="port-img" loading="lazy" />
                <div className="port-overlay">
                  {/* Hard reload if they click anchor, but using Next Link natively is better. It uses native tags per your setup. */}
                  <a href={`/work/${project.slug}`} className="port-btn" style={{ textDecoration: 'none' }}>
                    View Project →
                  </a>
                </div>
              </div>

              <div className="port-content">
                <h3 style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--text)'
                }}>
                  {project.title}
                </h3>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                  color: 'var(--secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}>
                  <span>{project.category}</span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--border-dark-color)' }} />
                  <span>{project.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ABSOLUTE ARROWS FOR DESKTOP */}
        <div style={{ position: 'absolute', width: '100%', pointerEvents: 'none', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '1400px', display: 'flex', justifyContent: 'space-between', padding: '0 24px', pointerEvents: 'auto' }}>
            <button className="arrow-btn" onClick={scrollPrev} aria-label="Previous">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="arrow-btn" onClick={scrollNext} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
