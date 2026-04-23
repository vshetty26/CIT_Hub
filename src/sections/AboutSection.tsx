'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// ─────────────────────────────────────────────────────────────────────────────
// TEAM DATA
// Place portrait images in:  /public/team/manraj.jpg
//                            /public/team/rajiv.jpg
//                            /public/team/sourabh.jpg
// ─────────────────────────────────────────────────────────────────────────────
const TEAM = [
  {
    id: 'manraj',
    name: 'Manraj Marhala',
    role: 'Director',
    roleLabel: 'Director — CIT Hub',
    navLabel: 'Director',
    image: '/team/manraj.jpg',
    description:
      'With over 9+ years of experience in branding, marketing, and project management in Melbourne, Manraj leads the creative direction of Creative IT Hub. He brings a strong vision to every project — blending strategy, design, and business understanding to create brands that truly stand out.',
  },
  {
    id: 'rajiv',
    name: 'Rajiv Singh',
    role: 'Tech Lead',
    roleLabel: 'Tech Lead & Solution Architect',
    navLabel: 'Tech Lead',
    image: '/team/rajiv.jpg',
    description:
      'Rajiv specializes in software development and scalable solutions. With over 5 years of experience, he plays a key role in transforming ideas into reliable, high-performance digital products.',
  },
  {
    id: 'sourabh',
    name: 'Sourabh Arora',
    role: 'Designer',
    roleLabel: 'Graphic Designer',
    navLabel: 'Designer',
    image: '/team/sourabh.jpg',
    description:
      'With over 9+ years of experience in multimedia, graphic design, and visual effects, Sourabh brings creative excellence to every project. He has worked with leading production houses including Red Chillies, Prime Focus, and NY VFX.',
  },
];

export default function AboutSection() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  // Touch / swipe tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // ── Switch member ──────────────────────────────────────────────────────────
  const switchTo = useCallback(
    (index: number) => {
      if (index === active || transitioning) return;
      setTransitioning(true);
      setPrev(active);
      setActive(index);
      setTimeout(() => {
        setPrev(null);
        setTransitioning(false);
      }, 520); // matches CSS transition duration
    },
    [active, transitioning]
  );

  // ── Keyboard navigation ────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') switchTo(Math.min(active + 1, TEAM.length - 1));
      if (e.key === 'ArrowUp') switchTo(Math.max(active - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, switchTo]);

  // ── Touch / swipe ──────────────────────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      if (dx < 0) switchTo(Math.min(active + 1, TEAM.length - 1));
      else switchTo(Math.max(active - 1, 0));
    }
  };

  const member = TEAM[active];

  return (
    <section
      id="about"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="about-section-wrap"
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '60px 0 80px',
      }}
    >
      {/* ── Ambient background glow ─────────────────────────────────────── */}
      <div
        key={active}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 60% at 30% 50%, 
            ${active === 0 ? 'rgba(79,70,229,0.06)' : active === 1 ? 'rgba(16,185,129,0.05)' : 'rgba(245,158,11,0.05)'} 0%,
            transparent 70%)`,
          transition: 'background 0.6s ease',
          pointerEvents: 'none',
        }}
      />

      {/* ── Section label ───────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="about-section-label"
        style={{
          position: 'absolute',
          top: '48px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--secondary)',
          opacity: 0.5,
          whiteSpace: 'nowrap',
        }}>
          Our Team
        </span>
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '10px',
          fontWeight: 400,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--secondary)',
          opacity: 0.3,
          whiteSpace: 'nowrap',
        }}>
          Click dots or use ↑ ↓ arrow keys to navigate
        </span>
      </div>

      {/* ── Main panel ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1340px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,2fr) minmax(0,3fr) auto',
          gridTemplateRows: '1fr',
          gap: 'clamp(32px, 4vw, 72px)',
          alignItems: 'center',
          minHeight: 'clamp(480px, 72vh, 680px)',
        }}
        className="about-panel-grid"
      >
        {/* ── LEFT: Portrait ───────────────────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '3 / 4',
            maxHeight: 'clamp(380px, 60vh, 620px)',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.14), 0 32px 80px rgba(0,0,0,0.12)',
          }}
        >
          {/* Outgoing image fade */}
          {prev !== null && (
            <Image
              key={`prev-${prev}`}
              src={TEAM[prev].image}
              alt={TEAM[prev].name}
              fill
              sizes="(max-width: 860px) 100vw, 40vw"
              quality={75}
              style={{
                objectFit: 'cover',
                objectPosition: 'top center',
                animation: 'about-fade-out 0.52s ease forwards',
                zIndex: 2,
              }}
            />
          )}
          {/* Incoming image */}
          <Image
            key={`active-${active}`}
            src={member.image}
            alt={member.name}
            fill
            sizes="(max-width: 860px) 100vw, 40vw"
            quality={85}
            style={{
              objectFit: 'cover',
              objectPosition: 'top center',
              animation: 'about-fade-in 0.52s ease forwards',
              zIndex: 1,
            }}
            priority
          />

          {/* Fallback placeholder */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(160deg, var(--surface) 0%, ${
                active === 0
                  ? 'rgba(79,70,229,0.08)'
                  : active === 1
                  ? 'rgba(16,185,129,0.07)'
                  : 'rgba(245,158,11,0.07)'
              } 100%)`,
              zIndex: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(48px, 8vw, 96px)',
                fontWeight: 800,
                color: 'var(--text)',
                opacity: 0.08,
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              {member.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
                opacity: 0.4,
                marginTop: '16px',
              }}
            >
              /team/{member.id}.jpg
            </span>
          </div>

          {/* Bottom gradient overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)',
              zIndex: 3,
              borderRadius: '0 0 24px 24px',
            }}
          />
        </div>

        {/* ── CENTER: Content ──────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '0',
          }}
        >
          {/* Role label */}
          <div
            key={`role-${active}`}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(10px, 1.1vw, 13px)',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '20px',
              animation: 'about-text-in 0.45s 0.08s ease both',
            }}
          >
            {member.roleLabel}
          </div>

          {/* Name */}
          <h2
            key={`name-${active}`}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(36px, 5.5vw, 80px)',
              fontWeight: 800,
              color: 'var(--text)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              marginBottom: '32px',
              animation: 'about-text-in 0.48s 0.12s ease both',
            }}
          >
            {member.name.split(' ').map((word, i) => (
              <span key={i} style={{ display: 'block' }}>
                {word}
              </span>
            ))}
          </h2>

          {/* Divider line */}
          <div
            key={`divider-${active}`}
            style={{
              width: 'clamp(40px, 5vw, 64px)',
              height: '2px',
              backgroundColor: 'var(--accent)',
              marginBottom: '28px',
              opacity: 0.5,
              animation: 'about-line-in 0.5s 0.18s ease both',
            }}
          />

          {/* Description */}
          <p
            key={`desc-${active}`}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              lineHeight: 1.75,
              color: 'var(--secondary)',
              maxWidth: '520px',
              animation: 'about-text-in 0.5s 0.22s ease both',
            }}
          >
            {member.description}
          </p>

          {/* Step indicator */}
          <div
            style={{
              marginTop: '52px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 800,
                color: 'var(--text)',
                opacity: 0.07,
                lineHeight: 1,
              }}
            >
              0{active + 1}
            </span>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.16em',
                color: 'var(--secondary)',
                opacity: 0.4,
              }}
            >
              / 0{TEAM.length}
            </span>
          </div>
        </div>

        {/* ── RIGHT: Vertical Dot Navigation ──────────────────────────── */}
        <nav
          aria-label="Team member navigation"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: '0',
            position: 'relative',
          }}
        >
          {/* Vertical connecting line */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: '6px',
              top: '14px',
              bottom: '14px',
              width: '1px',
              backgroundColor: 'var(--border-dark-color)',
            }}
          />

          {TEAM.map((tm, i) => {
            const isActive = i === active;
            return (
              <button
                key={tm.id}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => switchTo(i)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '14px 0 14px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  position: 'relative',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform = 'translateX(0)';
                }}
              >
                {/* Dot */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: '0',
                    width: isActive ? '13px' : '9px',
                    height: isActive ? '13px' : '9px',
                    borderRadius: '50%',
                    backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                    border: isActive ? '2px solid var(--accent)' : '1.5px solid var(--secondary)',
                    transform: isActive ? 'translate(-2px, -6.5px)' : 'translate(0px, -4.5px)',
                    transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    boxShadow: isActive ? '0 0 12px rgba(79,70,229,0.45)' : 'none',
                    zIndex: 1,
                  }}
                />

                {/* Label */}
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: isActive ? '13px' : '11px',
                    fontWeight: isActive ? 600 : 400,
                    letterSpacing: isActive ? '0.14em' : '0.1em',
                    textTransform: 'uppercase',
                    color: isActive ? 'var(--text)' : 'var(--secondary)',
                    opacity: isActive ? 1 : 0.5,
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {tm.navLabel}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Mobile horizontal dots ───────────────────────────────────────────── */}
      <div
        aria-label="Team navigation dots"
        className="about-mobile-dots"
        style={{
          display: 'none',
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {TEAM.map((_, i) => (
          <button
            key={i}
            aria-label={`View ${TEAM[i].name}`}
            onClick={() => switchTo(i)}
            style={{
              background: 'none',
              border: 'none',
              padding: '6px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: i === active ? '24px' : '8px',
                height: '8px',
                borderRadius: i === active ? '4px' : '50%',
                backgroundColor: i === active ? 'var(--accent)' : 'var(--secondary)',
                opacity: i === active ? 1 : 0.35,
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            />
          </button>
        ))}
      </div>

      {/* ── Keyframe styles ─────────────────────────────────────────────────── */}
      <style>{`
        @keyframes about-fade-in {
          from { opacity: 0; transform: scale(1.03) translateY(8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes about-fade-out {
          from { opacity: 1; transform: scale(1)    translateY(0); }
          to   { opacity: 0; transform: scale(0.97) translateY(-8px); }
        }
        @keyframes about-text-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes about-line-in {
          from { opacity: 0; transform: scaleX(0); transform-origin: left; }
          to   { opacity: 0.5; transform: scaleX(1); transform-origin: left; }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .about-panel-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto auto !important;
            gap: 28px !important;
            min-height: unset !important;
            padding: 0 20px !important;
          }
          .about-panel-grid > nav {
            display: none !important;
          }
          .about-mobile-dots {
            display: flex !important;
          }
          .about-section-label {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            transform: none !important;
            margin-bottom: 32px;
          }
          .about-section-wrap {
            padding: 60px 0 100px !important;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
        }
        @media (min-width: 769px) and (max-width: 860px) {
          .about-panel-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto auto auto !important;
            gap: 32px !important;
            min-height: unset !important;
          }
          .about-panel-grid > nav {
            display: none !important;
          }
          .about-mobile-dots {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}
