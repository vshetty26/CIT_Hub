'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryCols = [
  [
    {
      title: 'THE RECEIVER',
      category: 'AUDIO / 01',
      src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200', // Valid headphones
      aspectRatio: '4/5',
      marginTop: '0px'
    },
    {
      title: 'TACTILE BASE',
      category: 'INTERFACE / 04',
      src: '/interface.png', // Local
      aspectRatio: '1/1',
      marginTop: '0px'
    }
  ],
  [
    {
      title: 'ANALOG LENS',
      category: 'OPTICS / 02',
      src: '/camera.png', // Local
      aspectRatio: '3/4',
      marginTop: '120px'
    },
    {
      title: 'MACHINED DIALS',
      category: 'HARDWARE / 03',
      src: '/knobs.png', // Local
      aspectRatio: '4/5',
      marginTop: '0px'
    }
  ],
  [
    {
      title: 'STUDIO DECK',
      category: 'MIXING / 05',
      src: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=1200', // Valid audio mixer
      aspectRatio: '1/1',
      marginTop: '40px'
    },
    {
      title: 'STUDIO MIC',
      category: 'RECORDING / 06',
      src: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1200', // Valid microphone, seen in screenshot
      aspectRatio: '3/4',
      marginTop: '0px'
    }
  ]
];

export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Header fade-in
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
        },
      }
    );

    // Staggered items appearance with upward motion
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      gsap.fromTo(
        item,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  let itemIndex = 0; // To keep tracking global refs array independently of columns

  return (
    <section
      ref={sectionRef}
      style={{
        width: '100%',
        backgroundColor: '#000000',
        padding: '160px 48px',
        position: 'relative'
      }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        .gallery-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .gallery-grid {
          display: flex;
          gap: 32px;
          margin-top: 100px;
          align-items: flex-start;
        }

        .gallery-col {
          display: flex;
          flex-direction: column;
          gap: 32px;
          flex: 1;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          background-color: #09090b;
          border: 1px solid rgba(255, 255, 255, 0.06);
          cursor: pointer;
          width: 100%;
        }

        .gallery-img-wrapper {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.9s cubic-bezier(0.25, 1, 0.3, 1);
          filter: grayscale(20%) contrast(1.1);
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.06);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          transition: background 0.6s ease;
          pointer-events: none;
        }

        .gallery-item:hover .gallery-overlay {
          background: rgba(0, 0, 0, 0.5); /* subtle dark overlay on hover */
        }

        .gallery-content {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 10;
          
          /* initially hidden & translated down */
          opacity: 0;
          transform: translateY(15px);
          transition: opacity 0.6s cubic-bezier(0.25, 1, 0.3, 1), transform 0.6s cubic-bezier(0.25, 1, 0.3, 1);
        }

        .gallery-item:hover .gallery-content {
          opacity: 1;
          transform: translateY(0);
        }

        .category-label {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: #a1a1aa; /* soft gray */
          text-transform: uppercase;
        }

        .item-title {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        /* Responsive override */
        @media (max-width: 900px) {
          .gallery-grid {
            flex-direction: column;
          }
          .gallery-item {
            margin-top: 0 !important; /* clear offsets on mobile */
          }
        }
      ` }} />

      <div className="gallery-container">

        {/* HEADER */}
        <div ref={headerRef} style={{ maxWidth: '800px', opacity: 0 }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.24em',
            color: '#6b7280',
            textTransform: 'uppercase',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{ width: '24px', height: '1px', backgroundColor: '#6b7280' }} />
            GALLERY
          </div>

          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#ffffff',
            letterSpacing: '-0.02em',
            marginBottom: '24px'
          }}>
            PHYSICAL PRODUCTS
          </h2>

          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '18px',
            color: '#9ca3af',
            lineHeight: 1.6,
            maxWidth: '600px'
          }}>
            Discover industrial elegance and precision engineering, curated for those who appreciate raw materiality.
          </p>
        </div>

        {/* MASONRY GRID */}
        <div className="gallery-grid">
          {galleryCols.map((col, colIdx) => (
            <div key={colIdx} className="gallery-col">
              {col.map((item, idx) => {
                const currentIndex = itemIndex++;
                return (
                  <div
                    key={idx}
                    className="gallery-item"
                    ref={el => { itemsRef.current[currentIndex] = el; }}
                    style={{
                      aspectRatio: item.aspectRatio,
                      marginTop: item.marginTop,
                      opacity: 0
                    }}
                  >
                    <div className="gallery-img-wrapper">
                      <img src={item.src} alt={item.title} className="gallery-image" />
                    </div>

                    <div className="gallery-overlay" />

                    <div className="gallery-content">
                      <div className="category-label">{item.category}</div>
                      <div className="item-title">{item.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
