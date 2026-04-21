'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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

  // ─── Branding gallery state ──────────────────────────────────────────────────
  const [brandingModal, setBrandingModal] = useState<{ title: string; slug: string } | null>(null);
  const [brandingImages, setBrandingImages] = useState<string[]>([]);
  const [brandingLoading, setBrandingLoading] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  const openBrandingGallery = useCallback(async (title: string, slug: string) => {
    setBrandingModal({ title, slug });
    setBrandingImages([]);
    setBrandingLoading(true);
    document.body.style.overflow = 'hidden';
    try {
      const res = await fetch(`/api/gallery/${slug}`);
      const data = await res.json();
      setBrandingImages(data.images ?? []);
    } catch {
      setBrandingImages([]);
    } finally {
      setBrandingLoading(false);
    }
  }, []);

  const closeBrandingGallery = useCallback(() => {
    setBrandingModal(null);
    setBrandingImages([]);
    setLightboxSrc(null);
    document.body.style.overflow = '';
  }, []);

  // ESC key handler for branding modals
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (lightboxSrc) { setLightboxSrc(null); return; }
      if (brandingModal) { closeBrandingGallery(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxSrc, brandingModal, closeBrandingGallery]);

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
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button className="arrow-btn" onClick={scrollNext} aria-label="Next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>

      </div>

      {/* ─── BRANDING ─────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '120px auto 0', padding: '0 24px' }}>
        {/* Sub-heading */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--secondary)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--secondary)' }} />
            BRANDING SERVICES
          </div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
          }}>
            Branding
          </h3>
        </div>

        {/* 4-col grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
        }}>
          {[
            { label: 'Logo Design',    icon: '◈', desc: 'Marks that define identity',       slug: 'logo' },
            { label: 'Business Cards', icon: '▭', desc: 'First impressions, perfected',      slug: 'businesscard' },
            { label: 'Brochures',      icon: '⊞', desc: 'Stories told in print',             slug: 'brochures' },
            { label: 'Signages',       icon: '⬡', desc: 'Your brand in the real world',      slug: 'signages' },
          ].map((item) => (
            <div
              key={item.label}
              onClick={() => openBrandingGallery(item.label, item.slug)}
              style={{
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: '40px 32px',
                backgroundColor: 'var(--surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(59,130,246,0.4)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '28px', color: 'var(--text)' }}>{item.icon}</span>
              <div>
                <div style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '18px',
                  fontWeight: 700,
                  color: 'var(--text)',
                  marginBottom: '8px',
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '14px',
                  color: 'var(--secondary)',
                  lineHeight: 1.5,
                }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── MARKETING & SOCIAL MEDIA ─────────────────────────────────────── */}
      <div style={{ maxWidth: '1200px', margin: '120px auto 0', padding: '0 24px' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            color: 'var(--secondary)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ width: '24px', height: '1px', backgroundColor: 'var(--secondary)' }} />
            DIGITAL MARKETING
          </div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
          }}>
            Marketing &amp; Social Media
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
        }}>
          {[
            { label: 'Social Media Creatives', icon: '⬡', desc: 'Thumb-stopping content for every platform' },
            { label: 'Campaign Designs',        icon: '◈', desc: 'End-to-end campaign visuals' },
            { label: 'Ads / Promotions',        icon: '▲', desc: 'High-conversion ad creatives' },
            { label: 'Content Design',           icon: '▭', desc: 'Consistent, on-brand content systems' },
          ].map((item) => (
            <a
              key={item.label}
              href="https://www.instagram.com/creativeit.melbourne/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div style={{
                border: '1px solid var(--border-color)',
                borderRadius: '20px',
                padding: '40px 32px',
                backgroundColor: 'var(--surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
                cursor: 'pointer',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(59,130,246,0.4)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-color)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: '28px', color: 'var(--text)' }}>{item.icon}</span>
                <div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif",
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--text)',
                    marginBottom: '8px',
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    color: 'var(--secondary)',
                    lineHeight: 1.5,
                  }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      {/* ─── BRANDING GALLERY MODAL ────────────────────────────────────────── */}
      {brandingModal && (
        <div
          onClick={closeBrandingGallery}
          style={{
            position: 'fixed', inset: 0, zIndex: 9998,
            backgroundColor: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex', flexDirection: 'column',
            animation: 'fadeIn 0.25s ease',
            overflowY: 'auto',
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes slideUp { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }
            .brand-modal-inner { animation: slideUp 0.32s cubic-bezier(0.25,1,0.3,1); }
            .brand-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
            @media(max-width:900px){ .brand-grid{ grid-template-columns:repeat(2,1fr); } }
            @media(max-width:560px){ .brand-grid{ grid-template-columns:1fr; } }
            .brand-img-wrap { border-radius:16px; overflow:hidden; aspect-ratio:4/3; background:var(--surface); border:1px solid rgba(255,255,255,0.06); transition:transform 0.35s cubic-bezier(0.25,1,0.3,1); cursor:zoom-in; }
            .brand-img-wrap:hover { transform:scale(1.03); }
            .brand-img-wrap img { width:100%; height:100%; object-fit:cover; display:block; }
          ` }} />

          {/* Modal content — stop clicks from bubbling to backdrop */}
          <div
            className="brand-modal-inner"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '40px 24px 80px' }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
              <div>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif", fontSize: '11px', fontWeight: 600,
                  color: 'rgba(255,255,255,0.4)', letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: '10px'
                }}>
                  BRANDING SERVICES
                </div>
                <h2 style={{
                  fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 700, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1
                }}>
                  {brandingModal.title} Work
                </h2>
              </div>
              <button
                onClick={closeBrandingGallery}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  color: '#fff', width: '48px', height: '48px', borderRadius: '50%',
                  cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0, transition: 'background 0.2s ease'
                }}
                onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)'}
                onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)'}
              >
                ✕
              </button>
            </div>

            {/* Image grid */}
            {brandingLoading ? (
              <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
                Loading gallery…
              </div>
            ) : brandingImages.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', fontFamily: "'Space Grotesk', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
                No images yet in this category.
              </div>
            ) : (
              <div className="brand-grid">
                {brandingImages.map((src, i) => (
                  <div
                    key={i}
                    className="brand-img-wrap"
                    onClick={() => setLightboxSrc(src)}
                  >
                    <img src={src} alt={`${brandingModal.title} ${i + 1}`} loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── LIGHTBOX (full image preview) ────────────────────────────────── */}
      {lightboxSrc && (
        <div
          onClick={() => setLightboxSrc(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            backgroundColor: 'rgba(0,0,0,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'zoom-out', padding: '24px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <img
            src={lightboxSrc}
            alt="Preview"
            style={{
              maxWidth: '92vw', maxHeight: '92vh',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 40px 120px rgba(0,0,0,0.8)',
              animation: 'slideUp 0.3s cubic-bezier(0.25,1,0.3,1)',
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setLightboxSrc(null)}
            style={{
              position: 'fixed', top: '24px', right: '24px',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: '48px', height: '48px', borderRadius: '50%',
              cursor: 'pointer', fontSize: '20px', display: 'flex', alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>
      )}

    </section>
  );
}
