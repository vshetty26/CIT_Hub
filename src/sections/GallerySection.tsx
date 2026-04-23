'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryCols = [
  [
    {
      title: '',
      category: '',
      src: '/halloffame/image.png',
      aspectRatio: '4/5',
      marginTop: '0px'
    },
    {
      title: '',
      category: '',
      src: '/halloffame/image copy.png',
      aspectRatio: '1/1',
      marginTop: '0px'
    }
  ],
  [
    {
      title: '',
      category: '',
      src: '/halloffame/image copy 2.png',
      aspectRatio: '3/4',
      marginTop: '120px'
    },
    {
      title: '',
      category: '',
      src: '/halloffame/image copy 3.png',
      aspectRatio: '4/5',
      marginTop: '0px'
    }
  ],
  [
    {
      title: '',
      category: '',
      src: '/halloffame/image copy 4.png',
      aspectRatio: '1/1',
      marginTop: '40px'
    },
    {
      title: '',
      category: '',
      src: '/halloffame/image copy 5.png',
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
    // Skip GSAP animations on mobile — elements are visible by default via CSS
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Ensure everything is visible immediately on mobile
      if (headerRef.current) {
        headerRef.current.style.opacity = '1';
        headerRef.current.style.transform = 'none';
      }
      itemsRef.current.forEach(item => {
        if (!item) return;
        item.style.opacity = '1';
        item.style.transform = 'none';
      });
      return;
    }

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
    itemsRef.current.forEach((item) => {
      if (!item) return;
      // Set initial hidden state for desktop animation
      gsap.set(item, { opacity: 0, y: 80 });
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
      id="gallery"
      ref={sectionRef}
      className="gallery-section-wrap"
      style={{
        width: '100%',
        backgroundColor: 'var(--bg)',
        padding: '80px 48px',
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
          gap: 24px;
          margin-top: 48px;
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
          background-color: var(--surface);
          border: 1px solid rgba(255, 255, 255, 0.06);
          cursor: pointer;
          width: 100%;
        }

        .gallery-img-wrapper {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
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
          background: rgba(0, 0, 0, 0.5);
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
          color: #a1a1aa;
          text-transform: uppercase;
        }

        .item-title {
          font-family: 'Syne', sans-serif;
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        /* Mobile: single column, natural image heights, no offsets */
        @media (max-width: 768px) {
          .gallery-section-wrap {
            padding: 80px 20px !important;
          }
          .gallery-container {
            padding: 0;
          }
          .gallery-grid {
            flex-direction: column;
            gap: 16px;
            margin-top: 40px;
          }
          .gallery-col {
            gap: 16px;
            width: 100%;
          }
          .gallery-item {
            margin-top: 0 !important;
            aspect-ratio: unset !important;
            width: 100%;
          }
          .gallery-img-wrapper {
            position: relative !important;
            height: auto !important;
          }
          /* On mobile, images use natural responsive height */
          .gallery-item .gallery-img-wrapper img {
            position: relative !important;
            width: 100% !important;
            height: auto !important;
            min-height: 220px;
            object-fit: cover;
          }
        }

        /* Tablet */
        @media (min-width: 769px) and (max-width: 900px) {
          .gallery-section-wrap {
            padding: 60px 32px !important;
          }
          .gallery-grid {
            flex-direction: column;
            gap: 20px;
            margin-top: 40px;
          }
          .gallery-item {
            margin-top: 0 !important;
          }
        }
      ` }} />

      <div className="gallery-container">

        {/* HEADER */}
        <div ref={headerRef} style={{ maxWidth: '800px' }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.24em',
            color: 'var(--secondary)',
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
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            marginBottom: '24px'
          }}>
            HALL OF FAME
          </h2>

          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '18px',
            color: 'var(--secondary)',
            lineHeight: 1.6,
            maxWidth: '600px'
          }}>
            Trusted by leading brands
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
                    }}
                  >
                    <div className="gallery-img-wrapper">
                      <Image
                        src={item.src}
                        alt={item.title || 'Gallery image'}
                        fill
                        sizes="(max-width: 900px) 100vw, 33vw"
                        quality={75}
                        className="gallery-image"
                        style={{ objectFit: 'cover' }}
                      />
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
